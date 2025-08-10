import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id)
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

    // Update project
    const project = await prisma.project.update({
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

    return NextResponse.json({ 
      success: true, 
      project 
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
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id)

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
