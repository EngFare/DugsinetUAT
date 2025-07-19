import React from 'react'
import { Users, GraduationCap, School, BookOpen, TrendingUp, Calendar } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const stats = [
  {
    name: 'dashboard.totalStudents',
    value: '1,234',
    icon: Users,
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
    change: '+12%',
    changeType: 'increase'
  },
  {
    name: 'dashboard.totalTeachers',
    value: '89',
    icon: GraduationCap,
    color: 'text-success-600',
    bgColor: 'bg-success-100',
    change: '+3%',
    changeType: 'increase'
  },
  {
    name: 'dashboard.totalClasses',
    value: '45',
    icon: School,
    color: 'text-warning-600',
    bgColor: 'bg-warning-100',
    change: '+2%',
    changeType: 'increase'
  },
  {
    name: 'dashboard.totalCourses',
    value: '156',
    icon: BookOpen,
    color: 'text-error-600',
    bgColor: 'bg-error-100',
    change: '+8%',
    changeType: 'increase'
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'student_enrolled',
    message: 'Ahmed Hassan enrolled in Grade 10-A',
    time: '2 hours ago',
    icon: Users,
  },
  {
    id: 2,
    type: 'exam_scheduled',
    message: 'Mathematics midterm exam scheduled for Grade 9',
    time: '4 hours ago',
    icon: Calendar,
  },
  {
    id: 3,
    type: 'teacher_assigned',
    message: 'Fatima Ali assigned to teach Biology',
    time: '6 hours ago',
    icon: GraduationCap,
  },
]

const upcomingExams = [
  {
    id: 1,
    subject: 'Mathematics',
    grade: 'Grade 10',
    date: '2024-01-15',
    time: '09:00 AM',
    type: 'Midterm'
  },
  {
    id: 2,
    subject: 'English',
    grade: 'Grade 9',
    date: '2024-01-16',
    time: '10:30 AM',
    type: 'Quiz'
  },
  {
    id: 3,
    subject: 'Science',
    grade: 'Grade 8',
    date: '2024-01-17',
    time: '11:00 AM',
    type: 'Assignment'
  },
]

export function Dashboard() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">{t('dashboard.title')}</h1>
        <p className="text-secondary-600">{t('dashboard.welcome')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">{t(stat.name)}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-secondary-900">{stat.value}</p>
                  <p className="ml-2 flex items-baseline text-sm font-semibold text-success-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            {t('dashboard.recentActivity')}
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="rounded-lg bg-primary-100 p-2">
                  <activity.icon className="h-4 w-4 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-secondary-900">{activity.message}</p>
                  <p className="text-xs text-secondary-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            {t('dashboard.upcomingExams')}
          </h3>
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900">{exam.subject}</p>
                  <p className="text-sm text-secondary-600">{exam.grade} • {exam.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary-900">{exam.date}</p>
                  <p className="text-xs text-secondary-500">{exam.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          {t('dashboard.attendanceOverview')}
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <p className="text-2xl font-bold text-success-600">94.5%</p>
            <p className="text-sm text-success-700">Present Today</p>
          </div>
          <div className="text-center p-4 bg-warning-50 rounded-lg">
            <p className="text-2xl font-bold text-warning-600">3.2%</p>
            <p className="text-sm text-warning-700">Late Arrivals</p>
          </div>
          <div className="text-center p-4 bg-error-50 rounded-lg">
            <p className="text-2xl font-bold text-error-600">2.3%</p>
            <p className="text-sm text-error-700">Absent Today</p>
          </div>
        </div>
      </div>
    </div>
  )
}