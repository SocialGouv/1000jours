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
      const values: [
        EpdsQuestionAndAnswers[] | undefined,
        number | undefined
      ] = await Promise.all([
        StorageUtils.getObjectValue(
          StorageKeysConstants.epdsQuestionAndAnswersKey
        ),
        StorageUtils.getObjectValue(StorageKeysConstants.epdsQuestionIndexKey),
      ]);

      const previousDataSaved = Boolean(values[0]) && Boolean(values[1]);
      setSurveyCanBeStarted(!previousDataSaved);
    };
    void getPreviousSurvey();
  }, []);

  const getEpdsLoadPreviousSurveyReponse = async (startOver: boolean) => {
    if (startOver) {
      await EpdsSurveyUtils.removeEpdsStorageItems();
    } else {
      const values: [EpdsQuestionAndAnswers[], number] = await Promise.all([
        StorageUtils.getObjectValue(
          StorageKeysConstants.epdsQuestionAndAnswersKey
        ),
        StorageUtils.getObjectValue(StorageKeysConstants.epdsQuestionIndexKey),
      ]);

      setQuestionsAndAnswers(values[0]);
      setSwiperCurrentIndex(values[1]);
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

  return (
    <View style={styles.mainContainer}>
      {!displayResult ? (
        surveyCanBeStarted ? (
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
        ) : (
          <EpdsLoadPreviousSurvey
            startSurveyOver={getEpdsLoadPreviousSurveyReponse}
          />
        )
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
