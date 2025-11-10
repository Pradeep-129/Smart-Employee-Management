"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ReportCard } from "@/components/dashboard/report-card"
import { generatedReports, reportTemplates } from "@/lib/report-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportName, setReportName] = useState("")

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard/manager")
    }
  }, [user, router])

  if (user?.role !== "admin") {
    return null
  }

  const handleGenerateReport = () => {
    console.log("[v0] Generating report:", { template: selectedTemplate, name: reportName })
    setReportName("")
    setSelectedTemplate("")
  }

  const completedReports = generatedReports.filter((r) => r.status === "completed")
  const pendingReports = generatedReports.filter((r) => r.status === "pending")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">Generate, manage, and export reports</p>
      </div>

      {/* Generate New Report */}
      <Card className="border-2 bg-primary/5">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Select a template and customize your report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Report Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} - {template.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Report Name (Optional)</label>
              <Input
                placeholder="Custom report name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleGenerateReport} disabled={!selectedTemplate} className="w-full">
                Generate Report
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Reports are generated on-demand and will be available for download immediately upon completion.
          </p>
        </CardContent>
      </Card>

      {/* Pending Reports */}
      {pendingReports.length > 0 && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Pending Reports ({pendingReports.length})</CardTitle>
            <CardDescription>Reports currently being generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Templates */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-built templates for common reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => (
              <div key={template.id} className="border-2 border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-1">{template.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSelectedTemplate(template.id)
                    setReportName(template.name)
                  }}
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Reports */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Completed Reports ({completedReports.length})</CardTitle>
          <CardDescription>Reports ready for download and sharing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Choose how to export your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 bg-transparent">
              <span className="text-3xl">📊</span>
              <span>Export to Excel</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 bg-transparent">
              <span className="text-3xl">📄</span>
              <span>Export to PDF</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 bg-transparent">
              <span className="text-3xl">📋</span>
              <span>Export to CSV</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
