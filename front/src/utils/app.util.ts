import Constants from "expo-constants";

import { StorageKeysConstants } from "../constants";
import { StorageUtils } from ".";

export const manageStorage = async (): Promise<void> => {
  if (process.env.CLEAR_STORAGE === "true")
    void StorageUtils.multiRemove(StorageKeysConstants.allStorageKeys);

  const lastVersionLaunch = await StorageUtils.getStringValue(
    StorageKeysConstants.lastVersionLaunchKey
  );

  if (
    Constants.manifest.version &&
    lastVersionLaunch !== Constants.manifest.version
  ) {
    await StorageUtils.storeStringValue(
      StorageKeysConstants.lastVersionLaunchKey,
      Constants.manifest.version
    );
    await StorageUtils.storeObjectValue(
      StorageKeysConstants.forceToScheduleEventsNotif,
      true
    );
  }
};
