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
    
    const clientName = formData.get('clientName') as string
    const clientTitle = formData.get('clientTitle') as string
    const contentMn = formData.get('contentMn') as string
    const contentEn = formData.get('contentEn') as string
    const rating = parseInt(formData.get('rating') as string) || 5
    const featured = formData.get('featured') === 'true'
    const published = formData.get('published') === 'true'

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        clientTitle,
        contentMn,
        contentEn,
        rating,
        featured,
        published
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
