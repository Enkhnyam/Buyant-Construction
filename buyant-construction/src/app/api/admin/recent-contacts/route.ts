import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get recent contact submissions
    const contacts = await prisma.contactSubmission.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      contacts
    })
  } catch (error) {
    console.error('Failed to fetch recent contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent contacts' },
      { status: 500 }
    )
  }
}
