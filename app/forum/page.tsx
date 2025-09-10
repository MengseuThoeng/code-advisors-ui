"use client";
import ForumCardList from "@/components/card-component/forum-card/ForumCardList";
import React from "react";

export default function page() {
    return (
        <main className="bg-gray-100 w-full min-h-screen">
            <div className="ml-[320px] px-8 py-4 pt-16 flex justify-center">
                <div className="max-w-4xl w-full">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-primary mb-2">Community Forum</h1>
                        <p className="text-gray-600">Join discussions and share knowledge with fellow developers</p>
                    </div>
                    <div className="flex justify-center">
                        <ForumCardList />
                    </div>
                </div>
            </div>
        </main>
    );
}
