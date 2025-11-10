// Dashboard analytics and statistics data

export interface DashboardStats {
  totalEmployees: number
  activeEmployees: number
  onLeave: number
  absent: number
  totalDepartments: number
  averageSalary: number
}

export interface ChartData {
  name: string
  value: number
  percentage?: number
}

export interface EmployeeStats {
  id: string
  name: string
  role: string
  department: string
  status: "active" | "on-leave" | "absent"
  joinDate: string
}

export const dashboardStats: DashboardStats = {
  totalEmployees: 287,
  activeEmployees: 265,
  onLeave: 12,
  absent: 10,
  totalDepartments: 8,
  averageSalary: 85000,
}

export const departmentData: ChartData[] = [
  { name: "Engineering", value: 72, percentage: 25 },
  { name: "Sales", value: 54, percentage: 19 },
  { name: "Marketing", value: 38, percentage: 13 },
  { name: "HR", value: 24, percentage: 8 },
  { name: "Finance", value: 32, percentage: 11 },
  { name: "Operations", value: 46, percentage: 16 },
  { name: "Support", value: 21, percentage: 7 },
]

export const attendanceData: ChartData[] = [
  { name: "Monday", value: 265 },
  { name: "Tuesday", value: 268 },
  { name: "Wednesday", value: 263 },
  { name: "Thursday", value: 270 },
  { name: "Friday", value: 258 },
]

export const payrollSummary = {
  month: "November 2025",
  totalPayroll: 24385000,
  processed: 287,
  pending: 0,
  disputed: 3,
}

export const recentEmployees: EmployeeStats[] = [
  {
    id: "1",
    name: "Alex Rodriguez",
    role: "Senior Developer",
    department: "Engineering",
    status: "active",
    joinDate: "2025-01-15",
  },
  {
    id: "2",
    name: "Jessica Chen",
    role: "Product Manager",
    department: "Product",
    status: "active",
    joinDate: "2024-11-20",
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Sales Executive",
    department: "Sales",
    status: "on-leave",
    joinDate: "2024-09-10",
  },
]
