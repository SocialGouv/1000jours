import type {
  NotificationContentInput,
  WeeklyTriggerInput,
} from "expo-notifications";

import { Labels, NotificationConstants } from "../../../constants";
import { NotificationToggleUtils } from "../..";
import {
  getAllNotificationsByType,
  NotificationType,
  sendNotificationReminder,
  Weekday,
} from "../notification.util";

export const buildMoodboardNotificationContent =
  (): NotificationContentInput => {
    return {
      body: Labels.moodboard.notification.body,
      categoryIdentifier: NotificationType.moodboard,
      data: {
        redirectFromRoot: false,
        redirectTitle: Labels.moodboard.notification.redirectTitle,
        redirectTo: "moodboard",
        type: NotificationType.moodboard,
      },
      title: Labels.moodboard.notification.title,
    };
  };

export const scheduleMoodboardNotifications = async (): Promise<void> => {
  const isToggleActive = await NotificationToggleUtils.isToggleOn(
    NotificationType.moodboard
  );
  if (isToggleActive) {
    const notifsMoodboard = await getAllNotificationsByType(
      NotificationType.moodboard
    );
    if (notifsMoodboard.length === 0) {
      await scheduleMoodboardNotification(Weekday.tuesday);
      await scheduleMoodboardNotification(Weekday.friday);
    }
  }
};

const scheduleMoodboardNotification = async (
  weekday: Weekday
): Promise<string> => {
  const trigger: WeeklyTriggerInput = {
    hour: NotificationConstants.MOODBOARD_NOTIF_TRIGGER_HOUR,
    minute: 0,
    repeats: true,
    weekday: weekday,
  };
  return sendNotificationReminder(buildMoodboardNotificationContent(), trigger);
};
