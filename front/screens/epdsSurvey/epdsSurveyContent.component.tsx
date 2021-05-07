import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils, StorageUtils } from "../../utils";
import {
  EpdsFooter,
  EpdsLoadPreviousSurvey,
  EpdsQuestion,
  EpdsResult,
} from "..";

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
  const [surveyCanBeStarted, setSurveyCanBeStarted] = useState(false);

  useEffect(() => {
    const getPreviousSurvey = async () => {
      await Promise.all([
        StorageUtils.getObjectValue(
          StorageKeysConstants.epdsQuestionAndAnswersKey
        ),
        StorageUtils.getObjectValue(StorageKeysConstants.epdsQuestionIndexKey),
      ]).then((values) => {
        const previousQuestionsAndAnswers = values[0];
        const previousQuestionIndex = values[1];

        const previousDataSaved =
          Boolean(previousQuestionsAndAnswers) &&
          Boolean(previousQuestionIndex);
        setSurveyCanBeStarted(!previousDataSaved);
      });
    };
    void getPreviousSurvey();
  }, []);

  const getEpdsLoadPreviousSurveyReponse = async (startOver: boolean) => {
    if (startOver) {
      void EpdsSurveyUtils.removeEpdsStorageItems();
    } else {
      await Promise.all([
        StorageUtils.getObjectValue(
          StorageKeysConstants.epdsQuestionAndAnswersKey
        ),
        StorageUtils.getObjectValue(StorageKeysConstants.epdsQuestionIndexKey),
      ]).then((values) => {
        const questionAndAnswers = values[0] as EpdsQuestionAndAnswers[];
        const swiperIndex = values[1] as number;

        setQuestionsAndAnswers(questionAndAnswers);
        setSwiperCurrentIndex(swiperIndex);
      });
    }
    setSurveyCanBeStarted(true);
  };

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

  const saveCurrentSurvey = async (currentSwiperIndex: number) => {
    setSwiperCurrentIndex(currentSwiperIndex);
    await Promise.all([
      StorageUtils.storeObjectValue(
        StorageKeysConstants.epdsQuestionAndAnswersKey,
        questionsAndAnswers
      ),
      StorageUtils.storeObjectValue(
        StorageKeysConstants.epdsQuestionIndexKey,
        currentSwiperIndex
      ),
    ]);
  };

  const renderSurveyContent = () => {
    return (
      <>
        <View>
          <CommonText style={styles.instruction}>
            {Labels.epdsSurvey.instruction}
          </CommonText>
        </View>
        <View style={styles.flatListView}>
          <SwiperFlatList
            ref={swiperRef}
            index={swiperCurrentIndex}
            onChangeIndex={({ index }) => {
              void saveCurrentSurvey(index);
            }}
            autoplay={false}
            disableGesture
            showPagination
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
    );
  };

  const renderSurveyOrLoadPreviousSurveyScreen = () => {
    return surveyCanBeStarted ? (
      renderSurveyContent()
    ) : (
      <EpdsLoadPreviousSurvey
        startSurveyOver={getEpdsLoadPreviousSurveyReponse}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      {!displayResult ? (
        renderSurveyOrLoadPreviousSurveyScreen()
      ) : (
        <EpdsResult result={score} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListView: {
    flex: 7,
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.mmd,
    paddingHorizontal: Paddings.default,
  },
  mainContainer: {
    flex: 1,
    paddingTop: Paddings.larger,
  },
  swipePaginationItem: {
    height: Sizes.xxxs,
    marginHorizontal: Margins.smaller,
    width: Sizes.mmd,
  },
});

export default EpdsSurveyContent;
