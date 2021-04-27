import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Answer, QuestionAndAnswers } from "../../screens/EpdsSurveyScreen";
import Checkbox from "../form/Checkbox";
import { CommonText } from "../StyledText";
import { View } from "../Themed";

interface Props {
  questionAndAnswers: QuestionAndAnswers;
  questionIndex: number;
  updatePressedAnswer: (answer: Answer) => void;
}

const EpdsQuestion: React.FC<Props> = ({
  questionAndAnswers,
  questionIndex,
  updatePressedAnswer
}) => {
  return (
    <View
      style={[styles.swipeView, styles.justifyContentCenter]}
      key={questionIndex}
    >
      <View style={styles.swipeViewMargin}>
        <CommonText style={[styles.title, styles.textAlignCenter]}>
          {questionAndAnswers.question}
        </CommonText>
        {questionAndAnswers.answers.map((answer, answerIndex) => {
          return (
            <Checkbox
              key={answerIndex}
              title={answer.label}
              checked={answer.isChecked}
              onPress={() => {
                updatePressedAnswer(answer);
              }}
            />
          );
        })}
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
