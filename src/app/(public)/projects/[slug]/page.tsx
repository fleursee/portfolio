import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react'
import prisma from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
  })

  if (!project) {
    notFound()
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="py-24 px-4 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-mint-500 dark:hover:text-mint-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.category && (
            <Badge variant="mint" className="text-sm">
              {project.category}
            </Badge>
          )}
          {project.featured && (
            <Badge variant="blush" className="text-sm">
              Featured
            </Badge>
          )}
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-mint-500 to-blush-500 bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          {project.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Project Image */}
      {project.image && (
        <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-extra shadow-cute mb-12 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Project Links */}
      <div className="flex flex-wrap gap-4 mb-12">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center px-6 py-3 rounded-soft border border-slate-200 dark:border-slate-700",
              "hover:bg-blush-50 dark:hover:bg-blush-900/20 text-sm font-medium transition-all",
              "text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-cute"
            )}
          >
            <Github className="w-5 h-5 mr-2" />
            View Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center px-6 py-3 bg-mint-500 text-white hover:bg-mint-400",
              "dark:bg-mint-600 dark:hover:bg-mint-500 rounded-soft text-sm font-medium",
              "shadow-cute transition-all"
            )}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Live Demo
          </a>
        )}
      </div>

      {/* Project Tags */}
      {project.tags.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-display mb-4 text-slate-900 dark:text-slate-100">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm py-1 px-3">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Project Content - Rendered from Tiptap HTML */}
      {project.content && (
        <div className="mb-12">
          <div
            className={cn(
              // Base prose styles for Tiptap content
              "prose prose-lg prose-slate dark:prose-invert max-w-none",
              
              // Headings
              "prose-headings:font-display prose-headings:text-slate-900 dark:prose-headings:text-slate-100",
              "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl",
              "prose-h1:mb-4 prose-h2:mb-3 prose-h3:mb-2",
              
              // Paragraphs and text
              "prose-p:text-slate-700 dark:prose-p:text-slate-300",
              "prose-p:leading-relaxed",
              
              // Links
              "prose-a:text-mint-500 dark:prose-a:text-mint-400",
              "prose-a:no-underline hover:prose-a:underline",
              "prose-a:transition-colors",
              
              // Lists
              "prose-ul:text-slate-700 dark:prose-ul:text-slate-300",
              "prose-ol:text-slate-700 dark:prose-ol:text-slate-300",
              "prose-li:marker:text-mint-500 dark:prose-li:marker:text-mint-400",
              
              // Strong and emphasis
              "prose-strong:text-slate-900 dark:prose-strong:text-slate-100",
              "prose-strong:font-semibold",
              "prose-em:text-slate-700 dark:prose-em:text-slate-300",
              
              // Code
              "prose-code:text-blush-500 dark:prose-code:text-blush-400",
              "prose-code:bg-slate-100 dark:prose-code:bg-slate-800",
              "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
              "prose-code:before:content-none prose-code:after:content-none",
              
              // Code blocks
              "prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800",
              "prose-pre:text-slate-100",
              "prose-pre:border prose-pre:border-slate-700",
              "prose-pre:rounded-lg prose-pre:shadow-lg",
              
              // Blockquotes
              "prose-blockquote:border-l-mint-500 dark:prose-blockquote:border-l-mint-400",
              "prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300",
              "prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50",
              "prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r",
              
              // Images
              "prose-img:rounded-extra prose-img:shadow-cute",
              "prose-img:border prose-img:border-slate-200 dark:prose-img:border-slate-700",
              
              // HR
              "prose-hr:border-slate-200 dark:prose-hr:border-slate-700",
              
              // Tables
              "prose-table:border prose-table:border-slate-200 dark:prose-table:border-slate-700",
              "prose-th:bg-slate-100 dark:prose-th:bg-slate-800",
              "prose-th:text-slate-900 dark:prose-th:text-slate-100",
              "prose-td:text-slate-700 dark:prose-td:text-slate-300"
            )}
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      )}

      {/* Navigation to Next/Previous Projects */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12">
        <Link
          href="/projects"
          className={cn(
            "inline-flex items-center text-mint-500 dark:text-mint-400",
            "hover:text-mint-600 dark:hover:text-mint-300 transition-colors",
            "font-medium"
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          View All Projects
        </Link>
      </div>
    </article>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  })

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
  })

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  }
}