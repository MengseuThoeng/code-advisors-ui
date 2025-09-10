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
          content: `
            <div class="space-y-8">
              <img src="https://i.pinimg.com/736x/7c/ca/d3/7ccad3f2a26cc23b996e82ca4e9d67df.jpg" alt="React Advanced Patterns" class="w-full h-auto rounded-lg" />
              
              <p class="text-lg">React has evolved significantly since its inception, and with it, the patterns and practices for building robust applications have matured. In this comprehensive guide, we'll explore advanced React patterns that will help you write more maintainable, reusable, and scalable code.</p>
              
              <h2 class="text-2xl font-bold">Understanding Component Composition</h2>
              <p>Component composition is a fundamental pattern in React that allows you to build complex UIs from simple, reusable components. Instead of inheritance, React uses composition to achieve code reuse.</p>
              
              <pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>// Example of compound components
function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    &lt;div className="accordion"&gt;
      {React.Children.map(children, (child, index) =&gt;
        React.cloneElement(child, {
          isOpen: openIndex === index,
          onClick: () =&gt; setOpenIndex(openIndex === index ? null : index)
        })
      )}
    &lt;/div&gt;
  );
}</code></pre>
              
              <h2 class="text-2xl font-bold">Render Props Pattern</h2>
              <p>The render props pattern is a technique for sharing code between React components using a prop whose value is a function.</p>
              
              <img src="https://i.pinimg.com/736x/03/1d/a9/031da9ff8b2baafbcba8e0358d7420fc.jpg" alt="React Patterns" class="w-full h-auto rounded-lg my-6" />
              
              <h2 class="text-2xl font-bold">Custom Hooks for Logic Reuse</h2>
              <p>Custom hooks allow you to extract component logic into reusable functions. They're a powerful way to share stateful logic between components.</p>
              
              <pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>// Custom hook example
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =&gt; {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) =&gt; {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}</code></pre>
              
              <h2 class="text-2xl font-bold">Context API Best Practices</h2>
              <p>The Context API is powerful but should be used judiciously. Here are some best practices for using Context effectively in your applications.</p>
              
              <ul class="list-disc pl-6 space-y-2">
                <li>Keep contexts focused and single-purpose</li>
                <li>Split contexts when they have different update frequencies</li>
                <li>Use multiple providers for different concerns</li>
                <li>Consider using useReducer for complex state logic</li>
                <li>Memoize context values to prevent unnecessary re-renders</li>
              </ul>
              
              <h2 class="text-2xl font-bold">Higher-Order Components (HOCs)</h2>
              <p>While hooks have largely replaced HOCs for logic sharing, they still have their place in certain scenarios, especially for cross-cutting concerns.</p>
              
              <h2 class="text-2xl font-bold">Performance Optimization Patterns</h2>
              <p>React provides several tools for optimizing performance. Understanding when and how to use them is crucial for building fast applications.</p>
              
              <ol class="list-decimal pl-6 space-y-2">
                <li>Use React.memo for preventing unnecessary re-renders</li>
                <li>Implement useMemo and useCallback strategically</li>
                <li>Lazy load components with React.lazy and Suspense</li>
                <li>Optimize bundle size with code splitting</li>
                <li>Use virtualization for large lists</li>
              </ol>
              
              <h2 class="text-2xl font-bold">Conclusion</h2>
              <p>Mastering these advanced React patterns will help you build more maintainable, scalable, and performant applications. Remember that not every pattern is suitable for every situation – choose the right tool for the job.</p>
            </div>
          `,
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
      <div className="bg-gradient-to-br from-[#000040] via-[#000066] to-[#CD3937] pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
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
                <Card className="p-4 shadow-lg border-0 bg-gray-50">
                  <div className="flex lg:flex-col gap-3">
                    <Button
                      variant={isLiked ? "default" : "outline"}
                      size="sm"
                      onClick={handleLike}
                      className={`flex-1 lg:w-full ${isLiked ? 'bg-[#CD3937] hover:bg-[#CD3937]/90' : 'hover:bg-[#CD3937] hover:text-white'}`}
                    >
                      <Heart className={`w-4 h-4 lg:mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="hidden lg:inline">{likes}</span>
                    </Button>
                    
                    <Button
                      variant={isBookmarked ? "default" : "outline"}
                      size="sm"
                      onClick={handleBookmark}
                      className={`flex-1 lg:w-full ${isBookmarked ? 'bg-[#000040] hover:bg-[#000040]/90' : 'hover:bg-[#000040] hover:text-white'}`}
                    >
                      <Bookmark className={`w-4 h-4 lg:mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                      <span className="hidden lg:inline">Save</span>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 lg:w-full hover:bg-green-500 hover:text-white">
                          <Share2 className="w-4 h-4 lg:mr-2" />
                          <span className="hidden lg:inline">Share</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleShare('twitter')}>
                          <Twitter className="w-4 h-4 mr-2" />
                          Share on Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('facebook')}>
                          <Facebook className="w-4 h-4 mr-2" />
                          Share on Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('copy')}>
                          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          {copied ? 'Copied!' : 'Copy Link'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button variant="outline" size="sm" className="flex-1 lg:w-full hover:bg-blue-500 hover:text-white">
                      <MessageSquare className="w-4 h-4 lg:mr-2" />
                      <span className="hidden lg:inline">{content.comments}</span>
                    </Button>
                  </div>
                  
                  {/* Reading Progress */}
                  <div className="mt-6 hidden lg:block">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Zap className="w-4 h-4" />
                      Reading Progress
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#CD3937] h-2 rounded-full w-1/3"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Keep reading...</p>
                  </div>
                </Card>
                
                {/* Scroll to Top */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 hover:bg-[#000040] hover:text-white"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Back to Top
                </Button>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <article className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
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
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-white border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-[#CD3937]" />
                  Discussion ({content.comments})
                </h3>
                <Button className="bg-[#000040] hover:bg-[#000040]/90">
                  Join Conversation
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-[#000040] to-[#CD3937] rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Start the Conversation</h4>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Be the first to share your thoughts and engage with fellow developers about this article.
                </p>
                <Button size="lg" className="bg-[#CD3937] hover:bg-[#CD3937]/90">
                  Write a Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
