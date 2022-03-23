import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AroundMeConstants, Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings } from "../../styles";
import { CommonText } from "./StyledText";

interface Props {
  updatePostalCode: (postalCode: string) => void;
}

const CustomPostalCodeTextInput: React.FC<Props> = ({ updatePostalCode }) => {
  const [postalCode, setPostalCode] = useState("");

  const onTextChanged = useCallback(
    (text: string) => {
      setPostalCode(text);
      updatePostalCode(text);
    },
    [updatePostalCode]
  );

  return (
    <View style={styles.rowView}>
      <CommonText style={styles.textStyle}>
        {Labels.aroundMe.submitNewFilter.aboutYou.postalCode}
      </CommonText>
      <TextInput
        style={styles.postalCodeInput}
        onChangeText={onTextChanged}
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
