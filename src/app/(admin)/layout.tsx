'use client'

import Link from 'next/link'
import { LayoutDashboard, FolderKanban, BookOpen, Cpu, LogOut, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 px-2">
          <LayoutDashboard className="w-6 h-6 text-mint-500" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            <a href="/admin">Admin</a>
          </h2>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link 
            href="/admin/projects" 
            className="flex items-center gap-3 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <FolderKanban className="w-5 h-5" /> Projects
          </Link>
          <Link 
            href="/admin/blog" 
            className="flex items-center gap-3 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <BookOpen className="w-5 h-5" /> Blog
          </Link>
          <Link 
            href="/admin/skills" 
            className="flex items-center gap-3 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <Cpu className="w-5 h-5" /> Skills
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          {/* Theme Toggle - positioned above Exit Admin */}
          {mounted && (
            <Button
              variant="ghost"
              className="justify-start gap-3 p-2 w-full font-normal text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>
          )}

          <Link 
            href="/" 
            className="flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" /> Exit Admin
          </Link>
        </div>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950">{children}</main>
    </div>
  )
}