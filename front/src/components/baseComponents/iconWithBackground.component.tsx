import type { FC } from "react";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

import BgImage from "../../assets/images/bg-icon-event-type.png";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import Icomoon from "./icomoon.component";

interface Props {
  iconName: string;
}
const IconWithBackground: FC<Props> = ({ iconName }) => {
  return (
    <ImageBackground
      source={BgImage}
      imageStyle={styles.icon}
      style={styles.iconBackground}
    >
      <Icomoon name={iconName} size={Sizes.xxxl} color={Colors.primaryBlue} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: Margins.smaller,
    marginStart: Margins.smallest,
    resizeMode: "contain",
  },
  iconBackground: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: Sizes.xxxxl + Paddings.default,
    justifyContent: "center",
    marginEnd: Margins.default,
    paddingTop: Margins.light,
    width: Sizes.xxxxl + Paddings.light,
  },
});

export default IconWithBackground;
