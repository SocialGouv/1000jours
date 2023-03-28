import { addDays, addMonths, isAfter, isBefore } from "date-fns";
import type {
  DateTriggerInput,
  NotificationContentInput,
} from "expo-notifications";

import { Labels } from "../../../constants";
import { NotificationUtils } from "../..";
import {
  NotificationType,
  sendNotificationReminder,
} from "../notification.util";

export const ALL_TRIGGERS_IN_MONTH = [6, 12, 18, 24, 36, 48, 60, 72];
const HOUR_TO_TRIGGER = 18;

export const scheduleTndNotifications = async (
  childBirthday: string,
  isFirstTime: boolean
): Promise<string[]> => {
  const notificationIds = [];
  const childBirthDate = new Date(childBirthday);
  void NotificationUtils.cancelAllNotificationsByType(NotificationType.tnd);
  if (isBefore(childBirthDate, new Date())) {
    if (isFirstTime) {
      const date = addDays(new Date(), 1).setHours(HOUR_TO_TRIGGER, 0, 0, 0);
      const trigger: DateTriggerInput = { date: date };
      const id = await sendNotificationReminder(
        buildTndNotificationContent(new Date(date)),
        trigger
      );
      notificationIds.push(id);
    }
    for (const months of ALL_TRIGGERS_IN_MONTH) {
      const date = addMonths(childBirthDate, months).setHours(
        HOUR_TO_TRIGGER,
        0,
        0,
        0
      );
      if (isAfter(date, new Date())) {
        const trigger: DateTriggerInput = { date: date };
        const id = await sendNotificationReminder(
          buildTndNotificationContent(new Date(date)),
          trigger
        );
        notificationIds.push(id);
      }
    }
  }
  return notificationIds;
};

export const buildTndNotificationContent = (
  triggerDate?: Date
): NotificationContentInput => {
  return {
    body: Labels.notification.tnd.body,
    data: {
      redirectFromRoot: true,
      redirectParams: null,
      redirectTitle: Labels.notification.tnd.redirectTitle,
      redirectTo: "tndSurvey",
      trigger: triggerDate?.toLocaleString(),
      type: NotificationType.tnd,
    },
    title: Labels.notification.tnd.title,
  };
};
