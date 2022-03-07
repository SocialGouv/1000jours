import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { Labels } from "../../constants";
import { Paddings, Sizes } from "../../styles";
import { BaseAssets } from "../assets";

const HeaderApp: FC = () => (
  <View>
    <BaseAssets.LogoMinistere
      height={Sizes.xxxxl}
      style={styles.logoMinistere}
      accessible
      accessibilityRole="image"
      accessibilityLabel={Labels.accessibility.logoRepubliqueFr}
    />
    <View style={styles.appLogo}>
      <BaseAssets.AppLogo
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
