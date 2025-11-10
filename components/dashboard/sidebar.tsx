"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SidebarItem {
  label: string
  href: string
  icon: string
}

interface SidebarProps {
  items: SidebarItem[]
}

export function Sidebar({ items }: SidebarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <aside className="w-64 bg-sidebar border-r-2 border-sidebar-border min-h-screen flex flex-col">
      <div className="p-6 border-b-2 border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sm font-bold text-sidebar-primary-foreground">WM</span>
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground">Workforce</h1>
            <p className="text-xs text-sidebar-accent-foreground">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <span>
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t-2 border-sidebar-border space-y-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent bg-opacity-20">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-accent-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent" size="sm">
          Logout
        </Button>
      </div>
    </aside>
  )
}
