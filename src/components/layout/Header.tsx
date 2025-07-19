import React from 'react'
import { Menu, Bell, User, Globe } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '../ui/Button'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'so' : 'en')
  }

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-secondary-600 hover:bg-secondary-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={handleLanguageToggle}
            className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'en' ? 'English' : 'Soomaali'}</span>
          </button>

          {/* Notifications */}
          <button className="rounded-lg p-2 text-secondary-600 hover:bg-secondary-100">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-secondary-900">
                {user?.email}
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}