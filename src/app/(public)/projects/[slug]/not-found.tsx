import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProjectNotFound() {
  return (
    <div className="py-24 px-4 max-w-2xl mx-auto text-center">
      <h1 className="font-display text-4xl md:text-5xl mb-4 bg-gradient-to-r from-mint-500 to-blush-500 bg-clip-text text-transparent">
        Project Not Found
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
        The project you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/projects"
        className="inline-flex items-center text-mint-500 dark:text-mint-400 hover:text-mint-600 dark:hover:text-mint-300 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>
    </div>
  )
}
