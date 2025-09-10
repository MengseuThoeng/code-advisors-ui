// Mock WebSocket Service for static UI
import { fetchNotifications } from './api';
import type { Notification } from '@/types/notifications';

export class WebSocketService {
  private userId: string;
  private subscriptionCallback: ((notification: Notification) => void) | null = null;
  private mockInterval: NodeJS.Timeout | null = null;

  constructor(wsUrl: string = 'mock://localhost:8080/ws', userId: string) {
    this.userId = userId;
    console.log('Mock WebSocket initialized for user:', userId);
  }

  async fetchInitialNotifications(order: 'asc' | 'desc' = 'asc'): Promise<Notification[]> {
    const notifications = await fetchNotifications(this.userId);
    return notifications.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  connect(): void {
    console.log('Mock WebSocket connected');
    this.subscribe();
  }

  disconnect(): void {
    console.log('Mock WebSocket disconnected');
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }

  private subscribe(): void {
    console.log('Subscribed to mock notifications');
    
    // Simulate receiving new notifications every 30 seconds
    this.mockInterval = setInterval(() => {
      if (this.subscriptionCallback) {
        const mockNotification: Notification = {
          id: `mock_${Date.now()}`,
          title: 'New Activity',
          message: 'You have new activity on your posts',
          notificationData: {
            uuid: 'mock_content',
            slug: 'mock-post',
            title: 'Mock Post',
            thumbnail: null,
            isContent: true
          },
          notificationType: 'LIKE' as any,
          isRead: false,
          senderId: 'mock_sender',
          receiverId: this.userId,
          createdAt: new Date().toISOString()
        };
        
        this.subscriptionCallback(mockNotification);
      }
    }, 30000);
  }

  onNotification(callback: (notification: Notification) => void): void {
    this.subscriptionCallback = callback;
  }
}