import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Layout } from './components/layout/Layout'
import { LoginForm } from './components/auth/LoginForm'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { Dashboard } from './pages/Dashboard'
import { Students } from './pages/Students'
import { Teachers } from './pages/Teachers'
import { Classes } from './pages/Classes'
import { Courses } from './pages/Courses'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />
        <Route path="courses" element={<Courses />} />
        <Route path="exams" element={<div className="p-6">Exams page coming soon...</div>} />
        <Route path="attendance" element={<div className="p-6">Attendance page coming soon...</div>} />
        <Route path="reports" element={<div className="p-6">Reports page coming soon...</div>} />
        <Route path="settings" element={<div className="p-6">Settings page coming soon...</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default App