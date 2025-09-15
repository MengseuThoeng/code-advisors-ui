"use client";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import React from "react";

export default function page() {
    return (
        <main className="bg-gray-100 w-full min-h-screen">
            <div className="ml-[320px] px-8 py-4 pt-16 flex justify-center">
                <div className="max-w-6xl w-full">
                    <div className="flex justify-center">
                        <ForumCardList />
                    </div>
                </div>
            </div>
        </main>
    );
}
