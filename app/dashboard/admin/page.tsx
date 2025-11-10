"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { ChartContainer } from "@/components/dashboard/chart-container"
import { dashboardStats, departmentData, attendanceData, payrollSummary } from "@/lib/dashboard-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard/manager")
    }
  }, [user, router])

  if (user?.role !== "admin") {
    return null
  }

  const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe", "#eff6ff", "#e0e7ff"]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground mt-2">Here's your workforce overview for today</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Total Employees"
          value={dashboardStats.totalEmployees}
          subtext="+3 this month"
          variant="default"
          icon="👥"
        />
        <StatCard
          label="Active Today"
          value={dashboardStats.activeEmployees}
          subtext="92% attendance"
          variant="success"
          icon="✓"
        />
        <StatCard label="On Leave" value={dashboardStats.onLeave} subtext="4 approved" variant="warning" icon="🏖️" />
        <StatCard
          label="Total Departments"
          value={dashboardStats.totalDepartments}
          subtext="Fully staffed"
          variant="default"
          icon="🏢"
        />
        <StatCard
          label="Average Salary"
          value={`$${(dashboardStats.averageSalary / 1000).toFixed(0)}K`}
          subtext="Per year"
          variant="default"
          icon="💰"
        />
        <StatCard
          label="Monthly Payroll"
          value={`$${(payrollSummary.totalPayroll / 1000000).toFixed(1)}M`}
          subtext="All processed"
          variant="success"
          icon="💵"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Attendance This Week" description="Daily attendance count">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: "var(--color-primary)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Employees by Department" description="Current workforce distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Department Details */}
      <ChartContainer title="Department Breakdown" description="Employee count by department">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
