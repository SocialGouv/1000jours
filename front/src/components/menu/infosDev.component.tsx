/* eslint-disable react/no-unescaped-entities */
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { Labels } from "../../constants";
import { Paddings } from "../../styles";
import { NotificationUtils } from "../../utils";
import { NotificationType } from "../../utils/notification.util";
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

  const getAllScheduledNotifications = async () => {
    const notifications =
      await NotificationUtils.getAllScheduledNotifications();
    if (notifications.length > 0) {
      setNotificationsCountByType(
        _.countBy(notifications, "content.data.type")
      );
      setShowNotifSection(true);
    }
  };

  const sendNotification = useCallback(
    (notificationType: NotificationType | string) => () => {
      void NotificationUtils.scheduleFakeNotif(notificationType);
      setIsVisible(false);
    },
    [setIsVisible]
  );

  useEffect(() => {
    void getAllScheduledNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = (
    <View>
      <H1 style={styles.textCenter}>{Labels.dev.title}</H1>

      <H2>{Labels.dev.notifications}</H2>
      <H3>{Labels.dev.scheduledNotifications} :</H3>
      {showNotifSection &&
        notificationsCountByType &&
        Object.keys(notificationsCountByType).map((key: string) => {
          return (
            <SecondaryText key={key} style={styles.paddingLeft}>
              {key} : {notificationsCountByType[key]}
            </SecondaryText>
          );
        })}
      <H3>{Labels.dev.testNotification} :</H3>
      <SecondaryText style={styles.textCenter}>
        {Labels.dev.testNotificationInfo}
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
