import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default async function Admin() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-mint-50 p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="font-display text-4xl text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
        <form action={logoutAction}>
          <Button variant="outline" type="submit">Logout</Button>
        </form>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Link href="/admin/projects" className="group">
          <Card className="h-32 group-hover:shadow-cute transition-all p-6 flex items-center justify-center cursor-pointer">
            <CardContent className="text-center">
              <h2 className="font-semibold text-xl mb-2">Manage Projects</h2>
              <p className="text-slate-500 text-sm">CRUD for portfolio projects</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/blog" className="group">
          <Card className="h-32 group-hover:shadow-cute transition-all p-6 flex items-center justify-center cursor-pointer">
            <CardContent className="text-center">
              <h2 className="font-semibold text-xl mb-2">Manage Blog</h2>
              <p className="text-slate-500 text-sm">Posts, drafts, publish</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/skills" className="group">
          <Card className="h-32 group-hover:shadow-cute transition-all p-6 flex items-center justify-center cursor-pointer">
            <CardContent className="text-center">
              <h2 className="font-semibold text-xl mb-2">Manage Skills</h2>
              <p className="text-slate-500 text-sm">Tech stack badges</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

async function logoutAction() {
  'use server'
  // Redirect to login after signOut
  redirect('/admin/login')
}
