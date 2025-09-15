"use client";

import React, { useState, useMemo } from "react";
import { Search, ArrowLeft, Hash, BookOpen, TrendingUp, Users, MessageSquare, Filter, Grid, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/selectContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { CardList } from "@/components/card-component/card/CardList";

// Mock data for the tag
const getTagData = (tagName: string) => {
  const tagDatabase: Record<string, any> = {
    javascript: {
      name: "JavaScript",
      description: "The most popular programming language for web development. Learn modern JavaScript, ES6+, frameworks, and best practices.",
      category: "Programming",
      trending: true,
      color: "bg-yellow-500",
      articleCount: 1247,
      forumCount: 892,
      followerCount: 15420,
      createdAt: "2020-01-15",
      relatedTags: ["react", "typescript", "node.js", "vue.js", "angular"],
      difficulty: "Beginner to Advanced",
      weeklyPosts: 45,
      weeklyDiscussions: 23
    },
    react: {
      name: "React",
      description: "A JavaScript library for building user interfaces. Master components, hooks, state management, and the React ecosystem.",
      category: "Frontend",
      trending: true,
      color: "bg-blue-500",
      articleCount: 892,
      forumCount: 654,
      followerCount: 12350,
      createdAt: "2020-03-20",
      relatedTags: ["javascript", "typescript", "next.js", "redux", "hooks"],
      difficulty: "Intermediate",
      weeklyPosts: 32,
      weeklyDiscussions: 18
    },
    typescript: {
      name: "TypeScript",
      description: "JavaScript with static type definitions. Learn type safety, interfaces, generics, and advanced TypeScript patterns.",
      category: "Programming",
      trending: true,
      color: "bg-blue-600",
      articleCount: 654,
      forumCount: 432,
      followerCount: 9870,
      createdAt: "2020-06-10",
      relatedTags: ["javascript", "react", "angular", "node.js", "interfaces"],
      difficulty: "Intermediate to Advanced",
      weeklyPosts: 28,
      weeklyDiscussions: 15
    }
  };

  return tagDatabase[tagName.toLowerCase()] || {
    name: tagName.charAt(0).toUpperCase() + tagName.slice(1),
    description: `Learn about ${tagName} through comprehensive articles, tutorials, and community discussions.`,
    category: "General",
    trending: false,
    color: "bg-gray-500",
    articleCount: 156,
    forumCount: 89,
    followerCount: 2340,
    createdAt: "2021-01-01",
    relatedTags: ["programming", "development", "tutorial"],
    difficulty: "All Levels",
    weeklyPosts: 8,
    weeklyDiscussions: 5
  };
};

export default function UnifiedTagDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const [resolvedParams, setResolvedParams] = React.useState<{ name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) return null;

  const tagName = decodeURIComponent(resolvedParams.name);
  const tagData = getTagData(tagName);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="ml-[320px] px-8 py-6 pt-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <Link href="/tags" className="hover:text-[#CD3937] transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Tags
            </Link>
            <span>/</span>
            <span className="text-[#000040] font-medium">#{tagData.name}</span>
          </div>

          {/* Tag Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${tagData.color} flex items-center justify-center`}>
                    <Hash className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-[#000040]">#{tagData.name}</h1>
                      {tagData.trending && (
                        <Badge className="bg-[#CD3937] text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge variant="secondary">{tagData.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-lg max-w-3xl">
                      {tagData.description}
                    </p>
                  </div>
                </div>
                
                <Button className="bg-[#CD3937] hover:bg-[#CD3937]/90 text-white">
                  Follow Tag
                </Button>
              </div>

              {/* Tag Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#000040]">{tagData.articleCount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Articles</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#000040]">{tagData.forumCount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Discussions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#000040]">{tagData.followerCount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#000040]">{tagData.weeklyPosts}</p>
                  <p className="text-sm text-gray-600">Posts/Week</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#000040]">{tagData.difficulty}</p>
                  <p className="text-sm text-gray-600">Difficulty</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tags */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-[#CD3937]" />
                Related Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {tagData.relatedTags.map((relatedTag: string) => (
                  <Link key={relatedTag} href={`/tags/${relatedTag}`}>
                    <Badge 
                      variant="secondary" 
                      className="px-3 py-1 hover:bg-[#CD3937] hover:text-white cursor-pointer transition-colors"
                    >
                      #{relatedTag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Controls */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={`Search in #${tagData.name}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-[#CD3937] hover:bg-[#CD3937]/90" : ""}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-[#CD3937] hover:bg-[#CD3937]/90" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unified Content Tabs */}
          <Tabs defaultValue="articles" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="articles">
                <BookOpen className="h-4 w-4 mr-2" />
                Articles ({tagData.articleCount})
              </TabsTrigger>
              <TabsTrigger value="discussions">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussions ({tagData.forumCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="articles" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#000040] mb-2">
                  Latest Articles about #{tagData.name}
                </h3>
                <p className="text-gray-600">
                  Discover the best articles and content tagged with #{tagData.name}
                </p>
              </div>
              <CardList />
            </TabsContent>
            
            <TabsContent value="discussions" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#000040] mb-2">
                  Forum Discussions about #{tagData.name}
                </h3>
                <p className="text-gray-600">
                  Join the conversation and ask questions about #{tagData.name}
                </p>
              </div>
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Forum Integration Coming Soon</h3>
                <p className="text-gray-500">
                  Discussion integration is coming soon. Check back later!
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#000040] mb-1">Want to contribute?</h3>
                  <p className="text-gray-600 text-sm">Share your knowledge about #{tagData.name} with the community</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Write Article
                  </Button>
                  <Button className="bg-[#CD3937] hover:bg-[#CD3937]/90 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Discussion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
