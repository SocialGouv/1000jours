import type { Notification as ExpoNotificaiton } from "expo-notifications";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Colors, FontWeight, Paddings, Sizes } from "../../styles";
import type { NotificationStyle } from "../../types";
import { NotificationType } from "../../utils/notification.util";
import * as RootNavigation from "../../utils/rootNavigation.util";
import { TrackingEvent } from "../../utils/tracker.util";
import TrackerHandler from "../tracker/trackerHandler.component";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";
import { SecondaryText } from "./StyledText";
import { View } from "./Themed";

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

const NotificationModal: FC<Props> = ({ notification, onDismiss }) => {
  const notificationType = notification.request.content.data
    .type as NotificationType;

  const [modalVisible, setModalVisible] = useState(true);
  const [trackerAction, setTrackerAction] = useState("");

  const action = () => {
    const buttonTitle = notification.request.content.data.redirectTitle ?? "";
    setTrackerAction(
      `${TrackingEvent.NOTIFICATION} (${notificationType}) - ${buttonTitle}`
    );
    const redirectTo = notification.request.content.data.redirectTo as string;

    if (redirectTo) {
      const redirectFromRoot = notification.request.content.data
        .redirectFromRoot as boolean;
      if (redirectFromRoot)
        void RootNavigation.navigate("root", { screen: redirectTo });
      else void RootNavigation.navigate(redirectTo, null);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    if (!modalVisible) onDismiss();
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      {/* <TrackerHandler actionName={trackerAction} /> */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Icomoon
              name={IcomoonIcons.fermer}
              color={Colors.disabled}
              size={Sizes.lg}
            />
          </TouchableOpacity>
          <Icomoon
            name={
              notifStyles.get(notificationType)?.icon ??
              IcomoonIcons.notification
            }
            color={notifStyles.get(notificationType)?.color}
            size={Sizes.xxxxl}
          />
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
          <CustomButton
            title={notification.request.content.data.redirectTitle as string}
            rounded={true}
            action={action}
            titleStyle={styles.buttonTitle}
            buttonStyle={{
              backgroundColor: notifStyles.get(notificationType)?.color,
            }}
          />
        </View>
      </View>
    </Modal>
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
    padding: Paddings.default,
    position: "absolute",
    right: 0,
    top: 0,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
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

export default NotificationModal;
