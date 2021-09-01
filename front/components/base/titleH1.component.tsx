import * as React from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { Colors, FontWeight, Margins, Sizes } from "../../constants";
import { SecondaryText } from "../StyledText";

interface Props {
  title?: string;
  animated: boolean;
  description?: string | null;
  style?: ViewStyle;
}

const TitleH1: React.FC<Props> = ({ title, animated, description, style }) =>
  title ? (
    <Animatable.View
      animation={animated ? "slideInRight" : undefined}
      duration={1500}
      style={style}
    >
      <SecondaryText style={styles.title}>{title}</SecondaryText>
      {description && (
        <SecondaryText style={styles.description}>{description}</SecondaryText>
      )}
    </Animatable.View>
  ) : null;

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
    fontWeight: FontWeight.black,
    letterSpacing: 0,
    lineHeight: Sizes.lg,
    marginBottom: Margins.smaller,
    marginTop: Margins.smallest,
    textAlign: "left",
    textTransform: "uppercase",
  },
});

export default TitleH1;
