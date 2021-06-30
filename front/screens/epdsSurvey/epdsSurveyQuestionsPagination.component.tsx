import { range } from "lodash";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { CommonText } from "../../components";
import { Colors, FontWeight, Margins, Sizes } from "../../constants";

interface EpdsSurveyQuestionsPaginationProps {
  currentQuestionIndex: number;
  totalNumberOfQuestions: number;
}

const EpdsSurveyQuestionsPagination: React.FC<EpdsSurveyQuestionsPaginationProps> =
  ({ currentQuestionIndex, totalNumberOfQuestions }) => {
    const questionAnsweredStyle = [styles.defaultStyle, styles.answeredColor];
    const questionNotAnsweredStyle = [
      styles.defaultStyle,
      styles.notAnsweredColor,
    ];

    return (
      <View style={styles.mainContainer}>
        <View style={styles.textView}>
          <CommonText style={styles.textStyle}>1</CommonText>
          <CommonText style={styles.textStyle}>
            {totalNumberOfQuestions}
          </CommonText>
        </View>
        <View style={styles.gaugeView}>
          {range(totalNumberOfQuestions).map((index) => (
            <View
              key={index}
              style={
                index < currentQuestionIndex
                  ? questionAnsweredStyle
                  : questionNotAnsweredStyle
              }
            />
          ))}
        </View>
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
  gaugeView: {
    flexDirection: "row",
    height: Sizes.xxxxs,
  },
  mainContainer: {
    marginHorizontal: Margins.largest,
  },
  notAnsweredColor: {
    backgroundColor: Colors.primaryYellowLight,
  },
  textStyle: {
    color: Colors.primaryYellowDark,
    fontWeight: FontWeight.bold,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EpdsSurveyQuestionsPagination;
