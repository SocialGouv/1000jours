import type { NotificationContentInput } from "expo-notifications";

import { Labels, NotificationConstants } from "../../../constants";
import {
  cancelAllNotificationsByType,
  NotificationType,
  sendNotificationReminder,
} from "../../notifications/notification.util";

const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;

export const scheduleFavoritesNotification = async (): Promise<string> => {
  const trigger = {
    seconds:
      SECONDS_IN_HOUR *
      HOURS_IN_DAY *
      NotificationConstants.DAYS_UNTIL_FAVORITES_NOTIFICATION,
  };
  await cancelAllNotificationsByType(NotificationType.favorites);
  return sendNotificationReminder(buildFavoritesNotificationContent(), trigger);
};

export const buildFavoritesNotificationContent =
  (): NotificationContentInput => {
    return {
      body: Labels.notification.favorites.body,
      data: {
        redirectFromRoot: false,
        redirectParams: null,
        redirectTitle: Labels.notification.favorites.redirectTitle,
        redirectTo: NotificationConstants.SCREEN_FAVORITES,
        type: NotificationType.favorites,
      },
      title: Labels.notification.favorites.title,
    };
  };
