import * as React from "react";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import { FontWeight } from "../../constants/Layout";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils } from "../../utils";
import EpdsFooter from "./epdsFooter.component";
import EpdsQuestion from "./epdsQuestion.component";
import EpdsResult from "./epdsResult.component";

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
    <View style={[styles.mainContainer, styles.flexColumn]}>
      {!displayResult ? (
        <>
          <View>
            <CommonText style={[styles.title]}>
              {Labels.epdsSurvey.title}
            </CommonText>
            <CommonText style={styles.description}>
              {Labels.epdsSurvey.instruction}
            </CommonText>
          </View>
          <View style={styles.mainView}>
            <ScrollView>
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
            </ScrollView>
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
  description: {
    color: Colors.commonText,
    fontSize: 12,
    fontWeight: FontWeight.medium,
    lineHeight: 20,
    paddingHorizontal: 15,
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
  mainContainer: {
    flex: 1,
    paddingTop: 30,
  },
  mainView: {
    flex: 8,
  },
  swipePaginationItem: {
    height: 5,
    marginHorizontal: 8,
    width: 20,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
});

export default EpdsSurveyContent;
