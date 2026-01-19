'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { upsertBlogPost } from '@/lib/actions'
import { BlogPost } from '@/generated/prisma/client'

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  tags: z.string(),
  published: z.boolean().default(false),
})

export default function BlogForm({ editId, initialData }: { editId?: string, initialData?: BlogPost | null }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      ...initialData,
      tags: initialData.tags.join(', '),
      excerpt: initialData.excerpt ?? "",
      content: initialData.content ?? "",
    } : { published: false, title: "", slug: "", excerpt: "", content: "", tags: "" }
  })

  return (
    <form action={async (formData) => {
      const data = Object.fromEntries(formData)
      const isPublished = formData.get('published') === 'on'

      await upsertBlogPost(editId, {
        title: data.title as string,
        slug: data.slug as string,
        excerpt: data.excerpt as string,
        content: data.content as string,
        // Convert comma string to Array for Prisma
        tags: (data.tags as string).split(',').map(t => t.trim()).filter(Boolean),
        published: isPublished,
        // Set publishedAt date if this is a new publication
        publishedAt: isPublished ? new Date() : null 
      })
    }} className="space-y-4">
      <Input {...form.register('title')} placeholder="Title" />
      <Input {...form.register('slug')} placeholder="Slug" />
      <Input {...form.register('tags')} placeholder="Tags (comma separated)" />
      <textarea {...form.register('excerpt')} className="w-full border p-2 rounded" placeholder="Excerpt" />
      <textarea {...form.register('content')} className="w-full border p-2 rounded h-40" placeholder="Content (Markdown)" />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...form.register('published')} name="published" /> Published
      </label>
      <Button type="submit" className="w-full">Save Post</Button>
    </form>
  )
}
