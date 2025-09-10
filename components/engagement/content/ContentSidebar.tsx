"use client";

import {
  SidebarComment,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebarContent";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";

import { it } from "node:test";
import {
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaComment,
  FaBookmark,
} from "react-icons/fa";
import { ReactionButton } from "./Reaction";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Reactions } from "@/types/engagement";

interface Content {
  contentId?: string;
  reactions?: Reactions;
  comment?: { id: string }[];
  bookmark?: number; // The original count of bookmarks from content
}

export function ContentSidebar({
  reactions,
  comment,
  bookmark,
  contentId,
}: Content) {
  const [isCommentFilled, setIsCommentFilled] = useState(false);
  const [isBookmarkFilled, setIsBookmarkFilled] = useState(false);
  const [currentBookmarkCount, setCurrentBookmarkCount] = useState(
    bookmark || 0
  ); // Initialize with a default value of 0 if bookmarksCount is undefined

  const [localReactions, setLocalReactions] = useState<Reactions>({
    like: 0,
    love: 0,
    fire: 0,
    ...reactions, // Ensure you merge the passed reactions (defaults to 0 if undefined)
  });

  const totalReactions =
    localReactions.like + localReactions.love + localReactions.fire;

  const toggleComment = () => setIsCommentFilled(!isCommentFilled);

  const toggleBookmark = () => {
    setIsBookmarkFilled(!isBookmarkFilled);

    if (isBookmarkFilled) {
      // Decrease bookmark count when unbookmarking
      setCurrentBookmarkCount(currentBookmarkCount - 1);
    } else {
      // Increase bookmark count when bookmarking
      setCurrentBookmarkCount(currentBookmarkCount + 1);
    }
  };

  const handleReactionClick = (reactionType: keyof Reactions) => {
    setLocalReactions((prev) => {
      const newCount = totalReactions + (prev[reactionType] ? -1 : 1); // Toggle reaction count (increase or decrease)
      return { ...prev, [reactionType]: newCount };
    });
  };

  return (
    <SidebarComment
        className="bg-gray"
        collapsible="none"
        side="left"
        width="100px"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="py-8 gap-y-8">
                {/* Display the first icon (Heart) */}
                <SidebarMenuItem>
                  <div className="mx-4 justify-self-end">
                    <ReactionButton
                      reactions={localReactions}
                      onReactionChange={handleReactionClick}
                    />
                    <div className="text-center">{totalReactions}</div>
                  </div>
                </SidebarMenuItem>

                {/* Display the second icon (Comment) */}
                <SidebarMenuItem>
                  <div className=" mx-4 justify-self-end">
                    <SidebarTrigger
                      icon={
                        isCommentFilled ? (
                          <FaRegComment
                            className="text-2xl "
                            onClick={toggleComment}
                          />
                        ) : (
                          <FaRegComment
                            className="text-2xl fill-blue-600"
                            onClick={toggleComment}
                          />
                        )
                      }
                    />
                    <div className="text-center pt-1">{comment?.length}</div>
                  </div>
                </SidebarMenuItem>

                {/* Display the third icon (Bookmark) */}
                <SidebarMenuItem>
                  <div className="mx-4 justify-self-end">
                    {isBookmarkFilled ? (
                      <FaBookmark
                        className="text-2xl fill-yellow-500"
                        onClick={toggleBookmark}
                      />
                    ) : (
                      <FaRegBookmark
                        className="text-2xl"
                        onClick={toggleBookmark}
                      />
                    )}
                    <div className="text-center pt-1">
                      {currentBookmarkCount}
                    </div>
                  </div>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="justify-self-end mx-4 ">
                        <MdMoreHoriz className="text-2xl" />
                        <span className="sr-only">More options</span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="px-2">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Share to X</DropdownMenuItem>
                        <DropdownMenuItem>Share to Facebook</DropdownMenuItem>
                        <DropdownMenuItem>Share to LinkedIn</DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href={`/report/content/${contentId}`}>
                            Report Abuse
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarComment>
  );
}
