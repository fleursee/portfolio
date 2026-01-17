// Similar to projects API: GET published posts, ?page=1&limit=6&tag=next.js

import prisma from "@/lib/prisma"
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 6
  const skip = (page - 1) * limit

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      skip, take: limit + 1,  // +1 for next page
    }),
    prisma.blogPost.count({ where: { published: true } })
  ])

  const hasNext = posts.length > limit
  const nextPosts = hasNext ? posts.slice(0, -1) : posts

  return NextResponse.json({ posts: nextPosts, total, page, hasNext })
}
