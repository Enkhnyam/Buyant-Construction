import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
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
    let clientPhoto = null
    const photoFile = formData.get('clientPhoto') as File
    if (photoFile) {
      // In a real implementation, you would upload the file to a storage service
      // For now, we'll just store the filename
      clientPhoto = `/uploads/testimonials/${Date.now()}-${photoFile.name}`
    }

    const testimonial = await prisma.testimonial.create({
      data: {
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
        published,
        clientPhoto
      }
    })

    return NextResponse.json({ testimonial }, { status: 201 })
  } catch (error) {
    console.error('Failed to create testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
