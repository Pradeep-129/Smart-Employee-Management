"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { LeaveRequestCard } from "@/components/dashboard/leave-request-card"
import { leaveRequests, attendanceRecords, leaveBalances } from "@/lib/leave-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LeaveAttendancePage() {
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

  const pendingRequests = leaveRequests.filter((r) => r.status === "pending")
  const approvedRequests = leaveRequests.filter((r) => r.status === "approved")
  const todayAttendance = attendanceRecords.filter((r) => r.date === "2025-11-10")
  const presentCount = todayAttendance.filter((r) => r.status === "present").length
  const lateCount = todayAttendance.filter((r) => r.status === "late").length
  const absentCount = todayAttendance.filter((r) => r.status === "absent").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Leave & Attendance</h1>
        <p className="text-muted-foreground mt-2">Manage employee leave requests and attendance tracking</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Pending Requests"
          value={pendingRequests.length}
          subtext="Awaiting approval"
          variant="warning"
          icon="⏳"
        />
        <StatCard label="Approved" value={approvedRequests.length} subtext="This month" variant="success" icon="✓" />
        <StatCard label="Present Today" value={presentCount} subtext="Out of total" variant="success" icon="✓" />
        <StatCard label="Absent Today" value={absentCount} subtext="Not checked in" variant="danger" icon="✗" />
      </div>

      {/* Leave Requests */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Leave Requests ({pendingRequests.length} Pending)</CardTitle>
          <CardDescription>Review and manage employee leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaveRequests.map((request) => (
              <LeaveRequestCard key={request.id} request={request} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Today's Attendance (Nov 10, 2025)</CardTitle>
          <CardDescription>Daily attendance and check-in records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Check In</TableHead>
                  <TableHead className="font-semibold">Check Out</TableHead>
                  <TableHead className="font-semibold">Hours</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => {
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case "present":
                        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      case "late":
                        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      case "absent":
                        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      case "half-day":
                        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      default:
                        return ""
                    }
                  }

                  return (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{record.employeeName}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.hoursWorked}h</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Leave Balances */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Leave Balances</CardTitle>
          <CardDescription>Employee leave balance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaveBalances.map((balance) => (
              <div key={balance.employeeId} className="border-2 border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{balance.employeeName}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vacation Days</span>
                    <span className="font-medium">{balance.vacationDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sick Days</span>
                    <span className="font-medium">{balance.sickDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Personal Days</span>
                    <span className="font-medium">{balance.personalDays}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2 flex justify-between">
                    <span className="text-muted-foreground font-medium">Remaining</span>
                    <span className="font-bold text-primary">{balance.remaining}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
