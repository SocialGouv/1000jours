import { StorageKeysConstants } from "../../constants";
import { StorageUtils } from "..";
import { scheduleInAppReviewNotification } from "../notifications/inappreview/inAppReview.util";
import { cancelAllScheduledNotifications } from "../notifications/notification.util";
import {
  getObjectValue,
  getStringValue,
  multiRemove,
  storeObjectValue,
} from "../storage.util";

// The business rule is to have the popup triggered at the third launch of the app
const APP_OPENINGS_TRIGGER = 3;

export const manageStorage = async (): Promise<void> => {
  if (process.env.CLEAR_STORAGE === "true") {
    await cancelAllScheduledNotifications();
    await multiRemove(StorageKeysConstants.allStorageKeys);
  }
};

export const hasBeenUpdated = async (
  currentVersion: string
): Promise<boolean> => {
  const lastVersionLaunch = await getStringValue(
    StorageKeysConstants.lastVersionLaunchKey
  );

  return lastVersionLaunch !== currentVersion;
};

export const hasNewFeaturesToShow = async (
  currentVersion: string
): Promise<boolean> => {
  if (currentVersion) {
    const versions =
      ((await StorageUtils.getObjectValue(
        StorageKeysConstants.newFeaturesAlreadyPop
      )) as string[] | null) ?? [];
    return !versions.includes(currentVersion);
  }
  return false;
};

export const hasNewVersionAvailable = (
  currentVersion: string | null,
  lastVersionAvailable: string | null
): boolean => {
  let hasNewVersion = false;
  if (currentVersion && lastVersionAvailable) {
    const lastVersionAvailableSplitted = lastVersionAvailable.split(".");
    const currentVersionSplitted = currentVersion.split(".");
    for (let i = 0; i < lastVersionAvailableSplitted.length; i++) {
      if (
        Number(currentVersionSplitted[i]) <
        Number(lastVersionAvailableSplitted[i])
      ) {
        hasNewVersion = true;
        break;
      } else if (
        Number(currentVersionSplitted[i]) >
        Number(lastVersionAvailableSplitted[i])
      ) {
        hasNewVersion = false;
        break;
      }
    }
  }

  return hasNewVersion;
};

export const handleInAppReviewPopup = async (
  activeAppCounter: number
): Promise<void> => {
  const hasTriggeredInAppReview = (await getObjectValue(
    StorageKeysConstants.hasTriggeredInAppReview
  )) as boolean | null;

  if (shouldTriggerInAppReview(activeAppCounter) && !hasTriggeredInAppReview) {
    await storeObjectValue(StorageKeysConstants.hasTriggeredInAppReview, true);
    await scheduleInAppReviewNotification();
  }
};

export const shouldTriggerInAppReview = (activeAppCounter: number): boolean =>
  activeAppCounter >= APP_OPENINGS_TRIGGER;
