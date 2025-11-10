"use client"

import type { LeaveRequest } from "@/lib/leave-data"
import { Button } from "@/components/ui/button"

interface LeaveRequestCardProps {
  request: LeaveRequest
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

export function LeaveRequestCard({ request, onApprove, onReject }: LeaveRequestCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "vacation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "sick":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "personal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "maternity":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div className="border-2 border-border rounded-lg p-4 bg-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{request.employeeName}</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(request.type)}`}
          >
            {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-medium text-foreground">
            {request.duration} day{request.duration > 1 ? "s" : ""}
          </span>
        </div>
        {request.reason && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reason</span>
            <span className="font-medium text-foreground">{request.reason}</span>
          </div>
        )}
      </div>

      {request.status === "pending" && (
        <div className="flex gap-2 pt-3 border-t border-border">
          <Button size="sm" onClick={() => onApprove?.(request.id)} className="flex-1">
            Approve
          </Button>
          <Button size="sm" variant="outline" onClick={() => onReject?.(request.id)} className="flex-1">
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}
