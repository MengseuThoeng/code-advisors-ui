"use client";
import { CardList } from "@/components/card-component/card/CardList";
import { useArticles } from "@/hooks/use-article";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data, isLoading, error } = useArticles({
    page: 0,
    limit: 12,
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
            <p className="text-gray-600">Failed to load articles</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-0 lg:ml-[280px] xl:ml-[320px] px-4 md:px-6 lg:px-8 py-4 pt-16">
        <div className="max-w-[1400px] mx-auto">
          <CardList articles={data.content} />
        </div>
      </div>
    </main>
  );
}
