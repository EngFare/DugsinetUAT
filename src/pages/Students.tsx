import React, { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { getStatusColor, getGradeDisplayName, formatDate } from '../lib/utils'

// Mock data - replace with actual data from Supabase
const mockStudents = [
  {
    id: '1',
    student_id: 'STU20240001',
    first_name: 'Ahmed',
    last_name: 'Hassan',
    grade_level: 'grade10',
    section: 'A',
    enrollment_status: 'active',
    enrollment_date: '2024-01-15',
    email: 'ahmed.hassan@example.com',
    phone: '+252-61-234-5678',
    date_of_birth: '2008-05-15',
  },
  {
    id: '2',
    student_id: 'STU20240002',
    first_name: 'Fatima',
    last_name: 'Ali',
    grade_level: 'grade9',
    section: 'B',
    enrollment_status: 'active',
    enrollment_date: '2024-01-10',
    email: 'fatima.ali@example.com',
    phone: '+252-61-345-6789',
    date_of_birth: '2009-03-22',
  },
  {
    id: '3',
    student_id: 'STU20240003',
    first_name: 'Mohamed',
    last_name: 'Omar',
    grade_level: 'grade11',
    section: 'A',
    enrollment_status: 'active',
    enrollment_date: '2024-01-08',
    email: 'mohamed.omar@example.com',
    phone: '+252-61-456-7890',
    date_of_birth: '2007-11-10',
  },
]

export function Students() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesGrade = !selectedGrade || student.grade_level === selectedGrade

    return matchesSearch && matchesGrade
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{t('students.title')}</h1>
          <p className="text-secondary-600">Manage student information and enrollment</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('students.addStudent')}
        </Button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={t('common.search') + ' students...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="input w-full"
            >
              <option value="">All Grades</option>
              <option value="kg1">KG1</option>
              <option value="kg2">KG2</option>
              <option value="grade1">Grade 1</option>
              <option value="grade2">Grade 2</option>
              <option value="grade3">Grade 3</option>
              <option value="grade4">Grade 4</option>
              <option value="grade5">Grade 5</option>
              <option value="grade6">Grade 6</option>
              <option value="grade7">Grade 7</option>
              <option value="grade8">Grade 8</option>
              <option value="grade9">Grade 9</option>
              <option value="grade10">Grade 10</option>
              <option value="grade11">Grade 11</option>
              <option value="grade12">Grade 12</option>
            </select>
          </div>
          <Button variant="secondary">
            <Filter className="h-4 w-4 mr-2" />
            {t('common.filter')}
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>{t('students.studentId')}</th>
                <th>{t('common.name')}</th>
                <th>{t('students.gradeLevel')}</th>
                <th>{t('students.section')}</th>
                <th>{t('students.enrollmentStatus')}</th>
                <th>{t('students.enrollmentDate')}</th>
                <th>{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="font-medium">{student.student_id}</td>
                  <td>
                    <div>
                      <div className="font-medium text-secondary-900">
                        {student.first_name} {student.last_name}
                      </div>
                      <div className="text-sm text-secondary-500">{student.email}</div>
                    </div>
                  </td>
                  <td>{getGradeDisplayName(student.grade_level)}</td>
                  <td>{student.section}</td>
                  <td>
                    <Badge variant={getStatusColor(student.enrollment_status) as any}>
                      {student.enrollment_status}
                    </Badge>
                  </td>
                  <td>{formatDate(student.enrollment_date)}</td>
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
          <span className="font-medium">{filteredStudents.length}</span> results
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