// lib.ts - Updated to use centralized mock data

import { 
  mockAuthors, 
  mockComments, 
  mockNotifications, 
  simulateApiDelay 
} from './mockData';
import { Author, Content, Reactions, Comment } from "@/types/engagement";

const authors: Author[] = mockAuthors;
const comments: Comment[] = [...mockComments]; // Create a copy so we can modify it

// Mock API functions to simulate backend calls
const contents: Content[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React and how to build modern web applications.",
    cover: "https://i.pinimg.com/736x/b3/ba/35/b3ba35122f1b364eb13131343c94dc67.jpg",
    author: authors[0],
    tags: ["React", "JavaScript", "Web Development"],
    createdAt: "2023-05-15T10:00:00Z",
    reactions: { like: 30, love: 29, fire: 90 },
    comment: comments,
    isBookmark: false, // Whether the content is bookmarked by the user
    bookmark: 10 // The number of total bookmarks for this content
  },
  {
    id: "2",
    title: "Advanced TypeScript Techniques",
    description: "Dive deep into TypeScript and learn advanced concepts and patterns.",
    cover: "https://i.pinimg.com/236x/64/05/58/640558ee5bd3a60a62aea4d1911cbe3b.jpg",
    author: authors[1],
    tags: ["TypeScript", "JavaScript", "Programming"],
    createdAt: "2023-06-01T14:30:00Z",
    reactions: { like: 45, love: 38, fire: 72 },
    comment: comments,
    isBookmark: true, // Whether the content is bookmarked by the user
    bookmark: 25 // The number of total bookmarks for this content
  }
];


// Get the list of contents
export async function getContents(): Promise<Content[]> {
  return contents;
}

// Get a specific content by id
export async function getContentById(contentId: string): Promise<Content | undefined> {
  // Find and return the content with the matching id
  return contents.find(content => content.id === contentId);
}


// Function to get the comments of a specific content by id
export async function getCommentsByContentId(contentId: string): Promise<Comment[] | undefined> {
  const content = await getContentById(contentId);
  if (content) {
    return content.comment; // Return the comments for the specific content
  }
  return undefined; // Return undefined if no content found
}

// Get reactions (like, love, fire) for a content
export const updateReaction = async (contentId: string, reaction: Reactions): Promise<void> => {
  // Simulating a backend update
  console.log(`Updated reaction for content ${contentId}: ${reaction}`);
};

// Add a reply to a comment
export const addReply = async (commentId: string, replyText: string): Promise<void> => {
  // Simulating adding a reply to a comment
  console.log(`Added reply to comment ${commentId}: ${replyText}`);
};

// Mock API functions with static data
export async function getComments(contentId: string): Promise<Comment[]> {
  // Simulate API delay
  await simulateApiDelay(500);
  
  // Return static comments based on contentId
  return comments.filter(comment => comment.id.includes(contentId.slice(-1)) || Math.random() > 0.5);
}

export async function addComment(contentId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'replies'>): Promise<Comment> {
  // Simulate API delay
  await simulateApiDelay(300);
  
  const newComment: Comment = {
    ...comment,
    id: `c${Date.now()}`,
    createdAt: new Date(),
    replies: []
  };
  
  // Add to static data (in real app, this would be sent to backend)
  comments.push(newComment);
  
  return newComment;
}

export async function updateComment(commentId: string, body: string): Promise<Comment> {
  // Simulate API delay
  await simulateApiDelay(300);
  
  const comment = comments.find(c => c.id === commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  
  comment.body = body;
  comment.updateAt = new Date();
  
  return comment;
}

export async function deleteComment(commentId: string): Promise<void> {
  // Simulate API delay
  await simulateApiDelay(300);
  
  const index = comments.findIndex(c => c.id === commentId);
  if (index === -1) {
    throw new Error('Comment not found');
  }
  
  comments.splice(index, 1);
}


// Static notification data
import type { Notification, NotificationData } from '@/types/notifications';
import { NotificationType } from '@/types/notifications';

export const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  // Simulate API delay
  await simulateApiDelay(500);
  
  return mockNotifications.filter(notification => notification.receiverId === userId);
};

export const markAsRead = async (id: string): Promise<void> => {
  // Simulate API delay
  await simulateApiDelay(200);
  
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.isRead = true;
  }
};

export const removeNotification = async (id: string): Promise<void> => {
  // Simulate API delay
  await simulateApiDelay(200);
  
  const index = mockNotifications.findIndex(n => n.id === id);
  if (index !== -1) {
    mockNotifications.splice(index, 1);
  }
};

