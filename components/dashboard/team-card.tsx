import type { TeamMember } from "@/lib/manager-data"
import { Button } from "@/components/ui/button"

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "on-leave":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 4.5) return "text-green-600 dark:text-green-400"
    if (performance >= 4.0) return "text-blue-600 dark:text-blue-400"
    if (performance >= 3.5) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="border-2 border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}
        >
          {member.status === "active" ? "Active" : member.status === "on-leave" ? "On Leave" : "Absent"}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Performance</span>
          <span className={`font-semibold ${getPerformanceColor(member.performance)}`}>{member.performance}/5</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Hours This Week</span>
          <span className="font-semibold text-foreground">{member.hoursWorked}h</span>
        </div>
      </div>

      {member.projects.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Projects</p>
          <div className="flex flex-wrap gap-1">
            {member.projects.map((project) => (
              <span key={project} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {project}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button variant="outline" size="sm" className="w-full bg-transparent">
        View Profile
      </Button>
    </div>
  )
}
