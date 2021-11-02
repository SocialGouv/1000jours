import { range } from "lodash";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { LinearProgress } from "react-native-elements";

import { CommonText } from "../../components";
import { Colors, FontWeight, Margins, Sizes } from "../../constants";

interface EpdsSurveyQuestionsPaginationProps {
  currentQuestionIndex: number;
  totalNumberOfQuestions: number;
}

const EpdsSurveyQuestionsPagination: React.FC<EpdsSurveyQuestionsPaginationProps> =
  ({ currentQuestionIndex, totalNumberOfQuestions }) => {
    const progressValue = currentQuestionIndex / totalNumberOfQuestions;
    const hideNumber = (index: number) =>
      index != currentQuestionIndex - 1 && index != totalNumberOfQuestions - 1;

    const displayNumber = () => {
      return range(totalNumberOfQuestions).map((index) => (
        <CommonText
          style={[
            styles.textStyle,
            hideNumber(index) ? styles.hideNumber : null,
          ]}
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          {index + 1}
        </CommonText>
      ));
    };

    return (
      <View
        style={styles.mainContainer}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden={true}
      >
        <LinearProgress
          color={Colors.primaryYellowVeryDark}
          value={progressValue}
          variant="determinate"
          trackColor={Colors.primaryYellowLight}
          style={styles.progressBar}
        />
        <View style={styles.textView}>{displayNumber()}</View>
      </View>
    );
  };

const styles = StyleSheet.create({
  hideNumber: {
    color: "transparent",
  },
  mainContainer: {
    marginHorizontal: Margins.largest,
  },
  progressBar: {
    height: Sizes.xxxxs,
  },
  textStyle: {
    color: Colors.primaryYellowVeryDark,
    fontWeight: FontWeight.bold,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EpdsSurveyQuestionsPagination;
