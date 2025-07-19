import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr)
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export function getGradeDisplayName(gradeLevel: string): string {
  const gradeMap: Record<string, string> = {
    kg1: 'KG1',
    kg2: 'KG2',
    grade1: 'Grade 1',
    grade2: 'Grade 2',
    grade3: 'Grade 3',
    grade4: 'Grade 4',
    grade5: 'Grade 5',
    grade6: 'Grade 6',
    grade7: 'Grade 7',
    grade8: 'Grade 8',
    grade9: 'Grade 9',
    grade10: 'Grade 10',
    grade11: 'Grade 11',
    grade12: 'Grade 12',
  }
  
  return gradeMap[gradeLevel] || gradeLevel
}

export function getLetterGrade(percentage: number): string {
  if (percentage >= 97) return 'A+'
  if (percentage >= 93) return 'A'
  if (percentage >= 90) return 'A-'
  if (percentage >= 87) return 'B+'
  if (percentage >= 83) return 'B'
  if (percentage >= 80) return 'B-'
  if (percentage >= 77) return 'C+'
  if (percentage >= 73) return 'C'
  if (percentage >= 70) return 'C-'
  if (percentage >= 67) return 'D+'
  if (percentage >= 65) return 'D'
  return 'F'
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    active: 'success',
    inactive: 'secondary',
    graduated: 'primary',
    transferred: 'warning',
    suspended: 'error',
    present: 'success',
    absent: 'error',
    tardy: 'warning',
    excused: 'secondary',
  }
  
  return statusColors[status] || 'secondary'
}

export function generateStudentId(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `STU${year}${random}`
}

export function generateTeacherId(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `TCH${year}${random}`
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}