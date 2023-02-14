import * as React from "react";
import { StyleSheet, View } from "react-native";
import { LinearProgress } from "react-native-elements";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import { CommonText } from "../baseComponents";

interface SurveyQuestionsPaginationProps {
  currentQuestionIndex: number;
  totalNumberOfQuestions: number;
}

const SurveyQuestionsPagination: React.FC<SurveyQuestionsPaginationProps> = ({
  currentQuestionIndex,
  totalNumberOfQuestions,
}) => {
  const progressValue = currentQuestionIndex / totalNumberOfQuestions;

  return (
    <View
      style={styles.mainContainer}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden={true}
    >
      <CommonText
        style={{
          fontWeight: "bold",
          marginBottom: Margins.light,
        }}
      >
        {Labels.accessibility.survey.question} {currentQuestionIndex}{" "}
        {Labels.accessibility.survey.onTotalQuestion} {totalNumberOfQuestions}
      </CommonText>
      <LinearProgress
        color={Colors.primaryBlueDark}
        value={progressValue}
        variant="determinate"
        trackColor={Colors.primaryBlueLight}
        style={styles.progressBar}
      />
      <View style={styles.textView}>
        <CommonText>1</CommonText>
        <CommonText>{totalNumberOfQuestions}</CommonText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hideNumber: {
    color: "transparent",
  },
  mainContainer: {
    marginHorizontal: Margins.largest,
    marginVertical: Margins.smaller,
  },
  progressBar: {
    height: Sizes.xxxxs,
  },
  textStyle: {
    fontWeight: FontWeight.bold,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SurveyQuestionsPagination;
