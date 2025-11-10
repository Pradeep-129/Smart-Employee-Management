import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/components/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Workforce - Employee Management Platform",
  description: "Smart workforce management and payroll automation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
