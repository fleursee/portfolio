'use client'
import Link from 'next/link'
//import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BlogPost } from '@/generated/prisma/client'

function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  // const searchParams = useSearchParams()
  // const page = searchParams.get('page') || '1'
  // above is a TODO
  // Fetch/API logic like projects

  return (
    <section className="py-24 px-4 container mx-auto">
      <div className="text-center mb-20">
        <h1 className="font-display text-5xl md:text-6xl bg-gradient-to-r from-blush-500 to-mint-500 bg-clip-text text-transparent mb-6">
          Blog
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">Thoughts on dev, cute UIs & more.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {initialPosts.map(post => (
          <Card key={post.id} className="hover:shadow-cute transition-all group">
            <CardContent className="p-6">
              <div className="flex gap-2 mb-3 flex-wrap">
                {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="font-semibold text-xl mb-2 hover:text-mint-500 transition-colors group-hover:underline">{post.title}</h2>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>
              <div className="text-sm text-slate-500 flex items-center gap-4">
                {post.readingTime} min read • {new Date(post.publishedAt!).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination Buttons */}
      <div className="flex justify-center gap-2">
        <Button variant="outline">Prev</Button>
        <Button variant="outline">1</Button>
        <Button>2</Button>
        <Button variant="outline">Next</Button>
      </div>
    </section>
  )
}

// Page wrapper
export default function BlogPage() {
  // Server fetch initial or pass via props
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BlogList initialPosts={[]} />
    </Suspense>
  )
}
