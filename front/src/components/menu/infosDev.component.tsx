/* eslint-disable react/no-unescaped-entities */
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Labels, StorageKeysConstants } from "../../constants";
import { Paddings } from "../../styles";
import { NotificationUtils, StorageUtils } from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";
import { getObjectValue } from "../../utils/storage.util";
import { CustomButton, SecondaryText } from "../baseComponents";
import ModalHtmlContent from "../baseComponents/modalHtmlContent.component";
import H1 from "../html/h1.component";
import H2 from "../html/h2.component";
import H3 from "../html/h3.component";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const InfosDev: FC<Props> = ({ setIsVisible }) => {
  const [showNotifSection, setShowNotifSection] = React.useState(false);
  const [notificationsCountByType, setNotificationsCountByType] =
    React.useState<_.Dictionary<number> | undefined>(undefined);
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
    if (notifications.length > 0) {
      setNotificationsCountByType(
        _.countBy(notifications, "content.data.type")
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
    (notificationType: NotificationType | string) => () => {
      void NotificationUtils.scheduleFakeNotif(notificationType);
      setIsVisible(false);
    },
    [setIsVisible]
  );

  const resetAllData = useCallback(async () => {
    await StorageUtils.clear();
    await NotificationUtils.cancelAllScheduledNotifications();
    Alert.alert(Labels.warning, Labels.infosDev.resetStorageDataAlertMsg);
    setIsVisible(false);
  }, [setIsVisible]);

  useEffect(() => {
    void getAllScheduledNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNotificationsCountItem = (key: string, value: number) => {
    let trigger = null;
    if (key === NotificationType.articles && triggerNotifArticles) {
      trigger = `(${new Date(triggerNotifArticles).toLocaleString()})`;
    }
    if (key === NotificationType.epds && triggerNotifEpds) {
      trigger = `(${new Date(triggerNotifEpds).toLocaleString()})`;
    }
    if (key === NotificationType.nextStep && triggerNotifNextStep) {
      trigger = `(${new Date(triggerNotifNextStep).toLocaleString()})`;
    }
    return (
      <SecondaryText key={key} style={styles.paddingLeft}>
        {key} : {value} {trigger ?? null}
      </SecondaryText>
    );
  };

  const renderNotificationSection = () => {
    if (notificationsCountByType) {
      return Object.keys(notificationsCountByType).map((key: string) => {
        return renderNotificationsCountItem(key, notificationsCountByType[key]);
      });
    } else {
      return (
        <SecondaryText style={styles.paddingLeft}>
          {Labels.noData}
        </SecondaryText>
      );
    }
  };

  const content = (
    <View>
      <H1 style={styles.textCenter}>{Labels.infosDev.title}</H1>

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
    </View>
  );
  return <ModalHtmlContent setIsVisible={setIsVisible} content={content} />;
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
