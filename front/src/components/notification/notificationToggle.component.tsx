import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Toggle } from "../../components/baseComponents";
import { Labels } from "../../constants";
import { Colors, FontStyle, FontWeight, Margins } from "../../styles";
import * as NotificationUtils from "../../utils/notification.util";
import { NotificationType } from "../../utils/notification.util";

interface Props {
  title: string;
  description: string;
  type: NotificationType;
}

const NotificationToggle: FC<Props> = ({ title, description, type }) => {
  const [isToggleOn, setToggleOn] = useState(false);

  useEffect(() => {
    void NotificationUtils.getAllNotificationsByType(type).then((data) => {
      setToggleOn(data.length > 0);
    });
  }, []);

  const onTouchToggle = useCallback(async () => {
    const newValue = !isToggleOn;
    setToggleOn(newValue);

    if (newValue) {
      if (type === NotificationType.articles)
        void NotificationUtils.updateArticlesNotification();
    } else await NotificationUtils.cancelAllNotificationsByType(type);
  }, [isToggleOn, type]);

  return (
    <View style={styles.mainContent}>
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
    flexDirection: "row",
    marginVertical: Margins.larger,
  },
});

export default NotificationToggle;
