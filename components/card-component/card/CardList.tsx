"use client";

import * as React from "react";
import { CardComponent } from "./CardComponent";
import { Article } from "@/lib/article-api";

interface CardListProps {
  articles: Article[];
}

export function CardList({ articles }: CardListProps) {
    return (
        <div className="w-full">
            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                {articles.map((article) => (
                    <CardComponent key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
