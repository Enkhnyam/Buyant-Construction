import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Ensure uploads directory exists
async function ensureUploadsDir() {
  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }
  return uploadsDir
}

// Save uploaded file
async function saveFile(file: File, uploadsDir: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}-${randomString}.${extension}`
  const filepath = join(uploadsDir, filename)
  
  await writeFile(filepath, buffer)
  return `/uploads/${filename}`
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract project data
    const titleMn = formData.get('titleMn') as string
    const titleEn = formData.get('titleEn') as string
    const descriptionMn = formData.get('descriptionMn') as string
    const descriptionEn = formData.get('descriptionEn') as string
    const category = formData.get('category') as string
    const location = formData.get('location') as string
    const completionDate = formData.get('completionDate') as string
    const clientName = formData.get('clientName') as string
    const testimonialMn = formData.get('testimonialMn') as string
    const testimonialEn = formData.get('testimonialEn') as string
    const featured = formData.get('featured') === 'true'
    const published = formData.get('published') === 'true'

    // Validate required fields
    if (!titleMn || !titleEn || !descriptionMn || !descriptionEn || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        titleMn,
        titleEn,
        descriptionMn,
        descriptionEn,
        category,
        location,
        completionDate: completionDate ? new Date(completionDate) : null,
        clientName: clientName || null,
        testimonialMn: testimonialMn || null,
        testimonialEn: testimonialEn || null,
        featured,
        published
      }
    })

    // Handle image uploads
    const uploadsDir = await ensureUploadsDir()
    const images = formData.getAll('images') as File[]
    const imageCaptions = formData.getAll('imageCaptions') as string[]
    const imageOrder = formData.getAll('imageOrder') as string[]

    if (images.length > 0) {
      const imagePromises = images.map(async (file, index) => {
        const imageUrl = await saveFile(file, uploadsDir)
        
        // Parse captions
        let captionMn = ''
        let captionEn = ''
        
        try {
          const captions = JSON.parse(imageCaptions[index] || '{}')
          captionMn = captions.mn || ''
          captionEn = captions.en || ''
        } catch (e) {
          console.warn('Failed to parse image captions:', e)
        }

        return prisma.projectImage.create({
          data: {
            projectId: project.id,
            imageUrl,
            captionMn,
            captionEn,
            isPrimary: index === 0, // First image is primary
            order: parseInt(imageOrder[index] || '0')
          }
        })
      })

      await Promise.all(imagePromises)
    }

    return NextResponse.json({ 
      success: true, 
      project: { ...project, images: [] } 
    })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const projectId = formData.get('id') as string
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Extract project data
    const titleMn = formData.get('titleMn') as string
    const titleEn = formData.get('titleEn') as string
    const descriptionMn = formData.get('descriptionMn') as string
    const descriptionEn = formData.get('descriptionEn') as string
    const category = formData.get('category') as string
    const location = formData.get('location') as string
    const completionDate = formData.get('completionDate') as string
    const clientName = formData.get('clientName') as string
    const testimonialMn = formData.get('testimonialMn') as string
    const testimonialEn = formData.get('testimonialEn') as string
    const featured = formData.get('featured') === 'true'
    const published = formData.get('published') === 'true'

    // Validate required fields
    if (!titleMn || !titleEn || !descriptionMn || !descriptionEn || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Update project
    const project = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        titleMn,
        titleEn,
        descriptionMn,
        descriptionEn,
        category,
        location,
        completionDate: completionDate ? new Date(completionDate) : null,
        clientName: clientName || null,
        testimonialMn: testimonialMn || null,
        testimonialEn: testimonialEn || null,
        featured,
        published
      }
    })

    // Handle new image uploads
    const uploadsDir = await ensureUploadsDir()
    const images = formData.getAll('images') as File[]
    const imageCaptions = formData.getAll('imageCaptions') as string[]
    const imageOrder = formData.getAll('imageOrder') as string[]

    if (images.length > 0) {
      const imagePromises = images.map(async (file, index) => {
        const imageUrl = await saveFile(file, uploadsDir)
        
        // Parse captions
        let captionMn = ''
        let captionEn = ''
        
        try {
          const captions = JSON.parse(imageCaptions[index] || '{}')
          captionMn = captions.mn || ''
          captionEn = captions.en || ''
        } catch (e) {
          console.warn('Failed to parse image captions:', e)
        }

        return prisma.projectImage.create({
          data: {
            projectId: project.id,
            imageUrl,
            captionMn,
            captionEn,
            isPrimary: false, // Don't change primary image on update
            order: parseInt(imageOrder[index] || '0')
          }
        })
      })

      await Promise.all(imagePromises)
    }

    return NextResponse.json({ 
      success: true, 
      project: { ...project, images: [] } 
    })
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}
