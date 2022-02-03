import type { Subscription } from "@unimodules/core";
import type { Notification } from "expo-notifications";
import * as Notifications from "expo-notifications";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import * as React from "react";

import { Labels } from "../../constants";
import { NotificationUtils, TrackerUtils } from "../../utils";
import { NotificationModal } from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

// Called in App.tsx
export const setNotificationHandler = (): void => {
  Notifications.setNotificationHandler({
    // eslint-disable-next-line @typescript-eslint/require-await
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: false,
    }),
  });
};

const NotificationHandler: FC = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [notifType, setNotiftype] = useState<unknown | undefined>(undefined);

  useEffect(() => {
    // Notifications
    void NotificationUtils.registerForPushNotificationsAsync();
    // Se déclenche lorsque l'on reçoit une notification et que l'app est ouverte
    notificationListener.current =
      Notifications.addNotificationReceivedListener((newNotification) => {
        setNotification(newNotification);
      });
    // Se déclenche lorsque l'on clique sur la notification native
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationType =
          response.notification.request.content.data.type ?? "";

        setNotiftype(notificationType);
        setNotification(response.notification);
      });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );

      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    notification && (
      <>
        {notifType && (
          <TrackerHandler
            screenName={`${TrackerUtils.TrackingEvent.NOTIFICATION} (${notifType}) - ${Labels.notification.openTheApp}`}
          />
        )}
        <NotificationModal
          notification={notification}
          onDismiss={() => {
            setNotification(null);
          }}
        />
      </>
    )
  );
};

export default NotificationHandler;