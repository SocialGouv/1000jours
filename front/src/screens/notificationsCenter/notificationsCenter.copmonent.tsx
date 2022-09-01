import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BackButton, TitleH1 } from "../../components/baseComponents";
import NotificationToggle from "../../components/notification/notificationToggle.component";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels } from "../../constants";
import { Colors, Paddings } from "../../styles";
import type { RootStackParamList } from "../../types";
import { TrackerUtils } from "../../utils";
import { NotificationType } from "../../utils/notification.util";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const NotificationsCenter: FC<Props> = ({ navigation }) => {
  const [trackerAction, setTrackerAction] = useState<string>("");

  const goBack = useCallback(() => {
    setTrackerAction(Labels.buttons.cancel);
    navigation.goBack();
  }, [navigation]);

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
      </View>
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
