import type { NotificationContentInput } from "expo-notifications";
import * as Notifications from "expo-notifications";

import {
  EpdsConstants,
  Labels,
  StorageKeysConstants,
} from "../../../constants";
import { StorageUtils } from "../..";
import {
  cancelAllNotificationsByType,
  NotificationType,
  sendNotificationReminder,
} from "../notification.util";

export const buildEpdsNotificationContent = (): NotificationContentInput => {
  return {
    body: Labels.epdsSurvey.notification.body,
    categoryIdentifier: NotificationType.epds,
    data: {
      redirectFromRoot: true,
      redirectTitle: Labels.epdsSurvey.notification.redirectTitle,
      redirectTo: "epds",
      type: NotificationType.epds,
    },
    title: Labels.epdsSurvey.notification.title,
  };
};

export const scheduleEpdsNotification = async (): Promise<string | null> => {
  await cancelAllNotificationsByType(NotificationType.epds);
  /* Si on utilise le trigger "day", on se  prend l'exception "Error: Failed to schedule the notification. Trigger of type: calendar is not supported on Android."
  et seul le trigger seconds passe, donc on convertit en secondes (3600  secondes dans une heure x 24 heures x le nombre de jours ) */
  const trigger = {
    seconds: 3600 * 24 * EpdsConstants.NUMBER_OF_DAYS_NOTIF_REMINDER,
  };
  const triggerDate = await Notifications.getNextTriggerDateAsync(trigger);
  if (triggerDate) {
    await StorageUtils.storeObjectValue(
      StorageKeysConstants.triggerForEpdsNotification,
      new Date(triggerDate)
    );
    return sendNotificationReminder(buildEpdsNotificationContent(), trigger);
  } else return null;
};
