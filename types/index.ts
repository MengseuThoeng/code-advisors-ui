export type NavItem = {
    title: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }
  
  export type Article = {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    createdAt: string
  }
  
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
    REPLY = 'REPLY',
    ACCESS_REQUEST = 'ACCESS_REQUEST'
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
    markAsRead: (id: string) => void
    remove: (id: string) => void
  }
  
  