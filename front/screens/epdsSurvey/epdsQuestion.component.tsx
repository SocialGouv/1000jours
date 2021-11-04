import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";

import Checkbox from "../../components/base/checkbox.component";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { FontWeight, Labels, Paddings, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { TrackerUtils } from "../../utils";

interface Props {
  questionAndAnswers: EpdsQuestionAndAnswers;
  totalNumberOfQuestions: number;
  updatePressedAnswer: (answer: EpdsAnswer) => void;
}

const EpdsQuestion: React.FC<Props> = ({
  questionAndAnswers,
  totalNumberOfQuestions,
  updatePressedAnswer,
}) => {
  const { trackScreenView } = useMatomo();
  const numberLabel = `${Labels.accessibility.epds.question} ${questionAndAnswers.questionNumber} ${Labels.accessibility.epds.onTotalQuestion} ${totalNumberOfQuestions}`;

  return (
    <View style={[styles.swipeView, styles.justifyContentCenter]}>
      <View style={[styles.swipeViewMargin, styles.paddingRight]}>
        <View style={{ alignItems: "baseline", flexDirection: "row" }}>
          <CommonText
            style={styles.stepNum}
            allowFontScaling={false}
            accessibilityLabel={numberLabel}
          >
            {questionAndAnswers.questionNumber}
          </CommonText>
          <CommonText style={styles.question}>
            {questionAndAnswers.question}
          </CommonText>
        </View>
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
    </View>
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
  stepNum: {
    color: Colors.primaryBlueLight,
    fontSize: Sizes.xxxxl,
    fontWeight: "bold",
    paddingBottom: Paddings.smallest,
  },
  swipeView: {
    width,
  },
  swipeViewMargin: {
    marginHorizontal: "10%",
  },
});

export default EpdsQuestion;
