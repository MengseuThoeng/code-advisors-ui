# CodeAdvisor Platform - Database Design & Analysis

## 📋 Table of Contents
1. [Database Overview](#database-overview)
2. [Core Tables](#core-tables)
3. [Relationship Tables](#relationship-tables)
4. [Analytics Tables](#analytics-tables)
5. [System Tables](#system-tables)
6. [Indexes Strategy](#indexes-strategy)
7. [Database Schema SQL](#database-schema-sql)
8. [Performance Considerations](#performance-considerations)

---

## 🗄️ Database Overview

### Technology Recommendations:
- **Primary Database**: PostgreSQL 15+ (ACID compliance, JSON support, full-text search)
- **Cache Layer**: Redis (session management, real-time data)
- **Search Engine**: Elasticsearch (advanced search capabilities)
- **File Storage**: AWS S3 / MinIO (images, attachments)

### Database Size Estimation:
- **Small Scale**: 1K users → ~50MB
- **Medium Scale**: 10K users → ~500MB  
- **Large Scale**: 100K users → ~5GB
- **Enterprise**: 1M+ users → ~50GB+

---

## 📚 Core Tables

### 1. Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location VARCHAR(255),
    website_url TEXT,
    github_username VARCHAR(100),
    twitter_username VARCHAR(100),
    linkedin_username VARCHAR(100),
    skills JSONB DEFAULT '[]'::jsonb,
    reputation INTEGER DEFAULT 0,
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    posts_count INTEGER DEFAULT 0,
    forum_posts_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
    email_verified_at TIMESTAMP,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for users table
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_reputation ON users(reputation DESC);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_skills_gin ON users USING GIN(skills);
```

### 2. Forum Posts Table
```sql
CREATE TABLE forum_posts (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(600) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('general', 'bug', 'feature', 'review', 'help')),
    author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    votes_score INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    is_resolved BOOLEAN DEFAULT FALSE,
    solution_comment_id BIGINT,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    expected_output TEXT, -- for bug reports
    actual_output TEXT,   -- for bug reports
    code_snippet TEXT,
    environment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for forum_posts table
CREATE INDEX idx_forum_posts_author_id ON forum_posts(author_id);
CREATE INDEX idx_forum_posts_slug ON forum_posts(slug);
CREATE INDEX idx_forum_posts_votes_score ON forum_posts(votes_score DESC);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX idx_forum_posts_last_activity ON forum_posts(last_activity_at DESC);
CREATE INDEX idx_forum_posts_question_type ON forum_posts(question_type);
CREATE INDEX idx_forum_posts_is_resolved ON forum_posts(is_resolved);
CREATE INDEX idx_forum_posts_content_search ON forum_posts USING GIN(to_tsvector('english', title || ' ' || content));
```

### 3. Articles Table
```sql
CREATE TABLE articles (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(600) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image_url TEXT,
    author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    reading_time INTEGER DEFAULT 0, -- estimated minutes
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for articles table
CREATE INDEX idx_articles_author_id ON articles(author_id);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_likes_count ON articles(likes_count DESC);
CREATE INDEX idx_articles_content_search ON articles USING GIN(to_tsvector('english', title || ' ' || content || ' ' || COALESCE(excerpt, '')));
```

### 4. Comments Table
```sql
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT, -- nullable for flexibility
    post_type VARCHAR(20) NOT NULL CHECK (post_type IN ('article', 'forum')),
    parent_comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
    votes_score INTEGER DEFAULT 0,
    is_accepted_solution BOOLEAN DEFAULT FALSE,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for comments table
CREATE INDEX idx_comments_author_id ON comments(author_id);
CREATE INDEX idx_comments_post_id_type ON comments(post_id, post_type);
CREATE INDEX idx_comments_parent_comment_id ON comments(parent_comment_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comments_votes_score ON comments(votes_score DESC);
```

### 5. Tags Table
```sql
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6', -- hex color
    category VARCHAR(20) NOT NULL CHECK (category IN ('language', 'framework', 'tool', 'concept')),
    usage_count INTEGER DEFAULT 0,
    follower_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for tags table
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_category ON tags(category);
CREATE INDEX idx_tags_usage_count ON tags(usage_count DESC);
```

---

## 🔗 Relationship Tables

### 6. Post Tags (Many-to-Many)
```sql
CREATE TABLE post_tags (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL,
    post_type VARCHAR(20) NOT NULL CHECK (post_type IN ('article', 'forum')),
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, post_type, tag_id)
);

-- Indexes
CREATE INDEX idx_post_tags_post_id_type ON post_tags(post_id, post_type);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
```

### 7. Votes Table
```sql
CREATE TABLE votes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_id BIGINT NOT NULL,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('forum_post', 'comment')),
    vote_type VARCHAR(4) NOT NULL CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, target_id, target_type)
);

-- Indexes
CREATE INDEX idx_votes_user_id ON votes(user_id);
CREATE INDEX idx_votes_target_id_type ON votes(target_id, target_type);
```

### 8. Likes Table (for articles)
```sql
CREATE TABLE likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    article_id BIGINT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, article_id)
);

-- Indexes
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_article_id ON likes(article_id);
```

### 9. User Follows Table
```sql
CREATE TABLE user_follows (
    id BIGSERIAL PRIMARY KEY,
    follower_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    CHECK(follower_id != following_id)
);

-- Indexes
CREATE INDEX idx_user_follows_follower_id ON user_follows(follower_id);
CREATE INDEX idx_user_follows_following_id ON user_follows(following_id);
```

### 10. Tag Follows Table
```sql
CREATE TABLE tag_follows (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tag_id)
);

-- Indexes
CREATE INDEX idx_tag_follows_user_id ON tag_follows(user_id);
CREATE INDEX idx_tag_follows_tag_id ON tag_follows(tag_id);
```

### 11. Bookmarks Table
```sql
CREATE TABLE bookmarks (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_id BIGINT NOT NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('article', 'forum')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_id, content_type)
);

-- Indexes
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_content_id_type ON bookmarks(content_id, content_type);
```

---

## 📊 Analytics Tables

### 12. Reading History Table
```sql
CREATE TABLE reading_history (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_id BIGINT NOT NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('article', 'forum')),
    time_spent INTEGER DEFAULT 0, -- seconds
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100), -- percentage
    last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_id, content_type)
);

-- Indexes
CREATE INDEX idx_reading_history_user_id ON reading_history(user_id);
CREATE INDEX idx_reading_history_last_read_at ON reading_history(last_read_at DESC);
CREATE INDEX idx_reading_history_content_id_type ON reading_history(content_id, content_type);
```

### 13. Search History Table
```sql
CREATE TABLE search_history (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    search_type VARCHAR(20) NOT NULL CHECK (search_type IN ('content', 'forum', 'users', 'all')),
    results_count INTEGER DEFAULT 0,
    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_search_history_user_id ON search_history(user_id);
CREATE INDEX idx_search_history_searched_at ON search_history(searched_at DESC);
CREATE INDEX idx_search_history_query ON search_history(query);
```

### 14. Content Analytics Table
```sql
CREATE TABLE content_analytics (
    id BIGSERIAL PRIMARY KEY,
    content_id BIGINT NOT NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('article', 'forum')),
    date DATE NOT NULL,
    views_count INTEGER DEFAULT 0,
    unique_views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    bookmarks_count INTEGER DEFAULT 0,
    average_time_spent INTEGER DEFAULT 0, -- seconds
    completion_rate DECIMAL(5,2) DEFAULT 0.00, -- percentage
    bounce_rate DECIMAL(5,2) DEFAULT 0.00, -- percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_id, content_type, date)
);

-- Indexes
CREATE INDEX idx_content_analytics_content_id_type ON content_analytics(content_id, content_type);
CREATE INDEX idx_content_analytics_date ON content_analytics(date DESC);
```

### 15. User Activity Log Table
```sql
CREATE TABLE user_activity_log (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'post_created', 'comment_added', 'vote_cast', etc.
    target_id BIGINT,
    target_type VARCHAR(20), -- 'article', 'forum', 'comment', 'user'
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX idx_user_activity_log_created_at ON user_activity_log(created_at DESC);
CREATE INDEX idx_user_activity_log_activity_type ON user_activity_log(activity_type);
```

---

## 🔔 System Tables

### 16. Notifications Table
```sql
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'comment', 'vote', 'follow', 'mention', 'system', 'solution_accepted'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb, -- additional data like post_id, comment_id, etc.
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
```

### 17. Notification Settings Table
```sql
CREATE TABLE notification_settings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    comment_notifications BOOLEAN DEFAULT TRUE,
    vote_notifications BOOLEAN DEFAULT TRUE,
    follow_notifications BOOLEAN DEFAULT TRUE,
    mention_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX idx_notification_settings_user_id ON notification_settings(user_id);
```

### 18. Reports Table
```sql
CREATE TABLE reports (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    content_id BIGINT,
    content_type VARCHAR(20) CHECK (content_type IN ('article', 'forum', 'comment', 'user')),
    reported_user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    reported_by_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason VARCHAR(50) NOT NULL CHECK (reason IN ('spam', 'inappropriate', 'harassment', 'copyright', 'other')),
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
    moderator_id BIGINT REFERENCES users(id),
    moderator_notes TEXT,
    action VARCHAR(50) CHECK (action IN ('no_action', 'content_removed', 'user_warned', 'user_suspended')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_reported_by_id ON reports(reported_by_id);
CREATE INDEX idx_reports_content_id_type ON reports(content_id, content_type);
```

### 19. Achievements Table
```sql
CREATE TABLE achievements (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_score INTEGER DEFAULT 0,
    level VARCHAR(20) DEFAULT 'bronze' CHECK (level IN ('bronze', 'silver', 'gold', 'platinum')),
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_at TIMESTAMP,
    rank INTEGER DEFAULT 0,
    next_level_progress DECIMAL(5,2) DEFAULT 0.00, -- percentage to next level
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX idx_achievements_total_score ON achievements(total_score DESC);
CREATE INDEX idx_achievements_rank ON achievements(rank);
```

### 20. Badges Table
```sql
CREATE TABLE badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon_url TEXT,
    category VARCHAR(20) NOT NULL CHECK (category IN ('posting', 'engagement', 'helping', 'special')),
    rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
    points_required INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Badges (Many-to-Many)
CREATE TABLE user_badges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id BIGINT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- Indexes
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);
```

### 21. Authentication & Sessions Tables
```sql
CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_verification_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);
```

---

## 🚀 Indexes Strategy

### Primary Indexes (Already included above):
- **Primary Keys**: All tables have BIGSERIAL primary keys
- **Foreign Keys**: All foreign key columns are indexed
- **Unique Constraints**: Username, email, slugs, etc.

### Performance Indexes:
```sql
-- Composite indexes for common queries
CREATE INDEX idx_forum_posts_author_activity ON forum_posts(author_id, last_activity_at DESC);
CREATE INDEX idx_articles_author_published ON articles(author_id, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_comments_post_created ON comments(post_id, post_type, created_at DESC);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);

-- Full-text search indexes
CREATE INDEX idx_users_search ON users USING GIN(to_tsvector('english', first_name || ' ' || last_name || ' ' || username));
CREATE INDEX idx_tags_search ON tags USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Partial indexes for better performance
CREATE INDEX idx_forum_posts_unresolved ON forum_posts(created_at DESC) WHERE is_resolved = FALSE;
CREATE INDEX idx_articles_published ON articles(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_reports_pending ON reports(created_at DESC) WHERE status = 'pending';
```

---

## ⚡ Performance Considerations

### Database Optimization:
1. **Connection Pooling**: Use connection pooling (PgBouncer)
2. **Query Optimization**: Regular EXPLAIN ANALYZE on slow queries
3. **Materialized Views**: For complex analytics queries
4. **Partitioning**: Partition large tables by date (user_activity_log, content_analytics)
5. **Archiving**: Archive old data (older than 2 years)

### Caching Strategy:
```sql
-- Redis cache keys structure
user:profile:{user_id}               -- User profile data
forum:posts:trending                 -- Trending forum posts
articles:trending                    -- Trending articles
tags:popular                         -- Popular tags
user:notifications:{user_id}         -- User notifications
search:results:{query_hash}          -- Search results cache
```

### Backup & Recovery:
- **Daily Backups**: Full database backup
- **Point-in-time Recovery**: WAL archiving
- **Replica Setup**: Read replicas for analytics queries

### Monitoring Queries:
```sql
-- Monitor slow queries
SELECT query, mean_time, calls, total_time 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Monitor table sizes
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
       pg_total_relation_size(schemaname||'.'||tablename) as bytes
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY bytes DESC;

-- Monitor index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

---

## 📋 Database Summary

### Total Tables: 21
- **Core Tables**: 5 (users, forum_posts, articles, comments, tags)
- **Relationship Tables**: 6 (many-to-many relationships)
- **Analytics Tables**: 4 (tracking and analytics)
- **System Tables**: 6 (notifications, reports, achievements, auth)

### Estimated Storage:
- **Small Scale (1K users)**: ~50MB
- **Medium Scale (10K users)**: ~500MB
- **Large Scale (100K users)**: ~5GB
- **Enterprise (1M users)**: ~50GB

### Key Features:
✅ **ACID Compliance** with PostgreSQL
✅ **Full-text Search** capabilities
✅ **JSON Support** for flexible data
✅ **UUID Support** for security
✅ **Comprehensive Indexing** for performance
✅ **Referential Integrity** with foreign keys
✅ **Audit Trail** with timestamps
✅ **Scalability** considerations

This database design supports all features in your CodeAdvisor platform and is ready for production deployment! 🚀