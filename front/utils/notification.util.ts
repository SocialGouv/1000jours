import { addDays } from "date-fns";
import Constants from "expo-constants";
import type {
  NotificationContentInput,
  NotificationRequestInput,
  NotificationTriggerInput,
} from "expo-notifications";
import * as Notifications from "expo-notifications";

import { EpdsConstants, Labels, StorageKeysConstants } from "../constants";
import type { Step } from "../types";
import * as StorageUtils from "./storage.util";

export enum NotificationType {
  epds = "epds",
  nextStep = "nextStep",
  event = "event",
}

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

export const registerForPushNotificationsAsync = async (): Promise<
  string | undefined
> => {
  let token = "";
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  return token;
};

export const scheduleEpdsNotification = async (): Promise<string> => {
  const content = {
    body: Labels.epdsSurvey.notification.body,
    categoryIdentifier: NotificationType.epds,
    data: {
      redirectTitle: Labels.epdsSurvey.notification.redirectTitle,
      redirectTo: "epds",
      type: NotificationType.epds,
    },
    title: Labels.epdsSurvey.notification.title,
  };
  /* Si on utilise le trigger "day", on se  prend l'exception "Error: Failed to schedule the notification. Trigger of type: calendar is not supported on Android."
  et seul le trigger seconds passe, donc on convertit en secondes (3600  secondes dans une heure x 24 heures x le nombre de jours ) */
  const trigger = {
    seconds: 3600 * 24 * EpdsConstants.NUMBER_OF_DAYS_NOTIF_REMINDER,
  };
  return sendNotificationReminder(content, trigger);
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
      const content = {
        body: Labels.timeline.notification.body + '"' + nextStep.nom + '".',
        data: {
          redirectTitle: Labels.timeline.notification.redirectTitle,
          redirectTo: "profile",
          type: NotificationType.nextStep,
        },
        title: Labels.timeline.notification.title,
      };
      let trigger = null;
      if (triggerNow) {
        trigger = {
          seconds: 1,
        };
      } else {
        trigger = addDays(new Date(childBirthday), nextStep.debut);
        trigger.setHours(9);
      }
      void sendNotificationReminder(content, trigger).then((notificationId) => {
        void StorageUtils.storeStringValue(
          StorageKeysConstants.notifIdNextStep,
          notificationId
        );
      });
    }
  }
};

export const cancelScheduleNextStepNotification = async (): Promise<void> => {
  const notificationId = await StorageUtils.getStringValue(
    StorageKeysConstants.notifIdNextStep
  );
  if (notificationId && notificationId.length > 0) {
    void Notifications.cancelScheduledNotificationAsync(notificationId);
    void StorageUtils.removeKey(StorageKeysConstants.notifIdNextStep);
  }
};
