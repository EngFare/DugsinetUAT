import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { School } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const { t } = useLanguage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)
      setError('')
      await signIn(data.email, data.password)
    } catch (err: any) {
      setError(err.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <School className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-secondary-900">
            Dugsinet School Management
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-lg bg-error-50 p-4">
              <p className="text-sm text-error-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}