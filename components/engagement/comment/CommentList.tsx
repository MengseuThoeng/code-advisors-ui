"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { TbMessageReport } from "react-icons/tb";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegComment } from "react-icons/fa";
import { Profile } from "../Profile";
import { Comment } from "@/types/engagement";

interface Content {
  comment: Comment[];
  contentId?: string;
}

export function CommentList({ comment = [], contentId }: Content) {
  const [comments, setComments] = React.useState<Comment[]>(comment);
  const [newComment, setNewComment] = React.useState("");
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [editingComment, setEditingComment] = React.useState<string | null>(
    null
  );
  const [username, setUsername] = React.useState("CurrentUser");
  const [editContent, setEditContent] = React.useState("");
  const [expandedComments, setExpandedComments] = React.useState<string[]>([]);

  const handleSubmit = (parentId: string | null = null) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(), // Ensuring it's a string as per the updated type
        // author: { username, avatarUrl: "/placeholder.svg?height=40&width=40" },
        body: newComment.trim(),
        createdAt: new Date(),
        updateAt: new Date(),
        isReport: false,
        replies: [],
        parentId: parentId || null,
      };

      if (parentId === null) {
        setComments([comment, ...comments]);
      } else {
        setComments(addReply(comments, parentId, comment));
        setExpandedComments([...expandedComments, parentId]);
      }

      setNewComment("");
      setReplyingTo(null);
    }
  };

  const addReply = (
    comments: Comment[],
    parentId: string,
    newReply: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [newReply, ...comment.replies] };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReply(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  };

  const handleDismiss = () => {
    setNewComment("");
    setReplyingTo(null);
  };

  const toggleExpanded = (commentId: string) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleEdit = (commentId: string, body: string) => {
    setEditingComment(commentId);
    setEditContent(body);
  };

  const handleDelete = (commentId: string) => {
    setComments(deleteComment(comments, commentId));
  };

  const deleteComment = (comments: Comment[], commentId: string): Comment[] => {
    return comments.filter((comment) => {
      if (comment.id === commentId) {
        return false;
      }
      if (comment.replies.length > 0) {
        comment.replies = deleteComment(comment.replies, commentId);
      }
      return true;
    });
  };

  const handleSaveEdit = (commentId: string) => {
    setComments(editComment(comments, commentId, editContent));
    setEditingComment(null);
    setEditContent("");
  };

  const editComment = (
    comments: Comment[],
    commentId: string,
    newContent: string
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, body: newContent, updateAt: new Date() };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: editComment(comment.replies, commentId, newContent),
        };
      }
      return comment;
    });
  };

  // Function to count all comments and replies
  const getTotalComments = (comments: Comment[]): number => {
    let total = 0;
    const countReplies = (comments: Comment[]): void => {
      total += comments.length;
      comments.forEach((comment) => {
        if (comment.replies.length > 0) {
          countReplies(comment.replies); // Recursively count replies
        }
      });
    };
    countReplies(comments);
    return total;
  };

  const renderComment = (
    comment: Comment,
    border: boolean = true,
    shadow: boolean = false
  ) => (
    <Card
      key={comment.id}
      className={`
      ${border ? "border" : "border-none"} 
      ${shadow ? "shadow" : "shadow-none"}
      rounded-[5px]
    `}
    >
      <CardHeader className="flex flex-row items-center space-y-0">
        <Profile
          key={comment.id}
          imageUrl={comment.author?.image}
          postDate={comment.createdAt.toLocaleDateString()}
          username={comment.author?.userName}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-2">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleEdit(comment.id, comment.body)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>កែរ</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(comment.id)}>
                <Trash className="mr-2 h-4 w-4" />
                <span>លុប</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <TbMessageReport className="mr-2 h-4 w-4" />
                <a href={`/report/comment/${contentId}/${comment.id}`}>រាយការណ៍</a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
      </CardHeader>

      <CardContent>
        {editingComment === comment.id ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(comment.id);
            }}
            className="space-y-4"
          >
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleDismiss}>
                បោះបង់
              </Button>
              <Button type="submit" className="text-white">
                រក្សាទុក
              </Button>
            </div>
          </form>
        ) : (
          <p>{comment.body}</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setReplyingTo(comment.id)}
        >
          <FaRegComment className="mr-2 h-4 w-4​" />
          <span className="text-sm">ឆ្លើតប</span>
        </Button>
        {comment.replies.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpanded(comment.id)}
          >
            {expandedComments.includes(comment.id) ? (
              <ChevronUp className="mr-2 h-4 w-4​ " />
            ) : (
              <ChevronDown className="mr-2 h-4 w-4" />
            )}
            <span className="text-sm">
            {comment.replies.length}{" "}
            {comment.replies.length === 1 ? "ឆ្លើយតប" : "ឆ្លើយតប"}
            </span>
          </Button>
        )}
      </CardFooter>

      {replyingTo === comment.id && ( // Only show reply form if replyingTo matches comment.id
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(comment.id); // Pass parent comment id when submitting a reply
            }}
            className="space-y-4"
          >
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="សរសេរ ការឆ្លើយតប..."
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleDismiss}>
                បោះបង់
              </Button>
              <Button type="submit" className="text-white">
                បញ្ចូន
              </Button>
            </div>
          </form>
        </CardContent>
      )}

      {expandedComments.includes(comment.id) && (
        <CardContent>
          <div className="space-y-4 border-l-2">
            {comment.replies.map((reply) => renderComment(reply, false))}
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="w-full max-w-3xl overflow-hidden p-[1px]">
      <Card className="rounded-[5px] shadow-none">
        <CardHeader>
          <CardTitle>មតិយោបល់ ({getTotalComments(comments)})</CardTitle>
          <Profile
            imageUrl="https://i.pinimg.com/236x/3f/a9/2a/3fa92a0c86938e43376928b3ee66518b.jpg"
            postDate="30 Jan 2004"
            username="sokkhann"
          />
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            {/* <div className="space-y-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div> */}
            <div className="space-y-2">
              <Textarea
                id="comment"
                placeholder="សរសេរ​ មតិយោបល់..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleDismiss}>
                បោះបង់
              </Button>
              <Button type="submit" className="text-white">
                បញ្ចូន
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2 mt-2 rounded-[5px] p-[1px]">
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
}
