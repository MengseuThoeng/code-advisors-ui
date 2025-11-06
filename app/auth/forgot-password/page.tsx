'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useForgotPassword } from '@/hooks/use-auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  
  const forgotPasswordMutation = useForgotPassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setIsEmailSent(true)
        }
      }
    )
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 text-center">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
              <p className="text-gray-600">
                We've sent a password reset link to<br />
                <span className="font-medium text-gray-900">{email}</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or
              </p>
              <Button
                variant="outline"
                onClick={() => setIsEmailSent(false)}
                className="text-[#CD3937] border-[#CD3937] hover:bg-[#CD3937]/5"
              >
                Try again
              </Button>
            </div>
            
            <Link 
              href="/auth/login"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Code Advisor</h1>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Forgot your password?
              <span className="block bg-gradient-to-r from-[#000040] to-[#CD3937] bg-clip-text text-transparent">
                No worries, we've got you covered
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-md">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-2 h-2 bg-[#CD3937] rounded-full"></div>
              <span>Secure password reset process</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-2 h-2 bg-[#CD3937] rounded-full"></div>
              <span>Link expires in 24 hours</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-2 h-2 bg-[#CD3937] rounded-full"></div>
              <span>Account remains secure</span>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop"
              alt="Security illustration"
              width={500}
              height={300}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center space-y-6">
          <Link 
            href="/auth/login"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>

          <Card className="w-full max-w-md mx-auto shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex lg:hidden items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Code Advisor</h1>
              </div>
              
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Reset your password
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your email address and we'll send you a reset link
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 border-gray-200 focus:border-[#CD3937] focus:ring-[#CD3937]"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {forgotPasswordMutation.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">
                      {forgotPasswordMutation.error instanceof Error ? forgotPasswordMutation.error.message : 'Failed to send reset link'}
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-[#CD3937] hover:bg-[#CD3937]/90 text-white font-medium"
                  disabled={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending reset link...</span>
                    </div>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link 
                    href="/auth/login"
                    className="text-[#CD3937] hover:text-[#CD3937]/80 font-medium"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
