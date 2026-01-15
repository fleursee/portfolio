'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
