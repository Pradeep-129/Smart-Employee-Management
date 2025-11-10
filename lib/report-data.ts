// Report generation and export data

export interface Report {
  id: string
  name: string
  type: "payroll" | "attendance" | "performance" | "leave" | "custom"
  period: string
  generatedDate: string
  generatedBy: string
  status: "completed" | "pending" | "scheduled"
  fileFormat: "pdf" | "csv" | "xlsx"
  fileSize?: string
}

export const generatedReports: Report[] = [
  {
    id: "RPT001",
    name: "November Payroll Report",
    type: "payroll",
    period: "November 2025",
    generatedDate: "2025-11-30",
    generatedBy: "Sarah Johnson",
    status: "completed",
    fileFormat: "xlsx",
    fileSize: "2.4 MB",
  },
  {
    id: "RPT002",
    name: "October Attendance Report",
    type: "attendance",
    period: "October 2025",
    generatedDate: "2025-11-01",
    generatedBy: "Sarah Johnson",
    status: "completed",
    fileFormat: "pdf",
    fileSize: "1.8 MB",
  },
  {
    id: "RPT003",
    name: "Employee Performance Report",
    type: "performance",
    period: "Q3 2025",
    generatedDate: "2025-09-30",
    generatedBy: "David Park",
    status: "completed",
    fileFormat: "pdf",
    fileSize: "3.2 MB",
  },
  {
    id: "RPT004",
    name: "Monthly Leave Summary",
    type: "leave",
    period: "November 2025",
    generatedDate: "2025-11-15",
    generatedBy: "Sarah Thompson",
    status: "completed",
    fileFormat: "csv",
    fileSize: "0.5 MB",
  },
  {
    id: "RPT005",
    name: "Custom HR Analytics",
    type: "custom",
    period: "November 2025",
    generatedDate: "2025-11-10",
    generatedBy: "Sarah Johnson",
    status: "pending",
    fileFormat: "xlsx",
  },
]

export const reportTemplates = [
  {
    id: "TMPL001",
    name: "Payroll Summary",
    type: "payroll",
    description: "Monthly payroll breakdown by department",
  },
  {
    id: "TMPL002",
    name: "Attendance Report",
    type: "attendance",
    description: "Daily attendance and leave tracking",
  },
  {
    id: "TMPL003",
    name: "Performance Review",
    type: "performance",
    description: "Employee performance ratings and metrics",
  },
  {
    id: "TMPL004",
    name: "Leave Analysis",
    type: "leave",
    description: "Leave usage and balance analysis",
  },
  {
    id: "TMPL005",
    name: "Headcount Report",
    type: "custom",
    description: "Department headcount and recruitment",
  },
  {
    id: "TMPL006",
    name: "Compliance Report",
    type: "custom",
    description: "HR compliance and regulatory checklist",
  },
]
