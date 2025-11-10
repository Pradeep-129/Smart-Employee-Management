"use client"

import { useState } from "react"
import type { PayrollRecord } from "@/lib/payroll-data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PayrollTableProps {
  payroll: PayrollRecord[]
}

export function PayrollTable({ payroll }: PayrollTableProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "processed" | "paid">("all")

  const filtered = payroll.filter((record) => filter === "all" || record.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "processed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const statusCounts = {
    all: payroll.length,
    pending: payroll.filter((r) => r.status === "pending").length,
    processed: payroll.filter((r) => r.status === "processed").length,
    paid: payroll.filter((r) => r.status === "paid").length,
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["all", "pending", "processed", "paid"] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            size="sm"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
          </Button>
        ))}
      </div>

      <div className="border-2 border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="font-semibold">Employee</TableHead>
              <TableHead className="font-semibold">Period</TableHead>
              <TableHead className="font-semibold text-right">Base Salary</TableHead>
              <TableHead className="font-semibold text-right">Bonuses</TableHead>
              <TableHead className="font-semibold text-right">Deductions</TableHead>
              <TableHead className="font-semibold text-right">Taxes</TableHead>
              <TableHead className="font-semibold text-right">Net Payment</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((record) => (
              <TableRow key={record.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{record.employeeName}</TableCell>
                <TableCell>{record.period}</TableCell>
                <TableCell className="text-right">${(record.baseSalary / 1000).toFixed(0)}K</TableCell>
                <TableCell className="text-right text-green-600 dark:text-green-400">
                  +${(record.bonuses / 1000).toFixed(1)}K
                </TableCell>
                <TableCell className="text-right text-red-600 dark:text-red-400">
                  -${(record.deductions / 1000).toFixed(1)}K
                </TableCell>
                <TableCell className="text-right text-red-600 dark:text-red-400">
                  -${(record.taxes / 1000).toFixed(1)}K
                </TableCell>
                <TableCell className="text-right font-semibold">${(record.netPayment / 1000).toFixed(0)}K</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Payroll</p>
          <p className="text-2xl font-bold text-foreground">
            ${(filtered.reduce((sum, r) => sum + r.baseSalary, 0) / 1000000).toFixed(2)}M
          </p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Bonuses</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${(filtered.reduce((sum, r) => sum + r.bonuses, 0) / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Deductions</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            ${(filtered.reduce((sum, r) => sum + r.deductions, 0) / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Net Payment</p>
          <p className="text-2xl font-bold text-foreground">
            ${(filtered.reduce((sum, r) => sum + r.netPayment, 0) / 1000000).toFixed(2)}M
          </p>
        </div>
      </div>
    </div>
  )
}
