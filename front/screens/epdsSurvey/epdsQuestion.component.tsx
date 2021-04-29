import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { View } from "../../components/Themed";
import { CommonText } from "../../components/StyledText";
import Checkbox from "../../components/form/Checkbox";
import { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";

interface Props {
  questionAndAnswers: EpdsQuestionAndAnswers;
  updatePressedAnswer: (answer: EpdsAnswer) => void;
}

const EpdsQuestion: React.FC<Props> = ({
  questionAndAnswers,
  updatePressedAnswer
}) => {
  return (
    <View style={[styles.swipeView, styles.justifyContentCenter]}>
      <View style={styles.swipeViewMargin}>
        <CommonText style={styles.title}>
          {questionAndAnswers.question}
        </CommonText>
        {questionAndAnswers.answers.map((answer, answerIndex) => (
          <Checkbox
            key={answerIndex}
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
    justifyContent: "center"
  },
  swipeView: {
    width
  },
  swipeViewMargin: {
    margin: "10%"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingHorizontal: 15
  }
});

export default EpdsQuestion;
