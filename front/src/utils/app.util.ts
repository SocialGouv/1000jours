import Constants from "expo-constants";

import { StorageKeysConstants } from "../constants";
import { cancelAllScheduledNotifications } from "./notification.util";
import {
  getStringValue,
  multiRemove,
  storeObjectValue,
  storeStringValue,
} from "./storage.util";

export const manageStorage = async (): Promise<void> => {
  if (process.env.CLEAR_STORAGE === "true") {
    await cancelAllScheduledNotifications();
    await multiRemove(StorageKeysConstants.allStorageKeys);
  }

  const lastVersionLaunch = await getStringValue(
    StorageKeysConstants.lastVersionLaunchKey
  );

  if (
    Constants.manifest?.version &&
    lastVersionLaunch !== Constants.manifest.version
  ) {
    await storeStringValue(
      StorageKeysConstants.lastVersionLaunchKey,
      Constants.manifest.version
    );
    await storeObjectValue(
      StorageKeysConstants.forceToScheduleEventsNotif,
      true
    );
  }
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
