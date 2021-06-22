import type { NavigationContainerRef } from "@react-navigation/native";
import type { Notification as ExpoNotificaiton } from "expo-notifications";
import * as React from "react";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { Colors, FontWeight, Paddings, Sizes } from "../../constants";
import type { NotificationStyle } from "../../types";
import { NotificationType } from "../../utils/notification.util";
import { SecondaryText } from "../StyledText";
import { View } from "../Themed";
import Button from "./button.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  navigation: NavigationContainerRef | null;
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

const Notification: React.FC<Props> = ({
  navigation,
  notification,
  onDismiss,
}) => {
  const notificationType = notification.request.content.data
    .type as NotificationType;

  const [modalVisible, setModalVisible] = useState(true);

  const action = () => {
    if (notification.request.content.data.redirectTo) {
      navigation?.navigate(
        notification.request.content.data.redirectTo as string
      );
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
          <Button
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
    marginTop: 22,
  },
  closeButton: {
    position: "absolute",
    right: Paddings.default,
    top: Paddings.default,
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

export default Notification;
