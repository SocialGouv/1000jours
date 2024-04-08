/* eslint-disable react/no-unescaped-entities */
import type { StackNavigationProp } from "@react-navigation/stack";
import type { NotificationRequest } from "expo-notifications";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import { Labels, StorageKeysConstants } from "../../constants";
import { Paddings, Styles } from "../../styles";
import type { RootStackParamList } from "../../types";
import { NotificationUtils, reportError, StorageUtils } from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";
import { getObjectValue } from "../../utils/storage.util";
import { CustomButton, SecondaryText } from "../baseComponents";
import H1 from "../html/h1.component";
import H2 from "../html/h2.component";
import H3 from "../html/h3.component";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "root">;
}

const InfosDev: FC<Props> = ({ navigation }) => {
  const [showNotifSection, setShowNotifSection] = React.useState(false);
  const [notificationsGroupByType, setNotificationsGroupByType] =
    React.useState<_.Dictionary<NotificationRequest[]> | undefined>(undefined);
  const [triggerNotifArticles, setTriggerNotifArticles] =
    React.useState<Date | null>(null);
  const [triggerNotifEpds, setTriggerNotifEpds] = React.useState<Date | null>(
    null
  );
  const [triggerNotifNextStep, setTriggerNotifNextStep] =
    React.useState<Date | null>(null);

  const getAllScheduledNotifications = async () => {
    const notifications =
      await NotificationUtils.getAllScheduledNotifications();
    if (notifications !== undefined && notifications.length > 0) {
      setNotificationsGroupByType(
        _.groupBy(notifications, "content.data.type")
      );

      const _triggerNotifArticles = (await getObjectValue(
        StorageKeysConstants.triggerForArticlesNotification
      )) as Date | null;
      setTriggerNotifArticles(_triggerNotifArticles);

      const _triggerNotifEpds = (await getObjectValue(
        StorageKeysConstants.triggerForEpdsNotification
      )) as Date | null;
      setTriggerNotifEpds(_triggerNotifEpds);

      const _triggerNotifNextStep = (await getObjectValue(
        StorageKeysConstants.triggerForNexStepNotification
      )) as Date | null;
      setTriggerNotifNextStep(_triggerNotifNextStep);
    }
    setShowNotifSection(true);
  };

  const sendNotification = useCallback(
    (notificationType: NotificationType | string) => async () => {
      await NotificationUtils.scheduleFakeNotif(notificationType);
      navigation.goBack();
    },
    [navigation]
  );

  const resetAllData = useCallback(async () => {
    await StorageUtils.clear();
    await NotificationUtils.cancelAllScheduledNotifications();
    Alert.alert(Labels.warning, Labels.infosDev.resetStorageDataAlertMsg);
  }, []);

  const sendFakeErrorInSentry = useCallback(() => {
    reportError("Test - log fake error in Sentry");
  }, []);

  useEffect(() => {
    void getAllScheduledNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNotificationsGroupItem = (
    key: string,
    notifications: NotificationRequest[]
  ) => {
    return (
      <View key={key}>
        <SecondaryText style={styles.paddingLeft}>
          {key} : {notifications.length}
        </SecondaryText>
        {notifications.map((notif, index) => {
          let trigger = null;
          if (key === NotificationType.articles && triggerNotifArticles) {
            trigger = ` - (${new Date(triggerNotifArticles).toLocaleString()})`;
          }
          if (key === NotificationType.epds && triggerNotifEpds) {
            trigger = ` - (${new Date(triggerNotifEpds).toLocaleString()})`;
          }
          if (key === NotificationType.nextStep && triggerNotifNextStep) {
            trigger = ` - (${new Date(triggerNotifNextStep).toLocaleString()})`;
          }
          if (key === NotificationType.tnd) {
            trigger = ` - (${notif.content.data.trigger})`;
          }
          return trigger ? (
            <SecondaryText key={index} style={styles.paddingLeft}>
              {trigger}
            </SecondaryText>
          ) : null;
        })}
      </View>
    );
  };

  const renderNotificationSection = () => {
    if (notificationsGroupByType) {
      return Object.keys(notificationsGroupByType).map((key: string) => {
        return renderNotificationsGroupItem(key, notificationsGroupByType[key]);
      });
    } else {
      return (
        <SecondaryText style={styles.paddingLeft}>
          {Labels.noData}
        </SecondaryText>
      );
    }
  };

  return (
    <ScrollView
      style={Styles.modalFullScreen.mainContainer}
      contentContainerStyle={Styles.modalFullScreen.scrollviewContent}
    >
      <H1 style={styles.textCenter}>{Labels.infosDev.title}</H1>
      <SecondaryText style={styles.textCenter}>
        {Labels.infosDev.expoUpdatesInfo}
      </SecondaryText>

      <CustomButton
        title={Labels.infosDev.resetStorageData}
        rounded={true}
        buttonStyle={{ margin: Paddings.smaller }}
        titleStyle={styles.uppercase}
        action={resetAllData}
      />

      {/* NOTIFICATIONS */}
      <H2>{Labels.infosDev.notifications}</H2>

      <H3>{Labels.infosDev.scheduledNotifications} :</H3>
      {showNotifSection && renderNotificationSection()}

      <H3>{Labels.infosDev.testNotification} :</H3>
      <SecondaryText style={styles.textCenter}>
        {Labels.infosDev.testNotificationInfo}
      </SecondaryText>
      <View>
        {Object.values(NotificationType).map((value: string) => {
          return (
            <CustomButton
              key={value}
              title={value}
              rounded={true}
              buttonStyle={{ margin: Paddings.smaller }}
              titleStyle={styles.uppercase}
              action={sendNotification(value)}
            />
          );
        })}
      </View>

      <H2>{Labels.infosDev.sentry}</H2>
      <CustomButton
        title={Labels.infosDev.sentryLogError}
        rounded={true}
        buttonStyle={{ margin: Paddings.smaller }}
        action={sendFakeErrorInSentry}
      />

      {/* ENV */}
      <H2>{Labels.infosDev.env}</H2>
      <View>
        <SecondaryText>API_URL : {process.env.API_URL}</SecondaryText>
        <SecondaryText>
          CLEAR_STORAGE : {process.env.CLEAR_STORAGE}
        </SecondaryText>
        <SecondaryText>
          MATOMO_APPLICATION_ID : {process.env.MATOMO_APPLICATION_ID}
        </SecondaryText>
        <SecondaryText>
          MATOMO_ENABLED : {process.env.MATOMO_ENABLED}
        </SecondaryText>
        <SecondaryText>
          SENTRY_ENABLED : {process.env.SENTRY_ENABLED}
        </SecondaryText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: Paddings.smaller,
  },
  paddingLeft: {
    paddingLeft: Paddings.default,
  },
  textCenter: {
    textAlign: "center",
  },
  uppercase: {
    textTransform: "uppercase",
  },
});

export default InfosDev;
