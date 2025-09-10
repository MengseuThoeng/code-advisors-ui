# CodeAdvisor UI - Static Version

This is a **static/mock version** of the CodeAdvisor UI with all API integrations removed and replaced with static data. Perfect for frontend development and design work before implementing the backend.

## ✅ What Was Changed

### 🔄 API Integrations Removed
- **WebSocket connections** → Mock WebSocket service
- **HTTP API calls** → Static data with simulated delays
- **External API dependencies** → Local mock data
- **Database connections** → In-memory data structures

### 📁 Files Modified
- `lib/api.ts` - All API functions now use mock data
- `lib/websocket.ts` - Mock WebSocket service
- `lib/userProfile/information.ts` - Static user data
- `lib/userProfile/update.ts` - Mock form submissions
- `components/userprofile/user/Bio.tsx` - Uses static user data

### 🆕 New Files Added
- `lib/mockData.ts` - Centralized mock data for the entire app

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

## 📊 Mock Data Available

### 👤 User Profile
- Full user information with bio
- Activity counts (likes, comments, posts, etc.)
- Profile images and settings

### 💬 Forum Data
- Sample forum posts and discussions
- Comments and replies with threading
- User interactions (likes, bookmarks)

### 🔔 Notifications
- Real-time style notifications (simulated)
- Different notification types (likes, comments, replies)
- Read/unread status management

### 📝 Content
- Article/content posts
- Tags and categories
- View counts and engagement metrics

## 🛠️ Customizing Mock Data

All mock data is centralized in `lib/mockData.ts`. You can easily:

1. **Add more users**: Extend `mockAuthors` array
2. **Create more posts**: Add to `mockForumData` array  
3. **Customize notifications**: Modify `mockNotifications`
4. **Update user profile**: Edit `mockUserInformation`

Example:
```typescript
// Add a new forum post
export const mockForumData: ForumCardData[] = [
  // existing posts...
  {
    id: 10,
    avatar: "your-avatar-url",
    username: "NewUser",
    timestamp: "Today 2:30PM",
    title: "Your New Post Title",
    content: "Your post content here..."
  }
];
```

## 🎨 UI Features Working

✅ **Navigation** - Sidebar, navbar, routing  
✅ **User Profile** - Bio, activity stats, settings  
✅ **Forum** - Posts, comments, threading  
✅ **Content** - Articles, reading history  
✅ **Notifications** - Dropdown, real-time simulation  
✅ **Responsive Design** - Mobile/desktop layouts  
✅ **Dark/Light Theme** - Theme switching  
✅ **Rich Text Editor** - Code highlighting, formatting  

## 🔄 Converting Back to API Integration

When ready to integrate with your monolithic backend:

1. **Update base URLs** in `lib/api.ts`
2. **Replace mock functions** with real API calls
3. **Update WebSocket endpoint** in `lib/websocket.ts`
4. **Remove `simulateApiDelay`** calls
5. **Replace mock data imports** with API calls

Example conversion:
```typescript
// Before (Mock)
export const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  await simulateApiDelay(500);
  return mockNotifications.filter(n => n.receiverId === userId);
};

// After (Real API)
export const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  const response = await fetch(`/api/v1/notifications/${userId}`);
  return response.json();
};
```

## 🚨 Current Limitations

- No real data persistence (refreshing resets state)
- No authentication/authorization flows
- No file upload functionality
- No real-time WebSocket connections
- Limited error handling scenarios

## 📝 Next Steps

1. **Design & Polish** - Perfect the UI/UX with static data
2. **Component Testing** - Test all interactive features
3. **Backend Development** - Build your monolithic API
4. **API Integration** - Replace mock data with real endpoints
5. **Authentication** - Add login/logout flows
6. **Deployment** - Deploy both frontend and backend

## 🎯 Benefits of This Approach

✅ **Independent Development** - Frontend team can work without backend  
✅ **Rapid Prototyping** - Quick UI iterations and testing  
✅ **Demo Ready** - Show functionality to stakeholders  
✅ **Easy Testing** - Predictable data for component testing  
✅ **Design Validation** - Perfect the UX before backend complexity  

---

**Status: ✅ Ready for Development**

Your UI is now fully functional with mock data and ready for frontend development, design refinement, and user testing!
