import type { FC } from "react";
import * as React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { Labels } from "../../constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  textInputValue: string;
  onChangeText: (text: string) => void;
  onClearPress: () => void;
}

const CustomTextInput: FC<Props> = ({
  textInputValue,
  onChangeText,
  onClearPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInputView}
        onChangeText={onChangeText}
        placeholder={Labels.search.writeKeywordPlaceholder}
        value={textInputValue}
        clearButtonMode="always"
      />
      <TouchableOpacity style={styles.clearButton} onPress={onClearPress}>
        <Icomoon
          name={IcomoonIcons.fermer}
          size={Sizes.xs}
          color={Colors.primaryBlue}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    bottom: 0,
    justifyContent: "center",
    marginRight: Margins.smaller,
    position: "absolute",
    right: 0,
    top: 0,
  },
  mainContainer: {
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: Paddings.smallest,
  },
  textInputView: {
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
    paddingLeft: Margins.smaller,
    width: "90%",
  },
});

export default CustomTextInput;
