'use client'

import { useEffect, useRef, useState } from 'react'
import type { Notification } from '../types/notifications'

export function useNotificationsSocket(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws/notifications/${userId}`)

    ws.onopen = () => {
      console.log('Connected to notifications websocket')
      setIsConnected(true)
    }

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data) as Notification
      setNotifications((prev) => [notification, ...prev])
    }

    ws.onclose = () => {
      console.log('Disconnected from notifications websocket')
      setIsConnected(false)
    }

    wsRef.current = ws

    return () => {
      ws.close()
    }
  }, [userId])

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
    // Send to backend
    await fetch(`/api/notifications/${id}/read`, { method: 'POST' })
  }

  const remove = async (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    // Send to backend
    await fetch(`/api/notifications/${id}`, { method: 'DELETE' })
  }

  return {
    notifications,
    isConnected,
    actions: {
      markAsRead,
      remove,
    },
  }
}

