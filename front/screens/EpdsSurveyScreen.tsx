import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useRef, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import Button from "../components/form/Button";
import Icomoon, { IcomoonIcons } from "../components/Icomoon";
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

  // const QUESTIONNAIRE_EPDS = gql`
  //   query QuestionsReponses {
  //     questionnaireEpds {
  //       ordre
  //       libelle
  //       reponse_1_libelle
  //       reponse_1_points
  //       reponse_2_libelle
  //       reponse_2_points
  //       reponse_3_libelle
  //       reponse_3_points
  //       reponse_4_libelle
  //       reponse_4_points
  //     }
  //   }
  // `;
  // const { loading, error, data } = useQuery(QUESTIONNAIRE_EPDS, {
  //   fetchPolicy: "no-cache",
  // });

  // if (loading) { return <ActivityIndicator size="large" />};
  // if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

  // const questions = (data as { questionnaireEpds: QuestionnaireEpds[] });

  const constQuestionsAndAnswers: QuestionAndAnswers[] = [
    {
      question: Labels.epdsSurvey.questionsAnswers[0].question,
      answers: [
        {
          id: 0,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer1,
          points: 0
        },
        {
          id: 1,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer2,
          points: 1
        },
        {
          id: 2,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer3,
          points: 2
        },
        {
          id: 3,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer4,
          points: 3
        }
      ]
    },
    {
      question: Labels.epdsSurvey.questionsAnswers[1].question,
      answers: [
        {
          id: 0,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer1,
          points: 0
        },
        {
          id: 1,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer2,
          points: 1
        },
        {
          id: 2,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer3,
          points: 2
        },
        {
          id: 3,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer4,
          points: 3
        }
      ]
    },
    {
      question: Labels.epdsSurvey.questionsAnswers[2].question,
      answers: [
        {
          id: 0,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer1,
          points: 3
        },
        {
          id: 1,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer2,
          points: 2
        },
        {
          id: 2,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer3,
          points: 1
        },
        {
          id: 3,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer4,
          points: 0
        }
      ]
    }
  ];

  // if (questions) {
  //   questions.questionnaireEpds.forEach((element) => {
  //     const answers = [
  //       {
  //         id: 0,
  //         isChecked: false,
  //         label: element.reponse_1_libelle,
  //         points: element.reponse_1_points,
  //       },
  //       {
  //         id: 1,
  //         isChecked: false,
  //         label: element.reponse_2_libelle,
  //         points: element.reponse_2_points,
  //       },
  //       {
  //         id: 2,
  //         isChecked: false,
  //         label: element.reponse_3_libelle,
  //         points: element.reponse_3_points,
  //       },
  //       {
  //         id: 3,
  //         isChecked: false,
  //         label: element.reponse_4_libelle,
  //         points: element.reponse_4_points,
  //       }
  //     ];

  //     const questionAndAnswers: QuestionAndAnswers = {
  //       question: element.libelle,
  //       answers,
  //       isAnswered: false,
  //     };

  //     constQuestionsAndAnswers.push(questionAndAnswers);
  //   });
  // }

  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [displayResult, setDisplayResult] = useState(false);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<QuestionAndAnswers[]>(constQuestionsAndAnswers);

  const updatePressedAnswer = (selectedAnswer: Answer) => {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((question, questionIndex) => {
        const questionIsCurrent = questionIndex === swiperCurrentIndex;
        const answers = questionIsCurrent
          ? question.answers.map((answer) => {
              if (answer.id === selectedAnswer.id) {
                question.isAnswered = true;
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

  // const allIsCreated = questionsAndAnswers && swiperCurrentIndex;
  const questionIsAnswered = questionsAndAnswers[swiperCurrentIndex].isAnswered;
  const showValidateButton =
    questionIsAnswered && swiperCurrentIndex === questionsAndAnswers.length - 1;

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
        <View>
          <CommonText style={styles.title}>
            {Labels.epdsSurvey.title}
          </CommonText>
          <CommonText style={styles.description}>
            {Labels.epdsSurvey.description}
          </CommonText>
          <CommonText style={[styles.description]}>Résultat</CommonText>
          <Button
            title={Labels.buttons.back}
            rounded={false}
            disabled={false}
            icon={
              <Icomoon
                name={IcomoonIcons.retour}
                size={14}
                color={Colors.primaryBlue}
              />
            }
            action={() => setDisplayResult(false)}
          />
        </View>
      )}
    </View>
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