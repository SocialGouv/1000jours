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
  const trigger = { day: EpdsConstants.NUMBER_OF_DAYS_NOTIF_REMINDER };
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
