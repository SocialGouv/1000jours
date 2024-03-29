import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  CustomDivider,
  NotificationPermissionInSettingsModal,
  NotificationToggle,
} from "../../components";
import { TitleH1 } from "../../components/baseComponents";
import { Labels } from "../../constants";
import { useEvents } from "../../hooks";
import { Colors, Paddings } from "../../styles";
import { NotificationUtils } from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";

const NotificationsCenter: FC = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const hookEvents = useEvents();

  useEffect(() => {
    void checkNotificationInSettings();
  }, []);

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
      <View style={styles.header}>
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
          events={hookEvents}
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
