// Employee data for directory and management

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  manager?: string
  joinDate: string
  salary: number
  status: "active" | "on-leave" | "inactive"
  avatar?: string
}

export const employees: Employee[] = [
  {
    id: "EMP001",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@workforce.app",
    phone: "+1 (555) 123-4567",
    role: "Senior Developer",
    department: "Engineering",
    manager: "David Park",
    joinDate: "2021-03-15",
    salary: 125000,
    status: "active",
    avatar: "/placeholder.svg?key=alex01",
  },
  {
    id: "EMP002",
    name: "Jessica Chen",
    email: "jessica.chen@workforce.app",
    phone: "+1 (555) 234-5678",
    role: "Product Manager",
    department: "Product",
    manager: "Sarah Johnson",
    joinDate: "2021-06-20",
    salary: 110000,
    status: "active",
    avatar: "/placeholder.svg?key=jess02",
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    email: "michael.brown@workforce.app",
    phone: "+1 (555) 345-6789",
    role: "Sales Executive",
    department: "Sales",
    manager: "Sarah Johnson",
    joinDate: "2022-01-10",
    salary: 85000,
    status: "on-leave",
    avatar: "/placeholder.svg?key=mich03",
  },
  {
    id: "EMP004",
    name: "Emma Davis",
    email: "emma.davis@workforce.app",
    phone: "+1 (555) 456-7890",
    role: "UX Designer",
    department: "Design",
    manager: "David Park",
    joinDate: "2022-04-05",
    salary: 95000,
    status: "active",
    avatar: "/placeholder.svg?key=emma04",
  },
  {
    id: "EMP005",
    name: "James Wilson",
    email: "james.wilson@workforce.app",
    phone: "+1 (555) 567-8901",
    role: "Marketing Specialist",
    department: "Marketing",
    manager: "Lisa Anderson",
    joinDate: "2022-07-12",
    salary: 75000,
    status: "active",
    avatar: "/placeholder.svg?key=jame05",
  },
  {
    id: "EMP006",
    name: "Sarah Thompson",
    email: "sarah.thompson@workforce.app",
    phone: "+1 (555) 678-9012",
    role: "HR Manager",
    department: "Human Resources",
    joinDate: "2020-08-03",
    salary: 88000,
    status: "active",
    avatar: "/placeholder.svg?key=sara06",
  },
  {
    id: "EMP007",
    name: "David Park",
    email: "david.park@workforce.app",
    phone: "+1 (555) 789-0123",
    role: "Engineering Lead",
    department: "Engineering",
    joinDate: "2019-05-18",
    salary: 135000,
    status: "active",
    avatar: "/placeholder.svg?key=davi07",
  },
  {
    id: "EMP008",
    name: "Lisa Anderson",
    email: "lisa.anderson@workforce.app",
    phone: "+1 (555) 890-1234",
    role: "Marketing Manager",
    department: "Marketing",
    joinDate: "2020-11-22",
    salary: 98000,
    status: "active",
    avatar: "/placeholder.svg?key=lisa08",
  },
]

export const departments = [
  "Engineering",
  "Sales",
  "Marketing",
  "Design",
  "Product",
  "Human Resources",
  "Finance",
  "Operations",
]
