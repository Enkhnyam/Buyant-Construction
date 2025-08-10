import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get counts for different entities
    const [projects, services, testimonials, contacts, totalImages] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.contactSubmission.count(),
      prisma.projectImage.count()
    ])

    return NextResponse.json({
      projects,
      services,
      testimonials,
      contacts,
      totalImages
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
