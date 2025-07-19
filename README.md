# Dugsinet School Management System

A comprehensive bilingual (English/Somali) School Management System built with React, TypeScript, and Supabase. This ERP SaaS solution provides core academic and student management features for educational institutions.

## Features

### 🎓 Academic Management
- **Student Management**: Complete student profiles, enrollment tracking, and academic records
- **Teacher Management**: Staff profiles, qualifications, subject assignments, and roles
- **Class Management**: Section organization, capacity tracking, and teacher assignments
- **Course Management**: Curriculum planning, subject areas, and credit systems
- **Exam Management**: Assessment scheduling, grading, and performance tracking
- **Attendance Tracking**: Daily attendance monitoring with multiple status options

### 🌍 Bilingual Support
- Full English and Somali language support
- RTL (Right-to-Left) text support for Somali
- Dynamic language switching
- Localized content throughout the application

### 🔐 Security & Authentication
- Supabase authentication with email/password
- Row Level Security (RLS) policies
- Role-based access control
- Secure data handling

### 📊 Dashboard & Analytics
- Real-time statistics and metrics
- Recent activity tracking
- Upcoming exams overview
- Attendance analytics
- Performance indicators

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive layout for all devices
- Smooth animations and transitions
- Accessible components
- Dark/light theme support

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## Database Schema

The system uses a comprehensive PostgreSQL schema with the following main entities:

- **Students**: Complete student information with enrollment tracking
- **Teachers**: Staff management with qualifications and role assignments
- **Courses**: Curriculum management with bilingual content
- **Class Sections**: Classroom organization and capacity management
- **Exams**: Assessment scheduling and management
- **Assessments**: Grade tracking and performance evaluation
- **Attendance**: Daily attendance monitoring
- **Curriculum Topics**: Detailed lesson planning and sequencing

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up the database:
   - Connect to your Supabase project
   - Run the provided SQL schema to create tables and policies

5. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── layout/         # Layout components (Sidebar, Header)
│   └── auth/           # Authentication components
├── contexts/           # React contexts (Auth, Language)
├── lib/               # Utilities and configurations
│   ├── supabase.ts    # Supabase client setup
│   ├── utils.ts       # Helper functions
│   └── database.types.ts # TypeScript types
├── pages/             # Main application pages
└── App.tsx           # Main application component
```

## Key Features Implementation

### Bilingual Support
- Context-based language management
- Translation dictionary with fallbacks
- RTL support for Somali text
- Dynamic content switching

### Authentication
- Supabase Auth integration
- Protected routes
- User session management
- Role-based access control

### Data Management
- Type-safe database operations
- Real-time subscriptions
- Optimistic updates
- Error handling and validation

### UI Components
- Consistent design system
- Accessible components
- Responsive layouts
- Loading states and error boundaries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.