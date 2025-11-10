"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Eye, Heart, MessageCircle, Calendar } from "lucide-react";
import { Article } from "@/lib/article-api";

interface UserArticleCardProps {
    article: Article;
}

export function UserArticleCard({ article }: UserArticleCardProps) {
    const displayTags = article.tags.slice(0, 3);
    const coverImage = article.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.title)}&size=200&background=random&bold=true`;
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <a href={`/content/${article.slug}`} className="block group">
            <Card className="rounded-lg border border-gray-200/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 bg-white overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                    {/* Image Section - Smaller, square */}
                    <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Image
                            src={coverImage}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            sizes="128px"
                            unoptimized={!article.coverImage}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                        {/* Top Section */}
                        <div className="space-y-2">
                            {/* Title */}
                            <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                {article.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                {article.excerpt}
                            </p>

                            {/* Tags */}
                            {displayTags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {displayTags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
                                        >
                                            #{typeof tag === 'string' ? tag : tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Bottom Section - Stats */}
                        <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                {/* Published Date */}
                                {article.publishedAt && (
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{formatDate(article.publishedAt)}</span>
                                    </div>
                                )}
                                
                                {/* Reading Time */}
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{article.readingTime} min read</span>
                                </div>
                            </div>

                            {/* Engagement Stats */}
                            <div className="flex items-center gap-3 text-xs">
                                {/* Views */}
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span className="font-medium">{article.viewsCount || 0}</span>
                                </div>
                                
                                {/* Likes */}
                                <div className="flex items-center gap-1 text-red-500">
                                    <Heart className="w-3.5 h-3.5" />
                                    <span className="font-medium">{article.likesCount || 0}</span>
                                </div>
                                
                                {/* Comments */}
                                <div className="flex items-center gap-1 text-blue-500">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span className="font-medium">{article.commentsCount || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </a>
    );
}
