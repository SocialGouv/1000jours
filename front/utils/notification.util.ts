import type {
  NotificationContentInput,
  NotificationRequestInput,
  NotificationTriggerInput,
} from "expo-notifications";
import * as Notifications from "expo-notifications";

import { EpdsConstants, Labels } from "../constants";

export const scheduleEpdsNotification = async (): Promise<string> => {
  const content = {
    body: Labels.epdsSurvey.notification.body,
    data: { data: "epds" },
    title: Labels.epdsSurvey.notification.title,
  };
  /* Si on utilise le trigger "day", on se  prend l'exception "Error: Failed to schedule the notification. Trigger of type: calendar is not supported on Android."
  et seul le trigger seconds passe, donc on convertit en secondes (3600  secondes dans une heure x 24 heures x le nombre de jours ) */
  const trigger = {
    seconds: 3600 * 24 * EpdsConstants.NUMBER_OF_DAYS_NOTIF_REMINDER,
  };
  return sendNotificationReminder(content, trigger);
};

const sendNotificationReminder = async (
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
