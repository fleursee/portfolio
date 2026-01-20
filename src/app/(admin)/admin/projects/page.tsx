import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit3 } from 'lucide-react'
import Link from 'next/link'
import { deleteItem } from '@/lib/actions'
import ProjectForm from './ProjectForm'

export default async function ProjectsAdmin({ searchParams }: { searchParams: { editId?: string } }) {
  const { editId } = await searchParams
  const editProject = editId ? await prisma.project.findUnique({ where: { id: editId } }) : null
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Projects ({projects.length})</h1>
        {editId && (
          <Link href="/admin/projects">
            <Button variant="outline">Cancel Edit</Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader><CardTitle>{editId ? 'Edit' : 'Create'} Project</CardTitle></CardHeader>
        <CardContent>
          <ProjectForm editId={editId} initialData={editProject} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{project.title}</h3>
                {project.featured && <Badge>Featured</Badge>}
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/projects?editId=${project.id}`}>
                  <Button variant="outline" size="sm"><Edit3 className="w-4 h-4" /></Button>
                </Link>
                <form action={deleteItem.bind(null, 'project', project.id)}>
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