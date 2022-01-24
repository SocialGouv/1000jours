import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import LogoMinistere from "../../assets/images/Logo ministere.svg";
import AppLogo from "../../assets/images/logo.svg";
import { Labels, Paddings, Sizes } from "../../constants";

const HeaderApp: FC = () => (
  <View>
    <LogoMinistere
      height={Sizes.xxxxl}
      style={styles.logoMinistere}
      accessible
      accessibilityRole="image"
      accessibilityLabel={Labels.accessibility.logoRepubliqueFr}
    />
    <View style={styles.appLogo}>
      <AppLogo
        height={Sizes.logo}
        accessible
        accessibilityRole="image"
        accessibilityLabel={`${Labels.accessibility.logoApp} ${Labels.appName}`}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  appLogo: {
    alignItems: "center",
    display: "flex",
    paddingBottom: Paddings.light,
  },
  logoMinistere: {
    aspectRatio: 1,
    marginLeft: Paddings.default,
    marginTop: Paddings.default,
  },
});

export default HeaderApp;
