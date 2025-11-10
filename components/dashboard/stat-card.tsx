import type React from "react"
interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  variant?: "default" | "success" | "warning" | "danger"
  icon?: React.ReactNode
}

const variantStyles = {
  default: "border-border bg-card",
  success: "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950",
  warning: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950",
  danger: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950",
}

const textStyles = {
  default: "text-foreground text-muted-foreground",
  success: "text-green-900 dark:text-green-100 text-green-700 dark:text-green-300",
  warning: "text-amber-900 dark:text-amber-100 text-amber-700 dark:text-amber-300",
  danger: "text-red-900 dark:text-red-100 text-red-700 dark:text-red-300",
}

export function StatCard({ label, value, subtext, variant = "default", icon }: StatCardProps) {
  const [labelColor, subtextColor] = textStyles[variant].split(" ")

  return (
    <div className={`rounded-xl p-6 border-2 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${labelColor}`}>{label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtext && <p className={`text-xs mt-2 ${subtextColor}`}>{subtext}</p>}
        </div>
        {icon && <div className="text-2xl opacity-70">{icon}</div>}
      </div>
    </div>
  )
}
