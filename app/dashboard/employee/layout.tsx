"use client"

import type React from "react"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "react/navigation"
import { useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "employee") {
      router.push("/dashboard/admin")
    }
  }, [user, router])

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard/employee", icon: "📊" },
    { label: "My Leave", href: "/dashboard/employee/leave", icon: "📅" },
    { label: "Attendance", href: "/dashboard/employee/attendance", icon: "✓" },
    { label: "Payslips", href: "/dashboard/employee/payslips", icon: "💰" },
    { label: "Profile", href: "/dashboard/employee/profile", icon: "👤" },
  ]

  if (user?.role !== "employee") {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
