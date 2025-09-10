'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkCard } from "@/components/card-component/bookmark/bookmark-card"
import { ArticleCard } from "@/components/card-component/bookmark/article-card"

const mockArticles = [
  {
    id: 1,
    title: "Top 5 JavaScript Features You're Not Using Enough",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  {
    id: 2,
    title: "Docker Tutorial: Master Docker from Scratch",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  {
    id: 3,
    title: "Docker Tutorial: Master Docker from Scratch",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  {
    id: 4,
    title: "Docker Tutorial: Master Docker from Scratch",
    description: "In this blog post we'll learn about Dependency Injection (DI) and how to use it. We can do this using constructor and setter injection. Also...",
    image: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
    tags: ["java", "javascript", "programming"],
    isBookmarked: true
  },
  // Add more mock articles as needed
]

const mockForumPosts = [
  {
    id: 1,
    author: {
      name: "Linuxoid",
      avatar: "/placeholder.svg"
    },
    title: "What is a difference between Java and JavaScript?",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.",
    tags: ["java", "javascript", "programming"],
    metrics: {
      views: 125,
      likes: 15,
      comments: 155
    },
    timeAgo: "25 min ago",
    isBookmarked: true
  },
  // Add more mock forum posts as needed
]

export default function BookmarkPage() {
  const [articles, setArticles] = useState(mockArticles)
  const [forumPosts, setForumPosts] = useState(mockForumPosts)

  const handleToggleArticleBookmark = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
    ))
  }

  const handleToggleForumPostBookmark = (id: number) => {
    setForumPosts(forumPosts.map(post => 
      post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
    ))
  }

  return (
    <div className="container mx-auto max-w-4xl ml-[364px] mb-5">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold md:text-xl text-primary">Bookmark</h1>
        
        <Tabs defaultValue="article" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="article" className="text-primary flex-1 sm:flex-none">Article</TabsTrigger>
            <TabsTrigger value="forum" className="text-primary flex-1 sm:flex-none">Forum</TabsTrigger>
          </TabsList>
          
          <TabsContent value="article">
            <div className="grid gap-2 sm:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  tags={article.tags}
                  thumbnail={article.image}
                  isBookmarked={article.isBookmarked}
                  onToggleBookmark={() => handleToggleArticleBookmark(article.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="forum" className="space-y-4">
            {forumPosts.map((post) => (
              <BookmarkCard
                key={post.id}
                author={post.author}
                title={post.title}
                description={post.description}
                tags={post.tags}
                metrics={post.metrics}
                timeAgo={post.timeAgo}
                isBookmarked={post.isBookmarked}
                onToggleBookmark={() => handleToggleForumPostBookmark(post.id)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}