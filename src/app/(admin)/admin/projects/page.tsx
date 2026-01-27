import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit3, Github, ExternalLink, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { deleteItem } from '@/lib/actions'
import ProjectForm from './ProjectForm'

export default async function ProjectsAdmin({ searchParams }: { searchParams: { editId?: string } }) {
  const { editId } = await searchParams
  const editProject = editId ? await prisma.project.findUnique({ where: { id: editId } }) : null
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-background text-foreground transition-colors duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold">Projects ({projects.length})</h1>
          <p className="text-muted-foreground">Manage your portfolio showcase</p>
        </div>
        {editId && (
          <Link href="/admin/projects">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              Cancel Edit
            </Button>
          </Link>
        )}
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">
            {editId ? '✨ Edit Project' : '🚀 Create New Project'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm editId={editId} initialData={editProject} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group border-border bg-card hover:shadow-cute transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-display font-semibold text-xl">{project.title}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{project.category}</p>
                </div>
                {project.featured && (
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                {/* Meta Icons */}
                <div className="flex gap-2 mr-auto">
                  {project.image && (<span title="Has preview image"> <ImageIcon className="w-4 h-4 text-accent" /></span>)}
                  {project.githubUrl && (<span title="GitHub linked"><Github className="w-4 h-4 text-muted-foreground" /></span>)}
                  {project.liveUrl && (<span title="Live demo linked"><ExternalLink className="w-4 h-4 text-primary" /></span>)}
                </div>

                <div className="flex gap-2">
                  <Link href={`/admin/projects?editId=${project.id}`}>
                    <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary">
                      <Edit3 className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </Link>
                  <form action={deleteItem.bind(null, 'project', project.id)}>
                    <Button variant="destructive" size="sm" type="submit">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}