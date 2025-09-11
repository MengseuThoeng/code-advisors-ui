'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RandomLoadingSystem, { useRandomLoading } from '@/components/RandomLoadingSystem'
import ExampleFormWithLoading from '@/components/examples/ExampleFormWithLoading'

export default function LoadingDemoPage() {
  const { isLoading, startLoading, stopLoading } = useRandomLoading()
  const [loadingOverlay, setLoadingOverlay] = useState(false)

  const simulateAction = async () => {
    startLoading()
    // Simulate some async action (API call, data loading, etc.)
    await new Promise(resolve => setTimeout(resolve, 3000))
    stopLoading()
  }

  const simulateOverlayLoading = async () => {
    setLoadingOverlay(true)
    // Simulate some async action
    await new Promise(resolve => setTimeout(resolve, 4000))
    setLoadingOverlay(false)
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="ml-[320px] px-8 py-4 pt-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#000040]">
                🎲 Random Loading System Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Experience the fun random loading animations with different probability tiers:
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-gray-700">98%</div>
                  <div className="text-sm">Normal Loading</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="font-bold text-blue-600">1.99%</div>
                  <div className="text-sm">Special Loading</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <div className="font-bold text-purple-600">0.01%</div>
                  <div className="text-sm">Ultra Rare</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inline Loading Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Inline Loading Example</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Click the button to trigger a random loading animation inline:
              </p>
              
              <Button 
                onClick={simulateAction}
                disabled={isLoading}
                className="bg-[#CD3937] hover:bg-[#CD3937]/90"
              >
                {isLoading ? 'Loading...' : 'Trigger Random Loading'}
              </Button>
              
              {isLoading && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg">
                  <RandomLoadingSystem size="md" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Overlay Loading Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Full Screen Overlay Example</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Click to trigger a full-screen loading overlay:
              </p>
              
              <Button 
                onClick={simulateOverlayLoading}
                disabled={loadingOverlay}
                className="bg-[#000040] hover:bg-[#000040]/90"
              >
                {loadingOverlay ? 'Loading...' : 'Trigger Overlay Loading'}
              </Button>
            </CardContent>
          </Card>

          {/* Real-world Example */}
          <Card>
            <CardHeader>
              <CardTitle>Real-world Example: Form with Random Loading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                This demonstrates how to integrate the random loading system into a form submission:
              </p>
              <ExampleFormWithLoading />
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use in Your App</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                <div className="text-gray-400">// Method 1: Using the hook</div>
                <div>const {`{ isLoading, startLoading, stopLoading }`} = useRandomLoading()</div>
                <br />
                <div className="text-gray-400">// Method 2: Direct component</div>
                <div>{`<RandomLoadingSystem size="lg" />`}</div>
                <br />
                <div className="text-gray-400">// Method 3: Route-level loading (automatic)</div>
                <div>// Just add loading.tsx files to your route folders!</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-green-50 rounded border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Already Implemented</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Global app loading</li>
                    <li>• Home page loading</li>
                    <li>• Forum page loading</li>
                    <li>• Content page loading</li>
                    <li>• Reusable component</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🎯 Usage Examples</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Form submissions</li>
                    <li>• API data fetching</li>
                    <li>• File uploads</li>
                    <li>• Route transitions</li>
                    <li>• Any async operations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Loading Overlay */}
      {loadingOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <RandomLoadingSystem size="lg" />
          </div>
        </div>
      )}
    </main>
  )
}
