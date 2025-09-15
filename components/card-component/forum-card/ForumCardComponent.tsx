"use client";

import * as React from "react";
import {
    MoreVertical,
    Eye,
    MessageSquare,
    ArrowUp,
    Bookmark,
    File,
    Share2Icon,
    Clock,
    ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import {
    PopoverBody,
    PopoverButton,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
} from "@/components/ui/pop-over";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ForumCardComponent({
    id,
    avatar,
    username,
    timestamp,
    title,
    content,
    tags,
    views,
    comments,
    upvotes,
}: {
    id: number;
    avatar: string;
    username: string;
    timestamp: string;
    title: string;
    content: string;
    tags: string[];
    views: number;
    comments: number;
    upvotes: number;
}) {
    const actions = [
        {
            icon: <Bookmark className="w-4 h-4" />,
            label: "Save Post",
            action: () => console.log("Save Post"),
        },
        {
            icon: <File className="w-4 h-4" />,
            label: "Report",
            action: () => console.log("Report"),
        },
        {
            icon: <Share2Icon className="w-4 h-4" />,
            label: "Share",
            action: () => console.log("Edit Colors"),
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8 border border-gray-100 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300 group">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Image
                            src={avatar}
                            alt={username}
                            width={56}
                            height={56}
                            className="rounded-full object-cover ring-2 ring-primary/10"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary text-lg">{username}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{timestamp}</span>
                        </div>
                    </div>
                </div>
                <div className="text-gray-400 hover:text-primary transition-colors">
                    <PopoverRoot>
                        <PopoverTrigger className="border-none p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2 shadow-xl border-0 rounded-xl">
                            <PopoverBody>
                                {actions.map((action, index) => (
                                    <PopoverButton
                                        key={index}
                                        onClick={action.action}
                                        className="flex items-center space-x-3 p-3 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors text-sm font-medium"
                                    >
                                        {action.icon}
                                        <span>{action.label}</span>
                                    </PopoverButton>
                                ))}
                            </PopoverBody>
                        </PopoverContent>
                    </PopoverRoot>
                </div>
            </div>

            {/* Content Section */}
            <div className="mb-6">
                <Link href={`/forum/${id}`}>
                    <h2 className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors mb-4 line-clamp-2 group-hover:underline decoration-primary/30">
                        {title}
                    </h2>
                </Link>
                <p className="text-gray-600 leading-relaxed line-clamp-3 text-base">{content}</p>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-3 mb-6">
                {tags?.map((tag, index) => (
                    <Link href={`/tag/${tag}`} key={tag}>
                        <Badge 
                            variant="outline"
                            className={`border rounded-full text-sm font-medium transition-colors hover:text-white px-3 py-1 ${
                                index % 2 === 0 
                                    ? 'border-primary/20 text-primary bg-primary/5 hover:bg-primary' 
                                    : 'border-secondary/20 text-secondary bg-secondary/5 hover:bg-secondary'
                            }`}
                        >
                            #{tag}
                        </Badge>
                    </Link>
                ))}
            </div>

            {/* Metrics Section */}
            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                <div className="flex items-center space-x-8 text-gray-500">
                    <div className="flex items-center space-x-2 hover:text-primary transition-colors cursor-pointer">
                        <Eye className="w-5 h-5" />
                        <span className="text-base font-medium">{views}</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-primary transition-colors cursor-pointer">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-base font-medium">{comments}</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-secondary transition-colors cursor-pointer">
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-base font-medium">{upvotes}</span>
                    </div>
                </div>
                
                <div className="text-primary font-medium text-base group-hover:translate-x-1 transition-transform">
                    View Discussion →
                </div>
            </div>
        </div>
    );
}
