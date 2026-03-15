import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { MainContent } from './main-content'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main wrapper */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Main content */}
        <MainContent>
          {children}
        </MainContent>
      </div>
    </div>
  )
}

export default Layout
