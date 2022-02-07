import * as React from "react";
import { Linking, StyleSheet } from "react-native";

import { Colors } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

interface AProps {
  url: string;
}

export type Props = AProps & TextProps;

const A: React.FC<Props> = (props) => (
  <SecondaryText
    {...props}
    style={[styles.a, props.style]}
    accessibilityRole="link"
    onPress={async () => Linking.openURL(props.url)}
  />
);

const styles = StyleSheet.create({
  a: {
    color: Colors.primaryBlue,
    textDecorationLine: "underline",
  },
});

export default A;
