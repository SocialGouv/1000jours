import type { FC } from "react";
import * as React from "react";
import { Image, StyleSheet } from "react-native";

import { Text, View } from "../Themed";

interface TimelineStepProps {
  title: string;
  icon: string;
  index: number;
  isTheLast: boolean;
}

const TimelineStep: FC<TimelineStepProps> = ({
  title,
  icon,
  index: listIndex,
  isTheLast,
}) => {
  const getStyles = (index: number, isLast: boolean) => {
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

  return (
    <View style={getStyles(listIndex, isTheLast)}>
      <Image style={[styles.stepIcon]} source={{ uri: icon }} />
      <Text
        style={[
          styles.stepTitle,
          isTheLast
            ? styles.stepLast
            : listIndex === 0
            ? styles.stepFirst
            : null,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  step: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    height: 80,
    position: "absolute",
  },
  stepFirst: {
    paddingBottom: 60,
  },
  stepIcon: {
    height: 80,
    width: 80,
  },
  stepLast: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 80,
  },
  stepLeft: {
    flexDirection: "row",
    left: 0,
    textAlign: "left",
  },
  stepRight: {
    flexDirection: "row-reverse",
    right: 0,
    textAlign: "right",
  },
  stepTitle: {
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default TimelineStep;
