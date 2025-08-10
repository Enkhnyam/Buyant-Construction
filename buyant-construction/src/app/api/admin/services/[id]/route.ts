import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const serviceId = parseInt(id)
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
        order,
        active
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const serviceId = parseInt(id)

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
