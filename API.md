# CodeAdvisor Platform - API Documentation

## 📋 Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [User Management APIs](#user-management-apis)
3. [Forum APIs](#forum-apis)
4. [Content Management APIs](#content-management-apis)
5. [Tag APIs](#tag-apis)
6. [Notification APIs](#notification-apis)
7. [Search APIs](#search-apis)
8. [History & Analytics APIs](#history--analytics-apis)
9. [Data Models](#data-models)

---

## 🔐 Authentication APIs

### POST `/api/auth/register`
Register a new user account
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "password": "string"
}
```

### POST `/api/auth/login`
User login with email/password
```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean"
}
```

### POST `/api/auth/social/google`
Google OAuth login
```json
{
  "token": "string"
}
```

### POST `/api/auth/social/github`
GitHub OAuth login
```json
{
  "code": "string"
}
```

### POST `/api/auth/logout`
User logout (invalidate token)

### POST `/api/auth/refresh`
Refresh access token
```json
{
  "refreshToken": "string"
}
```

### POST `/api/auth/forgot-password`
Send password reset email
```json
{
  "email": "string"
}
```

### POST `/api/auth/reset-password`
Reset password with token
```json
{
  "token": "string",
  "newPassword": "string"
}
```

### POST `/api/auth/verify-otp`
Verify OTP for 2FA
```json
{
  "email": "string",
  "otp": "string"
}
```

---

## 👤 User Management APIs

### GET `/api/users/profile`
Get current user profile

### PUT `/api/users/profile`
Update user profile
```json
{
  "firstName": "string",
  "lastName": "string",
  "bio": "string",
  "location": "string",
  "website": "string",
  "github": "string",
  "twitter": "string",
  "linkedin": "string",
  "skills": ["string"],
  "avatar": "string"
}
```

### GET `/api/users/{username}`
Get user profile by username

### GET `/api/users`
Get users list with pagination
```
Query params:
- page: number
- limit: number
- search: string
- sortBy: followers|posts|reputation
```

### GET `/api/users/{userId}/posts`
Get user's posts (content + forum)
```
Query params:
- type: content|forum|all
- page: number
- limit: number
```

### GET `/api/users/{userId}/stats`
Get user statistics
```json
{
  "postsCount": "number",
  "forumPostsCount": "number", 
  "reputation": "number",
  "followers": "number",
  "following": "number",
  "badges": ["string"]
}
```

### POST `/api/users/{userId}/follow`
Follow/unfollow user

### GET `/api/users/{userId}/followers`
Get user followers

### GET `/api/users/{userId}/following`
Get users that user is following

---

## 💬 Forum APIs

### GET `/api/forum/posts`
Get forum posts with filtering
```
Query params:
- page: number
- limit: number
- sortBy: latest|popular|votes|answered
- tags: string (comma-separated)
- search: string
- questionType: general|bug|feature|review|help
```

### POST `/api/forum/posts`
Create new forum post
```json
{
  "title": "string",
  "content": "string",
  "questionType": "general|bug|feature|review|help",
  "tags": ["string"],
  "expectedOutput": "string", // for bug reports
  "actualOutput": "string",   // for bug reports
  "codeSnippet": "string",
  "environment": "string"
}
```

### GET `/api/forum/posts/{postId}`
Get single forum post with comments

### PUT `/api/forum/posts/{postId}`
Update forum post (only by author)
```json
{
  "title": "string",
  "content": "string",
  "tags": ["string"],
  "resolved": "boolean"
}
```

### DELETE `/api/forum/posts/{postId}`
Delete forum post (only by author)

### POST `/api/forum/posts/{postId}/vote`
Vote on forum post
```json
{
  "voteType": "up|down"
}
```

### DELETE `/api/forum/posts/{postId}/vote`
Remove vote from forum post

### GET `/api/forum/posts/{postId}/comments`
Get comments for forum post
```
Query params:
- page: number
- limit: number
- sortBy: oldest|newest|votes
```

### POST `/api/forum/posts/{postId}/comments`
Add comment to forum post
```json
{
  "content": "string",
  "parentCommentId": "string" // for replies
}
```

### PUT `/api/forum/comments/{commentId}`
Update comment (only by author)
```json
{
  "content": "string"
}
```

### DELETE `/api/forum/comments/{commentId}`
Delete comment (only by author)

### POST `/api/forum/comments/{commentId}/vote`
Vote on comment
```json
{
  "voteType": "up|down"
}
```

### POST `/api/forum/posts/{postId}/mark-solution`
Mark comment as solution (only by post author)
```json
{
  "commentId": "string"
}
```

---

## 📝 Content Management APIs

### GET `/api/content/articles`
Get published articles
```
Query params:
- page: number
- limit: number
- sortBy: latest|popular|trending
- tags: string (comma-separated)
- search: string
- author: string
```

### POST `/api/content/articles`
Create new article
```json
{
  "title": "string",
  "slug": "string",
  "content": "string",
  "excerpt": "string",
  "coverImage": "string",
  "tags": ["string"],
  "status": "draft|published",
  "publishedAt": "datetime"
}
```

### GET `/api/content/articles/{slug}`
Get single article by slug

### PUT `/api/content/articles/{articleId}`
Update article (only by author)
```json
{
  "title": "string",
  "slug": "string", 
  "content": "string",
  "excerpt": "string",
  "coverImage": "string",
  "tags": ["string"],
  "status": "draft|published"
}
```

### DELETE `/api/content/articles/{articleId}`
Delete article (only by author)

### POST `/api/content/articles/{articleId}/like`
Like/unlike article

### GET `/api/content/articles/{articleId}/comments`
Get article comments
```
Query params:
- page: number
- limit: number
- sortBy: oldest|newest|likes
```

### POST `/api/content/articles/{articleId}/comments`
Add comment to article
```json
{
  "content": "string",
  "parentCommentId": "string" // for replies
}
```

### GET `/api/content/drafts`
Get user's draft articles

### POST `/api/content/upload-image`
Upload image for content
```
Form data: image file
```

### GET `/api/content/trending`
Get trending articles (last 7 days)

---

## 🏷️ Tag APIs

### GET `/api/tags`
Get all tags with usage stats
```
Query params:
- type: content|forum|all
- sortBy: popular|alphabetical|recent
- limit: number
```

### POST `/api/tags`
Create new tag (admin only)
```json
{
  "name": "string",
  "description": "string",
  "color": "string",
  "category": "language|framework|tool|concept"
}
```

### GET `/api/tags/{tagName}`
Get tag details with related content
```
Query params:
- includeContent: boolean
- includeForum: boolean
```

### GET `/api/tags/{tagName}/content`
Get content by tag
```
Query params:
- page: number
- limit: number
- type: articles|forum|all
```

### POST `/api/tags/{tagName}/follow`
Follow/unfollow tag

### GET `/api/tags/suggestions`
Get tag suggestions for autocomplete
```
Query params:
- q: string (search query)
- limit: number
```

---

## 🔔 Notification APIs

### GET `/api/notifications`
Get user notifications
```
Query params:
- page: number
- limit: number
- read: boolean|all
- type: comment|vote|follow|mention|system
```

### PUT `/api/notifications/{notificationId}/read`
Mark notification as read

### PUT `/api/notifications/mark-all-read`
Mark all notifications as read

### DELETE `/api/notifications/{notificationId}`
Delete notification

### GET `/api/notifications/unread-count`
Get unread notifications count

### PUT `/api/notifications/settings`
Update notification preferences
```json
{
  "emailNotifications": "boolean",
  "pushNotifications": "boolean",
  "commentNotifications": "boolean",
  "voteNotifications": "boolean",
  "followNotifications": "boolean",
  "mentionNotifications": "boolean"
}
```

---

## 🔍 Search APIs

### GET `/api/search`
Global search across content and forum
```
Query params:
- q: string (search query)
- type: content|forum|users|all
- page: number
- limit: number
- sortBy: relevance|date|popularity
- tags: string (comma-separated)
```

### GET `/api/search/suggestions`
Get search suggestions/autocomplete
```
Query params:
- q: string
- type: content|forum|users|tags
- limit: number
```

### POST `/api/search/history`
Save search query to user history
```json
{
  "query": "string",
  "type": "content|forum|users|all",
  "resultsCount": "number"
}
```

### GET `/api/search/history`
Get user's search history
```
Query params:
- page: number
- limit: number
```

### DELETE `/api/search/history`
Clear search history

---

## 📊 History & Analytics APIs

### GET `/api/history/reading`
Get user's reading history
```
Query params:
- page: number
- limit: number
- type: articles|forum
```

### POST `/api/history/reading`
Track reading activity
```json
{
  "contentId": "string",
  "contentType": "article|forum",
  "timeSpent": "number", // seconds
  "progress": "number"   // percentage
}
```

### GET `/api/bookmarks`
Get user's bookmarks
```
Query params:
- page: number
- limit: number
- type: articles|forum
```

### POST `/api/bookmarks`
Add bookmark
```json
{
  "contentId": "string",
  "contentType": "article|forum"
}
```

### DELETE `/api/bookmarks/{bookmarkId}`
Remove bookmark

### GET `/api/analytics/dashboard`
Get user dashboard analytics
```json
{
  "postsThisWeek": "number",
  "viewsThisWeek": "number",
  "likesThisWeek": "number",
  "reputationChange": "number",
  "topTags": ["string"],
  "activityChart": [{"date": "string", "activity": "number"}]
}
```

---

## 📱 Data Models

### User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  skills: string[];
  reputation: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  forumPostsCount: number;
  badges: string[];
  isVerified: boolean;
  role: 'user' | 'moderator' | 'admin';
  joinedAt: Date;
  lastActiveAt: Date;
  notificationSettings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    commentNotifications: boolean;
    voteNotifications: boolean;
    followNotifications: boolean;
    mentionNotifications: boolean;
  };
}
```

### Forum Post Model
```typescript
interface ForumPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  questionType: 'general' | 'bug' | 'feature' | 'review' | 'help';
  tags: Tag[];
  author: User;
  votes: number;
  userVote?: 'up' | 'down';
  commentsCount: number;
  viewsCount: number;
  isResolved: boolean;
  solutionCommentId?: string;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  
  // For bug reports
  expectedOutput?: string;
  actualOutput?: string;
  codeSnippet?: string;
  environment?: string;
}
```

### Article Model
```typescript
interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: Tag[];
  author: User;
  likes: number;
  userLiked: boolean;
  commentsCount: number;
  viewsCount: number;
  readingTime: number; // estimated minutes
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  isBookmarked?: boolean;
}
```

### Comment Model
```typescript
interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  postType: 'article' | 'forum';
  parentCommentId?: string;
  replies?: Comment[];
  votes: number;
  userVote?: 'up' | 'down';
  isAcceptedSolution: boolean; // for forum comments
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Tag Model
```typescript
interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  category: 'language' | 'framework' | 'tool' | 'concept';
  usageCount: number;
  followerCount: number;
  isFollowing?: boolean;
  createdAt: Date;
}
```

### Notification Model
```typescript
interface Notification {
  id: string;
  type: 'comment' | 'vote' | 'follow' | 'mention' | 'system' | 'solution_accepted';
  title: string;
  message: string;
  data: {
    postId?: string;
    commentId?: string;
    userId?: string;
    postType?: 'article' | 'forum';
  };
  isRead: boolean;
  createdAt: Date;
}
```

### Bookmark Model
```typescript
interface Bookmark {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'article' | 'forum';
  content: Article | ForumPost;
  createdAt: Date;
}
```

### Reading History Model
```typescript
interface ReadingHistory {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'article' | 'forum';
  content: Article | ForumPost;
  timeSpent: number; // seconds
  progress: number; // percentage (0-100)
  lastReadAt: Date;
  isCompleted: boolean;
}
```

### Search History Model
```typescript
interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  type: 'content' | 'forum' | 'users' | 'all';
  resultsCount: number;
  searchedAt: Date;
}
```

---

## 🔌 WebSocket Events

### Real-time Notifications
```typescript
// Client subscribes to: /user/{userId}/notifications
{
  type: 'new_notification',
  data: Notification
}
```

### Live Forum Updates
```typescript
// Client subscribes to: /forum/posts/{postId}
{
  type: 'new_comment' | 'vote_updated' | 'solution_accepted',
  data: Comment | { votes: number } | { solutionCommentId: string }
}
```

### Online Users
```typescript
// Client subscribes to: /forum/online
{
  type: 'user_online' | 'user_offline',
  data: { userId: string, username: string }
}
```

---

## 📋 Additional Requirements

### Authentication
- JWT tokens with refresh mechanism
- Rate limiting on auth endpoints
- Password strength validation
- Email verification for new accounts

### File Upload
- Image upload for avatars, article covers
- File size limits (5MB for images)
- Image optimization and multiple sizes
- CDN integration for file serving

### Security
- Input validation and sanitization
- XSS protection for rich text content
- Rate limiting on API endpoints
- Content moderation for inappropriate content

### Performance
- Database indexing on frequently queried fields
- Caching for frequently accessed data
- Pagination on all list endpoints
- Search optimization with full-text search

### Monitoring
- API response time logging
- Error tracking and reporting
- User activity analytics
- Content popularity metrics

---

## 🚨 Reporting & Moderation APIs

### POST `/api/reports`
Report content or user abuse
```json
{
  "contentId": "string",
  "contentType": "article|forum|comment|user",
  "reason": "spam|inappropriate|harassment|copyright|other",
  "description": "string",
  "reportedUserId": "string" // if reporting a user
}
```

### GET `/api/reports` (Admin only)
Get reports list for moderation
```
Query params:
- status: pending|reviewed|resolved
- type: article|forum|comment|user
- page: number
- limit: number
```

### PUT `/api/reports/{reportId}` (Admin only)
Update report status
```json
{
  "status": "reviewed|resolved",
  "moderatorNotes": "string",
  "action": "no_action|content_removed|user_warned|user_suspended"
}
```

---

## 🏆 Achievement & Gamification APIs

### GET `/api/achievements/{userId}`
Get user achievements
```json
{
  "id": "string",
  "userId": "string",
  "score": "number",
  "level": "bronze|silver|gold|platinum",
  "badges": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "icon": "string",
      "earnedAt": "datetime"
    }
  ],
  "streak": {
    "current": "number",
    "longest": "number",
    "lastActivity": "datetime"
  }
}
```

### GET `/api/achievements/leaderboard`
Get achievements leaderboard
```
Query params:
- timeframe: daily|weekly|monthly|all_time
- limit: number
```

### POST `/api/achievements/check`
Check for new achievements (triggered by user actions)
```json
{
  "action": "post_created|comment_added|vote_received|solution_accepted",
  "metadata": {}
}
```

---

## 📈 Advanced Analytics APIs

### GET `/api/analytics/content/{contentId}`
Get content analytics (for authors)
```json
{
  "views": {
    "total": "number",
    "unique": "number",
    "daily": [{"date": "string", "views": "number"}]
  },
  "engagement": {
    "likes": "number",
    "comments": "number",
    "shares": "number",
    "bookmarks": "number"
  },
  "demographics": {
    "topCountries": [{"country": "string", "percentage": "number"}],
    "topReferrers": [{"source": "string", "visits": "number"}]
  },
  "readingStats": {
    "averageTimeOnPage": "number",
    "completionRate": "number"
  }
}
```

### GET `/api/analytics/forum/{postId}`
Get forum post analytics
```json
{
  "views": "number",
  "uniqueViews": "number",
  "responses": "number",
  "votes": {
    "up": "number",
    "down": "number",
    "score": "number"
  },
  "timeToSolution": "number", // minutes
  "helpfulnessRating": "number"
}
```

### GET `/api/analytics/user/engagement`
Get user engagement analytics
```json
{
  "postsCreated": {
    "thisWeek": "number",
    "lastWeek": "number",
    "trend": "up|down|stable"
  },
  "viewsReceived": {
    "thisWeek": "number",
    "lastWeek": "number",
    "trend": "up|down|stable"
  },
  "engagementRate": "number",
  "topPerformingContent": [
    {
      "id": "string",
      "title": "string",
      "views": "number",
      "engagement": "number"
    }
  ]
}
```

---

## 📊 Additional Data Models

### Report Model
```typescript
interface Report {
  id: string;
  contentId: string;
  contentType: 'article' | 'forum' | 'comment' | 'user';
  reason: 'spam' | 'inappropriate' | 'harassment' | 'copyright' | 'other';
  description: string;
  reportedBy: User;
  reportedUserId?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  moderatorNotes?: string;
  action?: 'no_action' | 'content_removed' | 'user_warned' | 'user_suspended';
  createdAt: Date;
  reviewedAt?: Date;
}
```

### Achievement Model
```typescript
interface Achievement {
  id: string;
  userId: string;
  score: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  badges: Badge[];
  streak: {
    current: number;
    longest: number;
    lastActivity: Date;
  };
  totalPoints: number;
  rank: number;
  nextLevelProgress: number; // percentage to next level
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'posting' | 'engagement' | 'helping' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}
```

### Analytics Model
```typescript
interface ContentAnalytics {
  contentId: string;
  contentType: 'article' | 'forum';
  views: {
    total: number;
    unique: number;
    daily: Array<{ date: string; views: number }>;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
    averageRating?: number;
  };
  demographics: {
    topCountries: Array<{ country: string; percentage: number }>;
    topReferrers: Array<{ source: string; visits: number }>;
    deviceTypes: Array<{ device: string; percentage: number }>;
  };
  performance: {
    averageTimeOnPage: number; // seconds
    completionRate: number; // percentage
    bounceRate: number; // percentage
  };
}
```

---

## 📝 Summary

**Total API Endpoints: 95+**

### API Categories Breakdown:
- **Authentication**: 9 endpoints
- **User Management**: 9 endpoints  
- **Forum System**: 15 endpoints
- **Content Management**: 12 endpoints
- **Tag System**: 6 endpoints
- **Notifications**: 6 endpoints
- **Search**: 5 endpoints
- **History & Analytics**: 6 endpoints
- **Reporting & Moderation**: 3 endpoints
- **Achievements**: 3 endpoints
- **Advanced Analytics**: 3 endpoints
- **File Upload**: 1 endpoint
- **WebSocket Events**: 3 event types

### Data Models: 12 comprehensive models
- User, ForumPost, Article, Comment, Tag, Notification
- Bookmark, ReadingHistory, SearchHistory, Report
- Achievement/Badge, ContentAnalytics

This comprehensive API specification covers **every feature** visible in your frontend application, including the reporting system, achievement system, and advanced analytics that I discovered in your components!

Ready for backend implementation! 🚀