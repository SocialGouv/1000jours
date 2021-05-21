import * as React from "react";
import { Modal as RNModal, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Paddings } from "../constants";
import { Button } from ".";
import { View } from "./Themed";

interface Props {
  content: JSX.Element;
  setIsVisible: (showMenu: boolean) => void;
}

const Modal: React.FC<Props> = ({ content, setIsVisible }) => {
  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <RNModal
      animationType="slide"
      visible={true}
      presentationStyle="overFullScreen"
      onRequestClose={hideModal}
    >
      <SafeAreaView>
        <ScrollView style={styles.mainContainer}>
          <View style={styles.closeButton}>
            <Button title="X" rounded={true} action={hideModal} />
          </View>
          <View>{content}</View>
        </ScrollView>
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
  },
  mainContainer: {
    padding: Paddings.default,
  },
});

export default Modal;
