// types.ts

// Types for Reaction
export interface Reactions {
  like: number;
  love: number;
  fire: number;
}

// Type for Author Profile
export interface Author {
  id: string;
  userName: string;
  image: string;
}

// Type for Content
export interface Content {
  id?: string;
  title?: string;
  description?: React.ReactNode;
  cover?: string;
  author?: Author;
  tags?: string[];
  createdAt?: string;
  reactions?: Reactions;
  comment?: Comment[];
  isBookmark?: boolean;
  bookmark?: number;
}

// Type for Comment
export interface Comment {
  id: string;
  author?: Author;
  body: string;
  createdAt: Date;
  isReport: boolean;
  updateAt: Date;
  parentId?: string | null;
  replies: Comment[];
}

// Props for the ContentList Component
export interface ContentListProps {
  contents: Content[];
  onContentClick: (contentId: string) => void;
}

// Props for the ContentDetail Component
export interface ContentDetailProps {
  content: Content;
  onLike: (contentId: string) => void;
  onLove: (contentId: string) => void;
  onFire: (contentId: string) => void;
  onComment: (contentId: string, commentText: string) => void;
  onReply: (commentId: string, replyText: string) => void;
}

export type ReportReason = 'spam' | 'harassment' | 'inappropriate' | 'other';

export interface Report {
  id: string;
  reason: ReportReason;
  details?: string;
  reportedBy: string;
  createdAt: string;
}