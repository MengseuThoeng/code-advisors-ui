'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dice1, RefreshCw, Zap, Star } from 'lucide-react'
import Image from 'next/image'

// Loading Animation Components
const NormalLoading1 = () => {
  const [dots, setDots] = useState('')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CD3937] mx-auto mb-4"></div>
      <p className="text-gray-700 text-lg">Compiling coffee into code{dots}</p>
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
      <div className="flex justify-center mb-4">
        <div className="animate-bounce mx-1">🐛</div>
        <div className="animate-bounce mx-1" style={{animationDelay: '0.1s'}}>🔧</div>
        <div className="animate-bounce mx-1" style={{animationDelay: '0.2s'}}>✨</div>
      </div>
      <p className="text-gray-700 text-lg">Debugging the matrix{dots}</p>
    </div>
  )
}

const NormalLoading3 = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 2)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-[#CD3937] h-2.5 rounded-full transition-all duration-100" 
          style={{width: `${progress}%`}}
        ></div>
      </div>
      <p className="text-gray-700 text-lg">Downloading more RAM... {progress}%</p>
    </div>
  )
}

const NormalLoading4 = () => {
  const [text, setText] = useState('')
  const fullText = 'while(true) { make_awesome(); }'
  
  useEffect(() => {
    const interval = setInterval(() => {
      setText(prev => {
        if (prev.length >= fullText.length) {
          return ''
        }
        return fullText.slice(0, prev.length + 1)
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <span>{text}</span>
        <span className="animate-pulse">|</span>
      </div>
      <p className="text-gray-700 text-lg">Teaching pixels to behave...</p>
    </div>
  )
}

const NormalLoading6 = () => {
  const [dots, setDots] = useState('')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="flex justify-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-[#CD3937] rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-[#CD3937] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-[#CD3937] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
      <p className="text-gray-700 text-lg">Convincing pixels to cooperate{dots}</p>
    </div>
  )
}

const NormalLoading7 = () => {
  const [flexboxStage, setFlexboxStage] = useState(0)
  const stages = ['�', '📦📦', '📦📦�', '✅ ALIGNED!']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFlexboxStage(prev => (prev + 1) % stages.length)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="text-4xl mb-4 font-mono">
        {stages[flexboxStage]}
      </div>
      <p className="text-gray-700 text-lg">Negotiating with CSS flexbox...</p>
    </div>
  )
}

const NormalLoading8 = () => {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const stages = [
    "Asking Stack Overflow...",
    "Reading documentation...",
    "Copying solution...",
    "Pretending I understand..."
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        if (newProgress >= 100) {
          setStage(prevStage => (prevStage + 1) % stages.length)
          return 0
        }
        return newProgress
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-orange-500 h-2.5 rounded-full transition-all duration-100" 
          style={{width: `${progress}%`}}
        ></div>
      </div>
      <p className="text-gray-700 text-lg">{stages[stage]}</p>
    </div>
  )
}

const NormalLoading9 = () => {
  const [npmStage, setNpmStage] = useState(0)
  const stages = [
    "npm install...",
    "⚠️  deprecated warnings",
    "📦 Installing dependencies",
    "🔍 Auditing packages", 
    "💸 Found 47 vulnerabilities"
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNpmStage(prev => (prev + 1) % stages.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
        <div className="text-left">
          <div>$ npm install</div>
          <div className="text-yellow-400">{stages[npmStage]}</div>
          <div className="animate-pulse">⠋ Installing...</div>
        </div>
      </div>
      <p className="text-gray-700 text-lg">Waiting for npm install...</p>
    </div>
  )
}

const NormalLoading10 = () => {
  const [timeLeft, setTimeLeft] = useState(999)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 999)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-8">
      <div className="text-6xl mb-4">📥</div>
      <div className="text-2xl font-mono text-blue-600 mb-2">{timeLeft}s</div>
      <p className="text-gray-700 text-lg">Installing Adobe Reader...</p>
      <p className="text-sm text-gray-500 mt-2">(Just kidding! 😄)</p>
    </div>
  )
}

// Special Loading (1.99%)
const SpecialLoading1 = () => {
  const [chars, setChars] = useState<string[]>([])
  
  useEffect(() => {
    const characters = '{}()<>;[]"\'`~!@#$%^&*'
    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev]
        if (newChars.length < 50) {
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
      <div className="h-32 overflow-hidden font-mono text-sm leading-tight">
        {chars.map((char, i) => (
          <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
            {char}
          </span>
        ))}
      </div>
      <p className="text-green-400 text-lg mt-4">ACCESSING MAINFRAME...</p>
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
        <p className="text-2xl font-bold">C0D3 4DV1S0R5</p>
      </div>
      <p className="text-gray-700 text-lg mt-4">SYSTEM OVERLOAD DETECTED...</p>
    </div>
  )
}

const SpecialLoading3 = () => {
  const [hologramIntensity, setHologramIntensity] = useState(0.5)
  const [scanLine, setScanLine] = useState(0)
  
  useEffect(() => {
    const intensityInterval = setInterval(() => {
      setHologramIntensity(prev => 0.3 + Math.sin(Date.now() / 500) * 0.3)
    }, 100)
    
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 2) % 100)
    }, 50)
    
    return () => {
      clearInterval(intensityInterval)
      clearInterval(scanInterval)
    }
  }, [])

  return (
    <div className="text-center p-8 bg-gradient-to-b from-cyan-900 to-blue-900 text-cyan-300 rounded-lg relative overflow-hidden">
      {/* Hologram scan line */}
      <div 
        className="absolute left-0 right-0 h-1 bg-cyan-400 opacity-80"
        style={{
          top: `${scanLine}%`,
          boxShadow: '0 0 10px #00ffff'
        }}
      />
      
      {/* Holographic grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({length: 64}).map((_, i) => (
            <div key={i} className="border border-cyan-400/30"></div>
          ))}
        </div>
      </div>
      
      <div 
        className="relative z-10"
        style={{
          opacity: hologramIntensity,
          textShadow: '0 0 10px #00ffff',
          filter: 'brightness(1.2)'
        }}
      >
        <Image
          src="/logo.jpg"
          alt="CodeAdvisors"
          width={80}
          height={80}
          className="mx-auto mb-4 rounded-xl opacity-80"
          style={{
            filter: 'hue-rotate(180deg) brightness(1.5)',
          }}
        />
        <h2 className="text-2xl font-bold mb-2 font-mono">HOLOGRAPHIC PROTOCOL</h2>
        <p className="text-lg">Projecting awesomeness...</p>
        <div className="mt-4 font-mono text-sm">
          <div className="text-green-400">█████████░ 90%</div>
          <div className="text-cyan-400">SIGNAL STRENGTH: MAXIMUM</div>
        </div>
      </div>
    </div>
  )
}

// ULTRA RARE Loading (0.01%) - PROFESSIONAL LEGENDARY
const UltraRareLoading = () => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  
  const steps = [
    "Initializing quantum processors...",
    "Calibrating neural networks...",
    "Establishing secure connections...",
    "Optimizing performance algorithms...",
    "Finalizing system architecture..."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setShowComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1)
      }
    }, 1000)

    return () => clearInterval(stepInterval)
  }, [])

  return (
    <div className="relative p-8 bg-gradient-to-br from-[#000040] via-gray-900 to-black text-white rounded-lg overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
      
      {/* Subtle geometric pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#CD3937]/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#CD3937]/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rotate-12 animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-md">
        {showComplete ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto border-4 border-[#CD3937] rounded-full flex items-center justify-center bg-gradient-to-br from-[#CD3937]/20 to-transparent">
                <svg className="w-10 h-10 text-[#CD3937]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#CD3937] rounded-full animate-ping"></div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">System Optimized</h2>
              <p className="text-gray-300">Advanced processing complete</p>
              
              <div className="bg-gradient-to-r from-[#000040]/50 to-gray-800/50 p-4 rounded-lg border border-[#CD3937]/30">
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Performance:</span>
                    <span className="text-[#CD3937]">99.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className="text-[#CD3937]">Optimal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400">Ready</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Ultra-rare optimization process • Probability: 0.01%
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <div className="w-16 h-16 mx-auto border-4 border-[#CD3937] border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 mx-auto mt-2 border-2 border-white/30 border-t-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Advanced Processing</h2>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#CD3937] to-[#000040] h-2 rounded-full transition-all duration-300 ease-out"
                  style={{width: `${progress}%`}}
                />
              </div>
              
              <div className="bg-black/50 p-3 rounded-lg font-mono text-sm text-left">
                <div className="text-[#CD3937] mb-2">[SYSTEM] Advanced Mode Active</div>
                {steps.slice(0, currentStep + 1).map((step, index) => (
                  <div key={index} className={`text-gray-300 ${index === currentStep ? 'animate-pulse' : 'opacity-60'}`}>
                    {index === currentStep ? '> ' : '✓ '}{step}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progress: {progress}%</span>
                <span>Ultra-rare process</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LoadingTestPage() {
  const [selectedLoading, setSelectedLoading] = useState<string | null>(null)
  const [randomCount, setRandomCount] = useState(0)
  const [lastRandom, setLastRandom] = useState<string>('')

  const loadingTypes = [
    { id: 'normal1', name: 'Coffee Code', component: NormalLoading1, rarity: 'normal', chance: '11.1%' },
    { id: 'normal2', name: 'Debug Matrix', component: NormalLoading2, rarity: 'normal', chance: '11.1%' },
    { id: 'normal3', name: 'Download RAM', component: NormalLoading3, rarity: 'normal', chance: '11.1%' },
    { id: 'normal4', name: 'Code Typing', component: NormalLoading4, rarity: 'normal', chance: '11.1%' },
    { id: 'normal10', name: 'Adobe Reader', component: NormalLoading10, rarity: 'normal', chance: '11.1%' },
    { id: 'normal6', name: 'Pixel Cooperation', component: NormalLoading6, rarity: 'normal', chance: '11.1%' },
    { id: 'normal7', name: 'Flexbox Fight', component: NormalLoading7, rarity: 'normal', chance: '11.1%' },
    { id: 'normal8', name: 'Stack Overflow', component: NormalLoading8, rarity: 'normal', chance: '11.1%' },
    { id: 'normal9', name: 'NPM Install', component: NormalLoading9, rarity: 'normal', chance: '11.1%' },
    { id: 'special1', name: 'Matrix Rain', component: SpecialLoading1, rarity: 'special', chance: '0.7%' },
    { id: 'special2', name: 'Glitch Logo', component: SpecialLoading2, rarity: 'special', chance: '0.7%' },
    { id: 'special3', name: 'Hologram', component: SpecialLoading3, rarity: 'special', chance: '0.59%' },
    { id: 'ultra1', name: 'LEGENDARY', component: UltraRareLoading, rarity: 'ultra', chance: '0.01%' },
  ]

  const getRandomLoading = () => {
    const random = Math.random() * 100
    
    if (random < 0.01) {
      // Ultra rare (0.01%)
      return loadingTypes.find(l => l.rarity === 'ultra')!
    } else if (random < 2.0) {
      // Special (1.99%)
      const specials = loadingTypes.filter(l => l.rarity === 'special')
      return specials[Math.floor(Math.random() * specials.length)]
    } else {
      // Normal (98%)
      const normals = loadingTypes.filter(l => l.rarity === 'normal')
      return normals[Math.floor(Math.random() * normals.length)]
    }
  }

  const testRandom = () => {
    const result = getRandomLoading()
    setSelectedLoading(result.id)
    setLastRandom(result.name)
    setRandomCount(prev => prev + 1)
  }

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'normal': return 'bg-gray-500'
      case 'special': return 'bg-blue-500'
      case 'ultra': return 'bg-gradient-to-r from-purple-500 to-pink-500'
      default: return 'bg-gray-500'
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch(rarity) {
      case 'normal': return <Dice1 className="h-4 w-4" />
      case 'special': return <Star className="h-4 w-4" />
      case 'ultra': return <Zap className="h-4 w-4" />
      default: return <Dice1 className="h-4 w-4" />
    }
  }

  const SelectedComponent = selectedLoading 
    ? loadingTypes.find(l => l.id === selectedLoading)?.component 
    : null

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#000040] mb-4">
            🎰 Loading Test Laboratory
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Test all loading animations and the random lottery system!
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              onClick={testRandom}
              className="bg-[#CD3937] hover:bg-[#CD3937]/90"
              size="lg"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Roll Random Loading
            </Button>
            <Button 
              onClick={() => setSelectedLoading(null)}
              variant="outline"
              size="lg"
            >
              Clear Selection
            </Button>
          </div>

          {randomCount > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <p className="text-sm text-gray-600">
                Random Tests: {randomCount} | Last Result: <strong>{lastRandom}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Selected Loading Preview */}
        {selectedLoading && SelectedComponent && (
          <Card className="mb-8 border-2 border-[#CD3937]">
            <CardHeader>
              <CardTitle className="text-center text-[#000040]">
                Currently Showing: {loadingTypes.find(l => l.id === selectedLoading)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg">
                <SelectedComponent />
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Loading Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingTypes.map((loading) => {
            const Component = loading.component
            return (
              <Card 
                key={loading.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLoading === loading.id ? 'ring-2 ring-[#CD3937]' : ''
                }`}
                onClick={() => setSelectedLoading(loading.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{loading.name}</CardTitle>
                    <Badge className={`${getRarityColor(loading.rarity)} text-white`}>
                      <div className="flex items-center gap-1">
                        {getRarityIcon(loading.rarity)}
                        {loading.chance}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg min-h-[200px] flex items-center justify-center">
                    <Component />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Statistics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📊 Probability System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">98%</div>
                <div className="text-sm">Normal Loadings</div>
                <div className="text-xs text-gray-500">9 hilarious animations</div>
              </div>
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1.99%</div>
                <div className="text-sm">Special Loadings</div>
                <div className="text-xs text-gray-500">Matrix, Glitch & Hologram</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">0.01%</div>
                <div className="text-sm">ULTRA RARE</div>
                <div className="text-xs text-gray-500">Legendary experience!</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
