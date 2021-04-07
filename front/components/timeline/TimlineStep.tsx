import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import StepIcon8 from "../../assets/images/Icone 1 à 2 ans.svg";
import StepIcon7 from "../../assets/images/Icone 4 mois à 1 an.svg";
import StepIcon6 from "../../assets/images/Icone 4 premiers mois.svg";
import StepIcon5 from "../../assets/images/Icone accouchement.svg";
import StepIcon2 from "../../assets/images/Icone conception.svg";
import StepIcon3 from "../../assets/images/Icone début de grossesse.svg";
import StepIcon4 from "../../assets/images/Icone fin de grossesse.svg";
import StepIcon1 from "../../assets/images/icone projet parent.svg";
import Colors from "../../constants/Colors";
import { CommonText } from "../StyledText";
import { View } from "../Themed";

interface TimelineStepProps {
  order: number;
  name: string;
  index: number;
  isTheLast: boolean;
  onPress: () => void;
}

const TimelineStep: FC<TimelineStepProps> = ({
  order,
  name,
  index: listIndex,
  isTheLast,
  onPress,
}) => {
  const stepIcons: React.ReactNode[] = [
    <StepIcon1 />,
    <StepIcon2 />,
    <StepIcon3 />,
    <StepIcon4 />,
    <StepIcon5 />,
    <StepIcon6 />,
    <StepIcon7 />,
    <StepIcon8 />,
  ];

  const getStepStyles = (index: number, isLast: boolean) => {
    const initialOffset = 10;
    const verticalOffset = 100;
    if (index === 0) {
      return [styles.step, { marginTop: initialOffset - 50 }, styles.stepLeft];
    } else {
      const marginTop =
        initialOffset -
        index +
        1 +
        verticalOffset * (index - 1) -
        (isLast ? 50 : 0);
      return [
        styles.step,
        { marginTop: marginTop },
        index % 2 === 0 ? styles.stepLeft : styles.stepRight,
      ];
    }
  };
  const getStepNumStyles = (index: number) => {
    if (index === 0) {
      return [styles.stepNum, styles.stepNumLeft];
    } else {
      return [
        styles.stepNum,
        index % 2 === 0 ? styles.stepNumLeft : styles.stepNumRight,
      ];
    }
  };

  return (
    <View style={getStepStyles(listIndex, isTheLast)}>
      <View
        style={[styles.stepIconContainer, styles.justifyContentCenter]}
        onTouchEnd={onPress}
      >
        {stepIcons[order - 1]}
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

const sizeOfStepNum = 45;
const styles = StyleSheet.create({
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  step: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    height: 80,
    position: "absolute",
  },
  stepFirst: {
    marginBottom: 60,
  },
  stepIconContainer: {
    borderColor: Colors.primaryYellow,
    borderRadius: 40,
    borderWidth: 1,
    height: 80,
    width: 80,
  },
  stepLast: {
    marginTop: 60,
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
    paddingHorizontal: 5,
    position: "absolute",
    zIndex: -1,
  },
  stepNumLeft: {
    left: 0,
  },
  stepNumRight: {
    right: 0,
  },
  stepRight: {
    flexDirection: "row-reverse",
    right: 0,
    textAlign: "right",
  },
  stepTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 13,
  },
  stepTitleContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    height: sizeOfStepNum,
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
});

export default TimelineStep;
