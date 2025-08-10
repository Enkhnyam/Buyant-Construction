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
    const formData = await request.formData()
    
    // Extract service data
    const titleMn = formData.get('titleMn') as string
    const titleEn = formData.get('titleEn') as string
    const descriptionMn = formData.get('descriptionMn') as string
    const descriptionEn = formData.get('descriptionEn') as string
    const shortDescriptionMn = formData.get('shortDescriptionMn') as string
    const shortDescriptionEn = formData.get('shortDescriptionEn') as string
    const icon = formData.get('icon') as string
    const order = parseInt(formData.get('order') as string) || 0
    const active = formData.get('active') === 'true'

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
        order,
        active
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
