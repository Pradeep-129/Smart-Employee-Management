import type { Report } from "@/lib/report-data"
import { Button } from "@/components/ui/button"

interface ReportCardProps {
  report: Report
}

export function ReportCard({ report }: ReportCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payroll":
        return "💰"
      case "attendance":
        return "✓"
      case "performance":
        return "⭐"
      case "leave":
        return "📅"
      default:
        return "📊"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div className="border-2 border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getTypeIcon(report.type)}</span>
          <div>
            <h4 className="font-semibold text-foreground">{report.name}</h4>
            <p className="text-sm text-muted-foreground">{report.period}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
        >
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Generated</span>
          <span className="font-medium">{new Date(report.generatedDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">By</span>
          <span className="font-medium">{report.generatedBy}</span>
        </div>
        {report.fileSize && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Size</span>
            <span className="font-medium">{report.fileSize}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t border-border">
        <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled={report.status !== "completed"}>
          Download
        </Button>
        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
          Share
        </Button>
      </div>
    </div>
  )
}
