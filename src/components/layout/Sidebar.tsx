import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  BarChart3,
  Settings,
  School
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { cn } from '../../lib/utils'

const navigation = [
  { name: 'nav.dashboard', href: '/', icon: LayoutDashboard },
  { name: 'nav.students', href: '/students', icon: Users },
  { name: 'nav.teachers', href: '/teachers', icon: GraduationCap },
  { name: 'nav.classes', href: '/classes', icon: School },
  { name: 'nav.courses', href: '/courses', icon: BookOpen },
  { name: 'nav.exams', href: '/exams', icon: Calendar },
  { name: 'nav.attendance', href: '/attendance', icon: ClipboardCheck },
  { name: 'nav.reports', href: '/reports', icon: BarChart3 },
  { name: 'nav.settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-secondary-200 px-6">
            <div className="flex items-center space-x-2">
              <School className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-secondary-900">Dugsinet</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'sidebar-item',
                    isActive && 'active'
                  )
                }
                onClick={() => onClose()}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {t(item.name)}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}