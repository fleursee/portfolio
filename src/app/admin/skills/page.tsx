import prisma from '@/lib/prisma'
import { deleteItem, upsertSkill } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default async function SkillsAdmin() {
  const skills = await prisma.skill.findMany()

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Skills</h1>
      
      <form action={async (fd) => {
        'use server'
        const name = fd.get('name') as string
        const category = fd.get('category') as string
        
        await upsertSkill(undefined, { name, category })
      }} className="flex gap-2">
        <Input name="name" placeholder="Skill Name" required />
        <Input name="category" placeholder="Category" required />
        <Button type="submit">Add</Button>
      </form>

      <div className="space-y-2">
        {skills.map(skill => (
          <div key={skill.id} className="flex justify-between items-center border p-2 rounded">
            <span>{skill.name} <Badge variant="outline">{skill.category}</Badge></span>
            <form action={deleteItem.bind(null, 'skill', skill.id)}>
              <Button size="sm" variant="destructive">Delete</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}