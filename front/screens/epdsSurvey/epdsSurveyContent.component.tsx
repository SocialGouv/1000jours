import * as React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Answer, QuestionAndAnswers } from "./epdsSurveyScreen.component";
import EpdsFooter from "./epdsFooter.component";
import EpdsResult from "./epdsResult.component";
import { useRef, useState, useEffect } from "react";
import Labels from "../../constants/Labels";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import EpdsQuestion from "./epdsQuestion.component";
import { FontWeight } from "../../constants/Layout";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";

interface Props {
  questionAndAnswers: QuestionAndAnswers[];
}

const EpdsSurveyContent: React.FC<Props> = ({ questionAndAnswers }) => {
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionAndAnswers[]
  >(questionAndAnswers);
  const [displayResult, setDisplayResult] = useState(false);
  const [score, setScore] = useState(0);

  const questionIsAnswered =
    questionsAndAnswers[swiperCurrentIndex] != undefined &&
    questionsAndAnswers[swiperCurrentIndex].isAnswered;
  const showValidateButton =
    questionIsAnswered && swiperCurrentIndex === questionsAndAnswers.length - 1;

  const updatePressedAnswer = (selectedAnswer: Answer) => {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((question, questionIndex) => {
        const questionIsCurrent = questionIndex === swiperCurrentIndex;
        const answers = questionIsCurrent
          ? question.answers.map((answer) => {
              if (answer.id === selectedAnswer.id) {
                question.isAnswered = true;
                const currentQuestionPoints = getCurrentQuestionPoints(
                  question
                );
                const newScore = currentQuestionPoints
                  ? score - currentQuestionPoints + selectedAnswer.points
                  : score + selectedAnswer.points;
                setScore(newScore);
                return { ...answer, isChecked: !selectedAnswer.isChecked };
              } else {
                return { ...answer, isChecked: false };
              }
            })
          : question.answers;

        return { ...question, answers };
      })
    );
  };

  const getCurrentQuestionPoints = (question: QuestionAndAnswers) => {
    const choosenAnswers = question.answers.filter(
      (answer) => answer.isChecked
    );
    if (choosenAnswers && choosenAnswers.length === 1) {
      return choosenAnswers[0].points;
    }
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
              {Labels.epdsSurvey.description}
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
                showPagination
                disableGesture
                paginationDefaultColor="lightgray"
                paginationActiveColor={Colors.secondaryGreen}
                paginationStyleItem={styles.swipePaginationItem}
              >
                {questionsAndAnswers.map((questionView, questionIndex) => {
                  return (
                    <EpdsQuestion
                      questionAndAnswers={questionView}
                      questionIndex={questionIndex}
                      updatePressedAnswer={updatePressedAnswer}
                    />
                  );
                })}
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
        <EpdsResult
          result={score}
          backToSurvey={() => setDisplayResult(false)}
        />
      )}
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingHorizontal: 15
  },
  description: {
    color: Colors.commonText,
    fontSize: 12,
    fontWeight: FontWeight.medium,
    lineHeight: 20,
    paddingHorizontal: 15
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column"
  },
  mainContainer: {
    flex: 1,
    paddingTop: 30
  }
  ,mainView: {
    flex: 8
  },
  swipePaginationItem: {
    height: 5,
    marginHorizontal: 8,
    width: 32
  },
});

export default EpdsSurveyContent;
