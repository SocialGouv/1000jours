import * as Speech from "expo-speech";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

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
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  textToRead: string;
  buttonTitle?: string;
}

const SpeechText: FC<Props> = ({ buttonTitle, textToRead }) => {
  const readText = useCallback(async () => {
    const voices = await Speech.getAvailableVoicesAsync();
    const frVoices = _.filter(voices, { language: "fr-FR" });
    console.log(frVoices);
    console.log("Text maxLength : ", Speech.maxSpeechInputLength);
    const speechOptions: Speech.SpeechOptions = {
      language: "fr-FR",
      pitch: 1,
      rate: 1,
    };
    Speech.speak(textToRead, speechOptions);
  }, [textToRead]);

  return (
    <CustomButton
      title={buttonTitle ?? Labels.accessibility.listen}
      icon={
        <Icomoon
          name={IcomoonIcons.ecouter}
          size={Sizes.md}
          color={Colors.primaryBlue}
        />
      }
      rounded={true}
      disabled={false}
      action={readText}
      titleStyle={styles.buttonTitleStyle}
      buttonStyle={[styles.defaultButtonStyle]}
    />
  );
};

const styles = StyleSheet.create({
  buttonTitleStyle: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xs,
    textAlign: "left",
  },
  defaultButtonStyle: {
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginBottom: Margins.default,
    paddingBottom: Paddings.smaller,
  },
});

export default SpeechText;
