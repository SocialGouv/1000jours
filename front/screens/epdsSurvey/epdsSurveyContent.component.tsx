import * as React from "react";
import { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { EpdsFooter, EpdsQuestion, EpdsResult } from "..";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes
} from "../../constants";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils } from "../../utils";

interface Props {
  epdsSurvey: EpdsQuestionAndAnswers[];
}

const EpdsSurveyContent: React.FC<Props> = ({ epdsSurvey }) => {
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    EpdsQuestionAndAnswers[]
  >(epdsSurvey);
  const [displayResult, setDisplayResult] = useState(false);
  const [score, setScore] = useState(0);

  const questionIsAnswered =
    questionsAndAnswers[swiperCurrentIndex]?.isAnswered;
  const showValidateButton =
    questionIsAnswered && swiperCurrentIndex === questionsAndAnswers.length - 1;

  const updatePressedAnswer = (selectedAnswer: EpdsAnswer) => {
    const updatedSurvey = EpdsSurveyUtils.getUpdatedSurvey(
      questionsAndAnswers,
      swiperCurrentIndex,
      selectedAnswer
    );
    setQuestionsAndAnswers(updatedSurvey);
    setScore(EpdsSurveyUtils.getUpdatedScore(updatedSurvey));
  };

  return (
    <View style={styles.mainContainer}>
      {!displayResult ? (
        <>
          <View>
            <CommonText style={styles.instruction}>
              {Labels.epdsSurvey.instruction}
            </CommonText>
          </View>
          <View style={styles.flatListView}>
            <SwiperFlatList
              ref={swiperRef}
              onChangeIndex={({ index }) => {
                setSwiperCurrentIndex(index);
              }}
              autoplay={false}
              disableGesture
              paginationDefaultColor="lightgray"
              paginationActiveColor={Colors.secondaryGreen}
              paginationStyleItem={styles.swipePaginationItem}
            >
              {questionsAndAnswers.map((questionView, questionIndex) => (
                <View key={questionIndex}>
                  <EpdsQuestion
                    questionAndAnswers={questionView}
                    updatePressedAnswer={updatePressedAnswer}
                  />
                </View>
              ))}
            </SwiperFlatList>
          </View>
          <EpdsFooter
            swiperCurrentIndex={swiperCurrentIndex}
            swiperRef={swiperRef}
            showValidateButton={showValidateButton}
            questionIsAnswered={questionIsAnswered}
            setDisplayResult={setDisplayResult}
          />
        </>
      ) : (
        <EpdsResult result={score} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Paddings.larger
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.mmd,
    paddingHorizontal: Paddings.default
  },
  flatListView: {
    flex: 7
  },
  swipePaginationItem: {
    height: Sizes.xxxs,
    marginHorizontal: Margins.smaller,
    width: Sizes.mmd
  }
});

export default EpdsSurveyContent;
