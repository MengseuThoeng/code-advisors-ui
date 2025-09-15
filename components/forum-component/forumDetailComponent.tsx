/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { 
    MessageSquare, 
    Share2, 
    Bookmark,
    Clock,
    Eye,
    ArrowUp,
    ArrowDown
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import CommentReplyComponent from "./commentReplyComponent";
import Image from "next/image";

export default function ForumDetailComponent() {
    const [replyText, setReplyText] = useState("");
    const [saved, setSaved] = useState(false);
    const [votes, setVotes] = useState(124);
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

    const handleVote = (type: 'up' | 'down') => {
        if (userVote === type) {
            // Remove vote
            setUserVote(null);
            setVotes(prev => type === 'up' ? prev - 1 : prev + 1);
        } else {
            // Change or add vote
            if (userVote) {
                setVotes(prev => type === 'up' ? prev + 2 : prev - 2);
            } else {
                setVotes(prev => type === 'up' ? prev + 1 : prev - 1);
            }
            setUserVote(type);
        }
    };

    return (
        <div className="ml-[320px] px-1 min-h-screen">
            <div className="max-w-5xl mx-auto">
                
                {/* Main Post */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
                    
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-3">
                        <Image
                            src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                            alt="Golanginya"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900">@Golanginya</h3>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>Nov 12, 2024 • 1:38 PM</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span>247 views</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        How to patch KDE on FreeBSD?
                    </h1>

                    {/* Content */}
                    <div className="mb-3">
                        <p className="text-gray-700 mb-2">
                            Mi magna sed nec nisl mattis. Magna cursus tincidunt rhoncus imperdiet fermentum pretium, pharetra nisl. Euismod.
                        </p>

                        <div className="bg-gray-900 rounded p-3 mb-2">
                            <pre className="text-green-400 font-mono text-sm">
                                <code>{`package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`}</code>
                            </pre>
                        </div>

                        <p className="text-gray-700">
                            Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper.
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {["FreeBSD", "KDE", "System"].map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-2 py-1 text-xs">
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <Button
                                onClick={() => handleVote('up')}
                                variant={userVote === 'up' ? "default" : "outline"}
                                size="sm"
                                className={userVote === 'up' ? "bg-green-600 text-white" : ""}
                            >
                                <ArrowUp className="w-4 h-4 mr-1" />
                                {votes}
                            </Button>
                            <Button
                                onClick={() => handleVote('down')}
                                variant={userVote === 'down' ? "default" : "outline"}
                                size="sm"
                                className={userVote === 'down' ? "bg-red-600 text-white" : ""}
                            >
                                <ArrowDown className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Answer
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSaved(!saved)}
                            >
                                <Bookmark className="w-4 h-4 mr-2" />
                                {saved ? "Saved" : "Save"}
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Answer Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
                    <h3 className="font-semibold mb-2">Your Answer</h3>
                    <Textarea
                        placeholder="Write your answer..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="mb-2"
                        rows={3}
                    />
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Cancel</Button>
                        <Button className="bg-primary text-white" size="sm">Post Answer</Button>
                    </div>
                </div>

                {/* Answers */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="font-semibold mb-2">Answers</h3>
                    {/* <CommentReplyComponent /> */}
                    <div className="text-gray-500 text-center py-8">
                        No answers yet. Be the first to answer!
                    </div>
                </div>
            </div>
        </div>
    );
}
