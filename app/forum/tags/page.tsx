"use client";

import React, { useState, useMemo } from "react";
import { Search, TrendingUp, Hash, Users, MessageSquare, Filter, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectContent";
import Link from "next/link";

type Tag = {
  name: string;
  discussionCount: number;
  description: string;
  category: string;
  trending: boolean;
  color: string;
  participantCount: number;
};

const ForumTagsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const tags: Tag[] = [
    { name: "javascript", discussionCount: 543, description: "JavaScript programming discussions and Q&A", category: "Programming", trending: true, color: "bg-yellow-500", participantCount: 1247 },
    { name: "career-advice", discussionCount: 432, description: "Career guidance and professional development", category: "Career", trending: true, color: "bg-blue-500", participantCount: 892 },
    { name: "react", discussionCount: 389, description: "React development tips and troubleshooting", category: "Frontend", trending: true, color: "bg-cyan-500", participantCount: 654 },
    { name: "web-development", discussionCount: 321, description: "General web development discussions", category: "Development", trending: true, color: "bg-purple-500", participantCount: 543 },
    { name: "algorithms", discussionCount: 298, description: "Data structures and algorithm discussions", category: "Computer Science", trending: false, color: "bg-green-500", participantCount: 432 },
    { name: "system-design", discussionCount: 276, description: "System architecture and design patterns", category: "Architecture", trending: true, color: "bg-orange-500", participantCount: 389 },
    { name: "freelancing", discussionCount: 234, description: "Freelance work tips and client management", category: "Career", trending: false, color: "bg-pink-500", participantCount: 321 },
    { name: "debugging", discussionCount: 198, description: "Debugging tips and problem-solving strategies", category: "Programming", trending: false, color: "bg-red-500", participantCount: 298 },
    { name: "startup", discussionCount: 187, description: "Startup discussions and entrepreneurship", category: "Business", trending: false, color: "bg-indigo-500", participantCount: 276 },
    { name: "code-review", discussionCount: 156, description: "Code review best practices and feedback", category: "Quality", trending: false, color: "bg-teal-500", participantCount: 234 },
    { name: "learning", discussionCount: 143, description: "Learning resources and study strategies", category: "Education", trending: false, color: "bg-amber-500", participantCount: 198 },
    { name: "performance", discussionCount: 132, description: "Performance optimization discussions", category: "Optimization", trending: false, color: "bg-lime-500", participantCount: 187 },
    { name: "open-source", discussionCount: 121, description: "Open source project discussions", category: "Community", trending: false, color: "bg-emerald-500", participantCount: 156 },
    { name: "devops", discussionCount: 109, description: "DevOps practices and tooling", category: "Operations", trending: false, color: "bg-sky-500", participantCount: 143 },
    { name: "interview", discussionCount: 98, description: "Technical interview preparation", category: "Career", trending: false, color: "bg-violet-500", participantCount: 132 },
    { name: "mobile-dev", discussionCount: 87, description: "Mobile app development discussions", category: "Mobile", trending: false, color: "bg-rose-500", participantCount: 121 },
    { name: "security", discussionCount: 76, description: "Cybersecurity and secure coding practices", category: "Security", trending: false, color: "bg-gray-700", participantCount: 109 },
    { name: "database", discussionCount: 65, description: "Database design and optimization", category: "Backend", trending: false, color: "bg-stone-500", participantCount: 98 },
    { name: "ui-ux", discussionCount: 54, description: "User interface and experience design", category: "Design", trending: false, color: "bg-fuchsia-500", participantCount: 87 },
    { name: "remote-work", discussionCount: 43, description: "Remote work tips and collaboration", category: "Lifestyle", trending: false, color: "bg-neutral-500", participantCount: 76 }
  ];

  const categories = ["all", "Programming", "Career", "Frontend", "Development", "Architecture", "Business", "Quality", "Education", "Security"];

  const filteredTags = useMemo(() => {
    let filtered = tags.filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(tag => tag.category === selectedCategory);
    }

    // Sort tags
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.discussionCount - a.discussionCount;
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "trending":
          return Number(b.trending) - Number(a.trending);
        case "participants":
          return b.participantCount - a.participantCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const trendingTags = tags.filter(tag => tag.trending).slice(0, 6);
  const totalDiscussions = tags.reduce((sum, tag) => sum + tag.discussionCount, 0);
  const totalParticipants = tags.reduce((sum, tag) => sum + tag.participantCount, 0);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="ml-[320px] px-8 py-6 pt-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="h-8 w-8 text-[#CD3937]" />
              <h1 className="text-3xl font-bold text-[#000040]">Forum Tags</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Explore discussions by topic. Join conversations about programming, career advice, and tech trends.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Tags</p>
                    <p className="text-2xl font-bold text-[#000040]">{tags.length}</p>
                  </div>
                  <Hash className="h-8 w-8 text-[#CD3937]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Discussions</p>
                    <p className="text-2xl font-bold text-[#000040]">{totalDiscussions.toLocaleString()}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-[#CD3937]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="text-2xl font-bold text-[#000040]">{totalParticipants.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-[#CD3937]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hot Topics</p>
                    <p className="text-2xl font-bold text-[#000040]">{trendingTags.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-[#CD3937]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trending Tags Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#CD3937]" />
                Hot Discussion Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {trendingTags.map((tag) => (
                  <Link key={tag.name} href={`/forum/tags/${tag.name}`}>
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 bg-[#CD3937] text-white hover:bg-[#CD3937]/90 cursor-pointer transition-colors"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      #{tag.name} ({tag.discussionCount})
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search discussion topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Discussions</SelectItem>
                    <SelectItem value="participants">Most Participants</SelectItem>
                    <SelectItem value="trending">Trending First</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTags.map((tag) => (
              <Link key={tag.name} href={`/forum/tags/${tag.name}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                        <h3 className="font-semibold text-[#000040] group-hover:text-[#CD3937] transition-colors">
                          #{tag.name}
                        </h3>
                        {tag.trending && (
                          <Badge className="bg-[#CD3937] text-white text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#CD3937] transition-colors" />
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tag.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MessageSquare className="h-4 w-4" />
                          <span>{tag.discussionCount} discussions</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{tag.participantCount}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs">
                          {tag.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredTags.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No discussion topics found</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or browse all categories.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForumTagsPage;
