import * as React from "react";
import { StyleSheet } from "react-native";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Labels,
  Sizes,
} from "../../constants";
import Button from "./button.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

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
      buttonStyle={styles.buttonStyle}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: { paddingHorizontal: 0, paddingTop: 0 },
  font: {
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xs,
  },
});

export default BackButton;
