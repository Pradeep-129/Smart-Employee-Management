// Manager-specific team data

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  status: "active" | "on-leave" | "absent"
  performance: number // 1-5 scale
  hoursWorked: number
  projects: string[]
  avatar?: string
}

export interface TeamMetrics {
  teamSize: number
  activeMembers: number
  onLeave: number
  averagePerformance: number
  totalHoursThisWeek: number
}

export const managerTeam: TeamMember[] = [
  {
    id: "EMP001",
    name: "Alex Rodriguez",
    role: "Senior Developer",
    email: "alex.rodriguez@workforce.app",
    status: "active",
    performance: 4.8,
    hoursWorked: 40,
    projects: ["Project Alpha", "Project Beta"],
    avatar: "/placeholder.svg?key=alex01",
  },
  {
    id: "EMP004",
    name: "Emma Davis",
    role: "UX Designer",
    email: "emma.davis@workforce.app",
    status: "active",
    performance: 4.5,
    hoursWorked: 38,
    projects: ["Project Alpha"],
    avatar: "/placeholder.svg?key=emma04",
  },
  {
    id: "EMP009",
    name: "Tom Anderson",
    role: "Developer",
    email: "tom.anderson@workforce.app",
    status: "active",
    performance: 4.2,
    hoursWorked: 39,
    projects: ["Project Gamma"],
    avatar: "/placeholder.svg?key=tom09",
  },
  {
    id: "EMP010",
    name: "Nina Patel",
    role: "QA Engineer",
    email: "nina.patel@workforce.app",
    status: "on-leave",
    performance: 4.3,
    hoursWorked: 0,
    projects: ["Project Beta"],
    avatar: "/placeholder.svg?key=nina10",
  },
  {
    id: "EMP011",
    name: "Marcus Johnson",
    role: "Junior Developer",
    email: "marcus.johnson@workforce.app",
    status: "active",
    performance: 3.8,
    hoursWorked: 35,
    projects: ["Project Delta"],
    avatar: "/placeholder.svg?key=marc11",
  },
]

export const getTeamMetrics = (): TeamMetrics => {
  const activeCount = managerTeam.filter((m) => m.status === "active").length
  const onLeaveCount = managerTeam.filter((m) => m.status === "on-leave").length
  const totalHours = managerTeam.reduce((sum, m) => sum + m.hoursWorked, 0)
  const avgPerformance = managerTeam.reduce((sum, m) => sum + m.performance, 0) / managerTeam.length

  return {
    teamSize: managerTeam.length,
    activeMembers: activeCount,
    onLeave: onLeaveCount,
    averagePerformance: Math.round(avgPerformance * 10) / 10,
    totalHoursThisWeek: totalHours,
  }
}
