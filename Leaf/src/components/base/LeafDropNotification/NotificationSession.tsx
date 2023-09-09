 import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Notification from './Notification';
import LeafTypographyConfig from '../../styling/typography/LeafTypographyConfig';

interface NotificationSessionContextProps {
  showNotification: (title:string, message: string, typography: LeafTypographyConfig, icon?: string) => void;
}

const NotificationSessionContext = createContext<NotificationSessionContextProps | undefined>(undefined);

export function NotificationSessionProvider({ children }: { children: ReactNode }) {
  const [notificationQueue, setNotificationQueue] = useState<{title: string; message: string, typography: LeafTypographyConfig, icon?: string} []>([]);

  const showNotification = (title:string, message: string, typography: LeafTypographyConfig, icon?: string) => {
    setNotificationQueue((prevQueue) => [...prevQueue, { title, message, typography, icon },]);
  };

  useEffect(() => {
      if (notificationQueue.length > 0) {
        const [currentNotification, ...rest] = notificationQueue;

        
        return () => {
          setNotificationQueue(rest);
        };
      }
    }, [notificationQueue]);

  return (
    <NotificationSessionContext.Provider value={{ showNotification }}>
      {children}
      {notificationQueue.map((notification, index) => (
        <Notification key={index} title={notification.title} message={notification.message} typography={notification.typography} icon={notification.icon} onAnimationEnd={() => {}} />
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
