"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReportCard } from "@/components/dashboard/report-card"
import { generatedReports } from "@/lib/report-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ManagerReportsPage() {
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

  const managerReports = generatedReports.filter((r) => ["attendance", "performance", "leave"].includes(r.type))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Team Reports</h1>
        <p className="text-muted-foreground mt-2">View and export team performance and attendance reports</p>
      </div>

      {/* Quick Report Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent">
          <span className="text-2xl">✓</span>
          <span className="text-sm">Attendance Report</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent">
          <span className="text-2xl">⭐</span>
          <span className="text-sm">Performance Report</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent">
          <span className="text-2xl">📅</span>
          <span className="text-sm">Leave Report</span>
        </Button>
      </div>

      {/* Available Reports */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Available Reports ({managerReports.length})</CardTitle>
          <CardDescription>Reports available for your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {managerReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Summary */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Team Performance Summary</CardTitle>
          <CardDescription>Monthly performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="font-semibold">Metric</TableHead>
                  <TableHead className="font-semibold text-right">Current</TableHead>
                  <TableHead className="font-semibold text-right">Previous</TableHead>
                  <TableHead className="font-semibold text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-muted/50">
                  <TableCell className="font-medium">Average Performance</TableCell>
                  <TableCell className="text-right">4.3/5</TableCell>
                  <TableCell className="text-right">4.1/5</TableCell>
                  <TableCell className="text-right text-green-600 dark:text-green-400">+0.2</TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/50">
                  <TableCell className="font-medium">Attendance Rate</TableCell>
                  <TableCell className="text-right">92%</TableCell>
                  <TableCell className="text-right">90%</TableCell>
                  <TableCell className="text-right text-green-600 dark:text-green-400">+2%</TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/50">
                  <TableCell className="font-medium">Leave Days Used</TableCell>
                  <TableCell className="text-right">8.5 days</TableCell>
                  <TableCell className="text-right">7.2 days</TableCell>
                  <TableCell className="text-right text-red-600 dark:text-red-400">+1.3</TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/50">
                  <TableCell className="font-medium">Projects Completed</TableCell>
                  <TableCell className="text-right">12</TableCell>
                  <TableCell className="text-right">10</TableCell>
                  <TableCell className="text-right text-green-600 dark:text-green-400">+2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
