"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { ChartContainer } from "@/components/dashboard/chart-container"
import { managerTeam, getTeamMetrics } from "@/lib/manager-data"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ManagerDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "manager") {
      router.push("/dashboard/employee")
    }
  }, [user, router])

  if (user?.role !== "manager") {
    return null
  }

  const metrics = getTeamMetrics()

  const weeklyHours = [
    { day: "Monday", hours: 168 },
    { day: "Tuesday", hours: 172 },
    { day: "Wednesday", hours: 165 },
    { day: "Thursday", hours: 170 },
    { day: "Friday", hours: 155 },
  ]

  const teamPerformance = managerTeam.map((member) => ({
    name: member.name.split(" ")[0],
    performance: member.performance,
    hours: member.hoursWorked,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your team performance and projects</p>
      </div>

      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard label="Team Size" value={metrics.teamSize} subtext="Direct reports" variant="default" icon="👥" />
        <StatCard label="Active" value={metrics.activeMembers} subtext="Working today" variant="success" icon="✓" />
        <StatCard label="On Leave" value={metrics.onLeave} subtext="Currently absent" variant="warning" icon="🏖️" />
        <StatCard
          label="Avg Performance"
          value={`${metrics.averagePerformance}/5`}
          subtext="Team rating"
          variant="default"
          icon="⭐"
        />
        <StatCard
          label="Hours This Week"
          value={metrics.totalHoursThisWeek}
          subtext="Total team hours"
          variant="default"
          icon="⏱️"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Team Hours This Week" description="Daily team hours breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
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
                dataKey="hours"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: "var(--color-primary)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Team Performance" description="Individual member ratings">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" domain={[0, 5]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Bar dataKey="performance" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Team Summary */}
      <ChartContainer title="Quick Stats" description="Key metrics at a glance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-l-4 border-primary pl-4">
            <p className="text-sm text-muted-foreground">Completed Tasks</p>
            <p className="text-3xl font-bold text-foreground">24</p>
          </div>
          <div className="border-l-4 border-accent pl-4">
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
            <p className="text-3xl font-bold text-foreground">5</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-muted-foreground">Avg Rating</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{metrics.averagePerformance}</p>
          </div>
        </div>
      </ChartContainer>
    </div>
  )
}
