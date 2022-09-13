import { StorageKeysConstants } from "../../constants";
import {
  NotificationType,
  scheduleEventsNotification,
  scheduleMoodboardNotifications,
  updateArticlesNotification,
} from "../notifications/notification.util";
import { getObjectValue } from "../storage.util";

export const isToggleOn = async (type: NotificationType): Promise<boolean> => {
  const key = getStorageKey(type);
  if (key) return (await getObjectValue(key)) as boolean;
  return true; // 'On' par défaut
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

export const updateNotification = (type: NotificationType): void => {
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
      void scheduleEventsNotification([]); // TOOD:
      break;
    }
    default:
      console.warn(`should implement update notification for type ${type}`);
      break;
  }
};
