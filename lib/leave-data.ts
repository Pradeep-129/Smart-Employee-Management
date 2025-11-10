// Leave and attendance management data

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  type: "vacation" | "sick" | "personal" | "maternity"
  startDate: string
  endDate: string
  duration: number
  reason?: string
  status: "pending" | "approved" | "rejected"
  approvedBy?: string
  createdAt: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  checkIn: string
  checkOut: string
  hoursWorked: number
  status: "present" | "absent" | "late" | "half-day"
}

export interface LeaveBalance {
  employeeId: string
  employeeName: string
  vacationDays: number
  sickDays: number
  personalDays: number
  used: number
  remaining: number
}

export const leaveRequests: LeaveRequest[] = [
  {
    id: "LEAVE001",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    type: "vacation",
    startDate: "2025-11-24",
    endDate: "2025-11-28",
    duration: 5,
    reason: "Family vacation",
    status: "approved",
    approvedBy: "Sarah Johnson",
    createdAt: "2025-11-01",
  },
  {
    id: "LEAVE002",
    employeeId: "EMP010",
    employeeName: "Nina Patel",
    type: "vacation",
    startDate: "2025-12-01",
    endDate: "2025-12-05",
    duration: 5,
    reason: "Holiday trip",
    status: "pending",
    createdAt: "2025-10-15",
  },
  {
    id: "LEAVE003",
    employeeId: "EMP005",
    employeeName: "James Wilson",
    type: "sick",
    startDate: "2025-11-10",
    endDate: "2025-11-10",
    duration: 1,
    status: "approved",
    approvedBy: "David Park",
    createdAt: "2025-11-10",
  },
  {
    id: "LEAVE004",
    employeeId: "EMP002",
    employeeName: "Jessica Chen",
    type: "personal",
    startDate: "2025-11-15",
    endDate: "2025-11-15",
    duration: 1,
    reason: "Personal appointment",
    status: "pending",
    createdAt: "2025-11-14",
  },
  {
    id: "LEAVE005",
    employeeId: "EMP007",
    employeeName: "David Park",
    type: "vacation",
    startDate: "2025-12-20",
    endDate: "2025-12-31",
    duration: 10,
    reason: "Year end holiday",
    status: "approved",
    approvedBy: "Sarah Johnson",
    createdAt: "2025-10-01",
  },
]

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT001",
    employeeId: "EMP001",
    employeeName: "Alex Rodriguez",
    date: "2025-11-10",
    checkIn: "09:02",
    checkOut: "17:45",
    hoursWorked: 8.7,
    status: "present",
  },
  {
    id: "ATT002",
    employeeId: "EMP002",
    employeeName: "Jessica Chen",
    date: "2025-11-10",
    checkIn: "08:58",
    checkOut: "17:30",
    hoursWorked: 8.5,
    status: "present",
  },
  {
    id: "ATT003",
    employeeId: "EMP004",
    employeeName: "Emma Davis",
    date: "2025-11-10",
    checkIn: "09:15",
    checkOut: "17:00",
    hoursWorked: 7.75,
    status: "late",
  },
  {
    id: "ATT004",
    employeeId: "EMP005",
    employeeName: "James Wilson",
    date: "2025-11-10",
    checkIn: "-",
    checkOut: "-",
    hoursWorked: 0,
    status: "absent",
  },
  {
    id: "ATT005",
    employeeId: "EMP006",
    employeeName: "Sarah Thompson",
    date: "2025-11-10",
    checkIn: "09:00",
    checkOut: "13:00",
    hoursWorked: 4,
    status: "half-day",
  },
]

export const leaveBalances: LeaveBalance[] = [
  {
    employeeId: "EMP001",
    employeeName: "Alex Rodriguez",
    vacationDays: 20,
    sickDays: 5,
    personalDays: 2,
    used: 5,
    remaining: 22,
  },
  {
    employeeId: "EMP002",
    employeeName: "Jessica Chen",
    vacationDays: 20,
    sickDays: 5,
    personalDays: 2,
    used: 0,
    remaining: 27,
  },
  {
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    vacationDays: 20,
    sickDays: 5,
    personalDays: 2,
    used: 5,
    remaining: 22,
  },
  {
    employeeId: "EMP004",
    employeeName: "Emma Davis",
    vacationDays: 20,
    sickDays: 5,
    personalDays: 2,
    used: 3,
    remaining: 24,
  },
]
