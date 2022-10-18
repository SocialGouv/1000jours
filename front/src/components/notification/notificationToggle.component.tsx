import type { FC, ReactElement } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Toggle } from "../../components/baseComponents";
import { Labels } from "../../constants";
import { Colors, FontStyle, FontWeight, Margins } from "../../styles";
import type { TrackerEvent } from "../../type";
import type { Event } from "../../types";
import {
  NotificationToggleUtils,
  StorageUtils,
  TrackerUtils,
} from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";
import * as NotificationUtils from "../../utils/notifications/notification.util";
import TrackerHandler from "../tracker/trackerHandler.component";
import NotificationsFrequency from "./notificationsFrequency.component";

interface Props {
  title: string;
  description: string;
  type: NotificationType;
  events?: Event[];
}

const NotificationToggle: FC<Props> = ({
  title,
  description,
  type,
  events,
}) => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();
  const toggleKey = NotificationToggleUtils.getStorageKey(type);

  const initToggle = useCallback(async () => {
    if (toggleKey) {
      const shouldToggleOn = await NotificationToggleUtils.isToggleOn(type);
      setIsToggleOn(shouldToggleOn);
    }
  }, [toggleKey, type]);

  useEffect(() => {
    void initToggle();
  }, [initToggle]);

  const onTouchToggle = useCallback(async () => {
    const newValue = !isToggleOn;
    setIsToggleOn(newValue);
    if (toggleKey) await StorageUtils.storeObjectValue(toggleKey, newValue);

    if (newValue) {
      NotificationToggleUtils.updateNotification(type, events);
    } else await NotificationUtils.cancelAllNotificationsByType(type);

    setTrackerEventObject({
      action: TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER,
      name: `${TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER} : ${type}`,
      value: newValue ? 1 : 0,
    });
  }, [isToggleOn, toggleKey, type, events]);

  const showOptionByType = (_type: NotificationType): ReactElement => {
    if (_type == NotificationType.moodboard)
      return <NotificationsFrequency type={_type} />;
    return <View />;
  };

  return (
    <View style={styles.mainContent}>
      <TrackerHandler eventObject={trackerEventObject} />
      <View style={styles.toggleContent}>
        <View style={styles.itemTextBloc}>
          <Text style={styles.itemTextTitle} accessibilityRole="header">
            {title}
          </Text>
          <Text style={styles.itemTextDescr}>{description}</Text>
        </View>
        <View style={styles.itemToggleBloc}>
          <Text
            style={[
              styles.itemToggleText,
              isToggleOn ? null : { fontWeight: FontWeight.bold },
            ]}
            importantForAccessibility="no"
            accessibilityElementsHidden
            accessible={false}
          >
            {Labels.buttons.no}
          </Text>
          <View style={styles.itemToggle}>
            <Toggle isToggleOn={isToggleOn} toggleSwitch={onTouchToggle} />
          </View>
          <Text
            style={[
              styles.itemToggleText,
              isToggleOn ? { fontWeight: FontWeight.bold } : null,
            ]}
            importantForAccessibility="no"
            accessibilityElementsHidden
            accessible={false}
          >
            {Labels.buttons.yes}
          </Text>
        </View>
      </View>
      <View>{isToggleOn && showOptionByType(type)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemTextBloc: {
    flex: 2,
  },
  itemTextDescr: {
    color: Colors.grey,
    fontStyle: FontStyle.italic,
    marginTop: Margins.smaller,
  },
  itemTextTitle: {
    fontWeight: FontWeight.bold,
  },
  itemToggle: {
    marginHorizontal: Margins.smaller,
  },
  itemToggleBloc: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  itemToggleText: {
    color: Colors.secondaryGreenDark,
  },
  mainContent: {
    flexDirection: "column",
    marginVertical: Margins.larger,
  },
  toggleContent: {
    flexDirection: "row",
  },
});

export default NotificationToggle;
