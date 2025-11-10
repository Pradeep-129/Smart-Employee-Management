import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard/manager", icon: "📊" },
    { label: "My Team", href: "/dashboard/manager/team", icon: "👥" },
    { label: "Performance", href: "/dashboard/manager/performance", icon: "📈" },
    { label: "Requests", href: "/dashboard/manager/requests", icon: "📋" },
    { label: "Reports", href: "/dashboard/manager/reports", icon: "📄" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
