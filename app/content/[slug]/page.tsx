"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Clock,
  Eye,
  MoreHorizontal,
  ArrowLeft,
  Tag,
  Calendar,
  User,
  ThumbsUp,
  Twitter,
  Facebook,
  Copy,
  Check,
  ChevronUp,
  Coffee,
  Zap,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

export default function ContentDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [content, setContent] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Mock fetch content data - replace with real API
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockContent = {
          id: slug,
          title: "Advanced React Patterns: Building Scalable Applications",
          excerpt: "Explore advanced React patterns including compound components, render props, and custom hooks to build maintainable and scalable applications.",
          coverImage: "/ptc.jpg", // Add cover image
          author: {
            name: "Sarah Chen",
            title: "Senior React Developer",
            bio: "Passionate about building scalable web applications and sharing knowledge with the developer community.",
            avatar: "/user.jpg",
            articles: 24
          },
          publishedAt: "March 15, 2024",
          readTime: 8,
          views: 12543,
          likes: 89,
          comments: 23,
          tags: ["React", "JavaScript", "Frontend", "Patterns", "Performance"]
        };

        setContent(mockContent);
        setLikes(mockContent.likes);
        setIsBookmarked(Math.random() > 0.7);
        setIsLiked(Math.random() > 0.6);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchContent();
    }
  }, [slug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = content?.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
  };

  if (isLoading) {
    return (
      <>
        <header className="bg-white fixed top-0 right-0 left-0 z-50 border-b">
          <NavbarComponent />
        </header>
        <main className="bg-gray-100 w-full min-h-screen">
          <div className="px-8 py-4 pt-20">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-64 bg-gray-300 rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!content) {
    return (
      <>
        <header className="bg-white fixed top-0 right-0 left-0 z-50 border-b">
          <NavbarComponent />
        </header>
        <main className="bg-gray-100 w-full min-h-screen">
          <div className="px-8 py-4 pt-20">
            <div className="max-w-6xl mx-auto text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
              <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
              <Button onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="bg-white fixed top-0 right-0 left-0 z-50 border-b">
        <NavbarComponent />
      </header>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#000040] via-[#000066] to-[#CD3937] pt-20 relative overflow-hidden">
        {/* Cover Image Overlay */}
        {content.coverImage && (
          <>
            <img
              src={content.coverImage}
              alt={content.title}
              className="absolute inset-0 w-full h-full object-cover z-0"
              onError={(e) => {
                console.log("Image failed to load:", content.coverImage);
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70 z-10" />
          </>
        )}
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{content.publishedAt}</span>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-6">
                {content.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {content.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {content.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{content.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{content.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending</span>
                </div>
              </div>
            </div>
            
            {/* Author Card in Hero */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-white/30">
                      <AvatarImage src={content.author.avatar} alt={content.author.name} />
                      <AvatarFallback className="bg-white/20 text-white text-lg">
                        {content.author.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{content.author.name}</h3>
                      <p className="text-white/70 text-sm">{content.author.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Coffee className="w-3 h-3" />
                        <span className="text-xs text-white/60">{content.author.articles} articles</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm mb-6">
                    {content.author.bio}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-white text-[#000040] hover:bg-white/90">
                      Follow
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Floating Action Bar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-32">
                {/* Main Reactions */}
                <Card className="p-6 shadow-xl border-0 bg-white rounded-2xl">
                  <div className="flex lg:flex-col gap-4">
                    {/* Like Button */}
                    <div className="flex-1 lg:w-full">
                      <Button
                        variant={isLiked ? "default" : "outline"}
                        size="lg"
                        onClick={handleLike}
                        className={`w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
                          isLiked 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg transform scale-105' 
                            : 'hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white border-red-200 hover:border-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current animate-pulse' : ''}`} />
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                          <span className="font-semibold">{likes}</span>
                          <span className="text-xs lg:text-sm opacity-90">Likes</span>
                        </div>
                      </Button>
                    </div>
                    
                    {/* Bookmark Button */}
                    <div className="flex-1 lg:w-full">
                      <Button
                        variant={isBookmarked ? "default" : "outline"}
                        size="lg"
                        onClick={handleBookmark}
                        className={`w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
                          isBookmarked 
                            ? 'bg-gradient-to-r from-[#000040] to-indigo-600 hover:from-[#000040]/90 hover:to-indigo-700 text-white shadow-lg transform scale-105' 
                            : 'hover:bg-gradient-to-r hover:from-[#000040] hover:to-indigo-600 hover:text-white border-[#000040]/20 hover:border-[#000040]'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current animate-bounce' : ''}`} />
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                          <span className="font-semibold">{isBookmarked ? 'Saved' : 'Save'}</span>
                        </div>
                      </Button>
                    </div>
                    
                    {/* Share Button */}
                    <div className="flex-1 lg:w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white border-green-200 hover:border-green-500 group"
                          >
                            <Share2 className="w-5 h-5 group-hover:animate-pulse" />
                            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                              <span className="font-semibold">Share</span>
                            </div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2">
                          <DropdownMenuItem 
                            onClick={() => handleShare('twitter')}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer"
                          >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <Twitter className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">Share on Twitter</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleShare('facebook')}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer"
                          >
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <Facebook className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">Share on Facebook</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleShare('copy')}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                            </div>
                            <span className="font-medium">{copied ? 'Link Copied!' : 'Copy Link'}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Reading Progress */}
                  <div className="mt-6 hidden lg:block">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">Reading Progress</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#CD3937] to-pink-500 h-3 rounded-full w-1/3 transition-all duration-500 shadow-sm"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 font-medium">33% completed</p>
                  </div>
                  
                  {/* Stats */}
                  <div className="mt-6 hidden lg:block p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{content?.views?.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{content?.readTime} min read</span>
                    </div>
                  </div>
                </Card>
                
                {/* Scroll to Top */}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full mt-4 h-12 rounded-xl hover:bg-gradient-to-r hover:from-[#000040] hover:to-indigo-600 hover:text-white transition-all duration-300 group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ChevronUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  <span className="font-medium">Back to Top</span>
                </Button>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <article className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed space-y-8">
                  {/* Main Article Image */}
                  <ImageWithFallback
                    src="https://i.pinimg.com/736x/7c/ca/d3/7ccad3f2a26cc23b996e82ca4e9d67df.jpg"
                    alt="React Advanced Patterns"
                    className="w-full h-auto rounded-lg"
                    fallbackClassName="w-full h-64"
                  />
                  
                  <p className="text-lg">
                    React has evolved significantly since its inception, and with it, the patterns and practices for building robust applications have matured. In this comprehensive guide, we'll explore advanced React patterns that will help you write more maintainable, reusable, and scalable code.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-gray-900">Understanding Component Composition</h2>
                  <p>
                    Component composition is a fundamental pattern in React that allows you to build complex UIs from simple, reusable components. Instead of inheritance, React uses composition to achieve code reuse.
                  </p>
                  
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <code>{`// Example of compound components
function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: openIndex === index,
          onClick: () => setOpenIndex(openIndex === index ? null : index)
        })
      )}
    </div>
  );
}`}</code>
                  </pre>
                  
                  <h2 className="text-2xl font-bold text-gray-900">Render Props Pattern</h2>
                  <p>
                    The render props pattern is a technique for sharing code between React components using a prop whose value is a function.
                  </p>
                  
                  {/* Second Article Image */}
                  <ImageWithFallback
                    src="https://i.pinimg.com/736x/03/1d/a9/031da9ff8b2baafbcba8e0358d7420fc.jpg"
                    alt="React Patterns Diagram"
                    className="w-full h-auto rounded-lg my-6"
                    fallbackClassName="w-full h-48 my-6"
                  />
                  
                  <h2 className="text-2xl font-bold text-gray-900">Custom Hooks for Logic Reuse</h2>
                  <p>
                    Custom hooks allow you to extract component logic into reusable functions. They're a powerful way to share stateful logic between components.
                  </p>
                  
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <code>{`// Custom hook example
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`}</code>
                  </pre>
                  
                  <h2 className="text-2xl font-bold text-gray-900">Context API Best Practices</h2>
                  <p>
                    The Context API is powerful but should be used judiciously. Here are some best practices for using Context effectively in your applications.
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Keep contexts focused and single-purpose</li>
                    <li>Split contexts when they have different update frequencies</li>
                    <li>Use multiple providers for different concerns</li>
                    <li>Consider using useReducer for complex state logic</li>
                    <li>Memoize context values to prevent unnecessary re-renders</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold text-gray-900">Higher-Order Components (HOCs)</h2>
                  <p>
                    While hooks have largely replaced HOCs for logic sharing, they still have their place in certain scenarios, especially for cross-cutting concerns.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-gray-900">Performance Optimization Patterns</h2>
                  <p>
                    React provides several tools for optimizing performance. Understanding when and how to use them is crucial for building fast applications.
                  </p>
                  
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Use React.memo for preventing unnecessary re-renders</li>
                    <li>Implement useMemo and useCallback strategically</li>
                    <li>Lazy load components with React.lazy and Suspense</li>
                    <li>Optimize bundle size with code splitting</li>
                    <li>Use virtualization for large lists</li>
                  </ol>
                  
                  <h2 className="text-2xl font-bold text-gray-900">Conclusion</h2>
                  <p>
                    Mastering these advanced React patterns will help you build more maintainable, scalable, and performant applications. Remember that not every pattern is suitable for every situation – choose the right tool for the job.
                  </p>
                </div>
              </article>
              
              {/* Article Footer */}
              <div className="mt-16 pt-8 border-t">
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-sm font-medium text-gray-600 mr-2">Topics:</span>
                  {content.tags.map((tag: string, index: number) => (
                    <Link key={index} href={`/content/tags/${tag.toLowerCase()}`}>
                      <Badge variant="outline" className="hover:bg-[#000040] hover:text-white cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
                
                {/* CTA Section */}
                <Card className="bg-gradient-to-r from-[#000040] to-[#CD3937] text-white p-8 rounded-xl">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                    <p className="text-white/90 mb-6">Join thousands of developers getting the latest insights</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-white text-[#000040] hover:bg-white/90">
                        Subscribe to Newsletter
                      </Button>
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                        Follow {content.author.name}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Comments Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-gray-900">Comments</h3>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {content?.comments || 0}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Sort by Latest
            </Button>
          </div>

          {/* Add Comment Form */}
          <Card className="mb-8 border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src="/user.jpg" alt="Your avatar" />
                  <AvatarFallback className="bg-[#000040] text-white text-sm">You</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <textarea
                    placeholder="Share your thoughts about this article..."
                    className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#CD3937] focus:border-transparent outline-none transition-all"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Be respectful and constructive</span>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        Cancel
                      </Button>
                      <Button size="sm" className="bg-[#CD3937] hover:bg-[#CD3937]/90">
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-6">
            {/* Sample Comment 1 */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src="/user.jpg" alt="User avatar" />
                    <AvatarFallback className="bg-blue-500 text-white text-sm">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">John Doe</span>
                      <span className="text-gray-500 text-sm">2 hours ago</span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      Great article! The section on custom hooks really helped me understand how to better structure my React components. I've been struggling with state management and this cleared up a lot of confusion.
                    </p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#CD3937] p-0 h-auto">
                        <Heart className="w-4 h-4 mr-1" />
                        12
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#CD3937] p-0 h-auto">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Comment 2 */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src="/user.jpg" alt="User avatar" />
                    <AvatarFallback className="bg-green-500 text-white text-sm">SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">Sarah Miller</span>
                      <span className="text-gray-500 text-sm">5 hours ago</span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      The render props pattern example is perfect! I've been using this in my projects but didn't know the proper terminology. Thanks for the clear explanation.
                    </p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#CD3937] p-0 h-auto">
                        <Heart className="w-4 h-4 mr-1 fill-current text-[#CD3937]" />
                        8
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#CD3937] p-0 h-auto">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Comment 3 with Reply */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src="/user.jpg" alt="User avatar" />
                    <AvatarFallback className="bg-purple-500 text-white text-sm">MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">Mike Johnson</span>
                      <span className="text-gray-500 text-sm">1 day ago</span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      Could you provide more examples of when to use HOCs vs custom hooks? I'm still confused about the best practices.
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#CD3937] p-0 h-auto">
                        <Heart className="w-4 h-4 mr-1" />
                        5
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#CD3937] p-0 h-auto">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                    
                    {/* Reply */}
                    <div className="ml-8 pl-4 border-l-2 border-gray-100">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src="/user.jpg" alt="Author avatar" />
                          <AvatarFallback className="bg-[#CD3937] text-white text-xs">SC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">Sarah Chen</span>
                            <Badge variant="secondary" className="text-xs">Author</Badge>
                            <span className="text-gray-500 text-sm">12 hours ago</span>
                          </div>
                          <p className="text-gray-700 mb-2 leading-relaxed">
                            Great question! I use custom hooks for stateful logic that needs to be shared, and HOCs for cross-cutting concerns like authentication or logging. I'll consider writing a follow-up article on this!
                          </p>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#CD3937] p-0 h-auto">
                            <Heart className="w-4 h-4 mr-1" />
                            3
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Load More Comments */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="px-8">
              Load More Comments
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
