import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function BlogPage() {
  // 1. Fetch data directly from the DB (Server Component)
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' }
  })

  return (
    <section className="py-24 px-4 container mx-auto max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="font-display text-5xl md:text-6xl bg-gradient-to-r from-blush-500 to-mint-500 bg-clip-text text-transparent mb-6">
          Blog
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">Thoughts on dev, cute UIs & more.</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No blog posts yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map(post => (
            <Card key={post.id} className="hover:shadow-cute transition-all group border-none bg-slate-50/50 dark:bg-slate-900/50">
              <CardContent className="p-6">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/50">#{tag}</Badge>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-semibold text-xl mb-2 hover:text-mint-500 transition-colors group-hover:underline">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="text-sm text-slate-500 flex items-center justify-between border-t pt-4">
                  {/* Handle null check for publishedAt since drafts don't have it */}
                  <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}</span>
                  <span className="italic text-xs group-hover:text-mint-500 transition-colors">Read More →</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination (Simplified for now) */}
      {posts.length > 0 && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" disabled>Prev</Button>
          <Button variant="default">1</Button>
          <Button variant="outline" disabled>Next</Button>
        </div>
      )}
    </section>
  )
}
