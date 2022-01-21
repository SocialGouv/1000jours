import * as React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
} from "../../constants";
import { CommonText } from "..";

interface Props {
  updatePostalCode: (postalCode: string) => void;
}

const CustomPostalCodeTextInput: React.FC<Props> = ({ updatePostalCode }) => {
  const [postalCode, setPostalCode] = useState("");

  return (
    <View style={styles.rowView}>
      <CommonText style={styles.textStyle}>
        {Labels.aroundMe.submitNewFilter.aboutYou.postalCode}
      </CommonText>
      <TextInput
        style={styles.postalCodeInput}
        onChangeText={(text) => {
          setPostalCode(text);
          updatePostalCode(text);
        }}
        value={postalCode}
        placeholder={
          Labels.aroundMe.submitNewFilter.aboutYou.postalCodePlaceholder
        }
        keyboardType="number-pad"
        maxLength={AroundMeConstants.POSTAL_CODE_MAX_LENGTH}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    height: 30,
    width: 100,
  },
  postalCodeInput: {
    backgroundColor: Colors.cardGrey,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    paddingHorizontal: Paddings.smaller,
  },
  rowView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Margins.default,
  },
  textStyle: {
    color: Colors.primaryBlue,
    fontWeight: FontWeight.bold,
    marginRight: Margins.default,
  },
});

export default CustomPostalCodeTextInput;
