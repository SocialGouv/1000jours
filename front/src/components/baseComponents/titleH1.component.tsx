import * as React from "react";
import type { Text as DefaultText, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import { SecondaryText } from "./StyledText";

interface Props {
  title?: string;
  animated: boolean;
  description?: string | null;
  showDescription?: boolean;
  style?: ViewStyle;
}

const TitleH1 = React.forwardRef<DefaultText, Props>((props: Props, ref) => {
  return props.title ? (
    <Animatable.View
      animation={props.animated ? "slideInRight" : undefined}
      duration={1500}
      style={props.style}
    >
      <SecondaryText
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel={props.title}
        ref={ref}
      >
        {props.title}
      </SecondaryText>
      {(props.showDescription === undefined || props.showDescription) &&
        props.description && (
          <SecondaryText style={styles.description}>
            {props.description}
          </SecondaryText>
        )}
    </Animatable.View>
  ) : null;
});
TitleH1.displayName = "TitleH1";

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
