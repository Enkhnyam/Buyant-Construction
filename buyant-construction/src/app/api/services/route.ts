import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    // Build where clause
    const where: any = {}
    
    if (active !== null) {
      where.active = active === 'true'
    } else {
      // Default to only active services for public API
      where.active = true
    }
    
    if (featured !== null) {
      where.featured = featured === 'true'
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      ...(limit && { take: parseInt(limit) })
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
