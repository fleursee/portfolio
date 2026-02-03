import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit3, Calendar, Eye } from 'lucide-react'
import Link from 'next/link'
import { deleteItem } from '@/lib/actions'
import BlogForm from './BlogForm'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function BlogAdmin({ searchParams }: { searchParams: Promise<{ editId?: string }> }) {

  const session = await getServerSession(authOptions)
  if (!session || !session.user || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  const { editId } = await searchParams
  const editPost = editId ? await prisma.blogPost.findUnique({ where: { id: editId } }) : null
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-background text-foreground transition-colors duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-slate-100">
            Blog Posts ({posts.length})
          </h1>
          <p className="text-muted-foreground dark:text-slate-400">Manage your blog content</p>
        </div>
        {editId && (
          <Link href="/admin/blog">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 dark:border-accent dark:text-accent">
              Cancel Edit
            </Button>
          </Link>
        )}
      </div>

      <Card className="border-border bg-card shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-primary dark:text-primary">
            {editId ? '✏️ Edit Post' : '📝 Create New Post'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* KEY PROP forces component to remount when editId changes */}
          <BlogForm 
            key={editId || 'new'} 
            editId={editId} 
            initialData={editPost} 
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card 
            key={post.id}
            className="border-border bg-card hover:shadow-cute transition-all duration-300 dark:border-slate-700 dark:bg-slate-900"
          >
            <CardContent className="p-6 flex justify-between items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-slate-100">
                    {post.title}
                  </h3>
                  {post.published ? (
                    <Badge className="bg-green-500 text-white dark:bg-green-600">
                      Published
                    </Badge>
                  ) : (
                    <Badge 
                      variant="secondary" 
                      className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                    >
                      Draft
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  {post.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-[10px] bg-secondary/30 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {post.excerpt && (
                  <p className="text-sm text-muted-foreground dark:text-slate-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {post.published && (
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="dark:text-slate-300 dark:hover:bg-slate-800"
                      title="View post"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
                <Link href={`/admin/blog?editId=${post.id}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={deleteItem.bind(null, 'blogPost', post.id)}>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    type="submit"
                    className="dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}