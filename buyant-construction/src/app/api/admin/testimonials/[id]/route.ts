import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const testimonialId = parseInt(id)
    const formData = await request.formData()
    
    const clientNameMn = formData.get('clientNameMn') as string
    const clientNameEn = formData.get('clientNameEn') as string
    const clientPositionMn = formData.get('clientPositionMn') as string
    const clientPositionEn = formData.get('clientPositionEn') as string
    const companyMn = formData.get('companyMn') as string
    const companyEn = formData.get('companyEn') as string
    const contentMn = formData.get('contentMn') as string
    const contentEn = formData.get('contentEn') as string
    const rating = parseInt(formData.get('rating') as string) || 5
    const featured = formData.get('featured') === 'true'
    const published = formData.get('published') === 'true'
    
    // Handle file upload for client photo
    let clientPhoto = undefined
    const photoFile = formData.get('clientPhoto') as File
    if (photoFile) {
      // In a real implementation, you would upload the file to a storage service
      // For now, we'll just store the filename
      clientPhoto = `/uploads/testimonials/${Date.now()}-${photoFile.name}`
    }

    const updateData: {
      clientNameMn: string
      clientNameEn: string
      clientPositionMn: string
      clientPositionEn: string
      companyMn: string
      companyEn: string
      contentMn: string
      contentEn: string
      rating: number
      featured: boolean
      published: boolean
      clientPhoto?: string
    } = {
      clientNameMn,
      clientNameEn,
      clientPositionMn,
      clientPositionEn,
      companyMn,
      companyEn,
      contentMn,
      contentEn,
      rating,
      featured,
      published
    }

    // Only update clientPhoto if a new file was uploaded
    if (clientPhoto) {
      updateData.clientPhoto = clientPhoto
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: updateData
    })

    return NextResponse.json({ testimonial })
  } catch (error) {
    console.error('Failed to update testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
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
    const testimonialId = parseInt(id)
    
    await prisma.testimonial.delete({
      where: { id: testimonialId }
    })

    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Failed to delete testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
