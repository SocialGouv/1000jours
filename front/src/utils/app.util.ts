import Constants from "expo-constants";

import { StorageKeysConstants } from "../constants";
import { NotificationUtils } from "../utils";
import {
  getStringValue,
  multiRemove,
  storeObjectValue,
  storeStringValue,
} from "./storage.util";

export const manageStorage = async (): Promise<void> => {
  if (process.env.CLEAR_STORAGE === "true") {
    await NotificationUtils.cancelAllScheduledNotifications();
    await multiRemove(StorageKeysConstants.allStorageKeys);
  }

  const lastVersionLaunch = await getStringValue(
    StorageKeysConstants.lastVersionLaunchKey
  );

  if (
    Constants.manifest.version &&
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
