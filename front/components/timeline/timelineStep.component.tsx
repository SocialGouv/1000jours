import type { FC } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "react-native-elements";
import type { IconNode } from "react-native-elements/dist/icons/Icon";

import { Margins, Paddings, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import { IcomoonIcons } from "../base/icomoon.component";
import { CommonText } from "../StyledText";
import { View } from "../Themed";
import StepIcon from "./stepIcon.component";

interface TimelineStepProps {
  active: boolean | null;
  order: number;
  name: string;
  index: number;
  isTheLast: boolean;
  onPress: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const TimelineStep: FC<TimelineStepProps> = ({
  active,
  order,
  name,
  index: listIndex,
  isTheLast,
  onPress,
  onLayout,
}) => {
  const stepIcons: IconNode[] = [
    <StepIcon
      name={
        active
          ? IcomoonIcons.stepProjetParentActive
          : IcomoonIcons.stepProjetParent
      }
    />,
    <StepIcon
      name={
        active ? IcomoonIcons.stepConceptionActive : IcomoonIcons.stepConception
      }
    />,
    <StepIcon
      name={
        active
          ? IcomoonIcons.stepDebutDeGrossesseActive
          : IcomoonIcons.stepDebutDeGrossesse
      }
    />,
    <StepIcon
      name={
        active
          ? IcomoonIcons.stepFinDeGrossesseActive
          : IcomoonIcons.stepFinDeGrossesse
      }
    />,
    <StepIcon
      name={
        active
          ? IcomoonIcons.stepAccouchementActive
          : IcomoonIcons.stepAccouchement
      }
    />,
    <StepIcon
      name={
        active
          ? IcomoonIcons.step4PremiersMoisActive
          : IcomoonIcons.step4PremiersMois
      }
    />,
    <StepIcon
      name={
        active ? IcomoonIcons.step4MoisA1AnActive : IcomoonIcons.step4MoisA1An
      }
    />,
    <StepIcon
      name={active ? IcomoonIcons.step1A2AnsActive : IcomoonIcons.step1A2Ans}
    />,
  ];

  const getStepStyles = (index: number, isLast: boolean) => {
    const initialOffset = Paddings.light;
    const verticalOffset = Paddings.stepOffset;
    if (index === 0) {
      return [
        styles.step,
        { marginTop: initialOffset - verticalOffset / 2 },
        styles.stepLeft,
      ];
    } else {
      const marginTop =
        initialOffset -
        index +
        1 +
        verticalOffset * (index - 1) -
        (isLast ? verticalOffset / 2 : 0);
      return [
        styles.step,
        { marginTop: marginTop },
        index % 2 === 0 ? styles.stepLeft : styles.stepRight,
      ];
    }
  };
  const getStepNumStyles = (index: number) => {
    if (index === 0) return [styles.stepNum, styles.stepNumLeft];
    return [
      styles.stepNum,
      index % 2 === 0 ? styles.stepNumLeft : styles.stepNumRight,
    ];
  };

  return (
    <View style={getStepStyles(listIndex, isTheLast)} onLayout={onLayout}>
      <View style={[styles.stepIconContainer]}>
        <RNEButton
          icon={stepIcons[order - 1]}
          onPress={onPress}
          buttonStyle={[styles.stepIconButton, styles.justifyContentCenter]}
          type="clear"
        />
      </View>
      <View
        style={[
          styles.stepTitleContainer,
          isTheLast
            ? styles.stepLast
            : listIndex === 0
            ? styles.stepFirst
            : null,
        ]}
      >
        <CommonText style={[styles.stepTitle]}>{name}</CommonText>
        <CommonText style={getStepNumStyles(listIndex)}>{order}</CommonText>
      </View>
    </View>
  );
};

const sizeOfStepNum = Sizes.xxxxl;
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
  stepFirst: {
    marginBottom: Margins.step,
  },
  stepIconButton: {
    borderColor: Colors.primaryYellow,
    borderRadius: Sizes.step / 2,
    borderWidth: 1,
    height: Sizes.step,
    width: Sizes.step,
  },
  stepIconContainer: {
    backgroundColor: "white",
  },
  stepLast: {
    marginTop: Margins.step,
  },
  stepLeft: {
    flexDirection: "row",
    left: 0,
    textAlign: "left",
  },
  stepNum: {
    color: Colors.primaryBlueLight,
    fontSize: sizeOfStepNum,
    fontWeight: "bold",
    paddingHorizontal: Paddings.smallest,
    position: "absolute",
    zIndex: -1,
  },
  stepNumLeft: {
    left: 0,
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
    paddingLeft: Paddings.default,
    paddingRight: Paddings.light,
    position: "relative",
  },
});

export default TimelineStep;
