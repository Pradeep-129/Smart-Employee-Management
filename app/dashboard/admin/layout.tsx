import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: "📊" },
    { label: "Employees", href: "/dashboard/admin/employees", icon: "👥" },
    { label: "Departments", href: "/dashboard/admin/departments", icon: "🏢" },
    { label: "Payroll", href: "/dashboard/admin/payroll", icon: "💰" },
    { label: "Reports", href: "/dashboard/admin/reports", icon: "📈" },
    { label: "Settings", href: "/dashboard/admin/settings", icon: "⚙️" },
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
