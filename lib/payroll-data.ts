// Payroll and compensation data

export interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  period: string
  baseSalary: number
  bonuses: number
  deductions: number
  taxes: number
  netPayment: number
  status: "pending" | "processed" | "paid"
  paymentDate?: string
}

export interface BenefitsRecord {
  id: string
  employeeId: string
  employeeName: string
  healthInsurance: number
  retirement401k: number
  stockOptions: number
  totalBenefits: number
}

export const payrollRecords: PayrollRecord[] = [
  {
    id: "PAY001",
    employeeId: "EMP001",
    employeeName: "Alex Rodriguez",
    period: "November 2025",
    baseSalary: 125000,
    bonuses: 5000,
    deductions: 8000,
    taxes: 18000,
    netPayment: 104000,
    status: "paid",
    paymentDate: "2025-11-30",
  },
  {
    id: "PAY002",
    employeeId: "EMP002",
    employeeName: "Jessica Chen",
    period: "November 2025",
    baseSalary: 110000,
    bonuses: 3000,
    deductions: 6500,
    taxes: 16000,
    netPayment: 90500,
    status: "paid",
    paymentDate: "2025-11-30",
  },
  {
    id: "PAY003",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    period: "November 2025",
    baseSalary: 85000,
    bonuses: 2000,
    deductions: 4000,
    taxes: 12000,
    netPayment: 71000,
    status: "processed",
    paymentDate: "2025-11-30",
  },
  {
    id: "PAY004",
    employeeId: "EMP004",
    employeeName: "Emma Davis",
    period: "November 2025",
    baseSalary: 95000,
    bonuses: 2500,
    deductions: 5000,
    taxes: 14000,
    netPayment: 78500,
    status: "processed",
    paymentDate: "2025-11-30",
  },
  {
    id: "PAY005",
    employeeId: "EMP005",
    employeeName: "James Wilson",
    period: "November 2025",
    baseSalary: 75000,
    bonuses: 1500,
    deductions: 3500,
    taxes: 11000,
    netPayment: 62000,
    status: "pending",
  },
  {
    id: "PAY006",
    employeeId: "EMP006",
    employeeName: "Sarah Thompson",
    period: "November 2025",
    baseSalary: 88000,
    bonuses: 2000,
    deductions: 4000,
    taxes: 13000,
    netPayment: 73000,
    status: "pending",
  },
  {
    id: "PAY007",
    employeeId: "EMP007",
    employeeName: "David Park",
    period: "November 2025",
    baseSalary: 135000,
    bonuses: 8000,
    deductions: 9000,
    taxes: 20000,
    netPayment: 114000,
    status: "pending",
  },
  {
    id: "PAY008",
    employeeId: "EMP008",
    employeeName: "Lisa Anderson",
    period: "November 2025",
    baseSalary: 98000,
    bonuses: 3000,
    deductions: 5500,
    taxes: 15000,
    netPayment: 80500,
    status: "pending",
  },
]

export const benefitsRecords: BenefitsRecord[] = [
  {
    id: "BEN001",
    employeeId: "EMP001",
    employeeName: "Alex Rodriguez",
    healthInsurance: 1200,
    retirement401k: 3750,
    stockOptions: 5000,
    totalBenefits: 9950,
  },
  {
    id: "BEN002",
    employeeId: "EMP002",
    employeeName: "Jessica Chen",
    healthInsurance: 1200,
    retirement401k: 3300,
    stockOptions: 4500,
    totalBenefits: 9000,
  },
  {
    id: "BEN003",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    healthInsurance: 1000,
    retirement401k: 2550,
    stockOptions: 3000,
    totalBenefits: 6550,
  },
]
