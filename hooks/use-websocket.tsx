import { useState, useEffect, useCallback } from 'react';

export function useWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting');

  useEffect(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      setConnectionStatus('Connected');
    };

    websocket.onclose = () => {
      setConnectionStatus('Disconnected');
      setTimeout(() => {
        setConnectionStatus('Reconnecting');
      }, 3000);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    websocket.onmessage = (event) => {
      setLastMessage(event.data);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [url]);

  const sendMessage = useCallback(
    (message: string) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    },
    [ws]
  );

  return { lastMessage, connectionStatus, sendMessage };
}

