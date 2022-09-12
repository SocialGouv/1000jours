import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  CustomDivider,
  NotificationPermissionInSettingsModal,
  NotificationToggle,
} from "../../components";
import { BackButton, TitleH1 } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels } from "../../constants";
import { Colors, Paddings } from "../../styles";
import type { RootStackParamList } from "../../types";
import { NotificationUtils, TrackerUtils } from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const NotificationsCenter: FC<Props> = ({ navigation }) => {
  const [trackerAction, setTrackerAction] = useState<string>("");
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    void checkNotificationInSettings();
  }, []);

  const goBack = useCallback(() => {
    setTrackerAction(Labels.buttons.cancel);
    navigation.goBack();
  }, [navigation]);

  const hideSettingsModal = useCallback(() => {
    setShowSettingsModal(false);
  }, []);

  const checkNotificationInSettings = async () => {
    const areNotificationsAllowed =
      await NotificationUtils.allowsNotifications();
    if (!areNotificationsAllowed) setShowSettingsModal(true);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER}
        actionName={trackerAction}
      />

      <View style={styles.header}>
        <View style={styles.flexStart}>
          <BackButton action={goBack} />
        </View>
        <TitleH1
          animated={false}
          title={Labels.notificationsCenter.title}
          description={Labels.notificationsCenter.description}
        />
        <NotificationToggle
          title={Labels.notificationsCenter.article.title}
          description={Labels.notificationsCenter.article.decription}
          type={NotificationType.articles}
        />
        <CustomDivider />
        <NotificationToggle
          title={Labels.notificationsCenter.moodboard.title}
          description={Labels.notificationsCenter.moodboard.description}
          type={NotificationType.moodboard}
        />
        <CustomDivider />
        <NotificationToggle
          title={Labels.notificationsCenter.event.title}
          description={Labels.notificationsCenter.event.decription}
          type={NotificationType.event}
        />
      </View>

      <NotificationPermissionInSettingsModal
        visible={showSettingsModal}
        closeModal={hideSettingsModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
  },
  header: {
    padding: Paddings.default,
    paddingTop: Paddings.default,
  },
  mainContainer: {
    backgroundColor: Colors.white,
  },
});

export default NotificationsCenter;
