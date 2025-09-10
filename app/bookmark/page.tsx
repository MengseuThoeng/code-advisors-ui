'use client'

import { useState } from "react"
import { 
  Bookmark, 
  BookmarkCheck, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Heart, 
  MessageSquare, 
  Eye, 
  Clock,
  Tag,
  Calendar,
  User,
  ExternalLink,
  Trash2,
  MoreHorizontal
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

const mockArticles = [
  {
    id: 1,
    title: "Advanced React Patterns: Building Scalable Applications",
    description: "Learn about compound components, render props, and custom hooks to build maintainable React applications that scale with your team.",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["React", "JavaScript", "Frontend"],
    author: "Sarah Chen",
    publishedAt: "2024-03-15",
    readTime: 8,
    views: 12543,
    likes: 89,
    bookmarkedAt: "2024-03-16",
    type: "article"
  },
  {
    id: 2,
    title: "Docker Tutorial: Master Containers from Scratch",
    description: "Complete guide to Docker containerization, from basic concepts to advanced orchestration with Docker Compose and production deployment.",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["Docker", "DevOps", "Containers"],
    author: "Mike Johnson",
    publishedAt: "2024-03-10",
    readTime: 12,
    views: 8745,
    likes: 156,
    bookmarkedAt: "2024-03-12",
    type: "article"
  },
  {
    id: 3,
    title: "Node.js Performance Optimization Techniques",
    description: "Deep dive into Node.js performance optimization, covering event loop understanding, memory management, and scaling strategies.",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["Node.js", "Performance", "Backend"],
    author: "Alex Kim",
    publishedAt: "2024-03-08",
    readTime: 10,
    views: 6234,
    likes: 78,
    bookmarkedAt: "2024-03-09",
    type: "article"
  }
]

const mockForumPosts = [
  {
    id: 1,
    author: {
      name: "David Wilson",
      avatar: "/user.jpg",
      username: "daviddev"
    },
    title: "What's the difference between Java and JavaScript in 2024?",
    description: "I'm a beginner developer and keep hearing about Java and JavaScript. Can someone explain the key differences and which one I should learn first for web development?",
    tags: ["Java", "JavaScript", "Beginner"],
    metrics: {
      views: 1250,
      likes: 45,
      comments: 23
    },
    timeAgo: "2 hours ago",
    bookmarkedAt: "2024-03-16",
    type: "forum"
  },
  {
    id: 2,
    author: {
      name: "Emma Rodriguez",
      avatar: "/user.jpg",
      username: "emmacode"
    },
    title: "Best practices for React state management in 2024?",
    description: "Working on a large React application and wondering about the current best practices for state management. Should I use Redux, Zustand, or stick with Context API?",
    tags: ["React", "State Management", "Redux"],
    metrics: {
      views: 890,
      likes: 67,
      comments: 34
    },
    timeAgo: "5 hours ago",
    bookmarkedAt: "2024-03-15",
    type: "forum"
  }
]

export default function BookmarkPage() {
  const [articles, setArticles] = useState(mockArticles)
  const [forumPosts, setForumPosts] = useState(mockForumPosts)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("article")

  const filteredArticles = articles.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredForumPosts = forumPosts.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRemoveBookmark = (id: number, type: string) => {
    if (type === "article") {
      setArticles(articles.filter(article => article.id !== id))
    } else {
      setForumPosts(forumPosts.filter(post => post.id !== id))
    }
  }

  const ArticleBookmarkCard = ({ article }: { article: any }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden bg-white">
      <div className="relative">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          fallbackClassName="w-full h-48"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={() => handleRemoveBookmark(article.id, "article")}
          >
            <Bookmark className="w-4 h-4 fill-current text-[#CD3937]" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Article
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Bookmark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            {article.readTime} min read
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Avatar className="w-6 h-6">
              <AvatarImage src="/user.jpg" alt={article.author} />
              <AvatarFallback className="text-xs bg-[#000040] text-white">
                {article.author?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          
          <Link href={`/content/${article.id}`}>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#CD3937] transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {article.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs hover:bg-[#000040] hover:text-white transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{article.likes}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Saved {new Date(article.bookmarkedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ForumBookmarkCard = ({ post }: { post: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback className="bg-[#000040] text-white">
              {post.author.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-[#CD3937] transition-colors">
                  {post.author.name}
                </h4>
                <p className="text-sm text-gray-500">@{post.author.username} • {post.timeAgo}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Post
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Bookmark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Link href={`/forum/${post.id}`}>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#CD3937] transition-colors">
                {post.title}
              </h3>
            </Link>
            
            <p className="text-gray-600 leading-relaxed">
              {post.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.metrics.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.metrics.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.metrics.comments}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-[#CD3937] border-[#CD3937] hover:bg-[#CD3937] hover:text-white"
                onClick={() => handleRemoveBookmark(post.id, "forum")}
              >
                <BookmarkCheck className="w-4 h-4 mr-1" />
                Saved
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="bg-gray-50 w-full min-h-screen">
      <div className="ml-[320px] px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookmarks</h1>
                <p className="text-gray-600">Save and organize your favorite articles and discussions</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-[#000040]' : ''}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[#000040]' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Bookmarks Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="article">Articles ({articles.length})</TabsTrigger>
              <TabsTrigger value="forum">Forum ({forumPosts.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="article">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bookmark className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery ? "Try adjusting your search terms" : "Start bookmarking articles you want to read later"}
                  </p>
                  <Button className="bg-[#CD3937] hover:bg-[#CD3937]/90">
                    Browse Articles
                  </Button>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                }>
                  {filteredArticles.map((article) => (
                    <ArticleBookmarkCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="forum">
              {filteredForumPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bookmark className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No forum posts found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery ? "Try adjusting your search terms" : "Start bookmarking forum discussions you want to revisit"}
                  </p>
                  <Button className="bg-[#CD3937] hover:bg-[#CD3937]/90">
                    Browse Forum
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredForumPosts.map((post) => (
                    <ForumBookmarkCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}