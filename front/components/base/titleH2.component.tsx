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

const TitleH2: React.FC<Props> = ({ title, animated, description, style }) => (
  <Animatable.View
    animation={animated ? "slideInRight" : undefined}
    duration={1500}
    style={style}
  >
    <CommonText style={styles.title}>{title}</CommonText>
    {description && (
      <SecondaryText style={styles.description}>{description}</SecondaryText>
    )}
  </Animatable.View>
);

const styles = StyleSheet.create({
  description: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.md,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.normal,
    lineHeight: Sizes.lg,
    marginVertical: Margins.smallest,
    textAlign: "left",
  },
});

export default TitleH2;
