import * as React from "react";
import { StyleSheet } from "react-native";

import { Colors, FontWeight, Labels, Sizes } from "../constants";
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
          size={Sizes.xs}
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
    fontSize: Sizes.xs,
  },
});

export default BackButton;
