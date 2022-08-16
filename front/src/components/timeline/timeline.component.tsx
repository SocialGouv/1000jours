import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
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

const Timeline: FC<TimelineProps> = ({ steps, navigation, scrollTo }) => {
  // Compte le nombre de step sans la première et la dernière
  // car elles ont un rendu un peu différent (-1 pour avoir le nombre de step total et -2 pour la première et dernière step).
  const numberOfStepsWithoutTheFirstAndLast = steps.length - 1 - 2;

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
      <ParenthequeItem navigation={navigation} />
      <View style={[styles.timelineStepContainer]}>
        <View style={[styles.timelineContainer]}>
          <View
            style={[
              styles.timelineBlock,
              styles.timelineBlockRight,
              styles.timelineBlockFirst,
            ]}
          />
          {_.range(numberOfStepsWithoutTheFirstAndLast).map((index) => (
            <View
              style={[
                styles.timelineBlock,
                index % 2 === 0
                  ? styles.timelineBlockLeft
                  : styles.timelineBlockRight,
              ]}
              key={index}
            />
          ))}
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
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timelineBlock: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: Colors.primaryYellow,
    borderStyle: "solid",
    borderTopWidth: 1,
    height: Sizes.timelineBlock,
    marginTop: -1,
  },
  timelineBlockFirst: {
    marginTop: 0,
  },
  timelineBlockLeft: {
    borderBottomLeftRadius: Sizes.timelineBlock / 2,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: Sizes.timelineBlock / 2,
    marginLeft: Sizes.step / 4,
    marginRight: Sizes.step,
  },
  timelineBlockRight: {
    borderBottomRightRadius: Sizes.timelineBlock / 2,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopRightRadius: Sizes.timelineBlock / 2,
    marginLeft: Sizes.step,
    marginRight: Sizes.step / 4,
  },
  timelineContainer: {
    flex: 1,
    flexDirection: "column",
  },
  timelineLibraryBlock: {
    borderBottomWidth: 0,
    borderColor: Colors.primaryBlue,
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  timelineStepContainer: {
    marginBottom: Sizes.step,
    marginLeft: "5%",
    marginRight: "5%",
  },
  timelineStepLibraryContainer: {
    marginBottom: 0,
    marginTop: Sizes.step,
  },
});

export default Timeline;
