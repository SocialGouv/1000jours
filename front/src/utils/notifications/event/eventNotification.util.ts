import { isAfter, subDays } from "date-fns";
import type { NotificationContentInput } from "expo-notifications";
import * as Notifications from "expo-notifications";

import {
  Labels,
  NotificationConstants,
  StorageKeysConstants,
} from "../../../constants";
import type { Event } from "../../../types";
import { StorageUtils } from "../..";
import {
  cancelAllNotificationsByType,
  NotificationType,
  sendNotificationReminder,
} from "../notification.util";

export const buildEventNotificationContent = (
  event: Event,
  isBeforeEventDate: boolean
): NotificationContentInput => {
  return {
    body: event.nom,
    data: {
      redirectFromRoot: true,
      redirectTitle: Labels.calendar.notification.redirectTitle,
      redirectTo: NotificationConstants.SCREEN_CALENDAR,
      type: NotificationType.event,
    },
    title: isBeforeEventDate
      ? Labels.calendar.notification.titleReminder
      : Labels.calendar.notification.title,
  };
};

export const scheduleEventsNotification = (events: Event[]): void => {
  events.forEach((event) => {
    void scheduleEventNotification(event);
  });
};

export const cancelScheduleEventsNotification = async (): Promise<void> => {
  const notificationIds = (await StorageUtils.getObjectValue(
    StorageKeysConstants.notifIdsEvents
  )) as string[] | null;
  if (notificationIds && notificationIds.length > 0) {
    notificationIds.forEach((notificationId) => {
      void Notifications.cancelScheduledNotificationAsync(notificationId);
    });
  }
  return StorageUtils.removeKey(StorageKeysConstants.notifIdsEvents);
};

export const rescheduleEventsNotifications = async (
  events: Event[]
): Promise<void> => {
  await cancelAllNotificationsByType(NotificationType.event);
  scheduleEventsNotification(events);
};

const updateStoreNotifEventIds = async (id: string) => {
  const notificationIds =
    ((await StorageUtils.getObjectValue(
      StorageKeysConstants.notifIdsEvents
    )) as string[] | null) ?? [];
  notificationIds.push(id);
  await StorageUtils.storeObjectValue(
    StorageKeysConstants.notifIdsEvents,
    notificationIds
  );
};

const scheduleEventNotification = async (event: Event) => {
  if (event.date) {
    const now = new Date();
    const eventDate = new Date(event.date);

    if (isAfter(eventDate, now)) {
      // Planifie la notification pour le jour J
      let notifDate = new Date(
        eventDate.setHours(
          NotificationConstants.EVENT_NOTIF_TRIGGER_HOUR,
          0,
          0,
          0
        )
      );
      let content = buildEventNotificationContent(event, false);
      let notificationId = null;
      if (isAfter(notifDate, now)) {
        notificationId = await sendNotificationReminder(content, notifDate);
        if (notificationId) await updateStoreNotifEventIds(notificationId);
      }

      // Planifie la notification pour un rappel avant le jour J
      notifDate = new Date(
        subDays(
          eventDate,
          NotificationConstants.NUMBER_OF_DAYS_NOTIF_EVENT_REMINDER
        ).setHours(NotificationConstants.EVENT_NOTIF_TRIGGER_HOUR, 0, 0, 0)
      );
      if (isAfter(notifDate, now)) {
        content = buildEventNotificationContent(event, true);
        notificationId = await sendNotificationReminder(content, notifDate);
        if (notificationId) await updateStoreNotifEventIds(notificationId);
      }
    }
  }
};
