import * as React from "react";
import { StyleSheet, View } from "react-native";
import { LinearProgress } from "react-native-elements";

import { CommonText } from "../../components";
import { Colors, FontWeight, Labels, Margins, Sizes } from "../../constants";

interface EpdsSurveyQuestionsPaginationProps {
  currentQuestionIndex: number;
  totalNumberOfQuestions: number;
}

const EpdsSurveyQuestionsPagination: React.FC<
  EpdsSurveyQuestionsPaginationProps
> = ({ currentQuestionIndex, totalNumberOfQuestions }) => {
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
        {Labels.accessibility.epds.question} {currentQuestionIndex}{" "}
        {Labels.accessibility.epds.onTotalQuestion} {totalNumberOfQuestions}
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

export default EpdsSurveyQuestionsPagination;
