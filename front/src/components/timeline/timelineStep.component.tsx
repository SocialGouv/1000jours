import type { FC } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import type { IconNode } from "react-native-elements/dist/icons/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import {
  CommonText,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";
import StepIcon from "./stepIcon.component";

interface TimelineStepProps {
  active: boolean | null;
  order: number;
  name: string;
  index: number;
  isTheLast: boolean;
  onPress: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  isParentheque?: boolean;
}

const TimelineStep: FC<TimelineStepProps> = ({
  active,
  order,
  name,
  index: listIndex,
  isTheLast,
  onPress,
  onLayout,
  isParentheque,
}) => {
  const stepIcons: IconNode[] = [
    <StepIcon
      key={0}
      name={IcomoonIcons.stepParentheque}
      active={active ?? false}
      isParentheque
    />,
    <StepIcon
      key={1}
      name={IcomoonIcons.stepProjetParent}
      active={active ?? false}
    />,
    <StepIcon
      key={2}
      name={IcomoonIcons.stepConception}
      active={active ?? false}
    />,
    <StepIcon
      key={3}
      name={IcomoonIcons.stepDebutDeGrossesse}
      active={active ?? false}
    />,
    <StepIcon
      key={4}
      name={IcomoonIcons.stepFinDeGrossesse}
      active={active ?? false}
    />,
    <StepIcon
      key={5}
      name={IcomoonIcons.stepAccouchement}
      active={active ?? false}
    />,
    <StepIcon
      key={6}
      name={IcomoonIcons.step4PremiersMois}
      active={active ?? false}
    />,
    <StepIcon
      key={7}
      name={IcomoonIcons.step4MoisA1An}
      active={active ?? false}
    />,
    <StepIcon
      key={8}
      name={IcomoonIcons.step1A2Ans}
      active={active ?? false}
    />,
  ];

  const getStepStyles = (index: number, isLast: boolean) => {
    const initialOffset = Paddings.light;
    const verticalOffset = Paddings.stepOffset;
    if (isParentheque) {
      return [
        styles.step,
        { marginTop: initialOffset - verticalOffset / 2 },
        styles.stepRight,
      ];
    } else if (index === 0) {
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
    if (isParentheque) return [styles.stepNum, styles.stepNumRight];
    else if (index === 0) return [styles.stepNum, styles.stepNumLeft];
    return [
      styles.stepNum,
      index % 2 === 0 ? styles.stepNumLeft : styles.stepNumRight,
    ];
  };

  return (
    <Pressable
      style={getStepStyles(listIndex, isTheLast)}
      onLayout={onLayout}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${Labels.accessibility.step} ${order}. ${name}`}
    >
      <View
        style={[styles.stepIconContainer]}
        importantForAccessibility="no-hide-descendants"
      >
        <TouchableOpacity
          style={[
            styles.stepIconButton,
            styles.justifyContentCenter,
            active ? styles.stepActive : null,
            isParentheque && styles.stepIconButtonParentheque,
          ]}
          onPress={onPress}
        >
          {stepIcons[order]}
        </TouchableOpacity>
      </View>
      <View
        style={
          isParentheque
            ? styles.stepTitleParentheque
            : [
                styles.stepTitleContainer,
                isTheLast
                  ? styles.stepLast
                  : listIndex === 0
                  ? styles.stepFirst
                  : null,
              ]
        }
      >
        <CommonText style={[styles.stepTitle]} allowFontScaling={false}>
          {name}
        </CommonText>
        <SecondaryText
          style={getStepNumStyles(listIndex)}
          allowFontScaling={false}
        >
          {order}
        </SecondaryText>
      </View>
    </Pressable>
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
  stepActive: {
    backgroundColor: Colors.primaryYellowDark,
  },
  stepFirst: {
    marginBottom: Margins.step,
  },
  stepIconButton: {
    backgroundColor: "white",
    borderColor: Colors.primaryYellow,
    borderRadius: Sizes.step / 2,
    borderWidth: 1,
    height: Sizes.step,
    width: Sizes.step,
  },
  stepIconButtonParentheque: {
    borderColor: Colors.primaryBlue,
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
    fontWeight: FontWeight.bold,
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
  stepTitleParentheque: {
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

export default TimelineStep;
