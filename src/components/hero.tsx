'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Scoped animations ensure elements are found correctly every time
    gsap.from('.hero-title', { 
      y: 30, 
      opacity: 0, 
      duration: 1, 
      ease: 'power3.out' 
    })
    
    gsap.from('.hero-cta', { 
      y: 20, 
      opacity: 0, 
      duration: 0.8, 
      delay: 0.3, 
      ease: 'power3.out' 
    })
  }, { scope: container }) // Scope prevents targeting elements outside this component

  return (
    <section ref={container} className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-blush-50 via-mint-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-mint-500 via-blush-500 to-peach-400 bg-clip-text text-transparent drop-shadow-2xl">
          Hi, I&apos;m Fleur ✨
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Crafting subtly cute, professional web experiences with modern full-stack tech.
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-8">
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="shadow-cute text-lg px-8 py-4">Explore Projects</Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">Learn About Me</Button>
        </div>
      </div>
    </section>
  )
}
