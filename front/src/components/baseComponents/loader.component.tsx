import * as React from "react";
import { Modal as RNModal, SafeAreaView, StyleSheet, View } from "react-native";
import { MaterialIndicator } from "react-native-indicators";

import { Colors } from "../../styles";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  backdrop?: boolean;
}

const Loader: React.FC<Props> = ({ backdrop = true }) => {
  return backdrop ? (
    <RNModal
      visible={true}
      presentationStyle="overFullScreen"
      transparent={true}
    >
      {/* <SafeAreaView> */}
        <View style={styles.mainContainer}>
          <ActivityIndicator color={Colors.white} />
        </View>
      {/* </SafeAreaView> */}
    </RNModal>
  ) : (
    <ActivityIndicator color={Colors.primaryBlueDark} />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.backdrop,
    height: "100%",
    width: "100%",
  },
});

export default Loader;
