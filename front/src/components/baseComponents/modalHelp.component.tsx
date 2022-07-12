import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Paddings, Sizes, Styles } from "../../styles";
import CloseButton from "./closeButton.component";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";
import { SecondaryText } from "./StyledText";
import { View } from "./Themed";

interface Props {
  icon: string;
  title: string;
  body: string;
  onDismiss: () => void;
}

const ModalHelp: React.FC<Props> = ({ icon, title, body, onDismiss }) => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    if (!modalVisible) onDismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  const onHideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
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
                  name={icon}
                  color={Colors.primaryBlueDark}
                  size={Sizes.xxxxl}
                />
              </View>
              <SecondaryText
                style={[styles.title, { color: Colors.primaryBlueDark }]}
              >
                {title}
              </SecondaryText>
              <SecondaryText style={styles.body}>{body}</SecondaryText>
              <CustomButton
                title={Labels.buttons.close}
                rounded={false}
                action={onHideModal}
                titleStyle={styles.buttonTitle}
                icon={
                  <Icomoon
                    name={IcomoonIcons.fermer}
                    color={Colors.primaryBlueDark}
                  />
                }
              />
            </View>
          </View>
        </View>
      </Modal>
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
    textTransform: "capitalize",
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
    paddingVertical: Paddings.light,
    textTransform: "uppercase",
  },
});

export default ModalHelp;
