import type {
  NotificationContentInput,
  NotificationRequest,
  NotificationRequestInput,
  NotificationTriggerInput,
} from "expo-notifications";
import * as Notifications from "expo-notifications";

import { NotificationConstants } from "../../constants";
import type { Event, Step } from "../../types";
import { countCurrentStepArticlesNotRead } from "../step/step.util";
import { buildArticlesNotificationContent } from "./articles/articlesNotification.util";
import { buildEpdsNotificationContent } from "./epds/epdsNotification.util";
import { buildEventNotificationContent } from "./event/eventNotification.util";
import { buildMoodboardNotificationContent } from "./moodboard/moodboardNotification.util";
import { buildNextStepNotificationContent } from "./step/nextStepNotification.util";

export enum NotificationType {
  epds = "epds",
  nextStep = "nextStep",
  event = "event",
  moodboard = "moodboard",
  articles = "articles",
}

export enum Weekday {
  sunday = 1,
  monday = 2,
  tuesday = 3,
  wednesday = 4,
  thursday = 5,
  friday = 6,
  saturday = 7,
}

export const sendNotificationReminder = async (
  content: NotificationContentInput,
  trigger: NotificationTriggerInput
): Promise<string> => {
  const notificationRequestInput: NotificationRequestInput = {
    content,
    trigger,
  };
  const notificationId = await Notifications.scheduleNotificationAsync(
    notificationRequestInput
  );
  return notificationId;
};

export const allowsNotifications = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  return existingStatus === "granted";
};

export const requestNotificationPermission = async (): Promise<void> => {
  const isAllowed = await allowsNotifications();
  if (!isAllowed) {
    await Notifications.requestPermissionsAsync();
  }
};

export const cancelAllScheduledNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

const cancelScheduledNotification = async (notifId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notifId);
};

export const getAllScheduledNotifications = async (): Promise<
  Notifications.NotificationRequest[]
> => Notifications.getAllScheduledNotificationsAsync();

export const logAllScheduledNotifications = async (): Promise<void> => {
  const scheduledNotifs = await getAllScheduledNotifications();
  for (const notif of scheduledNotifs) {
    console.info(notif);
  }
};

export const getAllNotificationsByType = async (
  notificationType: NotificationType
): Promise<NotificationRequest[]> => {
  const notifications = await getAllScheduledNotifications();
  return notifications.filter(
    (notification) => notification.content.data.type === notificationType
  );
};

export const cancelAllNotificationsByType = async (
  notificationType: NotificationType
): Promise<void> => {
  const notifications = await getAllScheduledNotifications();
  for (const notif of notifications) {
    if (notif.content.data.type === notificationType) {
      await cancelScheduledNotification(notif.identifier);
    }
  }
};

/**
 * Permet de tester les notifications depuis la page cachée dans le menu
 * En cliquant plusieurs fois sur le numéro de version en bas
 * @param notificationType
 */
export const scheduleFakeNotif = async (
  notificationType: NotificationType | string
): Promise<void> => {
  let content = null;
  switch (notificationType) {
    case NotificationType.epds:
      content = buildEpdsNotificationContent();
      break;
    case NotificationType.event: {
      const event: Event = {
        debut: 0,
        fin: 0,
        id: 0,
        nom: "Test",
      };
      content = buildEventNotificationContent(event, true);
      break;
    }
    case NotificationType.moodboard:
      content = buildMoodboardNotificationContent();
      break;
    case NotificationType.nextStep: {
      const nextStep: Step = {
        active: true,
        debut: 0,
        description: "Description",
        fin: 0,
        id: 0,
        nom: "Test",
        ordre: 0,
      };
      buildNextStepNotificationContent(nextStep);
      break;
    }
    case NotificationType.articles: {
      const nbArticlesToRead = await countCurrentStepArticlesNotRead();
      content = await buildArticlesNotificationContent(nbArticlesToRead);
      break;
    }
    default:
      console.warn(
        `scheduleFakeNotif : notification type '${notificationType}'`
      );
      break;
  }

  if (content) {
    await sendNotificationReminder(content, NotificationConstants.MIN_TRIGGER);
  }
};
