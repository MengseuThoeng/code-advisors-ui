'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  History, 
  Clock, 
  BookOpen, 
  Filter,
  Calendar,
  Trash2,
  Download,
  TrendingUp,
  BarChart3,
  Eye,
  Bookmark,
  Share2
} from 'lucide-react'
import Image from 'next/image'

// Mock data
const mockHistory = [
  {
    id: 1,
    title: "Top 5 JavaScript Features You're Not Using Enough",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
    readTime: "3 min read",
    upvotes: "123 upvotes",
    date: new Date().toISOString(), // Today
    category: "JavaScript"
  },
  {
    id: 2,
    title: "Advanced TypeScript Techniques for Better Code",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
    readTime: "5 min read",
    upvotes: "87 upvotes",
    date: new Date().toISOString(), // Today
    category: "TypeScript"
  },
  {
    id: 3,
    title: "Building Responsive Layouts with CSS Grid",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    readTime: "4 min read",
    upvotes: "105 upvotes",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    category: "CSS"
  },
  {
    id: 4,
    title: "React Hooks: A Comprehensive Guide",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    readTime: "6 min read",
    upvotes: "142 upvotes",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    category: "React"
  },
  {
    id: 5,
    title: "Optimizing Performance in Next.js Applications",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    readTime: "8 min read",
    upvotes: "98 upvotes",
    date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    category: "Next.js"
  },
  {
    id: 6,
    title: "Understanding Docker for Frontend Developers",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=200&fit=crop",
    readTime: "7 min read",
    upvotes: "156 upvotes",
    date: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
    category: "DevOps"
  }
]

const mockSearchTags = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'react', label: 'React' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'css', label: 'CSS' },
  { id: 'devops', label: 'DevOps' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' }
]

function groupByDate(items: typeof mockHistory) {
  const groups: { [key: string]: typeof mockHistory } = {
    'Today': [],
    'Yesterday': [],
    'This Week': [],
    'Older': []
  }

  const today = new Date()
  const yesterday = new Date(Date.now() - 86400000)
  const weekAgo = new Date(Date.now() - 7 * 86400000)

  items.forEach(item => {
    const itemDate = new Date(item.date)
    if (itemDate.toDateString() === today.toDateString()) {
      groups['Today'].push(item)
    } else if (itemDate.toDateString() === yesterday.toDateString()) {
      groups['Yesterday'].push(item)
    } else if (itemDate >= weekAgo) {
      groups['This Week'].push(item)
    } else {
      groups['Older'].push(item)
    }
  })

  return groups
}

function HistoryCard({ item, onBookmark, onRemove, onShare }: {
  item: typeof mockHistory[0]
  onBookmark: () => void
  onRemove: () => void
  onShare: () => void
}) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={item.thumbnail}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
              {item.title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {item.readTime}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {item.upvotes}
              </div>
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBookmark}
              className="h-8 w-8 p-0"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onShare}
              className="h-8 w-8 p-0"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleTagClick = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  const handleBookmark = (id: number) => {
    console.log('Bookmark:', id)
  }

  const handleRemove = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }

  const handleShare = (id: number) => {
    console.log('Share:', id)
  }

  const handleClearAll = () => {
    setHistory([])
  }

  const groupedHistory = groupByDate(history)
  const totalArticles = history.length
  const totalReadingTime = history.reduce((acc, item) => acc + (parseInt(item.readTime) || 5), 0)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="ml-[320px] px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#000040] to-[#CD3937] rounded-lg flex items-center justify-center">
                    <History className="w-6 h-6 text-white" />
                  </div>
                  Reading History
                </h1>
                <p className="text-gray-600">Track your reading journey and discover insights</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                  onClick={handleClearAll}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Articles</p>
                      <p className="text-3xl font-bold text-gray-900">{totalArticles}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Reading Time</p>
                      <p className="text-3xl font-bold text-gray-900">{totalReadingTime}m</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-3xl font-bold text-gray-900">{groupedHistory['This Week']?.length || 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg per Day</p>
                      <p className="text-3xl font-bold text-gray-900">{Math.round(totalArticles / 7)}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[320px] px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="reading" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="reading" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Reading History
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reading" className="space-y-8">
              {/* Search and Filter */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="search"
                        placeholder="Search your reading history..."
                        className="pl-10 border-gray-200 focus:border-[#CD3937]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reading History Content */}
              {history.length === 0 ? (
                <Card className="border-0 shadow-md">
                  <CardContent className="py-20">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Reading History</h3>
                      <p className="text-gray-600 mb-6">Start reading articles to build your history</p>
                      <Button className="bg-[#CD3937] hover:bg-[#CD3937]/90">
                        Explore Articles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedHistory).map(([date, items]) => 
                    items.length > 0 && (
                      <div key={date} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[#CD3937]" />
                          <h2 className="text-xl font-semibold text-gray-900">{date}</h2>
                          <Badge variant="secondary" className="ml-2">
                            {items.length} article{items.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <div className="grid gap-4">
                          {items.map((item) => (
                            <HistoryCard
                              key={item.id}
                              item={item}
                              onBookmark={() => handleBookmark(item.id)}
                              onRemove={() => handleRemove(item.id)}
                              onShare={() => handleShare(item.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="search" className="space-y-8">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-[#CD3937]" />
                    <h3 className="text-lg font-semibold">Search by Topics</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {mockSearchTags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => handleTagClick(tag.id)}
                          className="focus:outline-none"
                        >
                          <Badge
                            variant="outline"
                            className={`border-gray-300 text-gray-700 text-xs rounded-md font-medium hover:bg-[#CD3937] hover:text-white hover:border-[#CD3937] transition-colors ${
                              selectedTags.includes(tag.id) 
                                ? 'bg-[#CD3937] text-white border-[#CD3937]' 
                                : ''
                            }`}
                          >
                            {tag.label}
                          </Badge>
                        </button>
                      ))}
                    </div>
                    
                    {selectedTags.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600">Select topics above to filter your search history</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600">Filtered results for:</p>
                          {selectedTags.map(tagId => {
                            const tag = mockSearchTags.find(t => t.id === tagId)
                            return tag ? (
                              <Badge key={tagId} variant="secondary">
                                {tag.label}
                              </Badge>
                            ) : null
                          })}
                        </div>
                        <div className="text-center py-8">
                          <p className="text-gray-500">Filtered articles will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
