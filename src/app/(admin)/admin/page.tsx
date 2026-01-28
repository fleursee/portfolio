import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

// Assuming logoutAction is imported or defined elsewhere as in your original file
// import { logoutAction } from '@/lib/actions/auth' 

export default async function Admin() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 transition-colors duration-300">
      <header className="mb-12 flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <h1 className="font-display text-4xl mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session.user.name || 'Admin'}</p>
        </div>
        <form action="/api/auth/signout" method="POST"> 
          <Button 
            variant="outline" 
            type="submit" 
            className="border-primary text-primary hover:bg-primary/10"
          >
            Logout
          </Button>
        </form>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Manage Projects */}
        <Link href="/admin/projects" className="group">
          <Card className="h-40 bg-card border-border group-hover:border-primary group-hover:shadow-cute transition-all duration-300 flex items-center justify-center cursor-pointer">
            <CardContent className="text-center p-6">
              <h2 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                Manage Projects
              </h2>
              <p className="text-muted-foreground text-sm">
                Create, edit, and remove portfolio items
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Manage Blog */}
        <Link href="/admin/blog" className="group">
          <Card className="h-40 bg-card border-border group-hover:border-accent group-hover:shadow-cute transition-all duration-300 flex items-center justify-center cursor-pointer">
            <CardContent className="text-center p-6">
              <h2 className="font-semibold text-xl mb-2 group-hover:text-accent transition-colors">
                Manage Blog
              </h2>
              <p className="text-muted-foreground text-sm">
                Write drafts and publish MDX posts
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Manage Skills */}
        <Link href="/admin/skills" className="group">
          <Card className="h-40 bg-card border-border group-hover:border-secondary group-hover:shadow-cute transition-all duration-300 flex items-center justify-center cursor-pointer">
            <CardContent className="text-center p-6">
              <h2 className="font-semibold text-xl mb-2 group-hover:text-secondary-foreground transition-colors">
                Manage Skills
              </h2>
              <p className="text-muted-foreground text-sm">
                Update your tech stack and badges
              </p>
            </CardContent>
          </Card>
        </Link>
      </main>
    </div>
  )
}