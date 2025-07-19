import React, { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, BookOpen, Clock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { getGradeDisplayName } from '../lib/utils'

// Mock data - replace with actual data from Supabase
const mockCourses = [
  {
    id: '1',
    code: 'MATH101',
    name_en: 'Advanced Mathematics',
    name_so: 'Xisaabta Horumarsan',
    description_en: 'Advanced mathematical concepts including algebra and geometry',
    description_so: 'Fikradaha xisaabta horumarsan oo ay ku jiraan algebra iyo geometry',
    grade_level: 'grade10',
    subject_area: 'Mathematics',
    credits: 4,
    is_active: true,
    topics_count: 12,
    estimated_hours: 120,
  },
  {
    id: '2',
    code: 'ENG201',
    name_en: 'English Literature',
    name_so: 'Suugaanta Ingiriisiga',
    description_en: 'Study of classic and modern English literature',
    description_so: 'Daraasadda suugaanta Ingiriisiga ee qadiimiga ah iyo casriga ah',
    grade_level: 'grade11',
    subject_area: 'English',
    credits: 3,
    is_active: true,
    topics_count: 8,
    estimated_hours: 90,
  },
  {
    id: '3',
    code: 'SCI301',
    name_en: 'Biology Fundamentals',
    name_so: 'Aasaaska Bayoolajiga',
    description_en: 'Introduction to biological sciences and life processes',
    description_so: 'Hordhac ku saabsan sayniska bayoolajiga iyo habdhaqanka nolosha',
    grade_level: 'grade9',
    subject_area: 'Science',
    credits: 4,
    is_active: true,
    topics_count: 15,
    estimated_hours: 100,
  },
]

const subjectAreas = [
  'Mathematics',
  'English',
  'Science',
  'Social Studies',
  'Arabic',
  'Islamic Studies',
  'Physical Education',
  'Art',
  'Computer Science',
]

export function Courses() {
  const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  const filteredCourses = mockCourses.filter(course => {
    const courseName = language === 'en' ? course.name_en : course.name_so
    const matchesSearch = 
      courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject_area.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesGrade = !selectedGrade || course.grade_level === selectedGrade
    const matchesSubject = !selectedSubject || course.subject_area === selectedSubject

    return matchesSearch && matchesGrade && matchesSubject
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{t('courses.title')}</h1>
          <p className="text-secondary-600">Manage curriculum courses and content</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('courses.addCourse')}
        </Button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder={t('common.search') + ' courses...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
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
          <div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input w-full"
            >
              <option value="">All Subjects</option>
              {subjectAreas.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary-100 p-2">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {language === 'en' ? course.name_en : course.name_so}
                  </h3>
                  <p className="text-sm text-secondary-600">{course.code}</p>
                </div>
              </div>
              <Badge variant={course.is_active ? 'success' : 'error'}>
                {course.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
              {language === 'en' ? course.description_en : course.description_so}
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Grade Level:</span>
                <Badge variant="secondary">
                  {getGradeDisplayName(course.grade_level)}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Subject Area:</span>
                <span className="text-sm font-medium text-secondary-900">
                  {course.subject_area}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Credits:</span>
                <span className="text-sm font-medium text-secondary-900">
                  {course.credits}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Topics:</span>
                <span className="text-sm font-medium text-secondary-900">
                  {course.topics_count} topics
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Duration:</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-secondary-400" />
                  <span className="text-sm font-medium text-secondary-900">
                    {course.estimated_hours}h
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-secondary-200">
              <Button variant="secondary" size="sm">
                View Curriculum
              </Button>
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
          <span className="font-medium">{filteredCourses.length}</span> results
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