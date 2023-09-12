import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Notification from "./Notification";
import LeafColor from "../../styling/color/LeafColor";
import LeafColors from "../../styling/LeafColors";
import { strings } from "../../../localisation/Strings";

interface NotificationSessionContextProps {
    showNotification: (
        title: string,
        message: string,
        titleColor?: LeafColor,
        messageColor?: LeafColor,
        icon?: string,
        iconColor?: LeafColor,
    ) => void;

    showDefaultNotification: (title: string, message: string, icon?: string) => void;

    showErrorNotification: (message: string) => void;

    showSuccessNotification: (message: string) => void;
}

const NotificationSessionContext = createContext<NotificationSessionContextProps | undefined>(undefined);

export function NotificationSessionProvider({ children }: { children: ReactNode }) {
    const [notificationQueue, setNotificationQueue] = useState<
        {
            title: string;
            message: string;
            titleColor?: LeafColor;
            messageColor?: LeafColor;
            icon?: string;
            iconColor?: LeafColor;
            backgroundColor?: LeafColor;
        }[]
    >([]);

    const showNotification = (
        title: string,
        message: string,
        titleColor?: LeafColor,
        messageColor?: LeafColor,
        icon?: string,
        iconColor?: LeafColor,
        backgroundColor?: LeafColor,
    ) => {
        setNotificationQueue((prevQueue) => [
            ...prevQueue,
            { title, message, titleColor, messageColor, icon, iconColor, backgroundColor },
        ]);
    };

    const showDefaultNotification = (title: string, message: string, icon?: string) => {
        showNotification(title, message, undefined, undefined, icon, undefined);
    };

    const showErrorNotification = (message: string) => {
        showNotification(strings("feedback.error"), message, LeafColors.textLight, LeafColors.textLight, "alert-circle-outline", LeafColors.textLight, LeafColors.textError)
    }

    const showSuccessNotification = (message: string) => {
        showNotification(strings("feedback.success"), message, LeafColors.textLight, LeafColors.textLight, "check-circle-outline", LeafColors.textLight, LeafColors.textSuccess)
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
        <NotificationSessionContext.Provider value={{ showNotification, showDefaultNotification, showErrorNotification, showSuccessNotification }}>
            {children}
            {notificationQueue.map((notification, index) => (
                <Notification
                    key={index}
                    title={notification.title}
                    message={notification.message}
                    titleColor={notification.titleColor}
                    messageColor={notification.messageColor}
                    icon={notification.icon}
                    iconColor={notification.iconColor}
                    backgroundColor={notification.backgroundColor}
                    onAnimationEnd={() => {}}
                />
            ))}
        </NotificationSessionContext.Provider>
    );
}

export function useNotificationSession() {
    const context = useContext(NotificationSessionContext);
    if (context === undefined) {
        throw new Error("useNotificationSession must be used within a NotificationSessionProvider");
    }
    return context;
}
