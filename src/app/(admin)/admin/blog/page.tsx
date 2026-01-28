import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit3 } from 'lucide-react'
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
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Blog ({posts.length})</h1>
        {editId && (
          <Link href="/admin/blog"><Button variant="outline">Cancel Edit</Button></Link>
        )}
      </div>

      <Card>
        <CardHeader><CardTitle>{editId ? 'Edit' : 'Create'} Post</CardTitle></CardHeader>
        <CardContent>
          <BlogForm editId={editId} initialData={editPost} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold inline-block mr-2">{post.title}</h3>
                {post.published ? <Badge>Published</Badge> : <Badge variant="secondary">Draft</Badge>}
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blog?editId=${post.id}`}>
                  <Button variant="outline" size="sm"><Edit3 className="w-4 h-4" /></Button>
                </Link>
                <form action={deleteItem.bind(null, 'blogPost', post.id)}>
                  <Button variant="destructive" size="sm" type="submit"><Trash2 className="w-4 h-4" /></Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
