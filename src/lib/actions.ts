'use server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

import { Prisma } from '@/generated/prisma/client' // specifically for typing

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
