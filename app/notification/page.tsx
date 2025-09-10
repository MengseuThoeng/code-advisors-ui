// NotificationsPage.tsx
"use client"

import { useEffect, useState, useCallback } from 'react';
import { WebSocketService } from "@/lib/websocket";
import { NotificationList } from "@/components/notification/NotificationList";
import { markAsRead, removeNotification } from "@/lib/api";
import type { Notification } from "@/types/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string>('');

  const handleMarkAsRead = useCallback(async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  const handleRemove = useCallback(async (id: string) => {
    try {
      await removeNotification(id);
      setNotifications(prev =>
        prev.filter(notification => notification.id !== id)
      );
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  }, []);

  useEffect(() => {
    const currentUserId = 'receiverID'; // Replace with actual user ID retrieval method
    setUserId(currentUserId);

    const wsService = new WebSocketService(
      'http://localhost:8080/ws',
      currentUserId
    );

    wsService.onNotification((notification) => {
      setNotifications(prev => [notification, ...prev]); // Add new notification at the top
    });

    wsService.connect();

    // Fetch initial notifications
wsService.fetchInitialNotifications('desc').then(initialNotifications => {
  setNotifications(initialNotifications);
});

    return () => {
      wsService.disconnect();
    };
  }, []);

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <h1 className="text-primary font-semibold text-3xl mb-4">Notifications</h1>
      <NotificationList
        notifications={notifications}
        actions={{ markAsRead: handleMarkAsRead, remove: handleRemove }}
      />
    </div>
  );
}