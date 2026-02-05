import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import prisma from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  })

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Rough reading time calculation (assuming 200 words per minute)
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <article className="py-24 px-4 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-mint-500 dark:hover:text-mint-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      {/* Post Header */}
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-mint-500 to-blush-500 bg-clip-text text-transparent">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Post Content - Rendered from Tiptap HTML */}
      <div
        className={cn(
          // Base prose styles for Tiptap content
          "prose prose-lg prose-slate dark:prose-invert max-w-none",
          
          // Headings
          "prose-headings:font-display prose-headings:text-slate-900 dark:prose-headings:text-slate-100",
          "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl",
          "prose-h1:mb-6 prose-h1:mt-8",
          "prose-h2:mb-4 prose-h2:mt-8",
          "prose-h3:mb-3 prose-h3:mt-6",
          
          // Paragraphs and text
          "prose-p:text-slate-700 dark:prose-p:text-slate-300",
          "prose-p:leading-relaxed prose-p:mb-6",
          
          // Links
          "prose-a:text-mint-500 dark:prose-a:text-mint-400",
          "prose-a:no-underline hover:prose-a:underline",
          "prose-a:transition-colors prose-a:font-medium",
          
          // Lists
          "prose-ul:text-slate-700 dark:prose-ul:text-slate-300",
          "prose-ol:text-slate-700 dark:prose-ol:text-slate-300",
          "prose-li:marker:text-mint-500 dark:prose-li:marker:text-mint-400",
          "prose-li:mb-2",
          
          // Strong and emphasis
          "prose-strong:text-slate-900 dark:prose-strong:text-slate-100",
          "prose-strong:font-semibold",
          "prose-em:text-slate-700 dark:prose-em:text-slate-300",
          
          // Code
          "prose-code:text-blush-500 dark:prose-code:text-blush-400",
          "prose-code:bg-slate-100 dark:prose-code:bg-slate-800",
          "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
          "prose-code:before:content-none prose-code:after:content-none",
          "prose-code:font-mono",
          
          // Code blocks
          "prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800",
          "prose-pre:text-slate-100",
          "prose-pre:border prose-pre:border-slate-700",
          "prose-pre:rounded-lg prose-pre:shadow-lg",
          "prose-pre:overflow-x-auto",
          "prose-pre:p-4",
          
          // Blockquotes
          "prose-blockquote:border-l-4 prose-blockquote:border-l-mint-500 dark:prose-blockquote:border-l-mint-400",
          "prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300",
          "prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50",
          "prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r",
          "prose-blockquote:italic prose-blockquote:my-6",
          
          // Images
          "prose-img:rounded-extra prose-img:shadow-cute",
          "prose-img:border prose-img:border-slate-200 dark:prose-img:border-slate-700",
          "prose-img:my-8",
          
          // HR
          "prose-hr:border-slate-200 dark:prose-hr:border-slate-700",
          "prose-hr:my-12",
          
          // Tables
          "prose-table:border prose-table:border-slate-200 dark:prose-table:border-slate-700",
          "prose-table:rounded-lg prose-table:overflow-hidden",
          "prose-thead:bg-slate-100 dark:prose-thead:bg-slate-800",
          "prose-th:text-slate-900 dark:prose-th:text-slate-100",
          "prose-th:font-semibold prose-th:p-3",
          "prose-td:text-slate-700 dark:prose-td:text-slate-300",
          "prose-td:p-3 prose-td:border-t prose-td:border-slate-200 dark:prose-td:border-slate-700",
          
          // Task lists (if using Tiptap task list extension)
          "[&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:pl-0",
          "[&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:items-start [&_li[data-type='taskItem']]:gap-2"
        )}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer Navigation */}
      <footer className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-16">
        <Link
          href="/blog"
          className={cn(
            "inline-flex items-center text-mint-500 dark:text-mint-400",
            "hover:text-mint-600 dark:hover:text-mint-300 transition-colors",
            "font-medium"
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          View All Posts
        </Link>
      </footer>
    </article>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
  }
}