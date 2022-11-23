import type { Notification as ExpoNotificaiton } from "expo-notifications";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { Modal, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import Confetti from "react-native-confetti";

import { Colors, FontWeight, Paddings, Sizes } from "../../styles";
import type { NotificationStyle } from "../../types";
import { NotificationUtils, TrackerUtils } from "../../utils";
import * as RootNavigation from "../../utils/rootNavigation.util";
import CustomButton from "../baseComponents/customButton.component";
import Icomoon, { IcomoonIcons } from "../baseComponents/icomoon.component";
import { SecondaryText } from "../baseComponents/StyledText";
import { View } from "../baseComponents/Themed";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  notification: ExpoNotificaiton;
  onDismiss: () => void;
}

const notifStyles = new Map<
  NotificationUtils.NotificationType,
  NotificationStyle
>();
notifStyles.set(NotificationUtils.NotificationType.epds, {
  color: Colors.primaryYellowDark,
  icon: IcomoonIcons.favoris,
});
notifStyles.set(NotificationUtils.NotificationType.event, {
  color: Colors.primaryBlueDark,
  icon: IcomoonIcons.notification,
});
notifStyles.set(NotificationUtils.NotificationType.nextStep, {
  color: Colors.secondaryGreenDark,
  icon: IcomoonIcons.informations,
});
notifStyles.set(NotificationUtils.NotificationType.moodboard, {
  color: Colors.primaryBlueDark,
  icon: IcomoonIcons.bebe,
});
notifStyles.set(NotificationUtils.NotificationType.articles, {
  color: Colors.primaryBlueDark,
  icon: IcomoonIcons.notification,
});
notifStyles.set(NotificationUtils.NotificationType.favorites, {
  color: Colors.primaryBlueDark,
  icon: IcomoonIcons.notification,
});

const NotificationModal: FC<Props> = ({ notification, onDismiss }) => {
  const notificationType = notification.request.content.data
    .type as NotificationUtils.NotificationType;

  const confetti = notification.request.content.data.confetti as boolean;

  const [modalVisible, setModalVisible] = useState(true);
  const [trackerAction, setTrackerAction] = useState("");

  const confettiRef = React.useRef<Confetti>(null);
  const VIBRATION_PATTERN = [0, 700, 700]; // intervalles entre chaque vibration.

  const action = useCallback(() => {
    const buttonTitle: string | unknown =
      notification.request.content.data.redirectTitle ?? "";
    setTrackerAction(
      TrackerUtils.notificationModalTrackerAction(notificationType, buttonTitle)
    );
    const redirectTo = notification.request.content.data.redirectTo as string;
    const redirectParams = notification.request.content.data.redirectParams;

    if (redirectTo) {
      const redirectFromRoot = notification.request.content.data
        .redirectFromRoot as boolean;
      if (redirectFromRoot)
        void RootNavigation.navigate("root", {
          params: redirectParams,
          screen: redirectTo,
        });
      else void RootNavigation.navigate(redirectTo, redirectParams);
    }
    setModalVisible(false);
  }, [
    notification.request.content.data.redirectFromRoot,
    notification.request.content.data.redirectParams,
    notification.request.content.data.redirectTitle,
    notification.request.content.data.redirectTo,
    notificationType,
  ]);

  useEffect(() => {
    if (!modalVisible) onDismiss();
  }, [modalVisible, onDismiss]);

  useEffect(() => {
    if (confetti) {
      confettiRef.current?.startConfetti();
      Vibration.vibrate(VIBRATION_PATTERN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confettiRef]);

  const onHideModalButtonPressed = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onHideModalButtonPressed}
    >
      <TrackerHandler actionName={trackerAction} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Confetti ref={confettiRef} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onHideModalButtonPressed}
          >
            <Icomoon
              name={IcomoonIcons.fermer}
              color={Colors.disabled}
              size={Sizes.lg}
            />
          </TouchableOpacity>
          <Icomoon
            name={
              confetti
                ? IcomoonIcons.confetti
                : notifStyles.get(notificationType)?.icon ??
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
