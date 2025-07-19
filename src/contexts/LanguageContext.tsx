import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'so'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.students': 'Students',
    'nav.teachers': 'Teachers',
    'nav.classes': 'Classes',
    'nav.courses': 'Courses',
    'nav.exams': 'Exams',
    'nav.attendance': 'Attendance',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.address': 'Address',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.status': 'Status',
    'common.actions': 'Actions',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome to Dugsinet School Management System',
    'dashboard.totalStudents': 'Total Students',
    'dashboard.totalTeachers': 'Total Teachers',
    'dashboard.totalClasses': 'Total Classes',
    'dashboard.totalCourses': 'Total Courses',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.upcomingExams': 'Upcoming Exams',
    'dashboard.attendanceOverview': 'Attendance Overview',
    
    // Students
    'students.title': 'Students',
    'students.addStudent': 'Add Student',
    'students.editStudent': 'Edit Student',
    'students.studentDetails': 'Student Details',
    'students.firstName': 'First Name',
    'students.lastName': 'Last Name',
    'students.studentId': 'Student ID',
    'students.dateOfBirth': 'Date of Birth',
    'students.gender': 'Gender',
    'students.gradeLevel': 'Grade Level',
    'students.section': 'Section',
    'students.enrollmentDate': 'Enrollment Date',
    'students.enrollmentStatus': 'Enrollment Status',
    'students.emergencyContact': 'Emergency Contact',
    'students.medicalNotes': 'Medical Notes',
    
    // Teachers
    'teachers.title': 'Teachers',
    'teachers.addTeacher': 'Add Teacher',
    'teachers.editTeacher': 'Edit Teacher',
    'teachers.teacherDetails': 'Teacher Details',
    'teachers.teacherId': 'Teacher ID',
    'teachers.hireDate': 'Hire Date',
    'teachers.subjectsTaught': 'Subjects Taught',
    'teachers.qualifications': 'Qualifications',
    'teachers.role': 'Role',
    
    // Classes
    'classes.title': 'Classes',
    'classes.addClass': 'Add Class',
    'classes.editClass': 'Edit Class',
    'classes.classDetails': 'Class Details',
    'classes.sectionCode': 'Section Code',
    'classes.classTeacher': 'Class Teacher',
    'classes.assistantTeacher': 'Assistant Teacher',
    'classes.maxCapacity': 'Max Capacity',
    'classes.currentEnrollment': 'Current Enrollment',
    'classes.classroomLocation': 'Classroom Location',
    'classes.academicYear': 'Academic Year',
    
    // Courses
    'courses.title': 'Courses',
    'courses.addCourse': 'Add Course',
    'courses.editCourse': 'Edit Course',
    'courses.courseDetails': 'Course Details',
    'courses.courseCode': 'Course Code',
    'courses.subjectArea': 'Subject Area',
    'courses.prerequisites': 'Prerequisites',
    'courses.credits': 'Credits',
    'courses.description': 'Description',
    
    // Exams
    'exams.title': 'Exams',
    'exams.addExam': 'Add Exam',
    'exams.editExam': 'Edit Exam',
    'exams.examDetails': 'Exam Details',
    'exams.examType': 'Exam Type',
    'exams.examDate': 'Exam Date',
    'exams.startTime': 'Start Time',
    'exams.endTime': 'End Time',
    'exams.venue': 'Venue',
    'exams.totalMarks': 'Total Marks',
    'exams.passingMarks': 'Passing Marks',
    'exams.instructions': 'Instructions',
    
    // Attendance
    'attendance.title': 'Attendance',
    'attendance.markAttendance': 'Mark Attendance',
    'attendance.attendanceReport': 'Attendance Report',
    'attendance.present': 'Present',
    'attendance.absent': 'Absent',
    'attendance.tardy': 'Tardy',
    'attendance.excused': 'Excused',
    'attendance.checkInTime': 'Check In Time',
    'attendance.checkOutTime': 'Check Out Time',
    'attendance.notes': 'Notes',
  },
  so: {
    // Navigation
    'nav.dashboard': 'Shabakada',
    'nav.students': 'Ardayda',
    'nav.teachers': 'Macalimiinta',
    'nav.classes': 'Fasallada',
    'nav.courses': 'Maaddooyinka',
    'nav.exams': 'Imtixaannada',
    'nav.attendance': 'Soo-joogga',
    'nav.reports': 'Warbixinnada',
    'nav.settings': 'Dejinta',
    
    // Common
    'common.save': 'Kaydi',
    'common.cancel': 'Jooji',
    'common.edit': 'Wax ka beddel',
    'common.delete': 'Tirtir',
    'common.add': 'Ku dar',
    'common.search': 'Raadi',
    'common.filter': 'Shaandhayn',
    'common.export': 'Soo saari',
    'common.import': 'Soo geli',
    'common.loading': 'Waa la rarayo...',
    'common.error': 'Qalad',
    'common.success': 'Guul',
    'common.warning': 'Digniin',
    'common.info': 'Macluumaad',
    'common.confirm': 'Xaqiiji',
    'common.yes': 'Haa',
    'common.no': 'Maya',
    'common.name': 'Magaca',
    'common.email': 'Iimaylka',
    'common.phone': 'Telefoonka',
    'common.address': 'Cinwaanka',
    'common.date': 'Taariikhda',
    'common.time': 'Waqtiga',
    'common.status': 'Xaalada',
    'common.actions': 'Ficillada',
    
    // Dashboard
    'dashboard.title': 'Shabakada',
    'dashboard.welcome': 'Ku soo dhawoow Nidaamka Maamulka Dugsiga Dugsinet',
    'dashboard.totalStudents': 'Wadarta Ardayda',
    'dashboard.totalTeachers': 'Wadarta Macalimiinta',
    'dashboard.totalClasses': 'Wadarta Fasallada',
    'dashboard.totalCourses': 'Wadarta Maaddooyinka',
    'dashboard.recentActivity': 'Dhaqdhaqaaqa Dhawaan',
    'dashboard.upcomingExams': 'Imtixaannada Soo socda',
    'dashboard.attendanceOverview': 'Dulmar Soo-joogga',
    
    // Students
    'students.title': 'Ardayda',
    'students.addStudent': 'Ku dar Arday',
    'students.editStudent': 'Wax ka beddel Ardayga',
    'students.studentDetails': 'Faahfaahinta Ardayga',
    'students.firstName': 'Magaca Koowaad',
    'students.lastName': 'Magaca Dambe',
    'students.studentId': 'Aqoonsiga Ardayga',
    'students.dateOfBirth': 'Taariikhda Dhalashada',
    'students.gender': 'Jinsiga',
    'students.gradeLevel': 'Heerka Fasalka',
    'students.section': 'Qaybta',
    'students.enrollmentDate': 'Taariikhda Diiwaan-gelinta',
    'students.enrollmentStatus': 'Xaalada Diiwaan-gelinta',
    'students.emergencyContact': 'Xiriirka Degdegga ah',
    'students.medicalNotes': 'Qoraalada Caafimaadka',
    
    // Teachers
    'teachers.title': 'Macalimiinta',
    'teachers.addTeacher': 'Ku dar Macalin',
    'teachers.editTeacher': 'Wax ka beddel Macalinka',
    'teachers.teacherDetails': 'Faahfaahinta Macalinka',
    'teachers.teacherId': 'Aqoonsiga Macalinka',
    'teachers.hireDate': 'Taariikhda Shaqaalaha',
    'teachers.subjectsTaught': 'Maaddooyinka la Baro',
    'teachers.qualifications': 'Shahaadooyinka',
    'teachers.role': 'Doorka',
    
    // Classes
    'classes.title': 'Fasallada',
    'classes.addClass': 'Ku dar Fasal',
    'classes.editClass': 'Wax ka beddel Fasalka',
    'classes.classDetails': 'Faahfaahinta Fasalka',
    'classes.sectionCode': 'Koodka Qaybta',
    'classes.classTeacher': 'Macalinka Fasalka',
    'classes.assistantTeacher': 'Macalinka Caawinta',
    'classes.maxCapacity': 'Awoodda Ugu Badan',
    'classes.currentEnrollment': 'Diiwaan-gelinta Hadda',
    'classes.classroomLocation': 'Goobta Fasalka',
    'classes.academicYear': 'Sanadka Waxbarashada',
    
    // Courses
    'courses.title': 'Maaddooyinka',
    'courses.addCourse': 'Ku dar Maaddo',
    'courses.editCourse': 'Wax ka beddel Maaddada',
    'courses.courseDetails': 'Faahfaahinta Maaddada',
    'courses.courseCode': 'Koodka Maaddada',
    'courses.subjectArea': 'Aagga Maaddada',
    'courses.prerequisites': 'Shuruudaha Hore',
    'courses.credits': 'Dhibcaha',
    'courses.description': 'Sharaxaadda',
    
    // Exams
    'exams.title': 'Imtixaannada',
    'exams.addExam': 'Ku dar Imtixaan',
    'exams.editExam': 'Wax ka beddel Imtixaanka',
    'exams.examDetails': 'Faahfaahinta Imtixaanka',
    'exams.examType': 'Nooca Imtixaanka',
    'exams.examDate': 'Taariikhda Imtixaanka',
    'exams.startTime': 'Waqtiga Bilowga',
    'exams.endTime': 'Waqtiga Dhammaadka',
    'exams.venue': 'Goobta',
    'exams.totalMarks': 'Wadarta Dhibcaha',
    'exams.passingMarks': 'Dhibcaha Guusha',
    'exams.instructions': 'Tilmaamaha',
    
    // Attendance
    'attendance.title': 'Soo-joogga',
    'attendance.markAttendance': 'Calaamadee Soo-joogga',
    'attendance.attendanceReport': 'Warbixinta Soo-joogga',
    'attendance.present': 'Joog',
    'attendance.absent': 'Maqan',
    'attendance.tardy': 'Daahdaan',
    'attendance.excused': 'Cafis',
    'attendance.checkInTime': 'Waqtiga Soo Galka',
    'attendance.checkOutTime': 'Waqtiga Bixitaanka',
    'attendance.notes': 'Qoraalada',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('dugsinet-language') as Language
    if (savedLanguage && ['en', 'so'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('dugsinet-language', lang)
    document.documentElement.dir = lang === 'so' ? 'rtl' : 'ltr'
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}