"use client";
import { CardList } from "@/components/card-component/card/CardList";
import { useInfiniteArticles } from "@/hooks/use-article";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteArticles({
    limit: 12,
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
            <p className="text-gray-600">Failed to load articles</p>
          </div>
        </div>
      </main>
    );
  }

  // Flatten all articles from all pages
  const allArticles = data.pages.flatMap((page) => page.content);

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
        <div className="max-w-[1400px] mx-auto">
          <CardList articles={allArticles} />

          {/* Infinite Scroll Trigger */}
          <div ref={observerTarget} className="flex justify-center py-8">
            {isFetchingNextPage && (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading more articles...</span>
              </div>
            )}
            {!hasNextPage && allArticles.length > 0 && (
              <p className="text-gray-500 text-sm">
                No more articles to load
              </p>
            )}
          </div>

          {/* Fallback Load More Button */}
          {hasNextPage && !isFetchingNextPage && (
            <div className="flex justify-center pb-8">
              <Button
                onClick={() => fetchNextPage()}
                variant="outline"
                className="hover:bg-[#000040] hover:text-white"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
