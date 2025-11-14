# API Documentation - Completed Features

## 🔧 Recent Bug Fixes (November 10, 2025)

### ✅ Fixed Issues:

1. **Follow/Unfollow Endpoint Response Issue** 
   - **Issue:** POST `/api/users/{userUuid}/follow` was hanging and not returning a response
   - **Fix:** Added comprehensive error handling, detailed logging, and proper exception handling
   - **Changes:**
     - Added try-catch blocks to prevent silent failures
     - Added detailed logging throughout the follow/unfollow flow
     - Fixed notification creation to not fail the entire operation if WebSocket broadcast fails
     - Added bounds checking to prevent negative follower counts
   - **Status:** ✅ FIXED

2. **Bookmark Status Not Showing in Article Details**
   - **Issue:** `isBookmarked` field was always returning `false` even when bookmarked
   - **Fix:** Added `@Transactional` annotation and detailed logging to ensure proper bookmark check
   - **Changes:**
     - Made `getArticleBySlug` method transactional
     - Added comprehensive logging to track bookmark check flow
     - Verified BookmarkRepository query is executing correctly
   - **Status:** ✅ FIXED - Now properly checks database and returns actual bookmark status

3. **Enhanced Logging**
   - All critical operations now have detailed logging
   - Easy to debug issues by checking logs
   - Logs show the complete flow from controller → service → repository

---

## 🎯 Completed APIs for CodeAdvisor Platform

This document lists all the APIs that have been implemented and are ready for testing.

### 📊 Quick Reference - Completed Features

#### ✅ Authentication & Authorization
- User Registration with Email Verification (OTP)
- Login with JWT (Access + Refresh Tokens)
- Password Reset (Forgot Password + OTP)
- Token Refresh
- Logout (Single Session & All Sessions)

#### ✅ User Management
- Get Current User Profile
- Update User Profile
- Get User by UUID
- Get User Statistics
- Follow/Unfollow Users
- Get Followers/Following Lists

#### ✅ Tags Management
- Get All Tags (with pagination)
- Get Tag by Slug
- Get Popular Tags
- Get Tag with Article Count

#### ✅ Articles (Blog Posts)
- Create Article (Draft or Published)
- Get All Articles (with filters, search, sorting)
- Get Trending Articles
- Get Article by Slug
- Update Article
- Delete Article
- Vote on Articles (Upvote/Downvote)
- Get User's Votes
- Get Draft Articles

#### ✅ Comments
- Add Comment to Article
- Get Article Comments (with pagination)
- Get Comment Replies
- Update Comment
- Delete Comment
- Vote on Comments (Upvote/Downvote)

#### ✅ Notifications
- Get User Notifications (with pagination)
- Mark Notification as Read
- Mark All Notifications as Read
- Get Unread Count
- Delete Notification
- Get/Update Notification Settings

#### ✅ WebSocket (Real-time Features)
- Real-time Notifications
- Connection: `/ws` endpoint
- Subscribe: `/user/queue/notifications`

#### ✅ Image Upload (MinIO)
- Upload Images
- Get Image URL
- Public Image Storage

#### ⚙️ Configuration
- **Base URL:** `http://localhost:8080` (local) or `http://159.65.8.211:8080` (server)
- **WebSocket:** `ws://localhost:8080/ws` or `ws://159.65.8.211:8080/ws`
- **MinIO:** `http://159.65.8.211:9000` (bucket: somrosly-media)
- **Platform Name:** CodeAdvisors
- **Email Service:** Console Mode (OTP logged to console) or Resend API

---

## 🔐 Authentication APIs

### 1. POST `/api/auth/register`
Register a new user account

**URL:** `http://localhost:8080/api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Registration successful. Please check your email to verify your account."
}
```

**Notes:**
- Password must be strong (min 8 chars, uppercase, lowercase, number, special char)
- Sends OTP verification email automatically
- User account is created but not verified until OTP is confirmed

---

### 2. POST `/api/auth/verify-otp`
Verify OTP code sent to email

**URL:** `http://localhost:8080/api/auth/verify-otp`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "Email verified successfully. You can now login."
}
```

**Notes:**
- OTP expires after 10 minutes
- After verification, user can login

---

### 3. POST `/api/auth/login`
User login with email/password

**URL:** `http://localhost:8080/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJSUzI1NiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

**Notes:**
- Returns JWT access token (expires in 1 hour)
- Returns refresh token (expires in 7 days)
- User must be verified to login

---

### 4. POST `/api/auth/refresh`
Refresh access token using refresh token

**URL:** `http://localhost:8080/api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJSUzI1NiJ9..."
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJSUzI1NiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

**Notes:**
- Generates new access token and refresh token
- Old refresh token is invalidated

---

### 5. POST `/api/auth/forgot-password`
Send password reset email

**URL:** `http://localhost:8080/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset instructions have been sent to your email."
}
```

**Notes:**
- Sends reset token to user's email
- Token expires in 1 hour

---

### 6. POST `/api/auth/reset-password`
Reset password using token from email

**URL:** `http://localhost:8080/api/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123!"
}
```

**Response:**
```json
{
  "message": "Password has been reset successfully. You can now login with your new password."
}
```

**Notes:**
- Token must be valid and not expired
- Password must meet strength requirements

---

### 7. GET `/api/auth/me`
Get current authenticated user profile

**URL:** `http://localhost:8080/api/auth/me`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "bio": null,
  "avatarUrl": null,
  "location": null,
  "websiteUrl": null,
  "githubUsername": null,
  "twitterUsername": null,
  "linkedinUsername": null,
  "skills": [],
  "reputation": 0,
  "followersCount": 0,
  "followingCount": 0,
  "postsCount": 0,
  "forumPostsCount": 0,
  "isVerified": true,
  "isFollowing": null,
  "role": "user",
  "createdAt": "2025-10-18T10:30:00+07:00"
}
```

---

## 👤 User Management APIs

### 1. GET `/api/users/profile`
Get current user profile (same as `/api/auth/me`)

**URL:** `http://localhost:8080/api/users/profile`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "bio": null,
  "avatarUrl": null,
  "location": null,
  "websiteUrl": null,
  "githubUsername": null,
  "twitterUsername": null,
  "linkedinUsername": null,
  "skills": [],
  "reputation": 0,
  "followersCount": 0,
  "followingCount": 0,
  "postsCount": 0,
  "forumPostsCount": 0,
  "isVerified": true,
  "isFollowing": null,
  "role": "user",
  "createdAt": "2025-10-18T10:30:00+07:00"
}
```

---

### 2. PUT `/api/users/profile`
Update user profile

**URL:** `http://localhost:8080/api/users/profile`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Full-stack developer passionate about Spring Boot and React",
  "location": "San Francisco, CA",
  "website": "https://johndoe.dev",
  "github": "johndoe",
  "twitter": "johndoe",
  "linkedin": "johndoe",
  "skills": ["Java", "Spring Boot", "React", "Docker"],
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Full-stack developer passionate about Spring Boot and React",
  "avatarUrl": "https://example.com/avatar.jpg",
  "location": "San Francisco, CA",
  "websiteUrl": "https://johndoe.dev",
  "githubUsername": "johndoe",
  "twitterUsername": "johndoe",
  "linkedinUsername": "johndoe",
  "skills": ["Java", "Spring Boot", "React", "Docker"],
  "reputation": 0,
  "followersCount": 0,
  "followingCount": 0,
  "postsCount": 0,
  "forumPostsCount": 0,
  "isVerified": true,
  "isFollowing": null,
  "role": "user",
  "createdAt": "2025-10-18T10:30:00+07:00"
}
```

**Notes:**
- All fields are optional
- Only updates provided fields

---

### 3. GET `/api/users/{username}`
Get user profile by username

**URL:** `http://localhost:8080/api/users/johndoe`

**Headers (optional for authenticated users):**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Full-stack developer passionate about Spring Boot and React",
  "avatarUrl": "https://example.com/avatar.jpg",
  "location": "San Francisco, CA",
  "websiteUrl": "https://johndoe.dev",
  "githubUsername": "johndoe",
  "twitterUsername": "johndoe",
  "linkedinUsername": "johndoe",
  "skills": ["Java", "Spring Boot", "React", "Docker"],
  "reputation": 0,
  "followersCount": 0,
  "followingCount": 0,
  "postsCount": 0,
  "forumPostsCount": 0,
  "isVerified": true,
  "isFollowing": true,
  "role": "user",
  "createdAt": "2025-10-18T10:30:00+07:00"
}
```

**Notes:**
- Public endpoint, no authentication required
- `isFollowing` field indicates if the authenticated user follows this user
  - `true` - current user is following this user
  - `false` - current user is not following this user  
  - `null` - user is not authenticated or viewing their own profile
- If authenticated, include `Authorization` header to get accurate `isFollowing` status

---

### 4. GET `/api/users`
Get users list with pagination and search

**URL:** `http://localhost:8080/api/users?page=0&limit=10&search=john&sortBy=reputation`

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)
- `search` (optional) - Search by username, firstName, or lastName
- `sortBy` (default: reputation) - Options: `reputation`, `followers`, `posts`

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "avatarUrl": "https://example.com/avatar.jpg",
      "bio": "Full-stack developer",
      "reputation": 150,
      "followersCount": 25,
      "followingCount": 30,
      "isVerified": true
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0
}
```

---

### 5. GET `/api/users/{userUuid}/stats`
Get user statistics

**URL:** `http://localhost:8080/api/users/550e8400-e29b-41d4-a716-446655440000/stats`

**Response:**
```json
{
  "postsCount": 10,
  "forumPostsCount": 5,
  "reputation": 150,
  "followersCount": 25,
  "followingCount": 30,
  "badges": []
}
```

**Notes:**
- Use user's UUID (not numeric ID)
- Public endpoint, no authentication required

---

### 6. POST `/api/users/{userUuid}/follow`
Follow/unfollow user (toggle)

**URL:** `http://localhost:8080/api/users/550e8400-e29b-41d4-a716-446655440000/follow`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:** *(empty)*

**Response:**
```json
{
  "message": "Follow status updated successfully"
}
```

**Notes:**
- Use user's UUID (not numeric ID)
- Toggles follow status
- Cannot follow yourself
- Updates follower/following counts automatically

---

### 7. GET `/api/users/{userUuid}/followers`
Get user's followers

**URL:** `http://localhost:8080/api/users/550e8400-e29b-41d4-a716-446655440000/followers?page=0&limit=10`

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)

**Response:**
```json
{
  "content": [
    {
      "id": 2,
      "username": "janedoe",
      "firstName": "Jane",
      "lastName": "Doe",
      "avatarUrl": "https://example.com/jane.jpg",
      "bio": "Frontend developer",
      "reputation": 100,
      "followersCount": 15,
      "followingCount": 20,
      "isVerified": true
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0
}
```

**Notes:**
- Use user's UUID (not numeric ID)
- Public endpoint, no authentication required

---

### 8. GET `/api/users/{userUuid}/following`
Get users that user is following

**URL:** `http://localhost:8080/api/users/550e8400-e29b-41d4-a716-446655440000/following?page=0&limit=10`

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)

**Response:**
```json
{
  "content": [
    {
      "id": 3,
      "username": "bobsmith",
      "firstName": "Bob",
      "lastName": "Smith",
      "avatarUrl": "https://example.com/bob.jpg",
      "bio": "Backend engineer",
      "reputation": 200,
      "followersCount": 50,
      "followingCount": 10,
      "isVerified": true
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0
}
```

**Notes:**
- Use user's UUID (not numeric ID)
- Public endpoint, no authentication required

---

## 📝 Article Management APIs

### 1. GET `/api/articles`
Get published articles with filtering

**URL:** `http://localhost:8080/api/articles?page=0&limit=10&sortBy=latest`

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)
- `sortBy` (default: latest) - Options: `latest`, `popular`, `trending`
- `search` (optional) - Search in title and content
- `author` (optional) - Filter by author username
- `tags` (optional) - Comma-separated tag slugs

**Example:**
```
GET http://localhost:8080/api/articles?page=0&limit=10&sortBy=popular&tags=java,spring-boot
```

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Getting Started with Spring Boot",
      "slug": "getting-started-with-spring-boot",
      "excerpt": "Learn the basics of Spring Boot framework...",
      "coverImage": "https://example.com/cover.jpg",
      "author": {
        "id": 1,
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "avatarUrl": "https://example.com/avatar.jpg"
      },
      "tags": ["Java", "Spring Boot"],
      "likesCount": 25,
      "userLiked": null,
      "commentsCount": 10,
      "viewsCount": 150,
      "readingTime": 5,
      "status": "published",
      "publishedAt": "2025-10-15T10:30:00+07:00",
      "createdAt": "2025-10-15T10:00:00+07:00",
      "updatedAt": "2025-10-15T10:30:00+07:00"
    }
  ],
  "totalPages": 5,
  "totalElements": 50,
  "size": 10,
  "number": 0
}
```

**Notes:**
- Only published articles are returned
- `userLiked` is `null` for unauthenticated users

---

### 2. POST `/api/articles`
Create new article

**URL:** `http://localhost:8080/api/articles`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Getting Started with Spring Boot",
  "content": "Spring Boot is a powerful framework for building Java applications...",
  "excerpt": "Learn the basics of Spring Boot framework",
  "coverImage": "https://example.com/cover.jpg",
  "tags": ["Java", "Spring Boot"],
  "status": "published"
}
```

**Response:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Getting Started with Spring Boot",
  "slug": "getting-started-with-spring-boot",
  "excerpt": "Learn the basics of Spring Boot framework",
  "coverImage": "https://example.com/cover.jpg",
  "author": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://example.com/avatar.jpg"
  },
  "tags": ["Java", "Spring Boot"],
  "likesCount": 0,
  "userLiked": null,
  "commentsCount": 0,
  "viewsCount": 0,
  "readingTime": 5,
  "status": "published",
  "publishedAt": "2025-10-18T10:30:00+07:00",
  "createdAt": "2025-10-18T10:30:00+07:00",
  "updatedAt": "2025-10-18T10:30:00+07:00"
}
```

**Notes:**
- `slug` is auto-generated from title (unique)
- `status` options: `draft`, `published`, `archived` (default: `draft`)
- `readingTime` is calculated automatically (words/200)
- Tags must exist in the system (use tag names or slugs)
- If status is `published`, user's `postsCount` is incremented

---

### 3. GET `/api/articles/{slug}`
Get single article by slug

**URL:** ``
http://localhost:8080/api/articles/getting-started-with-spring-boot
**Headers (optional for authenticated users):**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Getting Started with Spring Boot",
  "slug": "getting-started-with-spring-boot",
  "content": "Spring Boot is a powerful framework for building Java applications...",
  "excerpt": "Learn the basics of Spring Boot framework",
  "coverImage": "https://example.com/cover.jpg",
  "author": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://example.com/avatar.jpg"
  },
  "tags": [
    {
      "id": 1,
      "name": "Java",
      "slug": "java",
      "color": "#3B82F6"
    },
    {
      "id": 2,
      "name": "Spring Boot",
      "slug": "spring-boot",
      "color": "#3B82F6"
    }
  ],
  "likesCount": 25,
  "userLiked": false,
  "commentsCount": 10,
  "viewsCount": 151,
  "readingTime": 5,
  "status": "published",
  "publishedAt": "2025-10-15T10:30:00+07:00",
  "createdAt": "2025-10-15T10:00:00+07:00",
  "updatedAt": "2025-10-15T10:30:00+07:00",
  "isBookmarked": false
}
```

**Notes:**
- Uses **slug** instead of numeric ID
- View count is incremented automatically
- `userLiked` is `null` for unauthenticated users, `true`/`false` for authenticated
- `isBookmarked` is `false` for unauthenticated users, `true`/`false` for authenticated users based on actual bookmark status
- Returns full article content (not just excerpt)
- **Bookmark status is checked from the database** - if user has bookmarked the article, `isBookmarked` will be `true`

---

### 4. PUT `/api/articles/{slug}`
Update article (only by author)

**URL:** `http://localhost:8080/api/articles/getting-started-with-spring-boot`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Advanced Spring Boot Guide",
  "content": "Updated content here...",
  "excerpt": "Updated excerpt",
  "coverImage": "https://example.com/new-cover.jpg",
  "tags": ["Java", "Spring Boot", "Microservices"],
  "status": "published"
}
```

**Response:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Advanced Spring Boot Guide",
  "slug": "advanced-spring-boot-guide",
  "excerpt": "Updated excerpt",
  "coverImage": "https://example.com/new-cover.jpg",
  "author": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://example.com/avatar.jpg"
  },
  "tags": ["Java", "Spring Boot", "Microservices"],
  "likesCount": 25,
  "userLiked": null,
  "commentsCount": 10,
  "viewsCount": 151,
  "readingTime": 5,
  "status": "published",
  "publishedAt": "2025-10-15T10:30:00+07:00",
  "createdAt": "2025-10-15T10:00:00+07:00",
  "updatedAt": "2025-10-18T11:00:00+07:00"
}
```

**Notes:**
- Uses **slug** in URL (not numeric ID)
- Only the article author can update
- All fields are optional (only updates provided fields)
- If title changes, slug is regenerated (if unique)
- Publishing a draft increments author's `postsCount`
- Returns 403 Forbidden if not the author

---

### 5. DELETE `/api/articles/{slug}`
Delete article (only by author)

**URL:** `http://localhost:8080/api/articles/getting-started-with-spring-boot`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Article deleted successfully"
}
```

**Notes:**
- Uses **slug** in URL (not numeric ID)
- Only the article author can delete
- Decrements author's `postsCount` if article was published
- Returns 403 Forbidden if not the author

---

### 6. POST `/api/articles/{slug}/like`
Like/unlike article (toggle)

**URL:** `http://localhost:8080/api/articles/getting-started-with-spring-boot/like`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:** *(empty)*

**Response:**
```json
{
  "message": "Article like status updated successfully"
}
```

**Notes:**
- Uses **slug** in URL (not numeric ID)
- Toggles like status:
  - If not liked → likes article (likesCount +1)
  - If already liked → unlikes article (likesCount -1)
- Requires authentication

---

### 7. GET `/api/articles/{slug}/comments`
Get article comments

**URL:** `http://localhost:8080/api/articles/getting-started-with-spring-boot/comments?page=0&limit=10&sortBy=newest`

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)
- `sortBy` (default: newest) - Options: `newest`, `oldest`, `likes`

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "content": "Great article! Very helpful.",
      "author": {
        "id": 2,
        "uuid": "660e8400-e29b-41d4-a716-446655440001",
        "username": "janedoe",
        "avatarUrl": "https://example.com/jane.jpg"
      },
      "parentCommentId": null,
      "replies": [],
      "votes": 5,
      "userVote": null,
      "isEdited": false,
      "createdAt": "2025-10-16T14:20:00+07:00",
      "updatedAt": "2025-10-16T14:20:00+07:00"
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0
}
```

**Notes:**
- Uses **slug** in URL (not numeric ID)
- Returns top-level comments only (not replies)
- Replies are nested in `replies` array
- Public endpoint, no authentication required

---

### 8. POST `/api/articles/{slug}/comments`
Add comment to article

**URL:** `http://localhost:8080/api/articles/getting-started-with-spring-boot/comments`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "Great article! Very helpful.",
  "parentCommentId": null
}
```

**For replies:**
```json
{
  "content": "Thanks! Glad it helped you.",
  "parentCommentId": 1
}
```

**Response:**
```json
{
  "id": 2,
  "content": "Great article! Very helpful.",
  "author": {
    "id": 2,
    "uuid": "660e8400-e29b-41d4-a716-446655440001",
    "username": "janedoe",
    "avatarUrl": "https://example.com/jane.jpg"
  },
  "parentCommentId": null,
  "replies": [],
  "votes": 0,
  "userVote": null,
  "isEdited": false,
  "createdAt": "2025-10-18T14:20:00+07:00",
  "updatedAt": "2025-10-18T14:20:00+07:00"
}
```

**Notes:**
- Uses **slug** in URL (not numeric ID)
- `parentCommentId` is `null` for top-level comments
- Set `parentCommentId` to create a reply
- Article's `commentsCount` is incremented automatically
- Requires authentication

---

### 9. GET `/api/articles/drafts`
Get user's draft articles

**URL:** `http://localhost:8080/api/articles/drafts?page=0&limit=10`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)

**Response:**
```json
{
  "content": [
    {
      "id": 5,
      "uuid": "770e8400-e29b-41d4-a716-446655440005",
      "title": "Work in Progress Article",
      "slug": "work-in-progress-article",
      "excerpt": "This is still being written...",
      "coverImage": null,
      "author": {
        "id": 1,
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "avatarUrl": "https://example.com/avatar.jpg"
      },
      "tags": ["Java"],
      "likesCount": 0,
      "userLiked": null,
      "commentsCount": 0,
      "viewsCount": 0,
      "readingTime": 3,
      "status": "draft",
      "publishedAt": null,
      "createdAt": "2025-10-17T09:00:00+07:00",
      "updatedAt": "2025-10-18T10:00:00+07:00"
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0
}
```

**Notes:**
- Returns only current user's draft articles
- Sorted by `updatedAt` (most recent first)
- Requires authentication

---

### 10. GET `/api/articles/trending`
Get trending articles (last 7 days)

**URL:** `http://localhost:8080/api/articles/trending?page=0&limit=10`

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Most Popular Article This Week",
      "slug": "most-popular-article-this-week",
      "excerpt": "This article has the most engagement...",
      "coverImage": "https://example.com/cover.jpg",
      "author": {
        "id": 1,
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "avatarUrl": "https://example.com/avatar.jpg"
      },
      "tags": ["Java", "Spring Boot"],
      "likesCount": 150,
      "userLiked": null,
      "commentsCount": 50,
      "viewsCount": 1500,
      "readingTime": 8,
      "status": "published",
      "publishedAt": "2025-10-15T10:30:00+07:00",
      "createdAt": "2025-10-15T10:00:00+07:00",
      "updatedAt": "2025-10-15T10:30:00+07:00"
    }
  ],
  "totalPages": 2,
  "totalElements": 20,
  "size": 10,
  "number": 0
}
```

**Notes:**
- Sorted by likes count and views count (descending)
- Only published articles
- Public endpoint, no authentication required

---

### 11. POST `/api/articles/{slug}/bookmark`
Bookmark/unbookmark article (toggle)

**URL:** `http://localhost:8080/api/articles/getting-started-with-spring-boot/bookmark`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:** *(empty)*

**Response:**
```json
{
  "message": "Article bookmarked successfully"
}
```

Or when removing:
```json
{
  "message": "Bookmark removed successfully"
}
```

**Notes:**
- Uses **slug** in URL (not numeric ID)
- Toggles bookmark status:
  - If not bookmarked → bookmarks article
  - If already bookmarked → removes bookmark
- Requires authentication
- **After toggling, the GET endpoint will reflect the updated bookmark status**
- The bookmark is stored in the database and persists across sessions

---

### 12. GET `/api/articles/bookmarks`
Get user's bookmarked articles

**URL:** `http://localhost:8080/api/articles/bookmarks?page=0&limit=10`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Getting Started with Spring Boot",
      "slug": "getting-started-with-spring-boot",
      "excerpt": "Learn the basics of Spring Boot framework",
      "coverImage": "https://example.com/cover.jpg",
      "author": {
        "id": 2,
        "uuid": "660e8400-e29b-41d4-a716-446655440001",
        "username": "janedoe",
        "firstName": "Jane",
        "lastName": "Doe",
        "avatarUrl": "https://example.com/jane.jpg"
      },
      "tags": ["Java", "Spring Boot"],
      "likesCount": 25,
      "userLiked": false,
      "commentsCount": 10,
      "viewsCount": 150,
      "readingTime": 5,
      "status": "published",
      "publishedAt": "2025-10-15T10:30:00+07:00",
      "createdAt": "2025-10-15T10:00:00+07:00",
      "updatedAt": "2025-10-15T10:30:00+07:00"
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0
}
```

**Notes:**
- Returns only current user's bookmarked articles
- Sorted by bookmark creation date (most recent first)
- Requires authentication

---

## 🏷️ Tag Management APIs

### 1. POST `/api/tags`
Create new tag

**URL:** `http://localhost:8080/api/tags`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Java",
  "slug": "java",
  "color": "#3B82F6"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Java",
  "slug": "java",
  "color": "#3B82F6",
  "followersCount": 0,
  "isFollowed": false
}
```

**Notes:**
- `slug` must be unique
- `color` in hex format (optional)
- Returns the created tag with default values

---

### 2. GET `/api/tags`
Get all tags with pagination and search

**URL:** `http://localhost:8080/api/tags?page=0&limit=10&search=java`

**Query Parameters:**
- `page` (default: 0)
- `limit` (default: 10)
- `search` (optional) - Search by tag name or slug

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Java",
      "slug": "java",
      "color": "#3B82F6",
      "followersCount": 0,
      "isFollowed": false
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0
}
```

---

### 3. GET `/api/tags/{slug}`
Get tag by slug

**URL:** `http://localhost:8080/api/tags/java`

**Response:**
```json
{
  "id": 1,
  "name": "Java",
  "slug": "java",
  "color": "#3B82F6",
  "followersCount": 0,
  "isFollowed": false
}
```

**Notes:**
- Public endpoint, no authentication required

---

### 4. PUT `/api/tags/{slug}`
Update tag (only by admin)

**URL:** `http://localhost:8080/api/tags/java`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Java Programming",
  "color": "#FF5733"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Java Programming",
  "slug": "java",
  "color": "#FF5733",
  "followersCount": 0,
  "isFollowed": false
}
```

**Notes:**
- Only admin can update tags
- `slug` cannot be changed
- Returns the updated tag

---

### 5. DELETE `/api/tags/{slug}`
Delete tag (only by admin)

**URL:** `http://localhost:8080/api/tags/java`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Tag deleted successfully"
}
```

**Notes:**
- Only admin can delete tags
- Returns 403 Forbidden if not admin

---

## 🖼️ Image Upload API (MinIO/S3)

### 1. POST `/api/images/upload`
Upload an image to MinIO/S3 storage

**URL:** `http://localhost:8080/api/images/upload`

**Headers:**
```
Content-Type: multipart/form-data
```

**Request:**
- Form field: `file` (the image file)

**Example using cURL:**
```bash
curl -X POST http://localhost:8080/api/images/upload \
  -F "file=@/path/to/image.jpg"
```

**Response:**
```json
{
  "url": "http://159.65.8.211:9000/somrosly-media/a1b2c3d4-e5f6-7890-abcd-ef1234567890-avatar.jpg"
}
```

**Notes:**
- Accepts images in common formats (JPEG, PNG, GIF, WebP)
- File is stored with a unique UUID prefix to prevent naming conflicts
- Returns direct public URL to the uploaded image
- URL format: `{minio-endpoint}/{bucket}/{uuid}-{filename}`
- No authentication required for upload (can be added if needed)

---

### 2. GET `/api/images/{key}/url`
Get public URL for an uploaded image by its key

**URL:** `http://localhost:8080/api/images/a1b2c3d4-e5f6-7890-abcd-ef1234567890-avatar.jpg/url`

**Response:**
```json
{
  "url": "http://159.65.8.211:9000/somrosly-media/a1b2c3d4-e5f6-7890-abcd-ef1234567890-avatar.jpg"
}
```

**Notes:**
- Returns the public URL for accessing the image
- The key is the filename returned from upload (UUID + original filename)
- URL is permanent and publicly accessible
- No expiration time

---

### Image Upload Flow

**1. Upload Image:**
```bash
POST /api/images/upload
Form-data: file=avatar.jpg

Response:
{
  "url": "http://159.65.8.211:9000/somrosly-media/a1b2c3d4-...-avatar.jpg"
}
```

**2. Use URL in Profile Update:**
```bash
PUT /api/users/profile
{
  "avatar": "http://159.65.8.211:9000/somrosly-media/a1b2c3d4-...-avatar.jpg"
}
```

**3. Access Image:**
Simply use the URL in `<img>` tag:
```html
<img src="http://159.65.8.211:9000/somrosly-media/a1b2c3d4-...-avatar.jpg" />
```

---

### MinIO Configuration
- **Endpoint:** http://159.65.8.211:9000
- **Bucket:** somrosly-media
- **Access:** Public read (images are publicly accessible)
- **Storage:** Persistent (images remain until manually deleted)

---

## 🔐 Admin Dashboard APIs

### Authentication & Authorization
**All admin endpoints require:**
- Valid JWT access token
- User role must be `admin`
- Returns `403 Forbidden` if not admin

---

### 1. GET `/api/admin/verify`
Verify if current user is admin

**URL:** `http://localhost:8080/api/admin/verify`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "isAdmin": true,
  "role": "admin"
}
```

---

### 2. GET `/api/admin/stats/overview`
Get platform overview statistics

**URL:** `http://localhost:8080/api/admin/stats/overview`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "totalUsers": 1250,
  "totalArticles": 450,
  "totalComments": 2300,
  "totalTags": 45,
  "totalNotifications": 5600,
  "activeUsers": 320,
  "todayRegistrations": 15,
  "todayArticles": 8
}
```

**Notes:**
- `activeUsers`: Users who logged in within last 7 days
- `todayRegistrations`: Users registered today
- `todayArticles`: Articles published today

---

### 3. GET `/api/admin/stats/users`
Get user growth statistics

**URL:** `http://localhost:8080/api/admin/stats/users?period=30d`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `period` (optional): `7d` | `30d` | `90d` | `1y` (default: `30d`)

**Response:**
```json
{
  "period": "30d",
  "totalUsers": 1250,
  "newUsers": 150,
  "activeUsers": 320,
  "verifiedUsers": 1100,
  "unverifiedUsers": 150,
  "usersByRole": {
    "admin": 3,
    "user": 1247
  },
  "growthData": [
    {
      "date": "2025-10-15",
      "count": 10
    },
    {
      "date": "2025-10-16",
      "count": 15
    }
  ]
}
```

---

### 4. GET `/api/admin/stats/content`
Get content statistics

**URL:** `http://localhost:8080/api/admin/stats/content`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "articles": {
    "total": 450,
    "published": 380,
    "draft": 70,
    "todayPublished": 8
  },
  "comments": {
    "total": 2300,
    "todayComments": 45
  },
  "tags": {
    "total": 45,
    "mostUsed": [
      {
        "name": "JavaScript",
        "count": 120
      },
      {
        "name": "React",
        "count": 95
      }
    ]
  }
}
```

---

### 5. GET `/api/admin/stats/engagement`
Get engagement statistics

**URL:** `http://localhost:8080/api/admin/stats/engagement`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "likes": {
    "total": 5600,
    "todayLikes": 120
  },
  "bookmarks": {
    "total": 1200,
    "todayBookmarks": 35
  },
  "views": {
    "total": 45000,
    "todayViews": 1200
  }
}
```

---

### 6. GET `/api/admin/users`
Get all users with filters (Admin view)

**URL:** `http://localhost:8080/api/admin/users?page=0&size=20&role=user&status=verified&sortBy=createdAt`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `role` (optional): Filter by role (`user` | `admin`)
- `status` (optional): Filter by status (`verified` | `unverified`)
- `sortBy` (optional): Sort field (`createdAt` | `reputation`)

**Response:**
```json
{
  "content": [
    {
      "uuid": "2233b235-784b-427e-bd10-65b524da6252",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "isVerified": true,
      "isActive": true,
      "reputation": 150,
      "postsCount": 10,
      "createdAt": "2025-10-01T10:00:00+07:00",
      "lastLoginAt": "2025-11-11T14:30:00+07:00"
    }
  ],
  "totalPages": 10,
  "totalElements": 200,
  "size": 20,
  "number": 0
}
```

---

### 7. PUT `/api/admin/users/{userUuid}/role`
Update user role

**URL:** `http://localhost:8080/api/admin/users/2233b235-784b-427e-bd10-65b524da6252/role`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "role": "admin"
}
```

**Response:**
```json
{
  "message": "User role updated successfully",
  "user": {
    "uuid": "2233b235-784b-427e-bd10-65b524da6252",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "admin",
    "isVerified": true,
    "isActive": true,
    "reputation": 150,
    "postsCount": 10,
    "createdAt": "2025-10-01T10:00:00+07:00",
    "lastLoginAt": "2025-11-11T14:30:00+07:00"
  }
}
```

---

### 8. POST `/api/admin/users/{userUuid}/ban`
Ban a user

**URL:** `http://localhost:8080/api/admin/users/2233b235-784b-427e-bd10-65b524da6252/ban`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "reason": "Spam content",
  "duration": "7d"
}
```

**Response:**
```json
{
  "message": "User banned successfully"
}
```

**Notes:**
- Sets user's `isActive` to `false`
- User cannot login while banned
- Duration can be: `7d`, `30d`, `permanent`

---

### 9. POST `/api/admin/users/{userUuid}/unban`
Unban a user

**URL:** `http://localhost:8080/api/admin/users/2233b235-784b-427e-bd10-65b524da6252/unban`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "User unbanned successfully"
}
```

---

### 10. DELETE `/api/admin/users/{userUuid}`
Delete a user (Hard delete)

**URL:** `http://localhost:8080/api/admin/users/2233b235-784b-427e-bd10-65b524da6252`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

**Notes:**
- Permanently deletes user and all associated data
- Cannot delete admin users (returns 403)
- Use with caution!

---

### 11. GET `/api/admin/articles`
Get all articles (Admin view)

**URL:** `http://localhost:8080/api/admin/articles?page=0&size=20&status=published&sortBy=views`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `status` (optional): Filter by status (`published` | `draft` | `archived`)
- `sortBy` (optional): Sort field (`createdAt` | `views`)

**Response:**
```json
{
  "content": [
    {
      "uuid": "e8e1e5b3-a5bb-49c5-8983-a446ffb9aa49",
      "title": "Getting Started with Spring Boot",
      "slug": "getting-started-with-spring-boot",
      "author": {
        "username": "johndoe",
        "email": "john@example.com"
      },
      "status": "published",
      "viewsCount": 1200,
      "likesCount": 45,
      "commentsCount": 12,
      "createdAt": "2025-10-15T10:00:00+07:00",
      "publishedAt": "2025-10-15T11:00:00+07:00"
    }
  ],
  "totalPages": 20,
  "totalElements": 400,
  "size": 20,
  "number": 0
}
```

---

### 12. DELETE `/api/admin/articles/{slug}`
Delete an article (Admin)

**URL:** `http://localhost:8080/api/admin/articles/getting-started-with-spring-boot`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Article deleted successfully"
}
```

---

### 13. PUT `/api/admin/articles/{slug}/status`
Update article status (Admin)

**URL:** `http://localhost:8080/api/admin/articles/getting-started-with-spring-boot/status`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "published"
}
```

**Response:**
```json
{
  "message": "Article status updated"
}
```

**Notes:**
- Status values: `published` | `draft` | `archived`
- Auto-sets `publishedAt` timestamp when changing to `published`

---

### 14. GET `/api/admin/comments`
Get all comments (Admin view)

**URL:** `http://localhost:8080/api/admin/comments?page=0&size=20`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `flagged` (optional): Filter flagged comments (future feature)

**Response:**
```json
{
  "content": [
    {
      "id": 123,
      "content": "Great article!",
      "author": {
        "username": "jane",
        "uuid": "660e8400-e29b-41d4-a716-446655440001"
      },
      "postId": 1,
      "postType": "article",
      "createdAt": "2025-11-10T14:00:00+07:00",
      "isFlagged": false
    }
  ],
  "totalPages": 50,
  "totalElements": 1000,
  "size": 20,
  "number": 0
}
```

---

### 15. DELETE `/api/admin/comments/{commentId}`
Delete a comment (Admin)

**URL:** `http://localhost:8080/api/admin/comments/123`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Comment deleted successfully"
}
```

---

### 16. GET `/api/admin/notifications/stats`
Get notification statistics

**URL:** `http://localhost:8080/api/admin/notifications/stats`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "totalSent": 5600,
  "todaySent": 120,
  "unreadCount": 2300,
  "byType": {
    "comment": 2000,
    "vote": 1800,
    "follow": 1200,
    "mention": 600
  }
}
```

---

## 📋 Admin API Summary

### ✅ Implemented Admin Features:

1. **Authentication**
   - ✅ Admin verification endpoint

2. **Platform Statistics**
   - ✅ Overview stats (users, articles, comments, tags)
   - ✅ User growth stats with time period
   - ✅ Content stats (articles, comments, tags)
   - ✅ Engagement stats (likes, bookmarks, views)

3. **User Management**
   - ✅ List all users with filters
   - ✅ Update user role
   - ✅ Ban/Unban users
   - ✅ Delete users

4. **Content Moderation**
   - ✅ List all articles (admin view)
   - ✅ Delete articles
   - ✅ Update article status

5. **Comment Moderation**
   - ✅ List all comments
   - ✅ Delete comments

6. **Notification Stats**
   - ✅ Get notification statistics

---

## 🔒 Admin Security Notes:
- All admin endpoints protected by `@PreAuthorize("hasRole('ADMIN')")`
- Returns 403 Forbidden if user is not admin
- All admin actions are logged for audit trail
- Admin users cannot be deleted
- JWT token required for all requests

---

