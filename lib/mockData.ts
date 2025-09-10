// Static mock data for the application
import type { Notification, NotificationType } from '@/types/notifications';
import type { UserInformation, Counts, ForumCardData } from '@/types/user';
import type { Author, Content, Comment } from '@/types/engagement';

// User Profile Data
export const mockUserInformation: UserInformation = {
  fullName: "John Doe",
  familyName: "Doe",
  givenName: "John", 
  username: "john.doe",
  gender: "Male",
  pob: "Phnom Penh, Cambodia",
  school: "Royal University of Phnom Penh",
  email: "john.doe@example.com",
  jobPosition: "Software Developer",
  workPlace: "Tech Company",
  phoneNumber: "+855 12 345 678",
  address: "Phnom Penh, Cambodia",
  dob: "1990-01-01",
  bio: "I am a passionate software developer with 5+ years of experience in web development. I love creating innovative solutions and sharing knowledge with the community."
};

// User Activity Counts
export const mockUserCounts: Counts = {
  like: 42,
  content: 15,
  forum: 8,
  comment: 156,
  answer: 23
};

// Forum Posts Data
export const mockForumData: ForumCardData[] = [
  {
    id: 1,
    avatar: "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    username: "Linuxoid",
    timestamp: "12-Nov-2024 1:38PM",
    title: "What is a difference between Java and JavaScript?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.",
  },
  {
    id: 2,
    avatar: "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    username: "TechGuru",
    timestamp: "12-Nov-2024 2:15PM",
    title: "Understanding React Hooks: UseEffect Explained",
    content: "Discover the power of useEffect hook in React and how it manages side effects in functional components.",
  },
  {
    id: 3,
    avatar: "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    username: "DevMaster",
    timestamp: "12-Nov-2024 3:20PM",
    title: "Python vs JavaScript: Which to Learn First?",
    content: "A comprehensive comparison of Python and JavaScript for beginners starting their programming journey.",
  },
  {
    id: 4,
    avatar: "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    username: "CodeNinja",
    timestamp: "12-Nov-2024 4:05PM",
    title: "Best Practices for Writing Clean Code",
    content: "Learn essential tips and techniques for writing maintainable, readable, and efficient code.",
  }
];

// Authors for Comments
export const mockAuthors: Author[] = [
  {
    id: "a1",
    userName: "John Doe",
    image: "https://i.pinimg.com/736x/7c/00/3f/7c003f765d1cec42ae00100084b94daf.jpg"
  },
  {
    id: "a2", 
    userName: "Jane Smith",
    image: "https://i.pinimg.com/474x/97/a7/3f/97a73f0f553157648c90655078101718.jpg"
  },
  {
    id: "a3",
    userName: "Tech Guru",
    image: "https://i.pinimg.com/236x/3f/a9/2a/3fa92a0c86938e43376928b3ee66518b.jpg"
  }
];

// Comments Data
export const mockComments: Comment[] = [
  {
    id: "c1",
    author: mockAuthors[0],
    body: "This is a great explanation! Thanks for sharing your insights on this topic.",
    createdAt: new Date("2024-12-04T13:00:00Z"),
    isReport: false,
    updateAt: new Date("2024-12-04T13:00:00Z"),
    replies: [
      {
        id: "r1",
        author: mockAuthors[1],
        body: "I agree! This helped me understand the concept much better.",
        createdAt: new Date("2024-12-04T14:30:00Z"),
        isReport: false,
        updateAt: new Date("2024-12-04T14:30:00Z"),
        parentId: "c1",
        replies: []
      }
    ]
  },
  {
    id: "c2",
    author: mockAuthors[2],
    body: "Could you provide more examples of this in practice?",
    createdAt: new Date("2024-12-04T13:10:00Z"),
    isReport: false,
    updateAt: new Date("2024-12-04T13:10:00Z"),
    replies: []
  }
];

// Notifications Data
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Post Liked',
    message: 'Someone liked your post about React Hooks',
    notificationData: {
      uuid: 'content1',
      slug: 'react-hooks-explained',
      title: 'React Hooks Explained',
      thumbnail: null,
      isContent: true
    },
    notificationType: 'LIKE' as NotificationType,
    isRead: false,
    senderId: 'user2',
    receiverId: 'user1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n2',
    title: 'New Comment',
    message: 'New comment on your forum post about JavaScript',
    notificationData: {
      uuid: 'forum1',
      slug: 'javascript-vs-python',
      title: 'JavaScript vs Python',
      thumbnail: null,
      isContent: false
    },
    notificationType: 'COMMENT' as NotificationType,
    isRead: false,
    senderId: 'user3',
    receiverId: 'user1',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n3',
    title: 'Reply Received',
    message: 'Tech Guru replied to your comment',
    notificationData: {
      uuid: 'forum2',
      slug: 'clean-code-practices',
      title: 'Clean Code Practices',
      thumbnail: null,
      isContent: false
    },
    notificationType: 'REPLY' as NotificationType,
    isRead: true,
    senderId: 'user4',
    receiverId: 'user1',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

// Content Data (for articles/posts)
export const mockContentData = [
  {
    id: 'content1',
    title: 'Getting Started with Next.js 15',
    slug: 'getting-started-nextjs-15',
    excerpt: 'Learn the latest features in Next.js 15 and how to build modern web applications.',
    content: 'Next.js 15 introduces many exciting features...',
    author: mockAuthors[0],
    tags: ['Next.js', 'React', 'Web Development'],
    publishedAt: new Date('2024-12-01T10:00:00Z'),
    views: 1250,
    likes: 89,
    thumbnail: 'https://via.placeholder.com/600x300?text=Next.js+15'
  },
  {
    id: 'content2',
    title: 'TypeScript Best Practices in 2024',
    slug: 'typescript-best-practices-2024',
    excerpt: 'Essential TypeScript patterns and practices for writing maintainable code.',
    content: 'TypeScript has evolved significantly...',
    author: mockAuthors[1],
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    publishedAt: new Date('2024-11-28T14:30:00Z'),
    views: 890,
    likes: 67,
    thumbnail: 'https://via.placeholder.com/600x300?text=TypeScript+2024'
  }
];

// Utility functions for mock API delays
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const randomDelay = (min: number = 300, max: number = 1000): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return simulateApiDelay(delay);
};
