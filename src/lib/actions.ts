'use server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
import { Prisma } from '@/generated/prisma/client' // specifically for typing

/* These two emails are needed for Resend. From shows where the service will be originated from, and to is where the email will show up.*/
const from_email = process.env.RESEND_FROM_EMAIL!; 
const to_email = process.env.RESEND_TO_EMAIL!;
/* In this project, from could be a portfoliu@xxx.yyy, and to can be you@domain.com
This is an API key because pure email should never be exposed.
*/

export async function deleteItem(model: 'project' | 'blogPost' | 'skill', id: string) {

    const where = { id };

    switch (model) {
      case 'project':
        await prisma.project.delete({ where });
        break;
      case 'blogPost':
        await prisma.blogPost.delete({ where });
        break;
      case 'skill':
        await prisma.skill.delete({ where });
        break;
    }

  revalidatePath('/admin')
}

export async function upsertProject(id: string | undefined, data: Prisma.ProjectUncheckedCreateInput) {
    if (id) {
      await prisma.project.update({ where: { id }, data })
    } else {
      await prisma.project.create({ data })
    }
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
  }
  
  export async function upsertBlogPost(id: string | undefined, data: Prisma.BlogPostUncheckedCreateInput) {
    if (id) {
      await prisma.blogPost.update({ where: { id }, data })
    } else {
      await prisma.blogPost.create({ data })
    }
    revalidatePath('/admin/blog')
    redirect('/admin/blog')
  }
  
  export async function upsertSkill(id: string | undefined, data: Prisma.SkillUncheckedCreateInput) {
    if (id) {
      await prisma.skill.update({ where: { id }, data })
    } else {
      await prisma.skill.create({ data })
    }
    revalidatePath('/admin/skills')
    redirect('/admin/skills')
  }

  export async function sendContactEmail(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
  
    try {
      await resend.emails.send({
        from: from_email,
        to: to_email,
        subject: `✨ New message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="color: #10b981;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
          </div>
        `,
      })
      return { success: true }
    } catch (error) {
      console.error('Contact Action Error:', error)
      return { error: 'Failed to send message.' }
    }
  }