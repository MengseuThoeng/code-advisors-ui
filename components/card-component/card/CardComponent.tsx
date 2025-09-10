"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, User, ArrowRight } from "lucide-react";

interface CardData {
    id: string;
    title: string;
    description: string;
    tags: string;
    tags1: string;
    image: string;
}

export function CardComponent({
    title,
    description,
    tags,
    tags1,
    image,
    id,
}: CardData) {
    return (
        <a href={`/content/${id}`} className="block group">
            <Card className="h-full rounded-2xl border-0 shadow-lg shadow-gray-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 hover:-translate-y-1 bg-white overflow-hidden">
                {/* Image Section */}
                <div className="relative w-full h-48 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating action button */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                </div>

                <CardHeader className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge
                            variant="outline"
                            className="border-primary/20 text-primary text-xs rounded-full font-medium bg-primary/5 hover:bg-primary hover:text-white transition-colors duration-200"
                        >
                            #{tags}
                        </Badge>
                        <Badge
                            variant="outline" 
                            className="border-secondary/20 text-secondary text-xs rounded-full font-medium bg-secondary/5 hover:bg-secondary hover:text-white transition-colors duration-200"
                        >
                            #{tags1}
                        </Badge>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-primary line-clamp-2 group-hover:text-primary/80 transition-colors">
                            {title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-6 pt-0">
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>John Doe</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>5 min read</span>
                            </div>
                        </div>
                        <div className="text-primary font-medium">
                            Read more →
                        </div>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
}
