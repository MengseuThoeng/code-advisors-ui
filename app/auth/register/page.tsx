'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Github, Mail, Lock, User, UserPlus, Code, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Registration:', formData)
      // Redirect to OTP page
      window.location.href = '/auth/otp'
    }, 2000)
  }

  const handleGoogleSignup = () => {
    console.log('Google signup')
  }

  const handleGithubSignup = () => {
    console.log('GitHub signup')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000040' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Stunning Branding */}
          <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-12 p-16">
            {/* Logo Section */}
            <div className="relative group">
              <div className="w-40 h-40 bg-gradient-to-br from-secondary via-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-secondary/25 transition-transform group-hover:scale-105 duration-300 relative overflow-hidden">
                {/* Logo background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <Image
                  src="/logo1.png"
                  alt="CodeAdvisors Logo"
                  width={100}
                  height={100}
                  className="object-contain filter brightness-0 invert relative z-10"
                />
                
                {/* Floating decorative elements */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full animate-bounce shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-1/2 -right-4 w-4 h-4 bg-secondary rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Brand Text */}
            <div className="space-y-6">
              <h1 className="text-6xl font-bold">
                <span className="text-secondary">Join</span><br />
                <span className="text-primary">CodeAdvisors</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Start your journey with thousands of developers sharing knowledge and building amazing things together
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-6 max-w-md w-full">
              <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center shadow-lg">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Free to Join</h3>
                  <p className="text-sm text-gray-600">No hidden fees, forever free</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Learn & Grow</h3>
                  <p className="text-sm text-gray-600">Access to premium content and tutorials</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Build Network</h3>
                  <p className="text-sm text-gray-600">Connect with industry professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Register Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
              <CardHeader className="text-center pb-8">
                {/* Mobile Logo */}
                <div className="lg:hidden flex justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-2xl">
                    <Image
                      src="/logo1.png"
                      alt="CodeAdvisors Logo"
                      width={60}
                      height={60}
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>
                
                <CardTitle className="text-4xl font-bold text-gray-900 mb-2">Create Account</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Join our amazing developer community today!
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Social Signup Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleGoogleSignup}
                    className="h-14 border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleGithubSignup}
                    className="h-14 border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <Github className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-white px-6 text-gray-500 font-semibold tracking-wider">Or create with email</span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Mengseu"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="pl-12 h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base rounded-xl"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">Last Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Thoeng"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="pl-12 h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="codeadvisors2025@gmail.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-12 h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-12 pr-12 h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-12 pr-12 h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                      className="w-5 h-5 mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer font-medium leading-relaxed">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary hover:text-primary/80 font-semibold underline">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-primary hover:text-primary/80 font-semibold underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-bold text-lg rounded-xl shadow-xl shadow-secondary/25 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
                    disabled={isLoading || !agreeToTerms}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating your account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <UserPlus className="w-5 h-5" />
                        <span>Create My Account</span>
                      </div>
                    )}
                  </Button>
                </form>

                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-gray-600 text-base">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-primary hover:text-primary/80 font-bold transition-colors hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
