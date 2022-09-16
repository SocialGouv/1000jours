import React from "react";
import { StyleSheet, View } from "react-native";

import { Labels } from "../../constants";
import { Colors, Sizes } from "../../styles";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  action: () => void;
}

/**
 * Button usually used in pair with a validation button
 * @param param0 the action to be executed when the button is clicked
 * @returns the Cancel button component
 */
const CancelButton: React.FC<Props> = ({ action }) => {
  return (
    <View style={styles.buttonContainer}>
      <CustomButton
        title={Labels.buttons.cancel}
        titleStyle={styles.buttonTitleStyle}
        rounded={false}
        disabled={false}
        icon={
          <Icomoon
            name={IcomoonIcons.fermer}
            size={Sizes.xs}
            color={Colors.primaryBlue}
          />
        }
        action={action}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  buttonTitleStyle: {
    fontSize: Sizes.sm,
  },
});

export default CancelButton;
