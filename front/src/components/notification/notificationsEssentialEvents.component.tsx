import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Labels, StorageKeysConstants } from "../../constants";
import type { TrackerEvent } from "../../type";
import type { Event } from "../../types";
import {
  EventUtils,
  NotificationUtils,
  StorageUtils,
  TrackerUtils,
} from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";
import { BlueCheckbox, View } from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  events: Event[];
}

const NotificationsEssentialEvents: FC<Props> = ({ events }) => {
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const initCheckboxState = useCallback(async () => {
    const areEssentialEventsChecked = (await StorageUtils.getObjectValue(
      StorageKeysConstants.notifToggleEssentialEvents
    )) as boolean;
    setIsCheckboxChecked(areEssentialEventsChecked);
  }, []);

  const scheduleEssentialEvents = useCallback(
    async (shouldScheduleEssentialEvents: boolean) => {
      const essentialEvents: Event[] = EventUtils.essentialEvents(events);

      await StorageUtils.storeObjectValue(
        StorageKeysConstants.notifToggleEssentialEvents,
        shouldScheduleEssentialEvents
      );
      if (shouldScheduleEssentialEvents) {
        void NotificationUtils.cancelScheduleEventsNotification();
        void NotificationUtils.scheduleEventsNotification(essentialEvents);
      }
    },
    [events]
  );

  const onCheckboxPressed = useCallback(() => {
    const shouldScheduleEssentialEvents = !isCheckboxChecked;
    setIsCheckboxChecked(shouldScheduleEssentialEvents);

    void scheduleEssentialEvents(shouldScheduleEssentialEvents);
    setTrackerEventObject({
      action: TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER,
      name: `${TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER} : ${NotificationType.event} essentiels`,
    });
  }, [isCheckboxChecked, scheduleEssentialEvents]);

  useEffect(() => {
    void initCheckboxState();
  }, [initCheckboxState]);

  return (
    <>
      <TrackerHandler eventObject={trackerEventObject} />
      <View style={styles.checkboxItem}>
        <BlueCheckbox
          key={1}
          iconRight={false}
          title={Labels.notification.essentialEvents}
          isChecked={isCheckboxChecked}
          onPress={onCheckboxPressed}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkboxItem: {
    marginStart: 0,
    paddingStart: 0,
  },
});

export default NotificationsEssentialEvents;
