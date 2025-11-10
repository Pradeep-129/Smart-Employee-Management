"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamCard } from "@/components/dashboard/team-card"
import { managerTeam } from "@/lib/manager-data"

export default function TeamPage() {
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

  const activeMembers = managerTeam.filter((m) => m.status === "active")
  const onLeaveMembers = managerTeam.filter((m) => m.status === "on-leave")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">My Team</h1>
        <p className="text-muted-foreground mt-2">Overview of your team members and their status</p>
      </div>

      {/* Active Members */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Active Team Members ({activeMembers.length})</CardTitle>
          <CardDescription>Currently working on projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* On Leave */}
      {onLeaveMembers.length > 0 && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle>On Leave ({onLeaveMembers.length})</CardTitle>
            <CardDescription>Team members currently away</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onLeaveMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
