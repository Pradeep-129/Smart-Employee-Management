"use client"

import type { Employee } from "@/lib/employee-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EmployeeModalProps {
  employee: Employee | null
  onClose: () => void
}

export function EmployeeModal({ employee, onClose }: EmployeeModalProps) {
  if (!employee) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{employee.name}</CardTitle>
              <CardDescription>{employee.role}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-2xl h-8 w-8 p-0">
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground mt-1">{employee.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-foreground mt-1">{employee.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <p className="text-foreground mt-1">{employee.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Join Date</label>
              <p className="text-foreground mt-1">{new Date(employee.joinDate).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Annual Salary</label>
              <p className="text-foreground mt-1">${employee.salary.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-foreground mt-1 capitalize">{employee.status}</p>
            </div>
            {employee.manager && (
              <div className="col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Manager</label>
                <p className="text-foreground mt-1">{employee.manager}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button className="flex-1">Edit</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Send Message
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
