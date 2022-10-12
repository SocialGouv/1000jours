import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

import { SecondaryText } from "../../components/baseComponents";
import { Labels } from "../../constants";
import * as StorageKeys from "../../constants/storageKeys.constants";
import { Colors, Paddings } from "../../styles";
import type { TrackerEvent } from "../../type";
import { StorageUtils, TrackerUtils } from "../../utils";
import type { NotificationType } from "../../utils/notifications/notification.util";
import * as NotificationUtils from "../../utils/notifications/notification.util";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  type: NotificationType;
}

const NotificationsFrequency: FC<Props> = ({ type }) => {
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();
  const [radioValue, setRadioValue] = useState(
    NotificationUtils.Frequencies.twiceAWeek
  );

  const initRadio = useCallback(async () => {
    const frequency = (await StorageUtils.getStringValue(
      StorageKeys.notifToggleMoodboardFrequency
    )) as NotificationUtils.Frequencies;

    setRadioValue(frequency);
  }, []);

  const saveFraquency = useCallback(async () => {
    await StorageUtils.storeStringValue(
      StorageKeys.notifToggleMoodboardFrequency,
      radioValue
    );
    void NotificationUtils.scheduleMoodboardNotifications();
  }, [radioValue]);

  useEffect(() => {
    void initRadio();
  }, [initRadio]);

  const onRadioChange = useCallback(
    (value: string) => {
      const newValue = value as NotificationUtils.Frequencies;
      setRadioValue(newValue);
      console.log("onRadioChange : " + newValue);

      void saveFraquency();
      setTrackerEventObject({
        action: TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER,
        name: `${TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER} : ${type} & ${newValue}`,
      });
    },
    [type]
  );

  return (
    <View style={styles.mainContent}>
      <TrackerHandler eventObject={trackerEventObject} />
      <SecondaryText style={styles.question}>
        {Labels.notification.frequency.question}
      </SecondaryText>
      <RadioButton.Group onValueChange={onRadioChange} value={radioValue}>
        <View style={styles.radioItem}>
          <RadioButton
            value={NotificationUtils.Frequencies.onceADay}
            color={Colors.primaryBlueDark}
          />
          <Text style={styles.radioItemText}>
            {Labels.notification.frequency.onceADay}
          </Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value={NotificationUtils.Frequencies.twiceAWeek}
            color={Colors.primaryBlueDark}
          />
          <Text style={styles.radioItemText}>
            {Labels.notification.frequency.twiceAWeek}
          </Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    marginVertical: Paddings.default,
  },
  question: {
    color: Colors.primaryBlueDark,
  },
  radioItem: {
    flexDirection: "row",
  },
  radioItemText: {
    color: Colors.primaryBlueDark,
    paddingTop: Paddings.smaller,
  },
});

export default NotificationsFrequency;
