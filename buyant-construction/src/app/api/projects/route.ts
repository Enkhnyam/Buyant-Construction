import { NextRequest, NextResponse } from 'next/server'
import { getProjects, getProjectsByCategory } from '@/data/projects'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    let projects = category ? getProjectsByCategory(category) : getProjects()
    
    if (featured === 'true') {
      projects = projects.filter(p => p.featured)
    }
    
    if (limit) {
      projects = projects.slice(0, parseInt(limit))
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
