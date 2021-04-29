import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import { FontWeight } from "../constants/Layout";
import Button from "./form/Button";
import Icomoon, { IcomoonIcons } from "./Icomoon";
import { FontNames, getFontFamilyName } from "./StyledText";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => void;
  color?: string;
}

const BackButton: React.FC<Props> = ({
  action,
  color = Colors.secondaryGreen,
}) => {
  return (
    <Button
      title={Labels.buttons.back}
      icon={
        <Icomoon
          name={IcomoonIcons.retour}
          size={14}
          color={Colors.secondaryGreen}
        />
      }
      rounded={false}
      disabled={false}
      action={action}
      titleStyle={[{ color }, styles.font]}
    />
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: 14,
    fontWeight: FontWeight.normal,
  },
});

export default BackButton;
