import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import {
  AccessibilityInfo,
  Dimensions,
  findNodeHandle,
  StyleSheet,
  Text,
} from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Paddings, Sizes } from "../../styles";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { TrackerUtils } from "../../utils";
import { Checkbox, CommonText, View } from "../baseComponents";

interface Props {
  questionAndAnswers: EpdsQuestionAndAnswers;
  totalNumberOfQuestions: number;
  updatePressedAnswer: (answer: EpdsAnswer) => void;
  nextButtonState: boolean;
}

const EpdsQuestion: React.FC<Props> = ({
  questionAndAnswers,
  totalNumberOfQuestions,
  updatePressedAnswer,
  nextButtonState,
}) => {
  const { trackScreenView } = useMatomo();

  const numberLabel = `${Labels.accessibility.epds.question} ${questionAndAnswers.questionNumber} ${Labels.accessibility.epds.onTotalQuestion} ${totalNumberOfQuestions}`;
  const questionNumberRef = React.useRef<Text>(null);

  React.useEffect(() => {
    if (questionAndAnswers.questionNumber > 1) {
      setAccessibilityFocus();
    }
  }, [nextButtonState]);

  const setAccessibilityFocus = () => {
    if (questionNumberRef.current) {
      const reactTag = findNodeHandle(questionNumberRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  return (
    <View style={[styles.swipeView, styles.justifyContentCenter]}>
      <View style={[styles.swipeViewMargin, styles.paddingRight]}>
        <View style={{ alignItems: "baseline", flexDirection: "row" }}>
          <Text
            ref={questionNumberRef}
            style={styles.stepNum}
            allowFontScaling={false}
            accessibilityLabel={numberLabel}
          >
            {questionAndAnswers.questionNumber}
          </Text>
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
    marginEnd: "25%",
    marginStart: "10%",
  },
});

export default EpdsQuestion;
