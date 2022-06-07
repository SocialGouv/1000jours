import { addDays, isAfter, subDays } from "date-fns";
import Constants from "expo-constants";
import type {
  NotificationContentInput,
  NotificationRequestInput,
  NotificationTriggerInput,
  WeeklyTriggerInput,
} from "expo-notifications";
import * as Notifications from "expo-notifications";

import { EpdsConstants, Labels, StorageKeysConstants } from "../constants";
import type { Event, Step } from "../types";
import * as StorageUtils from "./storage.util";

export enum NotificationType {
  epds = "epds",
  nextStep = "nextStep",
  event = "event",
  moodboard = "moodboard",
}

export enum Weekday {
  sunday = 1,
  monday = 2,
  tuesday = 3,
  wednesday = 4,
  thursday = 5,
  friday = 6,
  saturday = 7,
}

const NUMBER_OF_DAYS_NOTIF_EVENT_REMINDER = 7;
const MOODBOARD_NOTIF_TRIGGER_HOUR = 9;
const EVENT_NOTIF_TRIGGER_HOUR = 13;
const NEXTSTEP_NOTIF_TRIGGER_HOUR = 13;
const SCREEN_CALENDAR = "tabCalendar";

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

export const allowsNotifications = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

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
      redirectFromRoot: true,
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

const scheduleMoodboardNotification = async (
  weekday: Weekday
): Promise<string> => {
  const content = {
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
  const trigger: WeeklyTriggerInput = {
    hour: MOODBOARD_NOTIF_TRIGGER_HOUR,
    minute: 0,
    repeats: true,
    weekday: weekday,
  };
  return sendNotificationReminder(content, trigger);
};

export const scheduleMoodboardNotifications = async (): Promise<void> => {
  const notifIdsMoodboard = await StorageUtils.getObjectValue(
    StorageKeysConstants.notifIdsMoodboard
  );
  if (!notifIdsMoodboard) {
    const ids: string[] = [
      await scheduleMoodboardNotification(Weekday.tuesday),
      await scheduleMoodboardNotification(Weekday.friday),
    ];
    await StorageUtils.storeObjectValue(
      StorageKeysConstants.notifIdsMoodboard,
      ids
    );
  }
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
          redirectFromRoot: false,
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
        trigger = new Date(
          addDays(new Date(childBirthday), nextStep.debut).setHours(
            NEXTSTEP_NOTIF_TRIGGER_HOUR
          )
        );
      }
      const notificationId = await sendNotificationReminder(content, trigger);
      if (notificationId) {
        await StorageUtils.storeStringValue(
          StorageKeysConstants.notifIdNextStep,
          notificationId
        );
      }
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

export const cancelAllScheduledNotifications = async (): Promise<void> => {
  // Remove Next Step Notification
  const notifIdNextStep = await StorageUtils.getStringValue(
    StorageKeysConstants.notifIdNextStep
  );
  if (notifIdNextStep) await cancelScheduledNotification(notifIdNextStep);

  // Remove All Event Notifications
  const notifIdsEvents = await StorageUtils.getObjectValue(
    StorageKeysConstants.notifIdsEvents
  );
  if (notifIdsEvents) {
    const ids = notifIdsEvents as string[];
    await cancelScheduledNotifications(ids);
  }

  // Remove All Moodboard Notifications
  const notifIdsMoodboard = await StorageUtils.getObjectValue(
    StorageKeysConstants.notifIdsMoodboard
  );
  if (notifIdsMoodboard) {
    const ids = notifIdsMoodboard as string[];
    await cancelScheduledNotifications(ids);
  }
};

const cancelScheduledNotification = async (notifId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notifId);
};
const cancelScheduledNotifications = async (notifIds: string[]) => {
  for (const notifId of notifIds) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
  }
};

const updateStoreNotifEventIds = async (id: string) => {
  const notificationIds =
    ((await StorageUtils.getObjectValue(
      StorageKeysConstants.notifIdsEvents
    )) as string[] | null) ?? [];
  notificationIds.push(id);
  await StorageUtils.storeObjectValue(
    StorageKeysConstants.notifIdsEvents,
    notificationIds
  );
};

const buildEventNotificationContent = (
  event: Event,
  isBeforeEventDate: boolean
) => {
  return {
    body: event.nom,
    data: {
      redirectFromRoot: true,
      redirectTitle: Labels.calendar.notification.redirectTitle,
      redirectTo: SCREEN_CALENDAR,
      type: NotificationType.event,
    },
    title: isBeforeEventDate
      ? Labels.calendar.notification.titleReminder
      : Labels.calendar.notification.title,
  };
};

const scheduleEventNotification = async (event: Event) => {
  if (event.date) {
    const now = new Date();
    const eventDate = new Date(event.date);

    if (isAfter(eventDate, now)) {
      // Planifie la notification pour le jour J
      let notifDate = new Date(eventDate.setHours(EVENT_NOTIF_TRIGGER_HOUR));
      let content = buildEventNotificationContent(event, false);
      let notificationId = await sendNotificationReminder(content, notifDate);
      if (notificationId) await updateStoreNotifEventIds(notificationId);

      // Planifie la notification pour un rappel avant le jour J
      notifDate = new Date(
        subDays(eventDate, NUMBER_OF_DAYS_NOTIF_EVENT_REMINDER).setHours(
          EVENT_NOTIF_TRIGGER_HOUR
        )
      );
      if (isAfter(new Date(notifDate), now)) {
        content = buildEventNotificationContent(event, true);
        notificationId = await sendNotificationReminder(content, notifDate);
        if (notificationId) await updateStoreNotifEventIds(notificationId);
      }
    }
  }
};

export const scheduleEventsNotification = (events: Event[]): void => {
  events.forEach((event) => {
    void scheduleEventNotification(event);
  });
};

export const cancelScheduleEventsNotification = async (): Promise<void> => {
  const notificationIds = (await StorageUtils.getObjectValue(
    StorageKeysConstants.notifIdsEvents
  )) as string[] | null;
  if (notificationIds && notificationIds.length > 0) {
    notificationIds.forEach((notificationId) => {
      void Notifications.cancelScheduledNotificationAsync(notificationId);
    });
  }
  return StorageUtils.removeKey(StorageKeysConstants.notifIdsEvents);
};

export const logAllScheduledNotifications = async (): Promise<void> => {
  const scheduledNotifs =
    await Notifications.getAllScheduledNotificationsAsync();
  for (const notif of scheduledNotifs) {
    console.log(notif);
  }
};
