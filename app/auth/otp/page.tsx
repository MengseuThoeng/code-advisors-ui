'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, RefreshCw, CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'

export default function OTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer for resend countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newOtp = [...otp]
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/\d/.test(pastedData[i])) {
        newOtp[i] = pastedData[i]
      }
    }
    
    setOtp(newOtp)
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '')
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      alert('Please enter all 6 digits')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsVerified(true)
      
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = '/auth/login'
      }, 2000)
    }, 2000)
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setCanResend(false)
    setTimeLeft(60)
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      console.log('OTP resent')
    }, 1000)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 text-center">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Verification Successful!</h2>
              <p className="text-gray-600">Your account has been verified successfully.</p>
            </div>
            
            <div className="w-8 h-8 border-2 border-[#CD3937]/30 border-t-[#CD3937] rounded-full animate-spin mx-auto"></div>
            
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col justify-center items-center space-y-8 px-8">
          <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-[#000040]/10 to-[#CD3937]/10 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-[#000040]/20 to-[#CD3937]/20 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-full flex items-center justify-center">
                  <Shield className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Secure Verification
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              We've sent a 6-digit verification code to your email address to ensure account security.
            </p>
          </div>
        </div>

        {/* Right Side - OTP Form */}
        <div className="flex flex-col justify-center space-y-6">
          <Link 
            href="/auth/register"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to registration
          </Link>

          <Card className="w-full max-w-md mx-auto shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              
              <CardTitle className="text-2xl font-bold text-gray-900">
                Verify your email
              </CardTitle>
              <CardDescription className="text-gray-600">
                We've sent a verification code to<br />
                <span className="font-medium text-gray-900">john@example.com</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 text-center">
                    Enter verification code
                  </label>
                  
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-12 text-center text-lg font-semibold border-gray-200 focus:border-[#CD3937] focus:ring-[#CD3937]"
                      />
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-[#CD3937] hover:bg-[#CD3937]/90 text-white font-medium"
                  disabled={isLoading || otp.join('').length !== 6}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify Email'
                  )}
                </Button>
              </form>

              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                </p>
                
                {canResend ? (
                  <Button
                    variant="outline"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-[#CD3937] border-[#CD3937] hover:bg-[#CD3937]/5"
                  >
                    {isResending ? (
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Resending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>Resend Code</span>
                      </div>
                    )}
                  </Button>
                ) : (
                  <p className="text-sm text-gray-500">
                    Resend code in <span className="font-medium text-[#CD3937]">{timeLeft}s</span>
                  </p>
                )}
              </div>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Wrong email address?{' '}
                  <Link 
                    href="/auth/register"
                    className="text-[#CD3937] hover:text-[#CD3937]/80 font-medium"
                  >
                    Change email
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
