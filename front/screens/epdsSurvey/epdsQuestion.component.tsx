import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";

import Checkbox from "../../components/base/checkbox.component";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { FontWeight, Paddings, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { TrackerUtils } from "../../utils";

interface Props {
  questionAndAnswers: EpdsQuestionAndAnswers;
  updatePressedAnswer: (answer: EpdsAnswer) => void;
}

const EpdsQuestion: React.FC<Props> = ({
  questionAndAnswers,
  updatePressedAnswer,
}) => {
  const { trackScreenView } = useMatomo();
  return (
    <ScrollView
      style={styles.swipeView}
      contentContainerStyle={styles.justifyContentCenter}
    >
      <View style={[styles.swipeViewMargin, styles.paddingRight]}>
        <CommonText style={styles.question}>
          {questionAndAnswers.questionNumber}. {questionAndAnswers.question}
        </CommonText>
        <View style={styles.paddingRight}>
          {questionAndAnswers.answers.map((answer, answerIndex) => (
            <Checkbox
              key={answerIndex}
              labelSize={Sizes.xs}
              title={answer.label}
              checked={answer.isChecked}
              onPress={() => {
                updatePressedAnswer(answer);
                trackScreenView(
                  `${TrackerUtils.TrackingEvent.EPDS} - question n°${questionAndAnswers.questionNumber} - case cochée`
                );
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  paddingRight: {
    paddingRight: Paddings.light,
  },
  question: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.smaller,
  },
  swipeView: {
    width,
  },
  swipeViewMargin: {
    marginHorizontal: "10%",
  },
});

export default EpdsQuestion;
