import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { useCallback } from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";

import { Colors, Sizes } from "../../styles";
import type { Step, TabHomeParamList } from "../../types";
import { View } from "../baseComponents";
import ParenthequeItem from "../home/parenthequeItem.component";
import TimelineStep from "./timelineStep.component";

interface TimelineProps {
  steps: Step[];
  navigation: StackNavigationProp<TabHomeParamList, keyof TabHomeParamList>;
  scrollTo: (positionY: number) => void;
}

const BasicTimeline: FC<TimelineProps> = ({ steps, navigation, scrollTo }) => {
  const onTimelineStepPress = useCallback(
    (step: Step) => () => {
      navigation.navigate("articleList", { step });
    },
    [navigation]
  );

  const onTimelineStepLayout = useCallback(
    (event: LayoutChangeEvent, step: Step) => {
      if (step.active) {
        const { layout } = event.nativeEvent;
        scrollTo(layout.y);
      }
    },
    [scrollTo]
  );

  return (
    <>
      <ParenthequeItem navigation={navigation} isBasicTimeline={true} />
      <View style={styles.timelineStepContainer}>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
        {steps.map((step, index) => (
          <TimelineStep
            order={step.ordre}
            name={step.nom}
            index={index}
            isTheLast={index === steps.length - 1}
            key={index}
            active={step.active}
            onPress={onTimelineStepPress(step)}
            // eslint-disable-next-line react/jsx-no-bind
            onLayout={(event: LayoutChangeEvent) => {
              onTimelineStepLayout(event, step);
            }}
            isBasicTimeline={true}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    backgroundColor: Colors.primaryYellowDark,
    height: "100%",
    position: "absolute",
    width: 1,
  },
  lineContainer: {
    height: "100%",
    marginLeft: Sizes.step / 2,
    position: "absolute",
    width: 1,
  },
  timelineStepContainer: {
    marginBottom: Sizes.step,
  },
});

export default BasicTimeline;
