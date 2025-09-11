'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, Search, Code, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Hide navbar and sidebar by manipulating DOM
    const navbar = document.querySelector('header');
    const sidebar = document.querySelector('[data-sidebar]');
    if (navbar) navbar.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    
    // Cleanup on unmount
    return () => {
      if (navbar) navbar.style.display = '';
      if (sidebar) sidebar.style.display = '';
    };
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen bg-gradient-to-br from-[#000040] via-[#1a1a5c] to-[#000040] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#CD3937] to-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-[#CD3937] to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="CodeAdvisors Logo"
              width={80}
              height={80}
              className="rounded-xl shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
            CodeAdvisors
          </h1>
        </div>

        {/* Main Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {/* 404 Animation */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="relative">
                  <AlertTriangle className="h-20 w-20 text-[#CD3937] animate-pulse" />
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-[#CD3937] rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-bounce">
                404
              </h2>
              
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Page Not Found
              </h3>
              
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Oops! The page you're looking for seems to have wandered off into the digital void. 
                Don't worry, even the best developers hit 404s sometimes! 🚀
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/home">
                <Button 
                  size="lg" 
                  className="bg-[#CD3937] hover:bg-[#CD3937]/90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/forum">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Code className="mr-2 h-5 w-5" />
                  Browse Forum
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="border-t border-white/20 pt-8">
              <p className="text-gray-300 mb-4 font-medium">
                Looking for something specific?
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Link href="/content">
                  <div className="group p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <Sparkles className="h-6 w-6 text-[#CD3937] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white text-sm font-medium">Articles</p>
                  </div>
                </Link>
                
                <Link href="/users">
                  <div className="group p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <Search className="h-6 w-6 text-[#CD3937] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white text-sm font-medium">Developers</p>
                  </div>
                </Link>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="group p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <RefreshCw className="h-6 w-6 text-[#CD3937] mx-auto mb-2 group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" />
                  <p className="text-white text-sm font-medium">Try Again</p>
                </button>
              </div>
            </div>

            {/* Fun Error Messages */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-gray-300 text-sm italic">
                💡 Pro tip: Check the URL for typos, or use our navigation to find what you need!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CodeAdvisors. Built with ❤️ for the coding community.
          </p>
        </div>
      </div>
    </div>
  )
}
