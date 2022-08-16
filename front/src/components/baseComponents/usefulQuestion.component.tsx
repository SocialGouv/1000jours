import type { FC } from "react";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { TrackerEvent } from "../../type";
import TrackerHandler from "../tracker/trackerHandler.component";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";
import { SecondaryText } from "./StyledText";
import { View } from "./Themed";

interface Props {
  question: string;
  trackerActionValue: string;
  trackerNameValue: string;
}

const IS_USEFUL = 1;
const IS_NOT_USEFUL = 0;

const UsefulQuestion: FC<Props> = ({
  question,
  trackerActionValue,
  trackerNameValue,
}) => {
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();
  const [isButtonsDisabled, setButtonsDisabled] = useState(false);
  const [buttonValue, setButtonValue] = useState<number>();

  const setUsefulObjectForTracker = useCallback(
    (value: number) => () => {
      setButtonValue(value);
      setTrackerEventObject({
        action: `Useful${trackerActionValue}`,
        name: trackerNameValue,
        value: value,
      });
      setButtonsDisabled(true);
    },
    [trackerActionValue, trackerNameValue]
  );

  return (
    <View style={styles.usefulContainer}>
      <TrackerHandler eventObject={trackerEventObject} />
      <SecondaryText style={[styles.usefulContent]}>{question}</SecondaryText>
      <View style={styles.buttonsBloc}>
        <CustomButton
          title={Labels.buttons.yes}
          rounded={false}
          buttonStyle={styles.buttonStyle}
          disabledStyle={
            buttonValue == IS_USEFUL
              ? styles.selectedButtonStyle
              : styles.buttonDisabledStyle
          }
          titleStyle={styles.buttonTitle}
          action={setUsefulObjectForTracker(IS_USEFUL)}
          disabled={isButtonsDisabled}
          icon={
            <Icomoon
              name={IcomoonIcons.valider}
              size={Sizes.xs}
              color={Colors.secondaryGreenDark}
            />
          }
        />
        <CustomButton
          title={Labels.buttons.no}
          rounded={false}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          disabledStyle={
            buttonValue == IS_NOT_USEFUL
              ? styles.selectedButtonStyle
              : styles.buttonDisabledStyle
          }
          action={setUsefulObjectForTracker(IS_NOT_USEFUL)}
          disabled={isButtonsDisabled}
          icon={
            <Icomoon
              name={IcomoonIcons.annuler}
              size={Sizes.xs}
              color={Colors.secondaryRedMiddle}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonDisabledStyle: {
    backgroundColor: "transparent",
  },
  buttonStyle: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    height: Sizes.accessibilityMinButton,
    marginHorizontal: Sizes.xxxxxs,
  },
  buttonTitle: {
    color: Colors.black,
    fontSize: Sizes.xs,
    paddingBottom: Paddings.smallest,
  },
  buttonsBloc: {
    flexDirection: "row",
  },
  selectedButtonStyle: {
    backgroundColor: Colors.primaryBlue,
  },
  usefulContainer: {
    alignItems: "center",
    backgroundColor: Colors.cardWhite,
    borderBottomColor: Colors.borderGrey,
    borderLeftColor: Colors.primaryBlue,
    borderLeftWidth: 4,
    borderRightColor: Colors.borderGrey,
    borderTopColor: Colors.borderGrey,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: Margins.default,
    paddingVertical: Paddings.smaller,
  },
  usefulContent: {
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.lg,
    paddingHorizontal: Paddings.default,
  },
});
export default UsefulQuestion;
