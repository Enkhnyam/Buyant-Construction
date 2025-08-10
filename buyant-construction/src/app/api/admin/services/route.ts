import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract service data
    const {
      titleMn,
      titleEn,
      descriptionMn,
      descriptionEn,
      shortDescriptionMn,
      shortDescriptionEn,
      icon,
      order,
      active
    } = body

    // Validate required fields
    if (!titleMn || !titleEn || !descriptionMn || !descriptionEn || !shortDescriptionMn || !shortDescriptionEn) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create service
    const service = await prisma.service.create({
      data: {
        titleMn,
        titleEn,
        descriptionMn,
        descriptionEn,
        shortDescriptionMn,
        shortDescriptionEn,
        icon: icon || '',
        order: order || 0,
        active: active !== undefined ? active : true
      }
    })

    return NextResponse.json({ 
      success: true, 
      service 
    })
  } catch (error) {
    console.error('Failed to create service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
