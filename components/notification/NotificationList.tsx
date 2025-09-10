import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/notification/NotificationItem"
import type { Notification, NotificationActions } from "@/types/notifications"

interface NotificationListProps {
  notifications: Notification[]
  actions: NotificationActions
}

export function NotificationList({ notifications, actions }: NotificationListProps) {
  return (
    <div className="space-y-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            actions={actions}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 text-xl">No notifications available</p>
      )}
    </div>

    // <ScrollArea className="h-screen">
    //   <div className="space-y-1">
    //     {notifications.map((notification) => (
    //       <NotificationItem
    //         key={notification.id}
    //         notification={notification}
    //         actions={actions}
    //       />
    //     ))}
    //   </div>
    // </ScrollArea>

  )
}

