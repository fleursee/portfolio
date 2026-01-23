'use client'

import { cn } from '@/lib/utils'

export function Footer() {
  return (
    <footer className={cn(
      'border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'w-full'
    )}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm text-muted-foreground font-display">
              © {new Date().getFullYear()} Fleur. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, Tailwind CSS, and lots of ☕ and ❤️
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fleursee/portfolio"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
