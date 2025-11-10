"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type AuthState, mockUsers } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: keyof typeof mockUsers) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        setState((prev) => ({
          ...prev,
          user: JSON.parse(savedUser),
          isLoading: false,
        }))
      } catch (err) {
        // Handle corrupted localStorage data
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, _password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const user = Object.values(mockUsers).find((u) => u.email === email)
      if (user) {
        setState((prev) => ({ ...prev, user, isLoading: false }))
        localStorage.setItem("currentUser", JSON.stringify(user))
      } else {
        setState((prev) => ({
          ...prev,
          error: "Invalid credentials",
          isLoading: false,
        }))
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Login failed",
        isLoading: false,
      }))
    }
  }

  const logout = () => {
    setState({ user: null, isLoading: false, error: null })
    localStorage.removeItem("currentUser")
  }

  const switchRole = (role: keyof typeof mockUsers) => {
    const user = mockUsers[role]
    setState((prev) => ({ ...prev, user }))
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  return <AuthContext.Provider value={{ ...state, login, logout, switchRole }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
