'use client'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { upsertProject } from '@/lib/actions'
import { Project } from '@/generated/prisma/client'
import { Editor } from '@/components/admin/editor'

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(5, "Description too short"),
    tags: z.string(),
    category: z.string().min(1, "Category is required"),
    githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    image: z.string().optional().or(z.literal('')),
    content: z.string().optional(),
    featured: z.boolean().default(false),
})

export default function ProjectForm({
    editId,
    initialData
}: {
    editId?: string,
    initialData?: Project | null
}) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: initialData
            ? {
                title: initialData.title,
                slug: initialData.slug,
                description: initialData.description,
                // Convert null category to empty string to satisfy TS and HTML Inputs
                category: initialData.category ?? '', 
                // Join tags array into a comma-separated string for the input
                tags: initialData.tags.join(', '),
                githubUrl: initialData.githubUrl ?? '',
                liveUrl: initialData.liveUrl ?? '',
                image: initialData.image ?? '',
                content: initialData.content ?? '',
                featured: initialData.featured,
            }
            : {
                title: '',
                slug: '',
                description: '',
                tags: '',
                category: '',
                githubUrl: '',
                liveUrl: '',
                image: '',
                content: '',
                featured: false,
            }
    })

    return (
        <form action={async (formData) => {
            const data = form.getValues();
            await upsertProject(editId, {
                title: data.title,
                slug: data.slug,
                description: data.description,
                category: data.category,
                tags: data.tags.split(',').map(t => t.trim()),
                githubUrl: data.githubUrl || null,
                liveUrl: data.liveUrl || null,
                image: data.image || null,
                content: data.content || null,
                featured: formData.get('featured') === 'on',
            })
        }} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input {...form.register('title')} placeholder="Project Title" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input {...form.register('slug')} placeholder="project-slug" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input {...form.register('category')} placeholder="Frontend, Fullstack, etc." />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input {...form.register('tags')} placeholder="React, Next.js, Prisma" />
            </div>
            
            {/* New Optional Fields */}
            <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL (Optional)</label>
                <Input {...form.register('githubUrl')} placeholder="https://github.com/..." />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Live Demo URL (Optional)</label>
                <Input {...form.register('liveUrl')} placeholder="https://..." />
            </div>
            <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Image URL (Optional)</label>
                <Input {...form.register('image')} placeholder="/screenshots/project1.png" />
            </div>

            <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <Editor 
                            content={field.value} 
                            onChange={field.onChange} 
                        />
                    )}
                />
                {form.formState.errors.description && (
                    <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
                )}
            </div>

            <label className="flex items-center gap-2 col-span-2 cursor-pointer">
                <input type="checkbox" {...form.register('featured')} name="featured" className="accent-primary" />
                <span className="text-sm font-medium">Mark as Featured Project</span>
            </label>

            <Button type="submit" className="col-span-2 bg-primary text-primary-foreground hover:bg-primary/90">
                {editId ? 'Update Project' : 'Create Project'}
            </Button>
        </form>
    )
}