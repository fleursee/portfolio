'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { upsertProject } from '@/lib/actions'
import { Project } from '@/generated/prisma/client'

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(5, "Description too short"),
    tags: z.string(),
    category: z.string().min(1, "Category is required"),
    // Use .nullable() or .nullish() if you want to allow these specifically
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
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
            ...initialData,
            tags: initialData.tags.join(', '),
            // Convert nulls to empty strings or undefined
            category: initialData.category ?? "",
            githubUrl: initialData.githubUrl ?? "",
            liveUrl: initialData.liveUrl ?? "",
            image: initialData.image ?? "",
            content: initialData.content ?? "",
        }
        : {
            featured: false,
            title: "",
            slug: "",
            description: "",
            tags: "",
            category: ""
        }
    })

    return (
        <form action={async (formData) => {
            const data = Object.fromEntries(formData)
  // Cast to the expected Prisma type and ensure boolean conversion
            await upsertProject(editId, {
                title: data.title as string,
                slug: data.slug as string,
                description: data.description as string,
                category: data.category as string,
                tags: (data.tags as string).split(',').map(t => t.trim()), // Ensure tags stay an array for Prisma
                githubUrl: (data.githubUrl as string) || null,
                liveUrl: (data.liveUrl as string) || null,
                image: (data.image as string) || null,
                content: (data.content as string) || null,
                featured: formData.get('featured') === 'on',
            })
        }} className="grid grid-cols-2 gap-4">
            <Input {...form.register('title')} placeholder="Title" />
            <Input {...form.register('slug')} placeholder="Slug" />
            <Input {...form.register('tags')} placeholder="Tags (comma separated)" />
            <Input {...form.register('category')} placeholder="Category" />
            <textarea {...form.register('description')} className="col-span-2 border p-2 rounded" placeholder="Description" />
            <label className="flex items-center gap-2">
                <input type="checkbox" {...form.register('featured')} name="featured" /> Featured
            </label>
            <Button type="submit" className="col-span-2">Save Project</Button>
        </form>
    )
}