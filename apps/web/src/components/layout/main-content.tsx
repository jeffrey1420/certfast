import { cn } from '@/lib/utils'

interface MainContentProps {
  children: React.ReactNode
  className?: string
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main className={cn('flex-1 p-4 lg:p-6 overflow-auto', className)}>
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </main>
  )
}

export default MainContent
