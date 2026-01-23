'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Navigation } from './navigation'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Necessary to prevent hydration mismatch with theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full',
      'border-b border-border',
      'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'transition-colors'
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors">
            Fleur&apos;s Portfolio
          </Link>
          <Navigation />
        </div>
        
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-soft"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
