'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, Clock, Flame, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useArticles, useTrendingArticles } from "@/hooks/use-article";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  
  const { data: articlesData, isLoading } = useArticles({
    page,
    limit: 10,
    sortBy,
    search: search || undefined,
  });

  const { data: trendingArticles } = useTrendingArticles({ limit: 5 });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as 'latest' | 'popular' | 'trending');
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-[320px] px-8 py-4 pt-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Flame className="w-8 h-8 mr-3 text-orange-500" />
              Articles & Tutorials
            </h1>
            <p className="text-gray-600 mt-2">
              Discover and learn from the community's best content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search articles..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Sort Tabs */}
                  <Tabs value={sortBy} onValueChange={handleSortChange} className="mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="latest">
                        <Clock className="w-4 h-4 mr-2" />
                        Latest
                      </TabsTrigger>
                      <TabsTrigger value="popular">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Popular
                      </TabsTrigger>
                      <TabsTrigger value="trending">
                        <Flame className="w-4 h-4 mr-2" />
                        Trending
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Articles List */}
              {isLoading && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}

              {articlesData && (
                <>
                  <div className="space-y-4">
                    {articlesData.content.map((article) => (
                      <Card
                        key={article.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => router.push(`/content/${article.slug}`)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            {/* Cover Image */}
                            <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#000040] to-[#CD3937]">
                              <img
                                src={article.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.title)}&size=400&background=000040&color=fff&bold=true`}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Author */}
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage
                                    src={article.author.avatarUrl || DEFAULT_AVATAR}
                                    alt={article.author.username}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {article.author.firstName?.[0]}{article.author.lastName?.[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-600">
                                  {article.author.firstName} {article.author.lastName}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-sm text-gray-500">
                                  {formatDate(article.publishedAt || article.createdAt)}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                {article.title}
                              </h3>

                              {/* Excerpt */}
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {article.excerpt}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {Array.isArray(article.tags) && article.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {typeof tag === 'string' ? tag : tag.name}
                                  </Badge>
                                ))}
                              </div>

                              {/* Stats */}
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{article.readingTime} min read</span>
                                <span>•</span>
                                <span>{article.likesCount} likes</span>
                                <span>•</span>
                                <span>{article.commentsCount} comments</span>
                                <span>•</span>
                                <span>{article.viewsCount} views</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {articlesData.totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {page + 1} of {articlesData.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.min(articlesData.totalPages - 1, p + 1))}
                        disabled={page === articlesData.totalPages - 1}
                      >
                        Next
                      </Button>
                    </div>
                  )}

                  {/* Empty State */}
                  {articlesData.content.length === 0 && (
                    <Card className="p-12 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No articles found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your search or filters
                      </p>
                    </Card>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trending Articles */}
              {trendingArticles && trendingArticles.content.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-bold text-lg flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                      Trending Now
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {trendingArticles.content.map((article, index) => (
                      <div
                        key={article.id}
                        className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        onClick={() => router.push(`/content/${article.slug}`)}
                      >
                        <span className="text-2xl font-bold text-gray-300">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{article.likesCount} likes</span>
                            <span>•</span>
                            <span>{article.viewsCount} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}