import type { FC } from "react";
import * as React from "react";
import { useCallback } from "react";
import { Linking, StyleSheet } from "react-native";

import { Colors } from "../../styles";
import { LinkingUtils } from "../../utils";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

interface AProps {
  url: string;
}

export type Props = AProps & TextProps;

const A: FC<Props> = (props) => {
  const onTextPressed = useCallback(() => {
    if (props.url.startsWith("mailto:")) void Linking.openURL(props.url);
    else void LinkingUtils.openWebsite(props.url);
  }, [props.url]);

  return (
    <SecondaryText
      {...props}
      style={[styles.a, props.style]}
      accessibilityRole="link"
      onPress={onTextPressed}
    />
  );
};

const styles = StyleSheet.create({
  a: {
    color: Colors.primaryBlue,
    textDecorationLine: "underline",
  },
});

export default A;
