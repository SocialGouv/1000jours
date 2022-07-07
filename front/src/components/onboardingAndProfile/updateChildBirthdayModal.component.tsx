import * as React from "react";
import { useCallback, useState } from "react";
import { Modal, StyleSheet } from "react-native";

import { Labels } from "../../constants";
import {
  Colors,
  FontWeight,
  Margins,
  Paddings,
  Sizes,
  Styles,
} from "../../styles";
import type { Step } from "../../types";
import { RootNavigation } from "../../utils";
import {
  CloseButton,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";

interface Props {
  step: Step | undefined;
}

const UpdateChildBirthdayModal: React.FC<Props> = ({ step }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const onHideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onValid = useCallback(() => {
    setModalVisible(false);
    void RootNavigation.navigate("profile", null);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onHideModal}
    >
      <View style={styles.centeredView}>
        <View style={Styles.modale.modalView}>
          <View style={Styles.modale.closeButton}>
            <CloseButton onPress={onHideModal} clear={true} />
          </View>
          <View style={styles.content}>
            <View
              importantForAccessibility="no-hide-descendants"
              accessible={false}
            >
              <Icomoon
                name={IcomoonIcons.calendrier}
                color={Colors.secondaryGreen}
                size={Sizes.xxxxl}
              />
            </View>
            <SecondaryText
              style={[styles.title, { color: Colors.secondaryGreenDark }]}
            >
              {Labels.profile.updateModal.title}
            </SecondaryText>
            <SecondaryText style={styles.body}>
              {Labels.profile.updateModal.content1}"
              <SecondaryText style={styles.bold}>{step?.nom}</SecondaryText>"
            </SecondaryText>
            <SecondaryText style={styles.body}>
              {Labels.profile.updateModal.content2}
            </SecondaryText>
            <View style={[styles.buttonsContainer]}>
              <View style={styles.buttonContainer}>
                <CustomButton
                  title={Labels.buttons.yes}
                  rounded={true}
                  disabled={false}
                  action={onValid}
                  buttonStyle={styles.button}
                />
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  buttonStyle={styles.button}
                  title={Labels.buttons.no}
                  rounded={true}
                  disabled={false}
                  action={onHideModal}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    paddingBottom: Paddings.default,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: Colors.secondaryGreenDark,
    marginHorizontal: Margins.default,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Margins.default,
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: Colors.backdrop,
    flex: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    marginTop: -15,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: Sizes.mmd,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.default,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default UpdateChildBirthdayModal;
