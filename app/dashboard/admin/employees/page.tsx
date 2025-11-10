"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { EmployeeTable } from "@/components/dashboard/employee-table"
import { EmployeeModal } from "@/components/dashboard/employee-modal"
import { employees } from "@/lib/employee-data"
import type { Employee } from "@/lib/employee-data"

export default function EmployeesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    // Ensure only admins can access this page
    if (user && user.role !== "admin") {
      router.push("/dashboard/manager")
    }
  }, [user, router])

  if (user?.role !== "admin") {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground mt-2">Manage and view all employees</p>
        </div>
        <Button size="lg" className="gap-2">
          + Add Employee
        </Button>
      </div>

      <EmployeeTable employees={employees} onEdit={setSelectedEmployee} />

      <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
    </div>
  )
}
