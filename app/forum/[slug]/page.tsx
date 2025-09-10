/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ForumDetailComponent from "@/components/forum-component/forumDetailComponent";
import React from "react";

// If you're fetching data, make this async
export default function ForumDetailPage({
    params,
}: {
    params: { id: string };
}) {
    // You can get the forum data using the ID from params
    // For example:
    // const forumData = await getForumById(params.id);

    // If data doesn't exist, you can show 404
    // if (!forumData) notFound();

    return (
        <main className="flex bg-gray-100 w-full lg:px-[100px] pb-6 pt-[80px] xs:px-[30px] md:px-[80px]">
            {/* Forum Detail Component */}
            <div className="w-full">
                <ForumDetailComponent />
            </div>
        </main>
    );
}
