'use client'
import { Button } from '@/components/ui/button'
import { useGSAPAnimation } from '@/hooks/useScrollAnimation'

export default function Hero() {
  const heroRef = useGSAPAnimation('.hero-title', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
  const ctaRef = useGSAPAnimation('.hero-cta', { y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-blush-50 via-mint-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div ref={heroRef} className="max-w-4xl mx-auto space-y-8">
        <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-mint-500 via-blush-500 to-peach-400 bg-clip-text text-transparent drop-shadow-2xl">
          Hi, I&apos;m Fleur ✨
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Crafting subtly cute, professional web experiences with modern full-stack tech.
        </p>
      </div>
      <div ref={ctaRef} className="max-w-4xl mx-auto">
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="shadow-cute text-lg px-8 py-4">Explore Projects</Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">Learn About Me</Button>
        </div>
      </div>
    </section>
  )
}
