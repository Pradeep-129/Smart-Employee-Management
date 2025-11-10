// Authentication and role management
export type UserRole = "admin" | "manager" | "employee"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department?: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

// System users for authentication
export const mockUsers: Record<string, User> = {
  admin: {
    id: "1",
    email: "admin@workforce.app",
    name: "Sarah Johnson",
    role: "admin",
    department: "Human Resources",
    avatar: "/admin-avatar.png",
  },
  manager: {
    id: "2",
    email: "manager@workforce.app",
    name: "Michael Chen",
    role: "manager",
    department: "Engineering",
    avatar: "/manager-avatar.png",
  },
  employee: {
    id: "3",
    email: "employee@workforce.app",
    name: "Emma Davis",
    role: "employee",
    department: "Engineering",
    avatar: "/employee-avatar.png",
  },
}

export const getRoleLabel = (role: UserRole): string => {
  return {
    admin: "Administrator",
    manager: "Manager",
    employee: "Employee",
  }[role]
}
