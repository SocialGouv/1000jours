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
import { NotificationToggleUtils, StorageUtils } from "../..";
import { countCurrentStepArticlesNotRead } from "../../step/step.util";
import {
  cancelAllNotificationsByType,
  NotificationType,
  sendNotificationReminder,
} from "../notification.util";

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
  }
  if (nbArticlesToRead === 0) {
    return {
      body: Labels.article.notification.congrats.body,
      data: {
        confetti: true,
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

export const getValidTriggerDate = (originalDate: Date): Date => {
  // Reporte la notif si la date est dépassé
  const currentDate = new Date();
  if (isAfter(originalDate, currentDate)) {
    return originalDate;
  } else {
    const newDate = new Date(currentDate.setHours(originalDate.getHours()));
    return isAfter(newDate, currentDate) ? newDate : addDays(newDate, 1);
  }
};

export const updateArticlesNotification = async (): Promise<void> => {
  const storedTrigger =
    (await StorageUtils.getObjectValue(
      StorageKeysConstants.triggerForArticlesNotification
    )) ?? null;
  // Attention - Si le trigger sauvegardé est de type 'Date', le 'getObjectValue' retournera un 'string'
  const trigger =
    storedTrigger && typeof storedTrigger === "string"
      ? getValidTriggerDate(new Date(storedTrigger))
      : storedTrigger;

  await scheduleArticlesNotification(trigger);
};

export const getNotificationTrigger = async (
  nbArticlesToRead: number,
  notifTrigger: NotificationTriggerInput | undefined
): Promise<NotificationTriggerInput> =>
  nbArticlesToRead > 0
    ? notifTrigger ?? getNewTriggerForArticlesNotification()
    : NotificationConstants.MIN_TRIGGER;

// Enregistre les étapes pour lesquelles la notification de félicitations (articles tous lus) a déjà été programmée
export const saveStepForCongratNotifScheduled = async (
  nbArticlesToRead: number,
  currentStep: Step | null,
  stepsAlreadyCongratulatedForArticles: string[] | null
): Promise<void> => {
  if (nbArticlesToRead === 0 && currentStep) {
    const currentStepId = currentStep.id.toString();
    if (stepsAlreadyCongratulatedForArticles) {
      stepsAlreadyCongratulatedForArticles.push(currentStepId);
    }
    const newValue = stepsAlreadyCongratulatedForArticles ?? [currentStepId];
    await StorageUtils.storeObjectValue(
      StorageKeysConstants.stepsAlreadyCongratulatedForArticles,
      newValue
    );
  }
};

export const hasBeenAlreadyNotifiedForArticles = (
  currentStep: Step | null,
  stepsAlreadyCongratulatedForArticles: string[] | null
): boolean => {
  let hasBeenAlreadyNotified = false;
  if (Array.isArray(stepsAlreadyCongratulatedForArticles)) {
    hasBeenAlreadyNotified = stepsAlreadyCongratulatedForArticles.includes(
      currentStep ? currentStep.id.toString() : ""
    );
  }
  return hasBeenAlreadyNotified;
};

export const scheduleArticlesNotification = async (
  notifTrigger?: NotificationTriggerInput
): Promise<void> => {
  const isToggleActive = await NotificationToggleUtils.isToggleOn(
    NotificationType.articles
  );

  if (isToggleActive) {
    const nbArticlesToRead: number = await countCurrentStepArticlesNotRead();
    if (nbArticlesToRead >= 0) {
      const trigger: NotificationTriggerInput = await getNotificationTrigger(
        nbArticlesToRead,
        notifTrigger
      );
      const content = await buildArticlesNotificationContent(nbArticlesToRead);

      const stepsAlreadyCongratulatedForArticles =
        ((await StorageUtils.getObjectValue(
          StorageKeysConstants.stepsAlreadyCongratulatedForArticles
        )) as string[] | undefined) ?? null;
      const currentStep = (await StorageUtils.getObjectValue(
        StorageKeysConstants.currentStep
      )) as Step | null;

      if (content) {
        await cancelAllNotificationsByType(NotificationType.articles);

        if (
          !hasBeenAlreadyNotifiedForArticles(
            currentStep,
            stepsAlreadyCongratulatedForArticles
          )
        ) {
          await sendNotificationReminder(content, trigger);
          await saveStepForCongratNotifScheduled(
            nbArticlesToRead,
            currentStep,
            stepsAlreadyCongratulatedForArticles
          );
        }
      }
    }
  }
};

const getNewTriggerForArticlesNotification = async () => {
  const date = new Date(
    addDays(
      new Date(),
      NotificationConstants.NUMBER_OF_DAYS_NOTIF_ARTICLES_REMINDER
    ).setHours(NotificationConstants.ARTICLES_NOTIF_TRIGGER_HOUR, 0, 0, 0)
  );
  const trigger = getValidTriggerDate(date);
  await StorageUtils.storeObjectValue(
    StorageKeysConstants.triggerForArticlesNotification,
    trigger
  );
  return trigger;
};
