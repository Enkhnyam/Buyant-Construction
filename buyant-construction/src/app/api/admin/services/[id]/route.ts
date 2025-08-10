import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = parseInt(params.id)
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

    // Update service
    const service = await prisma.service.update({
      where: { id: serviceId },
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
    console.error('Failed to update service:', error)
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = parseInt(params.id)

    // Delete service
    await prisma.service.delete({
      where: { id: serviceId }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Service deleted successfully' 
    })
  } catch (error) {
    console.error('Failed to delete service:', error)
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}
