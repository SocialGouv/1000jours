import * as React from "react";
import { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";

import { Colors, FontWeight, Labels, Paddings, Sizes } from "../../constants";
import { CloseButton, CustomButton, Icomoon, IcomoonIcons } from "..";
import { SecondaryText } from "../StyledText";
import { View } from "../Themed";

interface Props {
  icon: string;
  title: string;
  body: string;
  onDismiss: () => void;
}

const ModalHelp: React.FC<Props> = ({ icon, title, body, onDismiss }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const action = () => {
    setModalVisible(false);
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
                action={action}
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
    textTransform: "uppercase",
  },
});

export default ModalHelp;
