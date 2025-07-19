import React, { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Users } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { getGradeDisplayName } from '../lib/utils'

// Mock data - replace with actual data from Supabase
const mockClasses = [
  {
    id: '1',
    name_en: 'Grade 10 - Section A',
    name_so: 'Fasalka 10aad - Qaybta A',
    grade_level: 'grade10',
    section_code: 'A',
    class_teacher: 'Amina Mohamed',
    assistant_teacher: 'Hassan Ahmed',
    max_capacity: 30,
    current_enrollment: 28,
    classroom_location: 'Room 201',
    academic_year: '2024-2025',
    is_active: true,
  },
  {
    id: '2',
    name_en: 'Grade 9 - Section B',
    name_so: 'Fasalka 9aad - Qaybta B',
    grade_level: 'grade9',
    section_code: 'B',
    class_teacher: 'Khadija Ali',
    assistant_teacher: null,
    max_capacity: 25,
    current_enrollment: 23,
    classroom_location: 'Room 105',
    academic_year: '2024-2025',
    is_active: true,
  },
  {
    id: '3',
    name_en: 'Grade 11 - Section A',
    name_so: 'Fasalka 11aad - Qaybta A',
    grade_level: 'grade11',
    section_code: 'A',
    class_teacher: 'Mohamed Omar',
    assistant_teacher: 'Fatima Hassan',
    max_capacity: 32,
    current_enrollment: 30,
    classroom_location: 'Room 301',
    academic_year: '2024-2025',
    is_active: true,
  },
]

export function Classes() {
  const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')

  const filteredClasses = mockClasses.filter(classItem => {
    const className = language === 'en' ? classItem.name_en : classItem.name_so
    const matchesSearch = 
      className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.section_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.class_teacher.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesGrade = !selectedGrade || classItem.grade_level === selectedGrade

    return matchesSearch && matchesGrade
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{t('classes.title')}</h1>
          <p className="text-secondary-600">Manage class sections and assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('classes.addClass')}
        </Button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={t('common.search') + ' classes...'}
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

      {/* Classes Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classItem) => (
          <div key={classItem.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">
                  {language === 'en' ? classItem.name_en : classItem.name_so}
                </h3>
                <p className="text-sm text-secondary-600">
                  {getGradeDisplayName(classItem.grade_level)} • Section {classItem.section_code}
                </p>
              </div>
              <Badge variant={classItem.is_active ? 'success' : 'error'}>
                {classItem.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Class Teacher:</span>
                <span className="text-sm font-medium text-secondary-900">
                  {classItem.class_teacher}
                </span>
              </div>

              {classItem.assistant_teacher && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Assistant:</span>
                  <span className="text-sm font-medium text-secondary-900">
                    {classItem.assistant_teacher}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Location:</span>
                <span className="text-sm font-medium text-secondary-900">
                  {classItem.classroom_location}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Enrollment:</span>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-secondary-400" />
                  <span className="text-sm font-medium text-secondary-900">
                    {classItem.current_enrollment}/{classItem.max_capacity}
                  </span>
                </div>
              </div>

              {/* Enrollment Progress Bar */}
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(classItem.current_enrollment / classItem.max_capacity) * 100}%`
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-secondary-200">
              <span className="text-xs text-secondary-500">
                Academic Year: {classItem.academic_year}
              </span>
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
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">{filteredClasses.length}</span> results
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