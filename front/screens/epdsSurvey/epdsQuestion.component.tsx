import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";

import Checkbox from "../../components/form/Checkbox";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { FontWeight, Paddings, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";

interface Props {
  questionAndAnswers: EpdsQuestionAndAnswers;
  updatePressedAnswer: (answer: EpdsAnswer) => void;
}

const EpdsQuestion: React.FC<Props> = ({
  questionAndAnswers,
  updatePressedAnswer,
}) => {
  return (
    <View style={[styles.swipeView, styles.justifyContentCenter]}>
      <View style={styles.swipeViewMargin}>
        <CommonText style={styles.question}>
          {questionAndAnswers.questionNumber}. {questionAndAnswers.question}
        </CommonText>
        {questionAndAnswers.answers.map((answer, answerIndex) => (
          <Checkbox
            key={answerIndex}
            labelSize={Sizes.xs}
            title={answer.label}
            checked={answer.isChecked}
            onPress={() => {
              updatePressedAnswer(answer);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.default,
  },
  swipeView: {
    width,
  },
  swipeViewMargin: {
    margin: "10%",
  },
});

export default EpdsQuestion;
