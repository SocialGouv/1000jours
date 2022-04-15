import type { FC } from "react";
import { useEffect } from "react";

import { StorageKeysConstants } from "../../constants";
import {
  scheduleMoodboardNotification,
  Weekday,
} from "../../utils/notification.util";
import { getObjectValue, storeObjectValue } from "../../utils/storage.util";

// Called in App.tsx
export const scheduleMoodboardNotifications = async (): Promise<void> => {
  const notifIdsMoodboard = await getObjectValue(
    StorageKeysConstants.notifIdsMoodboard
  );
  if (!notifIdsMoodboard) {
    const ids: string[] = [
      await scheduleMoodboardNotification(Weekday.tuesday),
      await scheduleMoodboardNotification(Weekday.friday),
    ];
    await storeObjectValue(StorageKeysConstants.notifIdsMoodboard, ids);
  }
};

const NotificationScheduler: FC = () => {
  useEffect(() => {
    void scheduleMoodboardNotifications();
  }, []);

  return null;
};

export default NotificationScheduler;
