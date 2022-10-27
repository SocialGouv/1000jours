import { StorageKeysConstants } from "../../constants";
import type { Event } from "../../types";
import {
  NotificationType,
  scheduleEventsNotification,
  scheduleMoodboardNotifications,
  updateArticlesNotification,
} from "../notifications/notification.util";
import { getObjectValue } from "../storage.util";

// TODO: warning ! dépendance circulaire avec notification.util.ts
// Ca sera bien de le déplacer dedans
export const isToggleOn = async (type: NotificationType): Promise<boolean> => {
  const DEFAULT_VALUE = true; // 'On' par défaut
  const key = getStorageKey(type);

  if (key) {
    const data = (await getObjectValue(key)) as boolean | undefined;
    return data ?? DEFAULT_VALUE;
  }
  return DEFAULT_VALUE;
};

export const getStorageKey = (
  withType: NotificationType
): string | undefined => {
  switch (withType) {
    case NotificationType.moodboard: {
      return StorageKeysConstants.notifToggleMoodboard;
    }
    case NotificationType.articles: {
      return StorageKeysConstants.notifToggleArticles;
    }
    case NotificationType.event: {
      return StorageKeysConstants.notifToggleEvents;
    }
    default:
      console.warn(`should get storage key for type ${withType}`);
      break;
  }
};

export const updateNotification = (
  type: NotificationType,
  events?: Event[]
): void => {
  switch (type) {
    case NotificationType.moodboard: {
      void scheduleMoodboardNotifications();
      break;
    }
    case NotificationType.articles: {
      void updateArticlesNotification();
      break;
    }
    case NotificationType.event: {
      if (events) void scheduleEventsNotification(events);
      break;
    }
    default:
      console.warn(`should implement update notification for type ${type}`);
      break;
  }
};
