'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRandomLoading } from '@/components/RandomLoadingSystem'

export default function ExampleFormWithLoading() {
  const { isLoading, startLoading, stopLoading } = useRandomLoading()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Start the random loading animation
    startLoading()
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Success - reset form
      setFormData({ title: '', content: '', tags: '' })
      alert('Content created successfully!')
      
    } catch (error) {
      console.error('Error:', error)
      alert('Error creating content')
    } finally {
      // Stop loading animation
      stopLoading()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          {/* The RandomLoadingSystem component will be displayed automatically */}
          <div className="text-center text-gray-600 mt-4">
            <p>Creating your content...</p>
            <p className="text-sm text-gray-500 mt-2">
              Experience may vary - you might see something special! 🎲
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-[#000040]">Create New Content</CardTitle>
        <p className="text-gray-600">Submit this form to see the random loading system in action!</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter content title..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your content here..."
              rows={6}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="javascript, react, nextjs..."
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#CD3937] hover:bg-[#CD3937]/90"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Content & See Random Loading!'}
          </Button>
          
          <div className="text-xs text-gray-500 text-center">
            Each submission triggers a random loading animation from our collection!
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
