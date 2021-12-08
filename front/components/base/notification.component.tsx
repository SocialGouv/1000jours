import type { Notification as ExpoNotificaiton } from "expo-notifications";
import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";

import { Colors, FontWeight, Paddings, Sizes } from "../../constants";
import BeContacted from "../../screens/epdsSurvey/beContacted.component";
import type { NotificationStyle } from "../../types";
import { NotificationType } from "../../utils/notification.util";
import * as RootNavigation from "../../utils/rootNavigation.util";
import { TrackingEvent } from "../../utils/tracker.util";
import { CloseButton } from "..";
import { SecondaryText } from "../StyledText";
import { View } from "../Themed";
import Button from "./button.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  notification: ExpoNotificaiton;
  onDismiss: () => void;
}

const notifStyles = new Map<NotificationType, NotificationStyle>();
notifStyles.set(NotificationType.epds, {
  color: Colors.primaryYellowDark,
  icon: IcomoonIcons.favoris,
});
notifStyles.set(NotificationType.event, {
  color: Colors.primaryBlueDark,
  icon: IcomoonIcons.notification,
});
notifStyles.set(NotificationType.nextStep, {
  color: Colors.secondaryGreenDark,
  icon: IcomoonIcons.informations,
});
notifStyles.set(NotificationType.beContacted, {
  color: Colors.primaryBlueDark,
  icon: IcomoonIcons.email,
});

const Notification: React.FC<Props> = ({ notification, onDismiss }) => {
  const { trackScreenView } = useMatomo();
  const notificationType = notification.request.content.data
    .type as NotificationType;

  const [modalVisible, setModalVisible] = useState(true);
  const [beContactedModalVisible, setBeContactedModalVisible] =
    React.useState(false);

  const action = () => {
    const buttonTitle = notification.request.content.data.redirectTitle ?? "";
    trackScreenView(
      `${TrackingEvent.NOTIFICATION} (${notificationType}) - ${buttonTitle}`
    );
    const redirectTo = notification.request.content.data.redirectTo as string;

    if (redirectTo) {
      const redirectFromRoot = notification.request.content.data
        .redirectFromRoot as boolean;
      if (redirectFromRoot)
        RootNavigation.navigate("root", { screen: redirectTo });
      else RootNavigation.navigate(redirectTo, null);
    }

    if (notificationType == NotificationType.beContacted) {
      setBeContactedModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (!modalVisible) onDismiss();
  }, [modalVisible]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeButton}>
              <CloseButton
                onPress={() => {
                  setModalVisible(false);
                }}
                clear={true}
              />
            </View>
            <View style={styles.content}>
              <View
                importantForAccessibility="no-hide-descendants"
                accessible={false}
              >
                <Icomoon
                  name={
                    notifStyles.get(notificationType)?.icon ??
                    IcomoonIcons.notification
                  }
                  color={notifStyles.get(notificationType)?.color}
                  size={Sizes.xxxxl}
                />
              </View>
              <SecondaryText
                style={[
                  styles.title,
                  { color: notifStyles.get(notificationType)?.color },
                ]}
              >
                {notification.request.content.title}
              </SecondaryText>
              <SecondaryText style={styles.body}>
                {notification.request.content.body}
              </SecondaryText>
              <Button
                title={
                  notification.request.content.data.redirectTitle as string
                }
                rounded={true}
                action={action}
                titleStyle={styles.buttonTitle}
                buttonStyle={{
                  backgroundColor: notifStyles.get(notificationType)?.color,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <BeContacted
        visible={beContactedModalVisible}
        hideModal={() => {
          setBeContactedModalVisible(false);
          setModalVisible(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    color: Colors.commonText,
    paddingBottom: Paddings.default,
    textAlign: "center",
  },
  buttonTitle: {
    fontSize: Sizes.sm,
    textTransform: "uppercase",
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: Colors.backdrop,
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    paddingEnd: Paddings.smaller,
    paddingTop: Paddings.smaller,
  },
  content: {
    alignItems: "center",
    marginTop: -15,
    paddingHorizontal: 35,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: Sizes.mmd,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.light,
  },
});

export default Notification;
