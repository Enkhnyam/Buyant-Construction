import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get counts from database
    const [projects, services, testimonials, contacts] = await Promise.all([
      prisma.project.count({ where: { published: true } }),
      prisma.service.count({ where: { active: true } }),
      prisma.testimonial.count({ where: { published: true } }),
      prisma.contactSubmission.count()
    ])

    return NextResponse.json({
      projects,
      services,
      testimonials,
      contacts
    })
  } catch (error) {
    console.error('Failed to fetch admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
