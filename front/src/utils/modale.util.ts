import Constants from "expo-constants";
import { StyleSheet } from "react-native";

import { Colors } from "../styles";

export const modaleStyles = StyleSheet.create({
  behindOfModal: {
    backgroundColor: Colors.transparentGrey,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
