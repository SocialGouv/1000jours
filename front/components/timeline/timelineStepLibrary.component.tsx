import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "react-native-elements";
import type { IconNode } from "react-native-elements/dist/icons/Icon";

import { FontWeight, Margins, Paddings, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import { IcomoonIcons } from "../base/icomoon.component";
import { CommonText, SecondaryText } from "../StyledText";
import { View } from "../Themed";
import StepIconLibrary from "./stepIconLibrary.component";

interface TimelineStepLibraryProps {
  order: number;
  name: string;
  onPress: () => void;
}

const TimelineStepLibrary: FC<TimelineStepLibraryProps> = ({
  order,
  name,
  onPress,
}) => {
  const stepIcons: IconNode[] = [
    <StepIconLibrary name={IcomoonIcons.stepParentheque} />,
  ];

  const getStepStyles = () => {
    const initialOffset = Paddings.light;
    const verticalOffset = Paddings.stepOffset;
    return [
      styles.step,
      { marginTop: initialOffset - verticalOffset / 2 },
      styles.stepRight,
    ];
  };

  const getStepNumStyles = () => {
    return [styles.stepNum, styles.stepNumRight];
  };

  return (
    <View style={getStepStyles()}>
      <View style={[styles.stepIconContainer]}>
        <RNEButton
          icon={stepIcons[order]}
          onPress={onPress}
          buttonStyle={[
            styles.stepIconButtonLibrary,
            styles.justifyContentCenter,
          ]}
          type="clear"
        />
      </View>
      <View style={[styles.stepTitleContainer]}>
        <CommonText style={[styles.stepTitle]}>{name}</CommonText>
        <SecondaryText style={getStepNumStyles()}>{order}</SecondaryText>
      </View>
    </View>
  );
};

const sizeOfStepNum = Sizes.xxxxxl;
const styles = StyleSheet.create({
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  step: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    height: Sizes.step,
    position: "absolute",
  },
  stepIconButtonLibrary: {
    backgroundColor: "white",
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.step / 2,
    borderWidth: 1,
    height: Sizes.step,
    width: Sizes.step,
  },
  stepIconContainer: {
    backgroundColor: "white",
  },
  stepNum: {
    color: Colors.primaryBlueLight,
    fontSize: sizeOfStepNum,
    fontWeight: FontWeight.bold,
    paddingHorizontal: Paddings.smallest,
    position: "absolute",
    zIndex: -1,
  },
  stepNumRight: {
    left: 0,
  },
  stepRight: {
    flexDirection: "row-reverse",
    right: 0,
    textAlign: "right",
  },
  stepTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xxs,
  },
  stepTitleContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    height: sizeOfStepNum,
    justifyContent: "center",
    marginBottom: Margins.step,
    paddingLeft: Paddings.default,
    paddingRight: Paddings.light,
    position: "relative",
  },
});

export default TimelineStepLibrary;
