'use client'

import { useNotificationsSocket } from '@/hooks/use-notifications-socket'
import { NotificationItem } from './NotificationItem'

interface NotificationsProps {
  userId: string
}

export function Notifications({ userId }: NotificationsProps) {
  const { notifications = [], actions } = useNotificationsSocket(userId)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>
      <div className="bg-background rounded-lg border divide-y">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              actions={actions}
            />
          ))
        ) : (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

