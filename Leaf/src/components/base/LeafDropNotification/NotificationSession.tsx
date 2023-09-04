import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Notification from './Notification';

interface NotificationSessionContextProps {
  showNotification: (title:string, message: string) => void;
}

const NotificationSessionContext = createContext<NotificationSessionContextProps | undefined>(undefined);

export function NotificationSessionProvider({ children }: { children: ReactNode }) {
  const [notificationQueue, setNotificationQueue] = useState<{title: string; message: string} []>([]);

  const showNotification = (title:string, message: string) => {
    setNotificationQueue((prevQueue) => [...prevQueue, { title, message },]);
  };

  useEffect(() => {
      if (notificationQueue.length > 0) {
        const [currentNotification, ...rest] = notificationQueue;

        const timer = setTimeout(() => {
          setNotificationQueue(rest);
        }, 3000)
        return () => {
          clearTimeout(timer);
        };
      }
    }, [notificationQueue]);

  return (
    <NotificationSessionContext.Provider value={{ showNotification }}>
      {children}
      {notificationQueue.map((notification, index) => (
        <Notification key={index} title={notification.title} message={notification.message} onAnimationEnd={() => {}} />
      ))}
    </NotificationSessionContext.Provider>
  );
}

export function useNotificationSession() {
  const context = useContext(NotificationSessionContext);
  if (context === undefined) {
    throw new Error('useNotificationSession must be used within a NotificationSessionProvider');
  }
  return context;
}
