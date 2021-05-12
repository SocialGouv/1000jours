import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import LogoMinistere from "../assets/images/Logo ministere.svg";
import AppLogo from "../assets/images/logo.svg";
import { Paddings, Sizes } from "../constants";

const HeaderApp: FC = () => (
  <View>
    <View style={styles.logoMinistere}>
      <LogoMinistere height={32} />
    </View>
    <View style={styles.appLogo}>
      <AppLogo height={Sizes.logo} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  appLogo: {
    alignItems: "center",
    display: "flex",
  },
  logoMinistere: {
    padding: Paddings.default,
  },
});

export default HeaderApp;
