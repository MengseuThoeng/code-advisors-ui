"use client";
import { CardList } from "@/components/card-component/card/CardList";

export default function Home() {
  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <div className="ml-[320px] px-8 py-4 pt-16 flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="flex justify-center">
            <CardList />
          </div>
        </div>
      </div>
    </main>
  );
}
