
import prisma from '@/lib/prisma'
import { MDXRemote } from 'next-mdx-remote/rsc'

const components = { /* Custom MDX components: h1 with ids for TOC */ }

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true }
  })

  if (!post) return <div>Post not found</div>

  return (
    <article className="prose prose-headings:font-display prose-headings:text-slate-900 dark:prose-invert max-w-4xl mx-auto py-24 px-4">
      <MDXRemote source={post.content} components={components} />
    </article>
  )
}
