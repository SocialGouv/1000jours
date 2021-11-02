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

    return (
      <View style={styles.mainContainer}>
        <LinearProgress
          color={Colors.primaryYellowVeryDark}
          value={progressValue}
          variant="determinate"
          trackColor={Colors.primaryYellowLight}
          style={styles.progressBar}
        />
        <View style={styles.textView}>
          <CommonText style={styles.textStyle}>1</CommonText>
          <CommonText style={styles.textStyle}>
            {totalNumberOfQuestions}
          </CommonText>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
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
