"use client";

import React, { useState } from "react";
import { Bookmark, Loader2, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useBookmarkedArticles } from "@/hooks/use-article";
import { CardList } from "@/components/card-component/card/CardList";
import { ComingSoonDialog } from "@/components/ui/coming-soon-dialog";

export default function BookmarkPage() {
  const [activeTab, setActiveTab] = useState("articles");
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  const { data, isLoading, error } = useBookmarkedArticles(0, 50);

  const handleForumClick = () => {
    setComingSoonOpen(true);
  };

  if (isLoading) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16 flex justify-center items-center min-h-[calc(100vh-80px)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
          <div className="text-center py-20">
            <p className="text-red-600">Failed to load bookmarks. Please try again.</p>
          </div>
        </div>
      </main>
    );
  }

  const articles = data?.content || [];
  const totalBookmarks = data?.totalElements || 0;

  return (
    <>
      <ComingSoonDialog
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
        feature="Forum Bookmarks"
      />

      <main className="bg-gray-100 w-full min-h-screen">
        <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Bookmark className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Bookmarks</h1>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Save and organize your favorite articles for later reading.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <Card className="border border-gray-200/60 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {totalBookmarks}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Total Bookmarks</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200/60 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-secondary">
                      {articles.length}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Showing</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200/60 shadow-sm col-span-2 md:col-span-1">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-green-600">
                      {articles.filter(a => a.status === 'published').length}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Published</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("articles")}
                  className={`px-4 py-2 font-medium text-sm md:text-base transition-colors ${
                    activeTab === "articles"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Articles ({totalBookmarks})</span>
                  </div>
                </button>
                <button
                  onClick={handleForumClick}
                  className="px-4 py-2 font-medium text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    <span>Forum (0)</span>
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "articles" && (
              <>
                {articles.length > 0 ? (
                  <CardList articles={articles} />
                ) : (
                  <div className="text-center py-20">
                    <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No bookmarks yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start bookmarking articles you want to read later
                    </p>
                    <a
                      href="/content"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <BookOpen className="w-5 h-5" />
                      Browse Articles
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
