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
    featured: z.boolean(),
})

type FormData = z.infer<typeof schema>

export default function ProjectForm({
    editId,
    initialData
}: {
    editId?: string,
    initialData?: Project | null
}) {
    // Set defaultValues based on initialData - this works because the component remounts with key prop
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: initialData ? {
            title: initialData.title,
            slug: initialData.slug,
            description: initialData.description,
            category: initialData.category ?? '',
            tags: initialData.tags.join(', '),
            githubUrl: initialData.githubUrl ?? '',
            liveUrl: initialData.liveUrl ?? '',
            image: initialData.image ?? '',
            content: initialData.content ?? '',
            featured: initialData.featured,
        } : {
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

    // Enhanced classes for better dark mode visibility with data-theme
    const inputClasses = "border-2 border-slate-300 dark:border-slate-600 focus-visible:ring-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
    const labelClasses = "text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1 block"

    return (
        <form action={async (formData) => {
            const data = form.getValues()
            await upsertProject(editId, {
                title: data.title,
                slug: data.slug,
                description: data.description,
                category: data.category,
                tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
                githubUrl: data.githubUrl || null,
                liveUrl: data.liveUrl || null,
                image: data.image || null,
                content: data.content || null,
                featured: formData.get('featured') === 'on',
            })
        }} className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
                <label className={labelClasses}>Project Title</label>
                <Input {...form.register('title')} placeholder="Project Title" className={inputClasses} />
                {form.formState.errors.title && (
                    <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.title.message}</p>
                )}
            </div>
            <div className="space-y-1">
                <label className={labelClasses}>Slug</label>
                <Input {...form.register('slug')} placeholder="project-slug" className={inputClasses} />
                {form.formState.errors.slug && (
                    <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.slug.message}</p>
                )}
            </div>
            <div className="space-y-1">
                <label className={labelClasses}>Category</label>
                <Input {...form.register('category')} placeholder="Frontend, Fullstack, etc." className={inputClasses} />
                {form.formState.errors.category && (
                    <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.category.message}</p>
                )}
            </div>
            <div className="space-y-1">
                <label className={labelClasses}>Tags</label>
                <Input {...form.register('tags')} placeholder="React, Next.js, Prisma" className={inputClasses} />
                {form.formState.errors.tags && (
                    <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.tags.message}</p>
                )}
            </div>
            
            <div className="space-y-1">
                <label className={labelClasses}>GitHub URL (Optional)</label>
                <Input {...form.register('githubUrl')} placeholder="https://github.com/..." className={inputClasses} />
                {form.formState.errors.githubUrl && (
                    <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.githubUrl.message}</p>
                )}
            </div>
            <div className="space-y-1">
                <label className={labelClasses}>Live Demo URL (Optional)</label>
                <Input {...form.register('liveUrl')} placeholder="https://..." className={inputClasses} />
                {form.formState.errors.liveUrl && (
                    <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.liveUrl.message}</p>
                )}
            </div>
            <div className="col-span-2 space-y-1">
                <label className={labelClasses}>Image URL (Optional)</label>
                <Input {...form.register('image')} placeholder="/screenshots/project1.png" className={inputClasses} />
            </div>

            <div className="col-span-2 space-y-1">
                <label className={labelClasses}>Description</label>
                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <div className="border-2 border-slate-300 dark:border-slate-600 rounded-md overflow-hidden bg-white dark:bg-slate-800">
                            <Editor content={field.value} onChange={field.onChange} />
                        </div>
                    )}
                />
                {form.formState.errors.description && (
                    <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.description.message}</p>
                )}
            </div>

            <label className="flex items-center gap-3 col-span-2 cursor-pointer p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-fit">
                <input 
                    type="checkbox" 
                    {...form.register('featured')} 
                    className="w-4 h-4 accent-primary cursor-pointer" 
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Mark as Featured Project
                </span>
            </label>

            <Button 
                type="submit" 
                className="col-span-2 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-slate-900 py-6 text-lg font-bold shadow-lg transition-transform active:scale-[0.98]"
            >
                {editId ? 'Update Project' : 'Create Project'}
            </Button>
        </form>
    )
}