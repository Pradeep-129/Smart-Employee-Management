"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect users to their role-specific dashboard
    if (user) {
      if (user.role === "admin") {
        router.push("/dashboard/admin")
      } else if (user.role === "manager") {
        router.push("/dashboard/manager")
      } else {
        router.push("/dashboard/employee")
      }
    } else {
      // Redirect to login if not authenticated
      router.push("/login")
    }
  }, [user, router])

  return null
}
