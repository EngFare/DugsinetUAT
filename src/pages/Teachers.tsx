import React, { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { getStatusColor, formatDate } from '../lib/utils'

// Mock data - replace with actual data from Supabase
const mockTeachers = [
  {
    id: '1',
    teacher_id: 'TCH20240001',
    first_name: 'Amina',
    last_name: 'Mohamed',
    email: 'amina.mohamed@dugsinet.edu',
    phone: '+252-61-123-4567',
    subjects_taught: ['Mathematics', 'Physics'],
    role: 'teacher',
    hire_date: '2023-08-15',
    is_active: true,
  },
  {
    id: '2',
    teacher_id: 'TCH20240002',
    first_name: 'Hassan',
    last_name: 'Ahmed',
    email: 'hassan.ahmed@dugsinet.edu',
    phone: '+252-61-234-5678',
    subjects_taught: ['English', 'Literature'],
    role: 'head_teacher',
    hire_date: '2022-01-10',
    is_active: true,
  },
  {
    id: '3',
    teacher_id: 'TCH20240003',
    first_name: 'Khadija',
    last_name: 'Ali',
    email: 'khadija.ali@dugsinet.edu',
    phone: '+252-61-345-6789',
    subjects_taught: ['Biology', 'Chemistry'],
    role: 'coordinator',
    hire_date: '2023-03-20',
    is_active: true,
  },
]

const roleLabels = {
  teacher: 'Teacher',
  admin: 'Admin',
  head_teacher: 'Head Teacher',
  coordinator: 'Coordinator',
}

export function Teachers() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = 
      teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacher_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = !selectedRole || teacher.role === selectedRole

    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{t('teachers.title')}</h1>
          <p className="text-secondary-600">Manage teaching staff and their assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('teachers.addTeacher')}
        </Button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={t('common.search') + ' teachers...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="input w-full"
            >
              <option value="">All Roles</option>
              <option value="teacher">Teacher</option>
              <option value="head_teacher">Head Teacher</option>
              <option value="coordinator">Coordinator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Button variant="secondary">
            <Filter className="h-4 w-4 mr-2" />
            {t('common.filter')}
          </Button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>{t('teachers.teacherId')}</th>
                <th>{t('common.name')}</th>
                <th>{t('teachers.subjectsTaught')}</th>
                <th>{t('teachers.role')}</th>
                <th>{t('teachers.hireDate')}</th>
                <th>{t('common.status')}</th>
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="font-medium">{teacher.teacher_id}</td>
                  <td>
                    <div>
                      <div className="font-medium text-secondary-900">
                        {teacher.first_name} {teacher.last_name}
                      </div>
                      <div className="text-sm text-secondary-500">{teacher.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects_taught.map((subject, index) => (
                        <Badge key={index} variant="secondary" size="sm">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td>
                    <Badge variant="primary">
                      {roleLabels[teacher.role as keyof typeof roleLabels]}
                    </Badge>
                  </td>
                  <td>{formatDate(teacher.hire_date)}</td>
                  <td>
                    <Badge variant={teacher.is_active ? 'success' : 'error'}>
                      {teacher.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-error-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">{filteredTeachers.length}</span> results
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm" disabled>
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}