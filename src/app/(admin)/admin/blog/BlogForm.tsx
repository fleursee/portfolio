'use client'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { upsertBlogPost } from '@/lib/actions'
import { BlogPost } from '@/generated/prisma/client'
import { Editor } from '@/components/admin/editor'

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.string(),
  published: z.boolean(),
})

type FormData = z.infer<typeof schema>

export default function BlogForm({ 
  editId, 
  initialData 
}: { 
  editId?: string, 
  initialData?: BlogPost | null 
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      title: initialData.title,
      slug: initialData.slug,
      excerpt: initialData.excerpt ?? '',
      content: initialData.content ?? '',
      tags: initialData.tags.join(', '),
      published: initialData.published,
    } : {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      tags: '',
      published: false,
    }
  })

  // Enhanced classes for dark mode
  const inputClasses = "border-2 border-slate-300 dark:border-slate-600 focus-visible:ring-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
  const textareaClasses = "w-full border-2 border-slate-300 dark:border-slate-600 p-2 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
  const labelClasses = "text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1 block"

  return (
    <form action={async (formData) => {
      const data = form.getValues()
      const isPublished = formData.get('published') === 'on'

      await upsertBlogPost(editId, {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
        published: isPublished,
        publishedAt: isPublished && !initialData?.published ? new Date() : initialData?.publishedAt || null
      })
    }} className="space-y-6">
      
      <div className="space-y-1">
        <label className={labelClasses}>Post Title</label>
        <Input {...form.register('title')} placeholder="Post Title" className={inputClasses} />
        {form.formState.errors.title && (
          <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className={labelClasses}>Slug</label>
        <Input {...form.register('slug')} placeholder="post-slug" className={inputClasses} />
        {form.formState.errors.slug && (
          <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.slug.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className={labelClasses}>Tags (comma separated)</label>
        <Input {...form.register('tags')} placeholder="JavaScript, React, Next.js" className={inputClasses} />
      </div>

      <div className="space-y-1">
        <label className={labelClasses}>Excerpt (Optional)</label>
        <textarea 
          {...form.register('excerpt')} 
          className={textareaClasses}
          placeholder="A brief summary of your post..." 
          rows={3}
        />
      </div>

      <div className="space-y-1">
        <label className={labelClasses}>Content</label>
        <Controller
          control={form.control}
          name="content"
          render={({ field }) => (
            <div className="border-2 border-slate-300 dark:border-slate-600 rounded-md overflow-hidden bg-white dark:bg-slate-800">
              <Editor content={field.value} onChange={field.onChange} />
            </div>
          )}
        />
        {form.formState.errors.content && (
          <p className="text-xs text-red-500 dark:text-red-400">{form.formState.errors.content.message}</p>
        )}
      </div>

      <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-fit">
        <input 
          type="checkbox" 
          {...form.register('published')} 
          name="published" 
          className="w-4 h-4 accent-primary cursor-pointer"
        />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Publish Post
        </span>
      </label>

      <Button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-slate-900 py-6 text-lg font-bold shadow-lg transition-transform active:scale-[0.98]"
      >
        {editId ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  )
}