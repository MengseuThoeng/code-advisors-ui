"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Clock,
  Eye,
  MoreHorizontal,
  ArrowLeft,
  Tag,
  Calendar,
  User,
  ThumbsUp,
  Twitter,
  Facebook,
  Copy,
  Check,
  ChevronUp,
  Coffee,
  Zap,
  TrendingUp,
  Loader2,
  Pencil,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useArticle, useLikeArticle, useDeleteArticle, useBookmarkArticle } from "@/hooks/use-article";
import { useAuth } from "@/hooks/use-auth";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { useArticleComments, useCreateComment, useUpdateComment, useDeleteComment } from "@/hooks/use-comments";
import { CommentItem } from "@/components/comment/CommentItem";
import "@/components/text-editor/styleTextEditor.css";
import "highlight.js/styles/github.css";

export default function ContentDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const { data: article, isLoading, error } = useArticle(slug);
  const { user, isLoading: isLoadingUser } = useAuth();
  const likeArticleMutation = useLikeArticle(slug);
  const deleteArticleMutation = useDeleteArticle();
  const bookmarkArticleMutation = useBookmarkArticle(slug);
  
  // Check if current user is the author
  const isAuthor = user?.username === article?.author.username;
  
  // Comments
  const [commentPage, setCommentPage] = useState(0);
  const { data: commentsData, isLoading: commentsLoading } = useArticleComments(slug, commentPage);
  const createCommentMutation = useCreateComment(slug);
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();
  const [newComment, setNewComment] = useState("");
  
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    likeArticleMutation.mutate();
  };

  const handleBookmark = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    console.log('Before bookmark - isBookmarked:', article?.isBookmarked);
    bookmarkArticleMutation.mutate(undefined, {
      onSuccess: () => {
        console.log('Bookmark success - After mutation isBookmarked:', article?.isBookmarked);
      },
      onError: (error) => {
        console.error('Bookmark error:', error);
      }
    });
  };

  // Debug: Log article bookmark status changes
  console.log('Article render - isBookmarked:', article?.isBookmarked);

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = article?.title || '';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
  };

  const handleEditArticle = () => {
    router.push(`/content/${slug}/edit`);
  };

  const handleDeleteArticle = () => {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      deleteArticleMutation.mutate(slug, {
        onSuccess: () => {
          router.push('/content');
        },
      });
    }
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    
    createCommentMutation.mutate(
      { 
        content: newComment,
        parentCommentId: null 
      },
      {
        onSuccess: () => {
          setNewComment("");
        },
      }
    );
  };

  const handleReplyToComment = (parentCommentId: number, content: string) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    createCommentMutation.mutate(
      { 
        content,
        parentCommentId 
      }
    );
  };

  const handleEditComment = (commentId: number, content: string) => {
    updateCommentMutation.mutate({ commentId, content });
  };

  const handleDeleteComment = (commentId: number) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  if (isLoading) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="px-8 py-4 pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="bg-gray-100 w-full min-h-screen">
        <div className="px-8 py-4 pt-16">
          <div className="max-w-6xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#000040] via-[#000066] to-[#CD3937]">
        {/* Cover Image Background */}
        {article.coverImage && (
          <>
            <div className="absolute inset-0">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />
          </>
        )}
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 z-10">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            
            {/* Edit/Delete buttons for author */}
            {isAuthor && (
              <div className="ml-auto flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleEditArticle}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleDeleteArticle}
                  disabled={deleteArticleMutation.isPending}
                  className="text-white hover:bg-red-500/20 hover:text-red-100"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deleteArticleMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Tag className="w-3 h-3 mr-1" />
                    {typeof tag === 'string' ? tag : tag.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.viewsCount.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending</span>
                </div>
              </div>
            </div>
            
            {/* Author Card in Hero */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-white/30 cursor-pointer" onClick={() => router.push(`/user/${article.author.username}`)}>
                      <AvatarImage src={article.author.avatarUrl || DEFAULT_AVATAR} alt={article.author.username} />
                      <AvatarFallback className="bg-white/20 text-white text-lg">
                        {article.author.firstName?.[0]}{article.author.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg cursor-pointer hover:underline" onClick={() => router.push(`/user/${article.author.username}`)}>
                        {article.author.firstName} {article.author.lastName}
                      </h3>
                      <p className="text-white/70 text-sm">@{article.author.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-white text-[#000040] hover:bg-white/90" onClick={() => router.push(`/user/${article.author.username}`)}>
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Floating Action Bar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24">
                {/* Main Reactions */}
                <Card className="p-6 shadow-xl border-0 bg-white rounded-2xl">
                  <div className="flex lg:flex-col gap-4">
                    {/* Like Button */}
                    <div className="flex-1 lg:w-full">
                      <Button
                        onClick={handleLike}
                        disabled={likeArticleMutation.isPending}
                        variant="outline"
                        size="lg"
                        className={`w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 border-red-200 ${
                          article.userLiked
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-500'
                            : 'hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${article.userLiked ? 'fill-current' : ''}`} />
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                          <span className="font-semibold">{article.likesCount}</span>
                          <span className="text-xs lg:text-sm opacity-90">{article.userLiked ? 'Liked' : 'Likes'}</span>
                        </div>
                      </Button>
                    </div>
                    
                    {/* Bookmark Button */}
                    <div className="flex-1 lg:w-full">
                      <Button
                        onClick={handleBookmark}
                        disabled={bookmarkArticleMutation.isPending}
                        variant="outline"
                        size="lg"
                        className={`w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 border-[#000040]/20 ${
                          article.isBookmarked
                            ? 'bg-gradient-to-r from-[#000040] to-indigo-600 text-white border-[#000040]'
                            : 'hover:bg-gradient-to-r hover:from-[#000040] hover:to-indigo-600 hover:text-white hover:border-[#000040]'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${article.isBookmarked ? 'fill-current' : ''}`} />
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                          <span className="font-semibold">{article.isBookmarked ? 'Saved' : 'Save'}</span>
                        </div>
                      </Button>
                    </div>
                    
                    {/* Share Button */}
                    <div className="flex-1 lg:w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white border-green-200 hover:border-green-500 group"
                          >
                            <Share2 className="w-5 h-5 group-hover:animate-pulse" />
                            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                              <span className="font-semibold">Share</span>
                            </div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-48">
                          <DropdownMenuItem onClick={() => handleShare('twitter')}>
                            <Twitter className="w-4 h-4 mr-2" />
                            Share on Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare('facebook')}>
                            <Facebook className="w-4 h-4 mr-2" />
                            Share on Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare('copy')}>
                            {copied ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Link
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <article className="prose prose-lg max-w-none">
                <div 
                  className="tiptap text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />
              </article>
              
              {/* Article Footer */}
              <div className="mt-16 pt-8 border-t">
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-sm font-medium text-gray-600 mr-2">Topics:</span>
                  {article.tags.map((tag, index) => (
                    <Link key={index} href={`/content/tags/${typeof tag === 'string' ? tag.toLowerCase() : tag.name.toLowerCase()}`}>
                      <Badge variant="outline" className="hover:bg-[#000040] hover:text-white cursor-pointer">
                        {typeof tag === 'string' ? tag : tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
                
                {/* CTA Section */}
                <Card className="relative overflow-hidden text-white p-8 rounded-xl border-0">
                  {/* Background Image */}
                  {article.coverImage ? (
                    <div className="absolute inset-0">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000040] to-[#CD3937]" />
                  )}
                  
                  {/* Content */}
                  <div className="relative text-center z-10">
                    <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                    <p className="text-white/90 mb-6">Join thousands of developers getting the latest insights</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-white text-[#000040] hover:bg-white/90">
                        Subscribe to Newsletter
                      </Button>
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20" onClick={() => router.push(`/user/${article.author.username}`)}>
                        Follow @{article.author.username}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-white border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-[#CD3937]" />
                  Discussion ({article.commentsCount || 0})
                </h3>
                {user && (
                  <Button 
                    className="bg-[#000040] hover:bg-[#000040]/90 text-white"
                    onClick={() => {
                      // Scroll to comment input
                      document.getElementById('comment-input')?.focus();
                    }}
                  >
                    Write Comment
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Comment Input */}
              {user ? (
                <div className="mb-8">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatarUrl || DEFAULT_AVATAR} alt={user.username} />
                      <AvatarFallback className="bg-[#000040] text-white">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea
                        id="comment-input"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#CD3937] focus:ring-2 focus:ring-[#CD3937]/20 outline-none resize-none min-h-[120px] transition-all duration-200"
                      />
                      <div className="flex justify-end mt-3 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setNewComment("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-[#CD3937] hover:bg-[#CD3937]/90 text-white"
                          onClick={handlePostComment}
                          disabled={!newComment.trim() || createCommentMutation.isPending}
                        >
                          {createCommentMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            'Post Comment'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
                  <p className="text-center text-gray-700 mb-4">
                    <strong>Join the discussion!</strong> Sign in to share your thoughts and engage with the community.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button 
                      onClick={() => router.push('/auth/login')}
                      className="bg-[#000040] hover:bg-[#000040]/90 text-white"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => router.push('/auth/register')}
                      variant="outline"
                      className="border-[#000040] text-[#000040] hover:bg-[#000040] hover:text-white"
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {commentsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#CD3937]" />
                  </div>
                ) : commentsData && commentsData.content.length > 0 ? (
                  <>
                    {commentsData.content.map((comment: any) => (
                      <CommentItem
                        key={comment.id}
                        comment={comment}
                        currentUsername={user?.username}
                        onReply={handleReplyToComment}
                        onEdit={handleEditComment}
                        onDelete={handleDeleteComment}
                        currentUserAvatar={user?.avatarUrl || ''}
                        currentUserName={user?.firstName || user?.username || ''}
                        isLoggedIn={!!user}
                        depth={0}
                      />
                    ))}
                    
                    {/* Load More */}
                    {commentsData.totalPages > commentPage + 1 && (
                      <div className="flex justify-center pt-6">
                        <Button
                          variant="outline"
                          onClick={() => setCommentPage(commentPage + 1)}
                          className="border-[#000040] text-[#000040] hover:bg-[#000040] hover:text-white"
                        >
                          Load More Comments
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#000040] to-[#CD3937] rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Start the Conversation</h4>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Be the first to share your thoughts and engage with fellow developers about this article.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
