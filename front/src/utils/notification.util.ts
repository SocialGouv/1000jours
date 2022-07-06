import { addDays, isAfter, subDays } from "date-fns";
import type {
  NotificationContentInput,
  NotificationRequestInput,
  NotificationTriggerInput,
  WeeklyTriggerInput,
} from "expo-notifications";
import * as Notifications from "expo-notifications";

import {
  EpdsConstants,
  Labels,
  NotificationConstants,
  StorageKeysConstants,
} from "../constants";
import type { Event, Step } from "../types";
import { countCurrentStepArticlesRead } from "./step.util";
import * as StorageUtils from "./storage.util";

export enum NotificationType {
  epds = "epds",
  nextStep = "nextStep",
  event = "event",
  moodboard = "moodboard",
  articles = "articles",
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

export const allowsNotifications = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  return existingStatus === "granted";
};

export const requestNotificationPermission = async (): Promise<void> => {
  const isAllowed = await allowsNotifications();
  if (!isAllowed) {
    await Notifications.requestPermissionsAsync();
  }
};

const buildEpdsNotificationContent = () => {
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

const buildMoodboardNotificationContent = () => {
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

const buildNextStepNotificationContent = (nextStep: Step) => {
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
        if (isAfter(date, new Date())) needToBeScheduled = true;
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

export const cancelAllScheduledNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

const cancelScheduledNotification = async (notifId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notifId);
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
      redirectTo: NotificationConstants.SCREEN_CALENDAR,
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
      let notifDate = new Date(
        eventDate.setHours(
          NotificationConstants.EVENT_NOTIF_TRIGGER_HOUR,
          0,
          0,
          0
        )
      );
      let content = buildEventNotificationContent(event, false);
      let notificationId = null;
      if (isAfter(notifDate, now)) {
        notificationId = await sendNotificationReminder(content, notifDate);
        if (notificationId) await updateStoreNotifEventIds(notificationId);
      }

      // Planifie la notification pour un rappel avant le jour J
      notifDate = new Date(
        subDays(
          eventDate,
          NotificationConstants.NUMBER_OF_DAYS_NOTIF_EVENT_REMINDER
        ).setHours(NotificationConstants.EVENT_NOTIF_TRIGGER_HOUR, 0, 0, 0)
      );
      if (isAfter(notifDate, now)) {
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

export const buildArticlesNotificationContent = async (
  nbArticlesToRead: number
): Promise<NotificationContentInput | null> => {
  const currentStep = (await StorageUtils.getObjectValue(
    StorageKeysConstants.currentStep
  )) as Step | null;

  if (nbArticlesToRead > 0) {
    return {
      body: `${Labels.article.notification.articlesToRead.bodyPart1} ${nbArticlesToRead} ${Labels.article.notification.articlesToRead.bodyPart2}.`,
      data: {
        redirectFromRoot: false,
        redirectParams: { step: currentStep },
        redirectTitle: Labels.article.notification.articlesToRead.redirectTitle,
        redirectTo: NotificationConstants.SCREEN_ARTICLES,
        type: NotificationType.articles,
      },
      title: Labels.article.notification.articlesToRead.title,
    };
  } else if (nbArticlesToRead === 0) {
    return {
      body: Labels.article.notification.congrats.body,
      data: {
        redirectFromRoot: false,
        redirectParams: null,
        redirectTitle: Labels.article.notification.congrats.redirectTitle,
        redirectTo: null,
        type: NotificationType.articles,
      },
      title: Labels.article.notification.congrats.title,
    };
  }

  return null;
};

const getNewTriggerForArticlesNotification = async () => {
  const date = new Date(
    addDays(
      new Date(),
      NotificationConstants.NUMBER_OF_DAYS_NOTIF_ARTICLES_REMINDER
    ).setHours(NotificationConstants.ARTICLES_NOTIF_TRIGGER_HOUR, 0, 0, 0)
  );
  const trigger = isAfter(date, new Date()) ? date : addDays(date, 1); // Reporte la notif au lendemain si la date est dépassé
  await StorageUtils.storeObjectValue(
    StorageKeysConstants.triggerForArticlesNotification,
    trigger
  );
  return trigger;
};

export const updateArticlesNotification = async (): Promise<void> => {
  const trigger =
    ((await StorageUtils.getObjectValue(
      StorageKeysConstants.triggerForArticlesNotification
    )) as NotificationTriggerInput) ?? null;
  await scheduleArticlesNotification(trigger);
};

export const scheduleArticlesNotification = async (
  notifTrigger?: NotificationTriggerInput
): Promise<void> => {
  const nbArticlesToRead: number = await countCurrentStepArticlesRead();
  if (nbArticlesToRead >= 0) {
    const trigger: NotificationTriggerInput =
      nbArticlesToRead > 0
        ? notifTrigger ?? (await getNewTriggerForArticlesNotification())
        : NotificationConstants.MIN_TRIGGER;
    const content = await buildArticlesNotificationContent(nbArticlesToRead);
    if (content) {
      await cancelAllNotificationsByType(NotificationType.articles);
      await sendNotificationReminder(content, trigger);
    }
  }
};

export const getAllScheduledNotifications = async (): Promise<
  Notifications.NotificationRequest[]
> => {
  return Notifications.getAllScheduledNotificationsAsync();
};

export const logAllScheduledNotifications = async (): Promise<void> => {
  const scheduledNotifs = await getAllScheduledNotifications();
  for (const notif of scheduledNotifs) {
    console.info(notif);
  }
};

export const cancelAllNotificationsByType = async (
  notificationType: NotificationType
): Promise<void> => {
  const notifications = await getAllScheduledNotifications();
  for (const notif of notifications) {
    if (notif.content.data.type === notificationType) {
      await cancelScheduledNotification(notif.identifier);
    }
  }
};

export const rescheduleEventsNotifications = async (
  events: Event[]
): Promise<void> => {
  await cancelAllNotificationsByType(NotificationType.event);
  scheduleEventsNotification(events);
};

/**
 * Permet de tester les notifications depuis la page cachée dans le menu
 * En cliquant plusieurs fois sur le numéro de version en bas
 * @param notificationType
 */
export const scheduleFakeNotif = async (
  notificationType: NotificationType | string
): Promise<void> => {
  let content = null;
  switch (notificationType) {
    case NotificationType.epds:
      content = buildEpdsNotificationContent();
      break;
    case NotificationType.event: {
      const event: Event = {
        debut: 0,
        fin: 0,
        id: 0,
        nom: "Test",
      };
      content = buildEventNotificationContent(event, true);
      break;
    }
    case NotificationType.moodboard:
      content = buildMoodboardNotificationContent();
      break;
    case NotificationType.nextStep: {
      const nextStep: Step = {
        active: true,
        debut: 0,
        description: "Description",
        fin: 0,
        id: 0,
        nom: "Test",
        ordre: 0,
      };
      buildNextStepNotificationContent(nextStep);
      break;
    }
    case NotificationType.articles: {
      const nbArticlesToRead = await countCurrentStepArticlesRead();
      content = await buildArticlesNotificationContent(nbArticlesToRead);
      break;
    }
    default:
      console.warn(
        `scheduleFakeNotif : notification type '${notificationType}'`
      );
      break;
  }

  if (content) {
    await sendNotificationReminder(content, NotificationConstants.MIN_TRIGGER);
  }
};
