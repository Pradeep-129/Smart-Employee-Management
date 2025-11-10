import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function ChartContainer({ title, description, children }: ChartContainerProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
