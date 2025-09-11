'use client'

import { useState, useEffect } from 'react'
import { Dice1, Star, Zap } from 'lucide-react'
import Image from 'next/image'

// Normal Loading Components (98% chance)
const NormalLoading1 = () => {
  const [coffeeLevel, setCoffeeLevel] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCoffeeLevel(prev => (prev + 10) % 101)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="text-6xl mb-4">☕</div>
      <p className="text-[#000040] text-lg mb-4">Brewing perfect code...</p>
      <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto">
        <div 
          className="bg-[#CD3937] h-2 rounded-full transition-all duration-300"
          style={{width: `${coffeeLevel}%`}}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">{coffeeLevel}% caffeinated</p>
    </div>
  )
}

const NormalLoading2 = () => {
  const [dots, setDots] = useState('')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="text-4xl mb-4 text-[#000040]">🐛</div>
      <p className="text-[#000040] text-lg">Debugging the matrix{dots}</p>
      <p className="text-sm text-gray-600 mt-2">Please wait while we fix reality</p>
    </div>
  )
}

const NormalLoading3 = () => {
  const [ramProgress, setRamProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRamProgress(prev => (prev + 5) % 101)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="text-4xl mb-4 text-[#CD3937]">💾</div>
      <p className="text-[#000040] text-lg mb-4">Downloading more RAM...</p>
      <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto">
        <div 
          className="bg-[#CD3937] h-2 rounded-full transition-all duration-200"
          style={{width: `${ramProgress}%`}}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">{ramProgress}% downloaded</p>
    </div>
  )
}

const NormalLoading4 = () => {
  const [code, setCode] = useState('')
  const codeSnippets = ['console.log("Hello");', 'function load() {', '  return awesome;', '}']
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < codeSnippets.length) {
        setCode(codeSnippets[index])
        index++
      } else {
        index = 0
      }
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="text-4xl mb-4">⌨️</div>
      <p className="text-[#000040] text-lg mb-4">Writing amazing code...</p>
      <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
        {code}<span className="animate-pulse">|</span>
      </div>
    </div>
  )
}

const NormalLoading5 = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 8) % 101)
    }, 250)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="text-4xl mb-4 text-[#CD3937]">🎯</div>
      <p className="text-[#000040] text-lg mb-4">Convincing pixels to cooperate...</p>
      <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto">
        <div 
          className="bg-gradient-to-r from-[#000040] to-[#CD3937] h-2 rounded-full transition-all duration-300"
          style={{width: `${progress}%`}}
        />
      </div>
    </div>
  )
}

// Special Loading Components (1.99% chance)
const SpecialLoading1 = () => {
  const [chars, setChars] = useState<string[]>([])
  
  useEffect(() => {
    const characters = '01'
    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev]
        if (newChars.length < 30) {
          newChars.push(characters[Math.floor(Math.random() * characters.length)])
        } else {
          newChars.shift()
          newChars.push(characters[Math.floor(Math.random() * characters.length)])
        }
        return newChars
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8 bg-black text-green-400 rounded-lg">
      <div className="h-24 overflow-hidden font-mono text-sm leading-tight">
        {chars.map((char, i) => (
          <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
            {char}
          </span>
        ))}
      </div>
      <p className="text-green-400 text-lg mt-4">MATRIX MODE ACTIVATED...</p>
    </div>
  )
}

const SpecialLoading2 = () => {
  const [glitch, setGlitch] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(prev => !prev)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className={`transition-all duration-200 ${glitch ? 'transform translate-x-2 text-red-500' : 'text-[#000040]'}`}>
        <Image
          src="/logo.jpg"
          alt="CodeAdvisors"
          width={80}
          height={80}
          className={`mx-auto mb-4 rounded-xl ${glitch ? 'filter hue-rotate-180' : ''}`}
        />
        <p className="text-lg">System experiencing anomaly...</p>
      </div>
    </div>
  )
}

const SpecialLoading3 = () => {
  const [scanLine, setScanLine] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 10) % 100)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative text-center p-8 bg-gradient-to-br from-[#000040] via-blue-900 to-black text-white rounded-lg overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({length: 64}).map((_, i) => (
            <div key={i} className="border border-[#CD3937]/30"></div>
          ))}
        </div>
      </div>
      
      {/* Scanning line */}
      <div 
        className="absolute left-0 w-full h-1 bg-[#CD3937] shadow-lg transition-all duration-150"
        style={{top: `${scanLine}%`, boxShadow: '0 0 20px #CD3937'}}
      />
      
      <div className="relative z-10">
        <div className="text-4xl mb-4 text-[#CD3937]">◉</div>
        <p className="text-white text-lg">Holographic projection loading...</p>
        <p className="text-sm text-[#CD3937] mt-2">Advanced display protocol</p>
      </div>
    </div>
  )
}

// Ultra Rare Loading (0.01% chance)
const UltraRareLoading = () => {
  const [progress, setProgress] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setShowComplete(true)
          return 100
        }
        return prev + 3
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative p-8 bg-gradient-to-br from-[#000040] via-gray-900 to-black text-white rounded-lg overflow-hidden min-h-[250px] flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-[#CD3937]/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-white/20 rotate-12 animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-sm">
        {showComplete ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto border-4 border-[#CD3937] rounded-full flex items-center justify-center bg-gradient-to-br from-[#CD3937]/20 to-transparent">
              <svg className="w-8 h-8 text-[#CD3937]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Advanced Process Complete</h2>
            <p className="text-sm text-gray-400">Ultra-rare optimization • 0.01% probability</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto border-4 border-[#CD3937] border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-lg font-semibold text-white">Advanced Processing</h2>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-[#CD3937] to-[#000040] h-1 rounded-full transition-all duration-300"
                style={{width: `${progress}%`}}
              />
            </div>
            <p className="text-xs text-gray-400">Ultra-rare process active</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Random Loading System Component
interface RandomLoadingSystemProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function RandomLoadingSystem({ className = '', size = 'md' }: RandomLoadingSystemProps) {
  const [LoadingComponent, setLoadingComponent] = useState<React.ComponentType | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const loadingComponents = [
    // Normal loadings (98%)
    { component: NormalLoading1, rarity: 'normal', weight: 98 },
    { component: NormalLoading2, rarity: 'normal', weight: 98 },
    { component: NormalLoading3, rarity: 'normal', weight: 98 },
    { component: NormalLoading4, rarity: 'normal', weight: 98 },
    { component: NormalLoading5, rarity: 'normal', weight: 98 },
    
    // Special loadings (1.99%)
    { component: SpecialLoading1, rarity: 'special', weight: 1.99 },
    { component: SpecialLoading2, rarity: 'special', weight: 1.99 },
    { component: SpecialLoading3, rarity: 'special', weight: 1.99 },
    
    // Ultra rare loading (0.01%)
    { component: UltraRareLoading, rarity: 'ultra', weight: 0.01 }
  ]

  const getRandomLoading = () => {
    const random = Math.random() * 100
    
    if (random < 0.01) {
      // Ultra rare (0.01%)
      return loadingComponents.find(l => l.rarity === 'ultra')!.component
    } else if (random < 2.0) {
      // Special (1.99%)
      const specials = loadingComponents.filter(l => l.rarity === 'special')
      return specials[Math.floor(Math.random() * specials.length)].component
    } else {
      // Normal (98%)
      const normals = loadingComponents.filter(l => l.rarity === 'normal')
      return normals[Math.floor(Math.random() * normals.length)].component
    }
  }

  useEffect(() => {
    // Set random loading component when mounted
    const selectedComponent = getRandomLoading()
    setLoadingComponent(() => selectedComponent)
    setIsVisible(true)
  }, [])

  const sizeClasses = {
    sm: 'min-h-[150px]',
    md: 'min-h-[200px]',
    lg: 'min-h-[300px]'
  }

  if (!LoadingComponent || !isVisible) {
    return (
      <div className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}>
        <div className="w-8 h-8 border-4 border-[#CD3937] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <LoadingComponent />
    </div>
  )
}

// Hook for using the random loading system
export const useRandomLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    RandomLoadingComponent: isLoading ? RandomLoadingSystem : null
  }
}
