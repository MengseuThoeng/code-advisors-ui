"use client";

import { CardList } from "@/components/card-component/card/CardList";
import { getTrendingArticles } from "@/lib/article-api";
import { Loader2, TrendingUp, Flame } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function TrendingPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trending-articles'],
    queryFn: () => getTrendingArticles({ page: 0, limit: 12 }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  if (isLoading) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16 flex justify-center items-center min-h-[calc(100vh-80px)]">
          <Loader2 className="w-8 h-8 animate-spin text-[#000040]" />
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16 flex justify-center">
          <div className="text-center py-20">
            <p className="text-gray-600">Failed to load trending articles</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                <Flame className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                Trending Articles
                <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-orange-500" />
              </h1>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              The hottest articles right now - based on likes, views, and engagement from the last 7 days
            </p>
          </div>

          {/* Trending Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200">
            <Flame className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">
              {data.content.length} Hot {data.content.length === 1 ? 'Article' : 'Articles'} This Week
            </span>
          </div>

          {/* Articles Grid */}
          {data.content.length > 0 ? (
            <CardList articles={data.content} />
          ) : (
            <div className="text-center py-20">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No trending articles yet
              </h3>
              <p className="text-gray-600">
                Check back soon for hot content!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
