import { range } from "lodash";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { Colors, Margins, Sizes } from "../../constants";

interface EpdsSurveyQuestionsPaginationProps {
  currentQuestionIndex: number;
  totalNumberOfQuestions: number;
}

const EpdsSurveyQuestionsPagination: React.FC<EpdsSurveyQuestionsPaginationProps> = ({
  currentQuestionIndex,
  totalNumberOfQuestions,
}) => {
  const questionAnsweredStyle = [styles.defaultStyle, styles.answeredColor];
  const questionNotAnsweredStyle = [
    styles.defaultStyle,
    styles.notAnsweredColor,
  ];

  return (
    <View style={styles.mainContainer}>
      {range(totalNumberOfQuestions).map((index) =>
        index < currentQuestionIndex ? (
          <View style={questionAnsweredStyle} />
        ) : (
          <View style={questionNotAnsweredStyle} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  answeredColor: {
    backgroundColor: Colors.primaryYellowDark,
  },
  defaultStyle: {
    flexGrow: 1,
  },
  mainContainer: {
    backgroundColor: Colors.primaryYellowLight,
    flexDirection: "row",
    height: Sizes.xxxxs,
    marginHorizontal: Margins.largest,
  },
  notAnsweredColor: {
    backgroundColor: Colors.primaryYellowLight,
  },
});

export default EpdsSurveyQuestionsPagination;
