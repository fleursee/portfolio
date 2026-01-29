'use client'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // 1. Solve hydration: Only apply complex gradients after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  useGSAP(() => {
    if (!mounted) return
    gsap.from('.hero-title', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
    gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })
  }, { scope: container, dependencies: [mounted] })

  return (
    <section 
      ref={container} 
      suppressHydrationWarning
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden transition-colors duration-500",
        mounted ? 
          "bg-[radial-gradient(circle_at_top_left,_var(--color-mint-50)_0%,_transparent_40%),radial-gradient(circle_at_bottom_right,_var(--color-blush-50)_0%,_transparent_40%)] bg-white dark:bg-slate-950 dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.08)_0%,_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.08)_0%,_transparent_50%)]" 
          : "bg-white dark:bg-slate-950"
      )}
    >
      {/* 2. Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-mint-400/10 dark:bg-mint-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blush-400/10 dark:bg-blush-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-mint-500 via-blush-500 to-peach-400 bg-clip-text text-transparent drop-shadow-2xl">
          Hi, I&apos;m Fleur ✨
        </h1>
        {/* Adding a professional title sub-header */}
        <span className="block text-sm font-mono text-primary mb-4 tracking-widest uppercase">
          Computer Engineer | Full-Stack Developer
        </span>
        <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Closing the gap between high-quality computer engineering and beautiful digital experiences. I design high-performance backends and wrap them with subtly cute and beautiful user interfaces.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12 relative z-10">
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* 3. Using the Buttons */}
          <Button asChild size="lg" className="shadow-cute text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform">
            <Link href="/projects">Explore Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
            <Link href="/contact">Get in Touch 👋</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
