import Link from 'next/link'
import { LayoutDashboard, FolderKanban, BookOpen, Cpu, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="w-64 border-r bg-white dark:bg-slate-900 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 px-2">
          <LayoutDashboard className="w-6 h-6 text-mint-500" />
          <h2 className="text-xl font-bold"><a href="/admin">Admin</a></h2>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin/projects" className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
            <FolderKanban className="w-5 h-5" /> Projects
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
            <BookOpen className="w-5 h-5" /> Blog
          </Link>
          <Link href="/admin/skills" className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
            <Cpu className="w-5 h-5" /> Skills
          </Link>
        </nav>

        <div className="mt-auto">
          <Link href="/" className="flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors">
            <LogOut className="w-5 h-5" /> Exit Admin
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
