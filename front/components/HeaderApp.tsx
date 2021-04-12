import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import LogoMinistere from "../assets/images/Logo ministere.svg";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";

const HeaderApp: FC = () => (
  <View style={styles.header}>
    <View style={styles.logoMinistere}>
      <LogoMinistere height={32} />
    </View>
    <Text style={styles.appLogo}>{Labels.appName}</Text>
    <View style={styles.underline}></View>
  </View>
);

const styles = StyleSheet.create({
  appLogo: {
    color: Colors.primaryBlueDark,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    paddingBottom: 35,
  },
  logoMinistere: {
    padding: 15,
  },
  underline: {
    borderBottomWidth: 3,
    borderColor: Colors.primaryYellow,
    width: "50%",
  },
});

export default HeaderApp;
