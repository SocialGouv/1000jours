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
import { isFirstLaunchKey } from "../storage/storage-keys";
import { storeObjectValue } from "../storage/storage-utils";
import type { RootStackParamList } from "../types";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "onboarding"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export type Answer = {
  id: number;
  label: string;
  isChecked: boolean;
};
interface QuestionAndAnswers {
  question: string;
  answers: Answer[];
  isAnswered?: boolean;
}



const EpdsSurveyScreen: FC<Props> = ({ navigation }) => {
  const constQuestionsAndAnswers: QuestionAndAnswers[] = [
    {
      question: Labels.epdsSurvey.questionsAnswers[0].question,
      answers: [
        { id: 0, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[0].answer1 },
        { id: 1, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[0].answer2 },
        { id: 2, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[0].answer3 },
        { id: 3, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[0].answer4 },
      ],
    },
    {
      question: Labels.epdsSurvey.questionsAnswers[1].question,
      answers: [
        { id: 0, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[1].answer1 },
        { id: 1, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[1].answer2 },
        { id: 2, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[1].answer3 },
        { id: 3, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[1].answer4 },
      ],
    },
    {
      question: Labels.epdsSurvey.questionsAnswers[2].question,
      answers: [
        { id: 0, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[2].answer1 },
        { id: 1, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[2].answer2 },
        { id: 2, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[2].answer3 },
        { id: 3, isChecked: false, label: Labels.epdsSurvey.questionsAnswers[2].answer4 },
      ],
    }
  ];
  
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<QuestionAndAnswers[]>(
    constQuestionsAndAnswers
  );
  const swiperRef = useRef<SwiperFlatList>(null);

  const navigateToProfile = () => {
    void storeObjectValue(isFirstLaunchKey, false);
    navigation.navigate("profile");
  };

  const updatePressedAnswer = (answerBis: Answer) => {
    setQuestionsAndAnswers(() => {
      return questionsAndAnswers.map((question, questionIndex) => {
        if (questionIndex === swiperCurrentIndex) {
          question.answers = question.answers.map((answer) => {
            if (answer.id === answerBis.id) {
              question.isAnswered = true;
              return { ...answer, isChecked: !answerBis.isChecked };
            } else {
              return { ...answer, isChecked: false };
            }
          });
        }
        return question;
      });
    });
  }

  return (
    <View style={[styles.mainContainer, styles.flexColumn]}>
      <View>
        <CommonText style={[styles.title]}>{Labels.epdsSurvey.title}</CommonText>
        <CommonText style={[styles.description]}>{Labels.epdsSurvey.description}</CommonText>
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
                <View
                  style={[styles.swipeView, styles.justifyContentCenter]}
                  key={questionIndex}
                >
                  <View style={[styles.swipeViewMargin]}>
                    <CommonText style={[styles.title, styles.textAlignCenter]}>
                      {questionView.question}
                    </CommonText>
                    {questionView.answers.map((answer, answerIndex) => {
                      return (
                      <Checkbox
                          key={answerIndex}
                          title={answer.label}
                          checked={answer.isChecked}
                          onPress={() => {
                            updatePressedAnswer(answer);
                          }}
                      />
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </SwiperFlatList>
        </ScrollView>
      </View>
      <View style={[styles.footer, styles.justifyContentCenter]}>
        <View style={[styles.buttonsContainer, styles.justifyContentCenter]}>
          <View style={[styles.buttonContainer]}>
            {swiperCurrentIndex > 0 && (
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
                action={() => {
                  swiperRef.current?.scrollToIndex({
                    index: swiperCurrentIndex - 1
                  });
                }}
              />
            )}
          </View>
          <View style={[styles.buttonContainer]}>
            {questionsAndAnswers[swiperCurrentIndex].isAnswered && swiperCurrentIndex === questionsAndAnswers.length - 1 ? (
              <View style={[styles.justifyContentCenter]}>
                <Button
                  title={Labels.buttons.validate}
                  rounded={true}
                  disabled={false}
                  action={navigateToProfile}
                />
              </View>
            ) :  questionsAndAnswers[swiperCurrentIndex].isAnswered && (
              <Button
                title={Labels.buttons.next}
                rounded={false}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.suivant}
                    size={14}
                    color={Colors.primaryBlue}
                  />
                }
                action={() => {
                  swiperRef.current?.scrollToIndex({
                    index: swiperCurrentIndex + 1
                  });
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  appName: {
    color: Colors.primaryBlueDark,
    fontSize: 25,
    fontWeight: FontWeight.bold
  },
  buttonContainer: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: "row"
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
  footer: {
    flex: 1,
    paddingVertical: 10
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center"
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
  swipeView: {
    width
  },
  swipeViewMargin: {
    margin: "10%"
  },
  textAlignCenter: {
    textAlign: "center"
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
