import * as React from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { Colors, FontWeight, Margins, Sizes } from "../../constants";
import { CommonText, SecondaryText } from "../StyledText";

interface Props {
  title: string;
  animated: boolean;
  description?: string | null;
  style?: ViewStyle;
}

const TitleH1: React.FC<Props> = ({ title, animated, description, style }) => (
  <Animatable.View
    animation={animated ? "slideInRight" : undefined}
    duration={1500}
    style={style}
  >
    <SecondaryText style={styles.title}>{title}</SecondaryText>
    {description && (
      <CommonText style={styles.description}>{description}</CommonText>
    )}
  </Animatable.View>
);

const styles = StyleSheet.create({
  description: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.md,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.black,
    letterSpacing: 0,
    lineHeight: Sizes.lg,
    marginVertical: Margins.smallest,
    textAlign: "left",
    textTransform: "uppercase",
  },
});

export default TitleH1;
