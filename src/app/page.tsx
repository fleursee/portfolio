import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import prisma from '@/lib/prisma'
import Hero from '@/components/hero'
import About from '@/components/about'

export default async function Home() {
  const skills = await prisma.skill.findMany({
    select: { id: true, name: true, category: true },
    orderBy: { name: 'asc' }
  })

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <About skills={skills} />
      <Footer />
    </main>
  )
}
