"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { Button } from "@/components/ui/button"
import { leaveBalances } from "@/lib/leave-data"

export default function EmployeeDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "employee") {
      router.push("/dashboard/admin")
    }
  }, [user, router])

  if (user?.role !== "employee") {
    return null
  }

  const myBalance = leaveBalances[0]

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Welcome, {user.name}</h1>
        <p className="text-muted-foreground mt-2">Your personal employee dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Remaining Leave"
          value={myBalance.remaining}
          subtext="days available"
          variant="default"
          icon="📅"
        />
        <StatCard label="Status" value="Active" subtext="Employed since Jan 2021" variant="success" icon="✓" />
        <StatCard label="Department" value={user.department || "N/A"} subtext={user.role} variant="default" icon="🏢" />
      </div>

      {/* Leave Balance */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>My Leave Balance</CardTitle>
          <CardDescription>Overview of your available leave days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Vacation Days</p>
              <p className="text-3xl font-bold text-foreground">{myBalance.vacationDays}</p>
              <p className="text-xs text-muted-foreground mt-1">Available</p>
            </div>
            <div className="border-2 border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Sick Days</p>
              <p className="text-3xl font-bold text-foreground">{myBalance.sickDays}</p>
              <p className="text-xs text-muted-foreground mt-1">Available</p>
            </div>
            <div className="border-2 border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Personal Days</p>
              <p className="text-3xl font-bold text-foreground">{myBalance.personalDays}</p>
              <p className="text-xs text-muted-foreground mt-1">Available</p>
            </div>
          </div>

          <Button size="lg" className="mt-6 w-full">
            Request Leave
          </Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
              <span className="text-2xl mb-1">📋</span>
              <span>Check Attendance</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
              <span className="text-2xl mb-1">💰</span>
              <span>View Payslip</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
              <span className="text-2xl mb-1">👤</span>
              <span>Update Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
