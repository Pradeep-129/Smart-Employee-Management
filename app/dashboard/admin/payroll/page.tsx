"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PayrollTable } from "@/components/dashboard/payroll-table"
import { payrollRecords, benefitsRecords } from "@/lib/payroll-data"
import { StatCard } from "@/components/dashboard/stat-card"

export default function PayrollPage() {
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

  const totalPayroll = payrollRecords.reduce((sum, r) => sum + r.netPayment, 0)
  const pendingCount = payrollRecords.filter((r) => r.status === "pending").length
  const processedCount = payrollRecords.filter((r) => r.status === "processed").length
  const paidCount = payrollRecords.filter((r) => r.status === "paid").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground mt-2">Process and manage employee compensation</p>
        </div>
        <Button size="lg" className="gap-2">
          + Process Payroll
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Payroll (Nov)"
          value={`$${(totalPayroll / 1000000).toFixed(2)}M`}
          subtext={`${payrollRecords.length} employees`}
          variant="default"
          icon="💰"
        />
        <StatCard label="Pending" value={pendingCount} subtext="Awaiting processing" variant="warning" icon="⏳" />
        <StatCard label="Processed" value={processedCount} subtext="Ready to pay" variant="default" icon="✓" />
        <StatCard label="Paid" value={paidCount} subtext="Already distributed" variant="success" icon="✓" />
      </div>

      {/* Payroll Records */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Payroll Records</CardTitle>
          <CardDescription>Manage employee payments and compensation</CardDescription>
        </CardHeader>
        <CardContent>
          <PayrollTable payroll={payrollRecords} />
        </CardContent>
      </Card>

      {/* Benefits Overview */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Employee Benefits</CardTitle>
          <CardDescription>Annual benefits and compensation breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden border-2 border-border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Employee</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Health Insurance</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">401(k)</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Stock Options</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Total Benefits</th>
                </tr>
              </thead>
              <tbody>
                {benefitsRecords.map((benefit) => (
                  <tr key={benefit.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{benefit.employeeName}</td>
                    <td className="px-4 py-3 text-right text-sm">${benefit.healthInsurance.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm">${benefit.retirement401k.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm">${benefit.stockOptions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                      ${benefit.totalBenefits.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
