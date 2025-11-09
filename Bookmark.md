# Bookmark Status Fix - November 6, 2025

## Problem
The frontend developer reported that bookmarks were being saved successfully (POST endpoint works), but the GET `/api/articles/{slug}` endpoint was not returning the correct bookmark status. The `isBookmarked` field was always returning `false` even when the article was bookmarked.

## Root Cause
In `ArticleServiceImpl.getArticleBySlug()` method, there was a TODO comment indicating that bookmark checking was not implemented:

```java
if (user != null) {
    userLiked = articleLikeRepository.existsByUserIdAndArticleId(user.getId(), article.getId());
    // TODO: Check bookmark when bookmark feature is implemented
}
```

The `isBookmarked` field was hardcoded to `false` and never checked against the database.

## Solution
1. **Injected BookmarkRepository** into `ArticleServiceImpl`
2. **Implemented proper bookmark checking** using the existing repository method:
   ```java
   isBookmarked = bookmarkRepository.existsByUserIdAndContentIdAndContentType(
       user.getId(), 
       article.getId(), 
       Bookmark.ContentType.article
   );
   ```

## Files Changed
- `ArticleServiceImpl.java`:
  - Added `BookmarkRepository` import
  - Injected `BookmarkRepository` as a dependency
  - Implemented proper bookmark status checking in `getArticleBySlug()` method

- `API_DONE.md`:
  - Updated notes for GET `/api/articles/{slug}` to clarify bookmark status behavior
  - Added note that bookmark status is checked from the database
  - Clarified the complete bookmark workflow

## Testing
After this fix:
1. When a user bookmarks an article (POST `/api/articles/{slug}/bookmark`)
2. The bookmark is saved to the database
3. When the user fetches the article (GET `/api/articles/{slug}`)
4. The `isBookmarked` field will correctly show `true`
5. When the user unbookmarks the article
6. The `isBookmarked` field will correctly show `false`

## API Behavior
- **Unauthenticated users**: `isBookmarked` = `false`
- **Authenticated users without bookmark**: `isBookmarked` = `false`
- **Authenticated users with bookmark**: `isBookmarked` = `true`

The bookmark status is now correctly retrieved from the database for each request.

