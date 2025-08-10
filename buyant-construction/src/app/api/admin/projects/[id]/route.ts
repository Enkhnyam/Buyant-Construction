import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { unlink, writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { PrismaClient } from '@prisma/client'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const projectId = parseInt(id)
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

    // Extract image data
    const imageCaptions = formData.getAll('imageCaptions')
    const imageOrder = formData.getAll('imageOrder')
    const imagePrimary = formData.getAll('imagePrimary')
    const imageTypes = formData.getAll('imageTypes')
    const imageFiles = formData.getAll('images') as File[]
    const existingImageUrls = formData.getAll('existingImageUrls')

    // Validate required fields
    if (!titleMn || !titleEn || !descriptionMn || !descriptionEn || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Start a transaction to update both project and images
    const result = await prisma.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => {
      // Update project
      const project = await tx.project.update({
        where: { id: projectId },
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

      // Delete existing images from database
      await tx.projectImage.deleteMany({
        where: { projectId }
      })

      // Process and save images
      let fileIndex = 0
      let existingIndex = 0

      for (let i = 0; i < imageCaptions.length; i++) {
        const captionData = imageCaptions[i] as string
        const order = parseInt(imageOrder[i] as string)
        const isPrimary = imagePrimary[i] === 'true'
        const imageType = imageTypes[i] as string

        // Parse caption data (format: [mn][en])
        const captionMatch = captionData.match(/\[(.*?)\]\[(.*?)\]/)
        const captionMn = captionMatch ? captionMatch[1] : ''
        const captionEn = captionMatch ? captionMatch[2] : ''

        if (imageType === 'new' && fileIndex < imageFiles.length) {
          // Handle new uploaded file
          const file = imageFiles[fileIndex]
          const fileName = `${projectId}-${Date.now()}-${fileIndex}.${file.name.split('.').pop()}`
          const filePath = `/uploads/${fileName}`
          
          // Save file to disk
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const fullPath = join(process.cwd(), 'public', filePath)
          await writeFile(fullPath, buffer)

          // Create image record
          await tx.projectImage.create({
            data: {
              projectId,
              imageUrl: filePath,
              captionMn,
              captionEn,
              isPrimary,
              order
            }
          })
          fileIndex++
        } else if (imageType === 'existing' && existingIndex < existingImageUrls.length) {
          // Handle existing image
          const existingUrl = existingImageUrls[existingIndex] as string
          
          // Create image record with existing URL
          await tx.projectImage.create({
            data: {
              projectId,
              imageUrl: existingUrl,
              captionMn,
              captionEn,
              isPrimary,
              order
            }
          })
          existingIndex++
        }
      }

      return project
    })

    return NextResponse.json({ 
      success: true, 
      project: result 
    })
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const projectId = parseInt(id)

    // Get project images to delete files
    const projectImages = await prisma.projectImage.findMany({
      where: { projectId }
    })

    // Delete image files from disk
    for (const image of projectImages) {
      const imagePath = join(process.cwd(), 'public', image.imageUrl)
      if (existsSync(imagePath)) {
        try {
          await unlink(imagePath)
        } catch (e) {
          console.warn(`Failed to delete image file: ${imagePath}`, e)
        }
      }
    }

    // Delete project and all related data (cascade)
    await prisma.project.delete({
      where: { id: projectId }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Project deleted successfully' 
    })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
