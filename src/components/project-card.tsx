'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { useGSAPAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

import type { Project } from '@/generated/prisma/client'

interface ProjectCardProps {
  project: Project
  view?: 'grid' | 'list'
}

export default function ProjectCard({ project, view = 'grid' }: ProjectCardProps) {
  const ref = useGSAPAnimation('.project-card', { scale: 0.95, opacity: 0, duration: 0.6 })

  if (view === 'list') {
    return (
      <Card ref={ref} className="group hover:shadow-cute transition-all duration-500 overflow-hidden project-card border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="flex flex-col md:flex-row">
          <Link href={`/projects/${project.slug}`} className="block md:w-64 flex-shrink-0">
            <CardHeader className="p-0 h-48 md:h-full relative cursor-pointer">
              <Image 
                src={project.image || '/placeholder.jpg'} 
                alt={project.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </CardHeader>
          </Link>
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {project.category && (
                  <Badge variant="mint" className="text-xs">
                    {project.category}
                  </Badge>
                )}
                {project.featured && (
                  <Badge variant="blush" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <Link href={`/projects/${project.slug}`}>
                <CardTitle className="font-display text-2xl mb-2 text-slate-900 dark:text-slate-100 hover:text-mint-500 dark:hover:text-mint-400 transition-colors cursor-pointer">
                  {project.title}
                </CardTitle>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="dark:bg-slate-800 dark:text-slate-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center px-4 py-2 rounded-soft border border-slate-200 dark:border-slate-700",
                    "hover:bg-blush-50 dark:hover:bg-blush-900/20 text-sm font-medium transition-all",
                    "text-slate-700 dark:text-slate-300"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4 mr-1" /> Code
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center px-4 py-2 bg-mint-500 text-white hover:bg-mint-400",
                    "dark:bg-mint-600 dark:hover:bg-mint-500 rounded-soft text-sm font-medium",
                    "shadow-cute transition-all"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4 mr-1" /> Live
                </a>
              )}
              <Link 
                href={`/projects/${project.slug}`}
                className={cn(
                  "inline-flex items-center px-4 py-2 rounded-soft text-sm font-medium transition-all",
                  "text-slate-600 dark:text-slate-400 hover:text-mint-500 dark:hover:text-mint-400",
                  "hover:bg-mint-50 dark:hover:bg-mint-900/10"
                )}
              >
                Details <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card ref={ref} className="group hover:shadow-cute hover:-translate-y-4 transition-all duration-500 overflow-hidden h-full project-card border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <Link href={`/projects/${project.slug}`} className="block">
        <CardHeader className="p-0 h-48 relative cursor-pointer">
          <Image 
            src={project.image || '/placeholder.jpg'} 
            alt={project.title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
        </CardHeader>
      </Link>
      <CardContent className="p-6 pt-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {project.category && (
            <Badge variant="mint" className="text-xs">
              {project.category}
            </Badge>
          )}
          {project.featured && (
            <Badge variant="blush" className="text-xs">
              Featured
            </Badge>
          )}
        </div>
        <Link href={`/projects/${project.slug}`}>
          <CardTitle className="font-display text-xl mb-2 text-slate-900 dark:text-slate-100 hover:text-mint-500 dark:hover:text-mint-400 transition-colors cursor-pointer">
            {project.title}
          </CardTitle>
        </Link>
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="dark:bg-slate-800 dark:text-slate-300">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-soft border border-slate-200 dark:border-slate-700",
                "hover:bg-blush-50 dark:hover:bg-blush-900/20 text-sm font-medium transition-all",
                "text-slate-700 dark:text-slate-300"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4 mr-1" /> Code
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center px-4 py-2 bg-mint-500 text-white hover:bg-mint-400",
                "dark:bg-mint-600 dark:hover:bg-mint-500 rounded-soft text-sm font-medium",
                "shadow-cute transition-all"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 mr-1" /> Live
            </a>
          )}
          <Link 
            href={`/projects/${project.slug}`}
            className={cn(
              "inline-flex items-center px-4 py-2 rounded-soft text-sm font-medium transition-all",
              "text-slate-600 dark:text-slate-400 hover:text-mint-500 dark:hover:text-mint-400",
              "hover:bg-mint-50 dark:hover:bg-mint-900/10"
            )}
          >
            Details <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}