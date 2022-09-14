import { addDays, isAfter } from "date-fns";
import type {
  NotificationContentInput,
  NotificationTriggerInput,
} from "expo-notifications";

import {
  Labels,
  NotificationConstants,
  StorageKeysConstants,
} from "../../../constants";
import type { Step } from "../../../types";
import { StorageUtils } from "../..";
import {
  cancelAllNotificationsByType,
  NotificationType,
  sendNotificationReminder,
} from "../notification.util";

export const buildNextStepNotificationContent = (
  nextStep: Step
): NotificationContentInput => {
  return {
    body: Labels.timeline.notification.body + '"' + nextStep.nom + '".',
    data: {
      redirectFromRoot: false,
      redirectTitle: Labels.timeline.notification.redirectTitle,
      redirectTo: "profile",
      type: NotificationType.nextStep,
    },
    title: Labels.timeline.notification.title,
  };
};

export const scheduleNextStepNotification = async (
  nextStep: Step,
  triggerNow?: boolean
): Promise<void> => {
  const notifIdNextStep = await StorageUtils.getStringValue(
    StorageKeysConstants.notifIdNextStep
  );
  if (!notifIdNextStep || notifIdNextStep.length <= 0) {
    const childBirthday = await StorageUtils.getStringValue(
      StorageKeysConstants.userChildBirthdayKey
    );
    if (childBirthday) {
      let needToBeScheduled = false;
      let trigger: NotificationTriggerInput = null;
      if (triggerNow) {
        trigger = NotificationConstants.MIN_TRIGGER;
        needToBeScheduled = true;
      } else {
        const date = new Date(
          addDays(new Date(childBirthday), nextStep.debut).setHours(
            NotificationConstants.NEXTSTEP_NOTIF_TRIGGER_HOUR,
            0,
            0,
            0
          )
        );
        trigger = date;
        needToBeScheduled = isAfter(date, new Date());
      }
      if (needToBeScheduled) {
        const notificationId = await sendNotificationReminder(
          buildNextStepNotificationContent(nextStep),
          trigger
        );
        if (notificationId) {
          await StorageUtils.storeStringValue(
            StorageKeysConstants.notifIdNextStep,
            notificationId
          );
          await StorageUtils.storeObjectValue(
            StorageKeysConstants.triggerForNexStepNotification,
            trigger
          );
        }
      }
    }
  }
};

export const cancelScheduleNextStepNotification = async (): Promise<void> => {
  await cancelAllNotificationsByType(NotificationType.nextStep);
  await StorageUtils.removeKey(StorageKeysConstants.notifIdNextStep);
};
