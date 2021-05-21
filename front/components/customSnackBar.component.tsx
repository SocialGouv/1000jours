import * as React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

import { Colors } from "../constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSnackBar: React.FC<any> = (props) => {
  const styles = StyleSheet.create({
    snackBar: {
      backgroundColor: Colors.cardWhite,
    },
    text: {
      color: Colors.dark.text,
    },
  });

  return <Snackbar {...props} style={styles.snackBar} />;
};

export default CustomSnackBar;
