'use client'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProjectCard from '@/components/project-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import { Grid3x3, List, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/generated/prisma/client'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const tag = searchParams.get('tag') || ''

  // Debounce search input
  const debouncedSearch = useDebounce(search, 300)

  // Fetch projects when filters change
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (debouncedSearch) params.set('search', debouncedSearch)
        if (category) params.set('category', category)
        if (tag) params.set('tag', tag)

        const res = await fetch(`/api/projects?${params}`)
        if (!res.ok) throw new Error('Failed to fetch projects')
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [debouncedSearch, category, tag])

  // Get unique categories and tags from projects
  const categories = useMemo(() => {
    const cats = projects
      .map(p => p.category)
      .filter((c): c is string => Boolean(c))
    return Array.from(new Set(cats))
  }, [projects])

  const allTags = useMemo(() => {
    const tags = projects.flatMap(p => p.tags)
    return Array.from(new Set(tags))
  }, [projects])

  const updateSearch = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/projects?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/projects')
  }

  const hasActiveFilters = Boolean(search || category || tag)

  return (
    <section className="py-24 px-4 container mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl md:text-6xl mb-6 bg-gradient-to-r from-mint-500 to-blush-500 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Explore my collection of projects built with modern technologies
        </p>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => updateSearch('search', e.target.value)}
          className="max-w-md"
        />
        <div className="flex gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            onClick={() => setView('grid')}
            size="sm"
          >
            <Grid3x3 className="w-4 h-4 mr-1" /> Grid
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
            size="sm"
          >
            <List className="w-4 h-4 mr-1" /> List
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Category:</span>
          <Button
            variant={category === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateSearch('category', '')}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSearch('category', cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags:</span>
            <Button
              variant={tag === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSearch('tag', '')}
            >
              All
            </Button>
            {allTags.slice(0, 10).map((t) => (
              <Button
                key={t}
                variant={tag === t ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSearch('tag', t)}
              >
                {t}
              </Button>
            ))}
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-600 dark:text-slate-400"
          >
            <X className="w-4 h-4 mr-1" /> Clear filters
          </Button>
        )}
      </div>

      {/* Projects Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-slate-600 dark:text-slate-400">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
            No projects found matching your filters.
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div
          className={cn(
            view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          )}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} view={view} />
          ))}
        </div>
      )}

      {/* Results count */}
      {!loading && projects.length > 0 && (
        <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
          Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
        </div>
      )}
    </section>
  )
}
