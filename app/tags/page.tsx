"use client";

import React, { useState } from "react";
import { Hash, Loader2, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useTags } from "@/hooks/use-tag";
import { ComingSoonDialog } from "@/components/ui/coming-soon-dialog";

const TagsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("articles");
  // const [searchInput, setSearchInput] = useState("");
  // const [debouncedSearch, setDebouncedSearch] = useState("");
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  // Debounce search input - DISABLED
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedSearch(searchInput);
  //   }, 500); // Wait 500ms after user stops typing

  //   return () => clearTimeout(timer);
  // }, [searchInput]);

  const { data, isLoading, error } = useTags({
    page: 0,
    limit: 100,
    // search: debouncedSearch, // Search disabled
  });

  if (isLoading) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16 flex justify-center items-center min-h-[calc(100vh-80px)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
          <div className="text-center py-20">
            <p className="text-red-600">Failed to load tags. Please try again.</p>
          </div>
        </div>
      </main>
    );
  }

  console.log("Tags data:", data);

  const handleForumClick = () => {
    setComingSoonOpen(true);
  };

  return (
    <>
      <ComingSoonDialog 
        open={comingSoonOpen} 
        onOpenChange={setComingSoonOpen}
        feature="Forum Tags"
      />
      
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Hash className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Tags</h1>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Discover content by topics and technologies. Find articles about your favorite subjects.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:w-[400px] h-auto">
                <TabsTrigger value="articles" className="flex items-center gap-2 py-2.5">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm md:text-base">Article Tags</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="forums" 
                  className="flex items-center gap-2 py-2.5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForumClick();
                  }}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm md:text-base">Forum Tags</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="articles" className="space-y-6">
                {/* Search functionality - DISABLED */}
                {/* <Card className="border border-gray-200/60 shadow-sm">
                  <CardContent className="p-4 md:p-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <Input
                        placeholder="Search tags..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-9 md:pl-10 h-10 md:h-11"
                      />
                    </div>
                  </CardContent>
                </Card> */}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200/60 shadow-sm">
                    <CardContent className="p-4 md:p-6">
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-primary">
                          {data?.totalElements || 0}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">Total Tags</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-200/60 shadow-sm">
                    <CardContent className="p-4 md:p-6">
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-secondary">
                          {data?.content?.length || 0}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">Showing</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-200/60 shadow-sm col-span-2 md:col-span-1">
                    <CardContent className="p-4 md:p-6">
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-green-600">
                          {data?.content?.filter(t => t.isFollowed).length || 0}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">Following</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {data.content.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {data.content.map((tag) => (
                      <Link 
                        key={tag.id} 
                        href={`/content/tags/${tag.slug}`}
                      >
                        <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5 border border-gray-200/60 shadow-sm h-full cursor-pointer">
                          <CardContent className="p-4 md:p-5">
                            <div className="flex flex-col items-center text-center space-y-3">
                              <div 
                                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: tag.color || '#3B82F6' }}
                              >
                                <Hash className="w-6 h-6 md:w-7 md:h-7 text-white" />
                              </div>
                              
                              <div className="flex-1 w-full">
                                <h3 className="font-bold text-sm md:text-base text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                  {tag.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                  {tag.followersCount} {tag.followersCount === 1 ? 'follower' : 'followers'}
                                </p>
                              </div>

                              {tag.isFollowed && (
                                <Badge variant="secondary" className="text-xs">
                                  Following
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Hash className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No tags found
                    </h3>
                    <p className="text-gray-600">
                      No tags available yet
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="forums">
                <div className="text-center py-20">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Coming Soon!
                  </h3>
                  <p className="text-gray-600">
                    Forum tags will be available in 2026
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
};

export default TagsPage;
