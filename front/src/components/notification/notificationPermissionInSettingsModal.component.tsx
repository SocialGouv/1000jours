import * as React from "react";
import { useCallback } from "react";
import { Linking, Modal, ScrollView, StyleSheet, View } from "react-native";

import { Labels } from "../../constants";
import { Margins, Paddings, Styles } from "../../styles";
import {
  CloseButton,
  CustomButton,
  SecondaryText,
  TitleH1,
} from "../baseComponents";

interface Props {
  visible: boolean;
  closeModal: () => void;
}

const NotificationPermissionInSettingsModal: React.FC<Props> = ({
  visible,
  closeModal,
}) => {
  const openSettings = useCallback(() => {
    void Linking.openSettings();
  }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={Styles.modale.behindOfModal}>
        <View style={Styles.modale.modalView}>
          <View style={Styles.modale.closeButton}>
            <CloseButton onPress={closeModal} clear />
          </View>
          <ScrollView>
            <View style={styles.content}>
              <TitleH1
                title={Labels.notification.title}
                animated={false}
                style={styles.titleStyle}
              />
              <SecondaryText>{Labels.notification.openSettings}</SecondaryText>
              <View style={[styles.buttonsContainer, styles.validationButtons]}>
                <CustomButton
                  title={Labels.buttons.cancel}
                  rounded={false}
                  action={closeModal}
                />
                <CustomButton
                  title={Labels.buttons.settings}
                  rounded
                  action={openSettings}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Margins.default,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: Paddings.largest,
  },
  titleStyle: {
    marginTop: Margins.default,
  },
  validationButtons: {
    flexWrap: "wrap-reverse",
  },
});

export default NotificationPermissionInSettingsModal;
