"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, User, Heart } from "lucide-react";
import { Article } from "@/lib/article-api";
import { DEFAULT_AVATAR } from "@/lib/constants";

interface CardComponentProps {
    article: Article;
}

export function CardComponent({ article }: CardComponentProps) {
    const displayTags = article.tags.slice(0, 2);
    
    // Use article cover image or create a gradient placeholder
    const coverImage = article.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.title)}&size=400&background=000040&color=fff&bold=true`;
    
    return (
        <a href={`/content/${article.slug}`} className="block group">
            <Card className="h-full rounded-xl border border-gray-200/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 bg-white overflow-hidden">
                {/* Image Section - Reduced height */}
                <div className="relative w-full h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#000040] to-[#CD3937]">
                    <Image
                        src={coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 1200px"
                        unoptimized={!article.coverImage}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Tags overlay on image */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {displayTags.map((tag, index) => (
                            <Badge
                                key={index}
                                className={`${
                                    index === 0 
                                        ? 'bg-primary/90 hover:bg-primary text-white' 
                                        : 'bg-secondary/90 hover:bg-secondary text-white'
                                } text-[10px] rounded-md font-medium backdrop-blur-sm border-0 px-2 py-0.5`}
                            >
                                #{typeof tag === 'string' ? tag : tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Content Section - More compact */}
                <div className="p-3.5 md:p-4">
                    {/* Title */}
                    <h2 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-2 leading-relaxed mb-3">
                        {article.excerpt}
                    </p>

                    {/* Footer metadata */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            {/* Author */}
                            <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    <User className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-[11px] md:text-xs font-medium text-gray-700 truncate max-w-[70px] md:max-w-[100px]">
                                    {article.author.firstName}
                                </span>
                            </div>
                            
                            {/* Reading time */}
                            <div className="flex items-center gap-1 text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span className="text-[11px] md:text-xs">{article.readingTime}m</span>
                            </div>
                        </div>
                        
                        {/* Like count */}
                        <div className="flex items-center gap-1 text-gray-400 group-hover:text-red-500 transition-colors">
                            <Heart className="w-3.5 h-3.5" />
                            <span className="text-[11px] md:text-xs font-medium">{article.likesCount || 0}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </a>
    );
}
