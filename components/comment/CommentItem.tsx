'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ArticleComment } from '@/lib/comment-api';
import { DEFAULT_AVATAR } from '@/lib/constants';
import { UserHoverCard } from './UserHoverCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CommentItemProps {
  comment: ArticleComment;
  currentUsername?: string;
  onReply: (commentId: number, content: string) => void;
  onEdit?: (commentId: number, content: string) => void;
  onDelete?: (commentId: number) => void;
  currentUserAvatar?: string;
  currentUserName?: string;
  isLoggedIn?: boolean;
  depth?: number; // Track nesting depth
  rootParentId?: number; // Track the root parent for nested replies
}

export function CommentItem({
  comment,
  currentUsername,
  onReply,
  onEdit,
  onDelete,
  currentUserAvatar,
  currentUserName,
  isLoggedIn,
  depth = 0,
  rootParentId,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const isAuthor = currentUsername === comment.author.username;
  
  // Determine the actual parent ID for this reply
  // If this is a nested comment (depth > 0), use the rootParentId
  // Otherwise, use this comment's ID as the parent
  const replyParentId = depth > 0 && rootParentId ? rootParentId : comment.id;

  // Handle reply button click - auto-populate with @mention
  const handleReplyClick = () => {
    if (!isReplying) {
      const mention = `@${comment.author.username} `;
      setReplyContent(mention);
    } else {
      setReplyContent("");
    }
    setIsReplying(!isReplying);
  };

  // Parse comment content to detect @mentions and wrap them with UserHoverCard
  const renderContentWithMentions = (content: string) => {
    const mentionRegex = /@(\w+)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = mentionRegex.exec(content)) !== null) {
      // Add text before the mention
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      // Add the mention with hover card
      const username = match[1];
      parts.push(
        <UserHoverCard key={match.index} username={username}>
          <span className="text-[#CD3937] font-semibold hover:underline cursor-pointer">
            @{username}
          </span>
        </UserHoverCard>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  const handleSaveEdit = () => {
    if (onEdit && editContent.trim()) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      // Always reply to the root parent for nested comments
      onReply(replyParentId, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div className="flex gap-4 group">
      {/* Avatar */}
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage 
          src={comment.author.avatarUrl || DEFAULT_AVATAR} 
          alt={comment.author.username} 
        />
        <AvatarFallback className="bg-[#000040] text-white">
          {comment.author.firstName?.[0]}{comment.author.lastName?.[0]}
        </AvatarFallback>
      </Avatar>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {comment.author.firstName} {comment.author.lastName}
            </span>
            <span className="text-sm text-gray-500">
              @{comment.author.username}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>

          {/* Actions Menu (for author) */}
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete?.(comment.id)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Comment Body */}
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#CD3937] focus:ring-2 focus:ring-[#CD3937]/20 outline-none resize-none min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleSaveEdit}
                className="bg-[#CD3937] hover:bg-[#CD3937]/90 text-white"
              >
                Save
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-700 whitespace-pre-wrap break-words mb-3">
            {renderContentWithMentions(comment.content)}
          </div>
        )}

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex items-center gap-4">
            {/* Reply Button */}
            <button
              onClick={handleReplyClick}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isReplying 
                  ? 'text-[#CD3937]' 
                  : 'text-gray-500 hover:text-[#000040]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {isReplying ? 'Cancel' : 'Reply'}
              {!isReplying && comment.repliesCount > 0 && (
                <span>({comment.repliesCount})</span>
              )}
            </button>
          </div>
        )}

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-4">
            {isLoggedIn ? (
              <div className="flex gap-3 animate-in slide-in-from-top-2 duration-200">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={currentUserAvatar || DEFAULT_AVATAR} alt="You" />
                  <AvatarFallback className="bg-[#000040] text-white text-xs">
                    {currentUserName?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Reply to ${comment.author.firstName}...`}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#CD3937] focus:ring-2 focus:ring-[#CD3937]/20 outline-none resize-none min-h-[80px] text-sm"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setIsReplying(false);
                        setReplyContent("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSubmitReply}
                      disabled={!replyContent.trim()}
                      className="bg-[#CD3937] hover:bg-[#CD3937]/90 text-white"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                <p className="text-sm text-gray-700 mb-3">
                  Please <strong>sign in</strong> to reply to this comment
                </p>
                <div className="flex justify-center gap-2">
                  <Button 
                    size="sm"
                    onClick={() => window.location.href = '/auth/login'}
                    className="bg-[#000040] hover:bg-[#000040]/90 text-white"
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => setIsReplying(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Replies (if any) */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-200">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                currentUsername={currentUsername}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
                currentUserAvatar={currentUserAvatar}
                currentUserName={currentUserName}
                isLoggedIn={isLoggedIn}
                depth={depth + 1}
                rootParentId={rootParentId || comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
