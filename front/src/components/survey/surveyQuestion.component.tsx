import * as React from "react";
import { useCallback, useState } from "react";
import {
  AccessibilityInfo,
  Dimensions,
  findNodeHandle,
  StyleSheet,
  Text,
} from "react-native";
import { Image } from "react-native-elements";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { SurveyAnswer, SurveyQuestionAndAnswers } from "../../type";
import type { TrackingEvent } from "../../utils/tracking/tracker.util";
import {
  CommonText,
  GreenRadioButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  questionAndAnswers: SurveyQuestionAndAnswers;
  totalNumberOfQuestions: number;
  updatePressedAnswer: (answer: SurveyAnswer) => void;
  nextButtonState: boolean;
  trackingEvent: TrackingEvent;
}

const SurveyQuestion: React.FC<Props> = ({
  questionAndAnswers,
  totalNumberOfQuestions,
  updatePressedAnswer,
  nextButtonState,
  trackingEvent,
}) => {
  const [trackerAction, setTrackerAction] = useState("");

  const numberLabel = `${Labels.accessibility.survey.question} ${questionAndAnswers.questionNumber} ${Labels.accessibility.survey.onTotalQuestion} ${totalNumberOfQuestions}`;
  const questionNumberRef = React.useRef<Text>(null);

  React.useEffect(() => {
    if (questionAndAnswers.questionNumber > 1) {
      setAccessibilityFocus();
    }
  }, [nextButtonState, questionAndAnswers.questionNumber]);

  const setAccessibilityFocus = () => {
    if (questionNumberRef.current) {
      const reactTag = findNodeHandle(questionNumberRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  const onAnswerPressed = useCallback(
    (answer: SurveyAnswer) => () => {
      updatePressedAnswer(answer);
      setTrackerAction(
        `${trackingEvent} - question n°${questionAndAnswers.questionNumber} - case cochée`
      );
    },
    [questionAndAnswers.questionNumber, trackingEvent, updatePressedAnswer]
  );

  return (
    <View style={[styles.swipeView, styles.justifyContentCenter]}>
      <TrackerHandler actionName={trackerAction} />
      {questionAndAnswers.title ? (
        <View style={[styles.swipeViewMargin, styles.questionTitleContainer]}>
          <View style={styles.questionTitleIconView}>
            <Icomoon
              name={IcomoonIcons.postPartum}
              size={Sizes.xxl}
              style={styles.questionTitleIcon}
            />
          </View>
          <SecondaryText style={styles.questionTitle}>
            {questionAndAnswers.title}
          </SecondaryText>
        </View>
      ) : null}
      <View style={[styles.swipeViewMargin, styles.paddingRight]}>
        <View style={styles.flexRow}>
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
          {questionAndAnswers.image && (
            <Image
              width={questionAndAnswers.image.width}
              height={questionAndAnswers.image.height}
              source={{ uri: questionAndAnswers.image.url }}
            />
          )}
        </View>
        <View style={styles.paddingRight}>
          {questionAndAnswers.answers.map((answer, answerIndex) => (
            <GreenRadioButton
              key={answerIndex}
              labelSize={Sizes.xs}
              title={answer.label}
              isChecked={answer.isChecked}
              onPress={onAnswerPressed(answer)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  paddingRight: {
    paddingRight: Paddings.light,
  },
  question: {
    alignSelf: "center",
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.smaller,
  },
  questionTitle: {
    color: Colors.primaryBlue,
    flex: 7,
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
    letterSpacing: 0,
    lineHeight: Sizes.lg,
    marginTop: Margins.smallest,
    textAlign: "left",
  },
  questionTitleContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.primaryBlue,
    flexDirection: "row",
    marginBottom: Paddings.larger,
    paddingBottom: Paddings.smaller,
  },
  questionTitleIcon: {
    color: Colors.primaryBlue,
  },
  questionTitleIconView: {
    flex: 1,
    justifyContent: "center",
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
    width: "80%",
  },
});

export default SurveyQuestion;
