export default function Loading() {
    return (
      <div className="py-24 px-4 container mx-auto space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mx-auto"></div>
          <div className="h-4 w-96 bg-slate-200 dark:bg-slate-700 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-80 bg-slate-200 dark:bg-slate-700 rounded-soft animate-pulse shadow-cute"></div>
          ))}
        </div>
      </div>
    )
  }
  