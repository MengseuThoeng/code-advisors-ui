"use client";

import * as React from "react";
import { UserArticleCard } from "./UserArticleCard";
import { Article } from "@/lib/article-api";

interface UserArticleListProps {
  articles: Article[];
}

export function UserArticleList({ articles }: UserArticleListProps) {
    return (
        <div className="space-y-4">
            {articles.map((article) => (
                <UserArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}
