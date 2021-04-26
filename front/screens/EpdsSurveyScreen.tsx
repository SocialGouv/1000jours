import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import Button from "../components/form/Button";
import Checkbox from "../components/form/Checkbox";
import Icomoon, { IcomoonIcons } from "../components/Icomoon";
import { CommonText } from "../components/StyledText";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import { FontWeight } from "../constants/Layout";
import type { RootStackParamList } from "../types";
import BackButton from "../components/BackButton";
import EpdsQuestion from "../components/epdsSurvey/EpdsQuestion";
import EpdsFooter from "../components/epdsSurvey/EpdsFooter";

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
  isChecked: boolean;
}

const EpdsSurveyScreen: FC<Props> = ({ navigation }) => {
  const constQuestionsAndAnswers: QuestionAndAnswers[] = [
    {
      question: Labels.epdsSurvey.questionsAnswers[0].question,
      answers: [
        {
          id: 0,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer1
        },
        {
          id: 1,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer2
        },
        {
          id: 2,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer3
        },
        {
          id: 3,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[0].answer4
        }
      ]
    },
    {
      question: Labels.epdsSurvey.questionsAnswers[1].question,
      answers: [
        {
          id: 0,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer1
        },
        {
          id: 1,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer2
        },
        {
          id: 2,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer3
        },
        {
          id: 3,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[1].answer4
        }
      ]
    },
    {
      question: Labels.epdsSurvey.questionsAnswers[2].question,
      answers: [
        {
          id: 0,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer1
        },
        {
          id: 1,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer2
        },
        {
          id: 2,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer3
        },
        {
          id: 3,
          isChecked: false,
          label: Labels.epdsSurvey.questionsAnswers[2].answer4
        }
      ]
    }
  ];

  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionAndAnswers[]
  >(constQuestionsAndAnswers);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [displayResult, setDisplayResult] = useState(false);

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
