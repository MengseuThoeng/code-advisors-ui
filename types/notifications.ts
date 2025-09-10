export type NotificationData = {
    uuid: string
    slug: string
    title: string
    thumbnail: string | null
    isContent: boolean
  }
  
  export enum NotificationType {
    LIKE = 'LIKE',
    COMMENT = 'COMMENT',
    REPLY = 'REPLY'
  }
  
  export type Notification = {
    id: string
    title: string
    message: string
    notificationData: NotificationData
    notificationType: NotificationType
    isRead: boolean
    senderId: string
    receiverId: string
    createdAt: string
  }
  
  export type NotificationActions = {
    markAsRead: (id: string) => void;
    remove: (id: string) => void;
  }
  
  