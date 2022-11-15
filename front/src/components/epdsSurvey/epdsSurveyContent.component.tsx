import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useCallback, useEffect, useRef, useState } from "react";
import type { Text as DefaultText } from "react-native";
import { AccessibilityInfo, findNodeHandle, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { SwiperFlatList } from "react-native-swiper-flatlist";

import { CommonText, TitleH1, View } from "../../components/baseComponents";
import EpdsLoadPreviousSurvey from "../../components/epdsSurvey/epdsLoadPreviousSurvey.component";
import { EpdsConstants, Labels, StorageKeysConstants } from "../../constants";
import EpdsResult from "../../screens/epdsSurvey/epdsResult.component";
import { Colors, FontStyle, Margins, Sizes } from "../../styles";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils, StorageUtils } from "../../utils";
import EpdsSurveyFooter from "./epdsSurveyFooter.component";
import EpdsSurveyQuestionsList from "./epdsSurveyQuestionsList.component";
import EpdsSurveyQuestionsPagination from "./epdsSurveyQuestionsPagination.component";

interface Props {
  epdsSurvey: EpdsQuestionAndAnswers[];
  isAccessibilityModeOn: boolean;
}

const EpdsSurveyContent: React.FC<Props> = ({
  epdsSurvey,
  isAccessibilityModeOn,
}) => {
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] =
    useState<EpdsQuestionAndAnswers[]>(epdsSurvey);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [surveyCanBeStarted, setSurveyCanBeStarted] = useState(false);
  const [lastQuestionHas3PointAnswer, setLastQuestionHas3PointAnswer] =
    useState(false);
  const titleRef = useRef<DefaultText>(null);

  useEffect(() => {
    let mounted = true;
    const getPreviousSurvey = async () => {
      const values: [EpdsQuestionAndAnswers[] | undefined, number | undefined] =
        await Promise.all([
          StorageUtils.getObjectValue(
            StorageKeysConstants.epdsQuestionAndAnswersKey
          ),
          StorageUtils.getObjectValue(
            StorageKeysConstants.epdsQuestionIndexKey
          ),
        ]);

      const previousDataSaved = Boolean(values[0]) && Boolean(values[1]);
      if (mounted) {
        setSurveyCanBeStarted(!previousDataSaved);
        setAccessibilityFocus();
      }
    };
    void getPreviousSurvey();
    return () => {
      mounted = false;
    };
  }, []);

  const setAccessibilityFocus = () => {
    if (titleRef.current) {
      const reactTag = findNodeHandle(titleRef.current);
      if (reactTag) AccessibilityInfo.setAccessibilityFocus(reactTag);
    }
  };

  const restartSurvey = useCallback(async () => {
    await EpdsSurveyUtils.removeEpdsStorageItems();
    setQuestionsAndAnswers(epdsSurvey);
    setSwiperCurrentIndex(0);
    setShowResult(false);
  }, [epdsSurvey]);

  const getEpdsLoadPreviousSurveyReponse = useCallback(
    async (startOver: boolean) => {
      if (startOver) {
        await restartSurvey();
      } else {
        const values: [EpdsQuestionAndAnswers[], number] = await Promise.all([
          StorageUtils.getObjectValue(
            StorageKeysConstants.epdsQuestionAndAnswersKey
          ),
          StorageUtils.getObjectValue(
            StorageKeysConstants.epdsQuestionIndexKey
          ),
        ]);

        setQuestionsAndAnswers(values[0]);
        setSwiperCurrentIndex(values[1]);
      }
      setSurveyCanBeStarted(true);
    },
    [restartSurvey]
  );

  const questionIsAnswered =
    questionsAndAnswers[swiperCurrentIndex]?.isAnswered;
  const showValidateButton =
    questionIsAnswered && swiperCurrentIndex === questionsAndAnswers.length - 1;

  const updatePressedAnswer = useCallback(
    (selectedAnswer: EpdsAnswer) => {
      const { updatedSurvey, lastQuestionHasThreePointAnswer } =
        EpdsSurveyUtils.getUpdatedSurvey(
          questionsAndAnswers,
          swiperCurrentIndex,
          selectedAnswer
        );
      setQuestionsAndAnswers(updatedSurvey);
      setLastQuestionHas3PointAnswer(lastQuestionHasThreePointAnswer);
      setScore(EpdsSurveyUtils.getUpdatedScore(updatedSurvey));
    },
    [questionsAndAnswers, swiperCurrentIndex]
  );

  const saveCurrentSurvey = useCallback(
    async (currentSwiperIndex: number) => {
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
    },
    [questionsAndAnswers]
  );

  const progressBarAndButtons = () => (
    <View>
      <EpdsSurveyQuestionsPagination
        currentQuestionIndex={swiperCurrentIndex + 1}
        totalNumberOfQuestions={epdsSurvey.length}
      />
      <EpdsSurveyFooter
        swiperCurrentIndex={swiperCurrentIndex}
        swiperRef={swiperRef}
        showValidateButton={showValidateButton}
        questionIsAnswered={questionIsAnswered}
        setShowResult={setShowResult}
        isAccessibilityModeOn={isAccessibilityModeOn}
        setSwiperCurrentIndex={setSwiperCurrentIndex}
      />
    </View>
  );

  const renderView = () => {
    if (showResult)
      return (
        <EpdsResult
          result={score}
          epdsSurvey={questionsAndAnswers}
          showBeContactedButton={
            score >= EpdsConstants.RESULT_BECONTACTED_VALUE ||
            lastQuestionHas3PointAnswer
          }
          lastQuestionHasThreePointsAnswer={lastQuestionHas3PointAnswer}
          startSurveyOver={restartSurvey}
        />
      );
    else
      return surveyCanBeStarted ? (
        <>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <TitleH1
              style={styles.marginHorizontal}
              title={Labels.epdsSurvey.title}
              animated={false}
              ref={titleRef}
            />
            <CommonText style={[styles.marginHorizontal, styles.instruction]}>
              {Labels.epdsSurvey.instruction}
            </CommonText>
            <View style={styles.surveyContainer}>
              <EpdsSurveyQuestionsList
                epdsSurvey={questionsAndAnswers}
                swiperRef={swiperRef}
                swiperCurrentIndex={swiperCurrentIndex}
                saveCurrentSurvey={saveCurrentSurvey}
                updatePressedAnswer={updatePressedAnswer}
                isAccessibilityModeOn={isAccessibilityModeOn}
              />
            </View>
          </ScrollView>
          {progressBarAndButtons()}
        </>
      ) : (
        <EpdsLoadPreviousSurvey
          startSurveyOver={getEpdsLoadPreviousSurveyReponse}
        />
      );
  };

  return <View style={styles.mainContainer}>{renderView()}</View>;
};

const styles = StyleSheet.create({
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontStyle: FontStyle.italic,
    lineHeight: Sizes.mmd,
  },
  mainContainer: {
    flex: 1,
    marginVertical: Margins.default,
  },
  marginHorizontal: {
    marginHorizontal: Margins.default,
  },
  surveyContainer: {
    flex: 1,
    marginTop: Margins.smaller,
  },
});

export default EpdsSurveyContent;
