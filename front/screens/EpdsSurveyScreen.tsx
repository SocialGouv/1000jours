import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useRef, useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { CommonText } from "../components/StyledText";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import { FontWeight } from "../constants/Layout";
import type { QuestionnaireEpds, RootStackParamList } from "../types";
import EpdsQuestion from "../components/epdsSurvey/EpdsQuestion";
import EpdsFooter from "../components/epdsSurvey/EpdsFooter";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import EpdsResult from "../components/epdsSurvey/EpdsResult";
import EpdsSurveyContent from "../components/epdsSurvey/EpdsSurveyContent";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "onboarding"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export interface QuestionAndAnswers {
  question: string;
  answers: Answer[];
  isAnswered?: boolean;
}

export interface Answer {
  id: number;
  label: string;
  points: number;
  isChecked: boolean;
}

const EpdsSurveyScreen: FC<Props> = ({ navigation }) => {
  // const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  // const swiperRef = useRef<SwiperFlatList>(null);
  // const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
  //   QuestionAndAnswers[]
  // >([]);
  // const [displayResult, setDisplayResult] = useState(false);
  // const [score, setScore] = useState(0);

  const QUESTIONNAIRE_EPDS = gql`
    query QuestionsReponses {
      questionnaireEpds {
        ordre
        libelle
        reponse_1_libelle
        reponse_1_points
        reponse_2_libelle
        reponse_2_points
        reponse_3_libelle
        reponse_3_points
        reponse_4_libelle
        reponse_4_points
      }
    }
  `;
  const { loading, error, data } = useQuery(QUESTIONNAIRE_EPDS, {
    fetchPolicy: "no-cache"
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

  const fetchedData = (data as { questionnaireEpds: QuestionnaireEpds[] })
       .questionnaireEpds;
  const tempQuestionsAndAnswers: QuestionAndAnswers[] =
      fetchedData &&
      fetchedData.map((element) => {
        return {
          question: element.libelle,
          answers: [
            {
              id: 0,
              label: element.reponse_1_libelle,
              points: element.reponse_1_points,
              isChecked: false
            },
            {
              id: 1,
              label: element.reponse_2_libelle,
              points: element.reponse_2_points,
              isChecked: false
            },
            {
              id: 2,
              label: element.reponse_3_libelle,
              points: element.reponse_3_points,
              isChecked: false
            },
            {
              id: 3,
              label: element.reponse_4_libelle,
              points: element.reponse_4_points,
              isChecked: false
            }
          ]
        };
      });

  // useEffect(() => {
  //   const fetchedData = data && (data as { questionnaireEpds: QuestionnaireEpds[] })
  //     .questionnaireEpds;
  //   const tempQuestionsAndAnswers: QuestionAndAnswers[] =
  //     fetchedData &&
  //     fetchedData.map((element) => {
  //       return {
  //         question: element.libelle,
  //         answers: [
  //           {
  //             id: 0,
  //             label: element.reponse_1_libelle,
  //             points: element.reponse_1_points,
  //             isChecked: false
  //           },
  //           {
  //             id: 1,
  //             label: element.reponse_2_libelle,
  //             points: element.reponse_2_points,
  //             isChecked: false
  //           },
  //           {
  //             id: 2,
  //             label: element.reponse_3_libelle,
  //             points: element.reponse_3_points,
  //             isChecked: false
  //           },
  //           {
  //             id: 3,
  //             label: element.reponse_4_libelle,
  //             points: element.reponse_4_points,
  //             isChecked: false
  //           }
  //         ]
  //       };
  //     });
  //   setQuestionsAndAnswers(tempQuestionsAndAnswers);
  // }, [data]);

  // const updatePressedAnswer = (selectedAnswer: Answer) => {
  //   setQuestionsAndAnswers(
  //     questionsAndAnswers.map((question, questionIndex) => {
  //       const questionIsCurrent = questionIndex === swiperCurrentIndex;
  //       const answers = questionIsCurrent
  //         ? question.answers.map((answer) => {
  //             if (answer.id === selectedAnswer.id) {
  //               question.isAnswered = true;
  //               const currentQuestionPoints = getCurrentQuestionPoints(
  //                 question
  //               );
  //               const newScore = currentQuestionPoints
  //                 ? score - currentQuestionPoints + selectedAnswer.points
  //                 : score + selectedAnswer.points;
  //               setScore(newScore);
  //               return { ...answer, isChecked: !selectedAnswer.isChecked };
  //             } else {
  //               return { ...answer, isChecked: false };
  //             }
  //           })
  //         : question.answers;

  //       return { ...question, answers };
  //     })
  //   );
  // };

  // const getCurrentQuestionPoints = (question: QuestionAndAnswers) => {
  //   const choosenAnswers = question.answers.filter(
  //     (answer) => answer.isChecked
  //   );
  //   if (choosenAnswers && choosenAnswers.length === 1) {
  //     return choosenAnswers[0].points;
  //   }
  // };

  // const questionIsAnswered =
  //   questionsAndAnswers[swiperCurrentIndex] != undefined &&
  //   questionsAndAnswers[swiperCurrentIndex].isAnswered;
  // const showValidateButton =
  //   questionIsAnswered &&
  //   swiperCurrentIndex === questionsAndAnswers.length - 1;

  return (
    <EpdsSurveyContent questionAndAnswers={tempQuestionsAndAnswers}/>
    // <View style={[styles.mainContainer, styles.flexColumn]}>
    //   {!displayResult ? (
    //     <>
    //       <View>
    //         <CommonText style={[styles.title]}>
    //           {Labels.epdsSurvey.title}
    //         </CommonText>
    //         <CommonText style={styles.description}>
    //           {Labels.epdsSurvey.description}
    //         </CommonText>
    //         <CommonText style={styles.description}>
    //           {Labels.epdsSurvey.instruction}
    //         </CommonText>
    //       </View>
    //       <View style={styles.mainView}>
    //         <ScrollView>
    //           <SwiperFlatList
    //             ref={swiperRef}
    //             onChangeIndex={({ index }) => {
    //               setSwiperCurrentIndex(index);
    //             }}
    //             autoplay={false}
    //             showPagination
    //             disableGesture
    //             paginationDefaultColor="lightgray"
    //             paginationActiveColor={Colors.secondaryGreen}
    //             paginationStyleItem={styles.swipePaginationItem}
    //           >
    //             {questionsAndAnswers.map((questionView, questionIndex) => {
    //               return (
    //                 <EpdsQuestion
    //                   questionAndAnswers={questionView}
    //                   questionIndex={questionIndex}
    //                   updatePressedAnswer={updatePressedAnswer}
    //                 />
    //               );
    //             })}
    //           </SwiperFlatList>
    //         </ScrollView>
    //       </View>
    //       <EpdsFooter
    //         swiperCurrentIndex={swiperCurrentIndex}
    //         swiperRef={swiperRef}
    //         showValidateButton={showValidateButton}
    //         questionIsAnswered={questionIsAnswered}
    //         setDisplayResult={setDisplayResult}
    //       />
    //     </>
    //   ) : (
    //     <EpdsResult
    //       result={score}
    //       backToSurvey={() => setDisplayResult(false)}
    //     />
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  appName: {
    color: Colors.primaryBlueDark,
    fontSize: 25,
    fontWeight: FontWeight.bold
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
  },
  mainView: {
    flex: 8
  },
  swipePaginationItem: {
    height: 5,
    marginHorizontal: 8,
    width: 32
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingHorizontal: 15
  }
});

export default EpdsSurveyScreen;
