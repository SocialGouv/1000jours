import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import type { SwiperFlatList } from "react-native-swiper-flatlist";

import { TitleH1 } from "../../components";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils, StorageUtils } from "../../utils";
import EpdsLightResult from "./epdsLightResult.component";
import EpdsLoadPreviousSurvey from "./epdsLoadPreviousSurvey.component";
// import EpdsResult from "./epdsResult.component";
import EpdsSurveyFooter from "./epdsSurveyFooter.component";
import EpdsSurveyQuestionsList from "./epdsSurveyQuestionsList.component";

interface Props {
  epdsSurvey: EpdsQuestionAndAnswers[];
}

const EpdsSurveyContent: React.FC<Props> = ({ epdsSurvey }) => {
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] =
    useState<EpdsQuestionAndAnswers[]>(epdsSurvey);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [surveyCanBeStarted, setSurveyCanBeStarted] = useState(false);

  useEffect(() => {
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
      setSurveyCanBeStarted(!previousDataSaved);
    };
    void getPreviousSurvey();
  }, []);

  const getEpdsLoadPreviousSurveyReponse = async (startOver: boolean) => {
    if (startOver) {
      await restartSurvey();
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

  const restartSurvey = async () => {
    await EpdsSurveyUtils.removeEpdsStorageItems();
    setQuestionsAndAnswers(epdsSurvey);
    setSwiperCurrentIndex(0);
    setShowResult(false);
  };

  return (
    <View style={styles.mainContainer}>
      {!showResult ? (
        surveyCanBeStarted ? (
          <>
            <TitleH1 title={Labels.epdsSurvey.title} animated={false} />
            <CommonText style={styles.instruction}>
              {Labels.epdsSurvey.instruction}
            </CommonText>
            <View style={styles.surveyContainer}>
              <View>
                <EpdsSurveyQuestionsList
                  epdsSurvey={questionsAndAnswers}
                  swiperRef={swiperRef}
                  swiperCurrentIndex={swiperCurrentIndex}
                  saveCurrentSurvey={saveCurrentSurvey}
                  updatePressedAnswer={updatePressedAnswer}
                />
              </View>
              <View style={styles.footer}>
                <EpdsSurveyFooter
                  swiperCurrentIndex={swiperCurrentIndex}
                  swiperRef={swiperRef}
                  showValidateButton={showValidateButton}
                  questionIsAnswered={questionIsAnswered}
                  setShowResult={setShowResult}
                />
              </View>
            </View>
          </>
        ) : (
          <EpdsLoadPreviousSurvey
            startSurveyOver={getEpdsLoadPreviousSurveyReponse}
          />
        )
      ) : (
        <EpdsLightResult
          result={score}
          startSurveyOver={async () => {
            await restartSurvey();
          }}
        />
        // <EpdsResult
        //   result={score}
        //   startSurveyOver={async () => {
        //     await restartSurvey();
        //   }}
        // />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontStyle: "italic",
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.mmd,
  },
  mainContainer: {
    flex: 1,
    margin: Margins.smaller,
  },
  surveyContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default EpdsSurveyContent;
