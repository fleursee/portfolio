import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Project, Prisma } from '@/generated/prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const tag = searchParams.get('tag') || ''
    const category = searchParams.get('category') || ''

    // Build where clause conditionally
    const where: Prisma.ProjectWhereInput = {}

    // Search filter (title or description)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Tag filter
    if (tag) {
      where.tags = { has: tag }
    }

    // Category filter
    if (category) {
      where.category = category
    }

    const projects: Project[] = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
