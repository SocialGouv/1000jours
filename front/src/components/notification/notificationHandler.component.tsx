import type { Notification } from "expo-notifications";
import * as Notifications from "expo-notifications";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { Subscription } from 'expo-modules-core';

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
  const [trackNotif, setTrackNotif] = useState<boolean>(false);

  const showNotificationModal = (notif: Notification) => {
    // Ajoute un setTimeout pour éviter que l'application freeze
    // lorsque l'on ouvre l'app depuis une notification
    setTimeout(() => {
      setNotification(notif);
    }, 1000);
  };

  // Se déclenche lorsque l'on clique sur une notification native
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if(lastNotificationResponse) {
      setTrackNotif(true);
      showNotificationModal(lastNotificationResponse.notification);
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    // Notifications
    void NotificationUtils.requestNotificationPermission();
    // Se déclenche lorsque l'on reçoit une notification et que l'app est ouverte
    notificationListener.current =
      Notifications.addNotificationReceivedListener((newNotification) => {
        showNotificationModal(newNotification);
      });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
    };
  }, []);

  const onNotificationDismiss = useCallback(() => {
    setNotification(null);
    setTrackNotif(false);
  }, []);

  return (
    notification && (
      <>
        {trackNotif && (
          <TrackerHandler
            screenName={`${TrackerUtils.TrackingEvent.NOTIFICATION} (${notification.request.content.data.type}) - ${Labels.notification.openTheApp}`}
          />
        )}
        <NotificationModal
          notification={notification}
          onDismiss={onNotificationDismiss}
        />
      </>
    )
  );
};

export default NotificationHandler;
