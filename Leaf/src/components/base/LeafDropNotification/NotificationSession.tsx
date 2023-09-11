 import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Notification from './Notification';
import LeafColor from '../../styling/color/LeafColor';

interface NotificationSessionContextProps {
  showNotification: (title:string, message: string, titleColor?: LeafColor, messageColor?: LeafColor, icon?: string, iconColor?: LeafColor) => void;
  showDefaultNotification: (title: string, message: string, icon?: string) => void;
}

const NotificationSessionContext = createContext<NotificationSessionContextProps | undefined>(undefined);

export function NotificationSessionProvider({ children }: { children: ReactNode }) {
  const [notificationQueue, setNotificationQueue] = useState<{title:string, message: string, titleColor?: LeafColor, messageColor?: LeafColor, icon?: string, iconColor?: LeafColor} []>([]);

  const showNotification = (title:string, message: string, titleColor?: LeafColor, messageColor?: LeafColor, icon?: string, iconColor?: LeafColor) => {
    setNotificationQueue((prevQueue) => [...prevQueue, { title, message, titleColor, messageColor, icon, iconColor },]);
  };

  const showDefaultNotification = (title:string, message: string, icon?: string) => {
    showNotification(title, message, undefined, undefined, icon);
  }

  useEffect(() => {
      if (notificationQueue.length > 0) {
        const [currentNotification, ...rest] = notificationQueue;

        
        return () => {
          setNotificationQueue(rest);
        };
      }
    }, [notificationQueue]);

  return (
    <NotificationSessionContext.Provider value={{ showNotification, showDefaultNotification }}>
      {children}
      {notificationQueue.map((notification, index) => (
        <Notification key={index} title={notification.title} message={notification.message} titleColor={notification.titleColor} messageColor={notification.messageColor} icon={notification.icon} iconColor={notification.iconColor} onAnimationEnd={() => {}} />
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
