'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useGSAPAnimation } from '@/hooks/useScrollAnimation'

interface Skill {
  id: string
  name: string
  category: string
}

function SkillsGrid({ skills }: { skills: Skill[] }) {
  const [filter, setFilter] = useState<string>('all')
  const categories = ['all', ...Array.from(new Set(skills.map(s => s.category)))]
  const filtered = filter === 'all' ? skills : skills.filter(s => s.category === filter)

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={filter === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(cat)}
            className="rounded-full"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {filtered.map((skill) => (
          <Card key={skill.id} className="group hover:shadow-cute hover:-translate-y-2 transition-all duration-300 overflow-hidden border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <Badge variant="secondary" className="text-xs">{skill.category}</Badge>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-mint-500 transition-colors">{skill.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default function About({ skills }: { skills: Skill[] }) {
  const timelineRef = useGSAPAnimation('.timeline-item', { 
    y: 50, 
    opacity: 0, 
    duration: 0.8, 
    stagger: 0.2,
    ease: 'power3.out'
  })

  return (
    <section id="about" className="py-32 px-4 md:px-8 container mx-auto">
      <div className="text-center mb-24 max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6">
          About Me
        </h2>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Software developer passionate about creating delightful UIs with cutting-edge stacks. 
          Blending uni projects, indie hacks, and professional polish into portfolios that wow.
        </p>
      </div>

      {/* Skills Showcase */}
      <div className="mb-24">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100">
          Tech Stack
        </h3>
        <SkillsGrid skills={skills} />
      </div>

      {/* Experience Timeline */}
      <div ref={timelineRef} className="max-w-4xl mx-auto space-y-8">
        <div className="timeline-item bg-gradient-to-r from-mint-50 to-blush-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-extra shadow-cute">
          <h4 className="font-semibold text-xl mb-2">University Projects</h4>
          <p>Full-stack apps, algorithms, team collabs.</p>
        </div>
        <div className="timeline-item bg-gradient-to-r from-blush-50 to-mint-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-extra shadow-cute">
          <h4 className="font-semibold text-xl mb-2">Indie Side Projects</h4>
          <p>Personal experiments with Next.js, GSAP, etc.</p>
        </div>
      </div>
    </section>
  )
}
