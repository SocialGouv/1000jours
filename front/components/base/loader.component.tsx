import * as React from "react";
import { Modal as RNModal, SafeAreaView, StyleSheet, View } from "react-native";
import { MaterialIndicator } from "react-native-indicators";

import { Colors } from "../../constants";

const Loader: React.FC = () => (
  <RNModal visible={true} presentationStyle="overFullScreen" transparent={true}>
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <MaterialIndicator color={Colors.white} />
      </View>
    </SafeAreaView>
  </RNModal>
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.backdrop,
    height: "100%",
    width: "100%",
  },
});

export default Loader;
