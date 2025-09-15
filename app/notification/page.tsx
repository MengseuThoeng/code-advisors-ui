"use client"

import { useEffect, useState, useCallback } from "react";
import { WebSocketService } from "@/lib/websocket";
import { NotificationList } from "@/components/notification/NotificationList";
import { markAsRead, removeNotification } from "@/lib/api";
import type { Notification } from "@/types/notifications";
import { Bell, Search, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      console.error("Error:", error);
    }
  }, []);

  const handleRemove = useCallback(async (id: string) => {
    try {
      await removeNotification(id);
      setNotifications(prev =>
        prev.filter(notification => notification.id !== id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    const unreadNotifications = notifications.filter(n => !n.isRead);
    try {
      await Promise.all(unreadNotifications.map(n => markAsRead(n.id)));
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }, [notifications]);

  useEffect(() => {
    const currentUserId = "receiverID";
    setUserId(currentUserId);

    const wsService = new WebSocketService("http://localhost:8080/ws", currentUserId);
    wsService.onNotification((notification) => {
      setNotifications(prev => [notification, ...prev]);
    });
    wsService.connect();
    wsService.fetchInitialNotifications("desc").then(initialNotifications => {
      setNotifications(initialNotifications);
    });

    return () => {
      wsService.disconnect();
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = notifications.filter(notification =>
    searchQuery === "" || 
    notification.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-[320px] px-8 py-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white rounded-[5px] border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#000040] to-[#000040]/80 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#000040]">Notifications</h1>
                <p className="text-gray-600 text-sm mt-1">
                  {unreadCount > 0 
                    ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                    : "You're all caught up!"
                  }
                </p>
              </div>
              {unreadCount > 0 && (
                <Badge className="bg-[#CD3937] text-white px-3 py-1 text-sm font-medium">
                  {unreadCount}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <Button 
                  onClick={handleMarkAllAsRead}
                  className="bg-[#000040] hover:bg-[#000040]/90 text-white px-4 py-2 rounded-xl font-medium shadow-lg transition-all duration-200"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {notifications.length > 0 && (
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-[44px] rounded-xl border-2 border-gray-200 focus:border-[#000040]/50 focus:ring-0 transition-colors bg-gray-50 focus:bg-white"
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        {filteredNotifications.length > 0 ? (
          <div className="bg-white rounded-[5px] border border-gray-200 shadow-sm">
            <div className="p-6">
              <NotificationList
                notifications={filteredNotifications}
                actions={{ markAsRead: handleMarkAsRead, remove: handleRemove }}
              />
            </div>
          </div>
        ) : searchQuery ? (
          <div className="bg-white rounded-[5px] border border-gray-200 p-12 text-center shadow-sm">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#000040] mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              No notifications match your search for "{searchQuery}"
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery("")}
              className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-[5px] border border-gray-200 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#000040] mb-3">All caught up!</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              No new notifications right now. We'll notify you when something important happens.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
