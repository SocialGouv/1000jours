import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useCallback, useEffect, useRef, useState } from "react";
import type { Text as DefaultText } from "react-native";
import { AccessibilityInfo, findNodeHandle, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { SwiperFlatList } from "react-native-swiper-flatlist";

import {
  FetchPoliciesConstants,
  Labels,
  TndDbQueries,
} from "../../../constants";
import TndSurveyResult from "../../../screens/tndSurvey/tndSurveyResult.component";
import { GraphQLQuery } from "../../../services";
import { Colors, FontStyle, Margins, Sizes } from "../../../styles";
import type { SurveyAnswer, SurveyQuestionAndAnswers } from "../../../type";
import type { TndQuestionnaire } from "../../../type/tndSurvey.types";
import { TndSurveyUtils } from "../../../utils";
import { TrackingEvent } from "../../../utils/tracking/tracker.util";
import { CommonText, TitleH1, View } from "../../baseComponents";
import TrackerHandler from "../../tracker/trackerHandler.component";
import SurveyFooter from "../surveyFooter.component";
import SurveyQuestionsList from "../surveyQuestionsList.component";
import SurveyQuestionsPagination from "../surveyQuestionsPagination.component";

interface Props {
  tndQuestionnaire: TndQuestionnaire;
  isAccessibilityModeOn: boolean;
}

const TndSurveyContent: React.FC<Props> = ({
  tndQuestionnaire,
  isAccessibilityModeOn,
}) => {
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    SurveyQuestionAndAnswers[]
  >([]);
  const [showResult, setShowResult] = useState(false);
  // const [tndResponses, setTndResponses] = useState([]);
  const [surveyCanBeStarted, setSurveyCanBeStarted] = useState(false);
  const titleRef = useRef<DefaultText>(null);
  const [trackerAction, setTrackerAction] = useState("");

  useEffect(() => {
    setAccessibilityFocus();
  }, [surveyCanBeStarted]);

  const setAccessibilityFocus = () => {
    if (titleRef.current) {
      const reactTag = findNodeHandle(titleRef.current);
      if (reactTag) AccessibilityInfo.setAccessibilityFocus(reactTag);
    }
  };

  const handleResults = useCallback((data: unknown) => {
    const result = data as { questionnaireTnd: TndQuestionnaire };
    if (result.questionnaireTnd.nom) {
      setTrackerAction(
        `${TrackingEvent.TND} - Test : ${result.questionnaireTnd.nom}`
      );
    }
    const formattedQuestions: SurveyQuestionAndAnswers[] =
      TndSurveyUtils.formatTndQuestionnaire(result.questionnaireTnd);
    setQuestionsAndAnswers(formattedQuestions);
    setSurveyCanBeStarted(true);
  }, []);

  const restartSurvey = useCallback(() => {
    setSwiperCurrentIndex(0);
    setShowResult(false);
  }, []);

  const questionIsAnswered =
    questionsAndAnswers[swiperCurrentIndex]?.isAnswered;
  const showValidateButton =
    questionIsAnswered && swiperCurrentIndex === questionsAndAnswers.length - 1;

  const updatePressedAnswer = useCallback(
    (selectedAnswer: SurveyAnswer) => {
      const updatedQuestionsAndAnswers = questionsAndAnswers.map((item) => {
        if (item.questionNumber === swiperCurrentIndex + 1) {
          for (const answer of item.answers) {
            if (answer.id === selectedAnswer.id) answer.isChecked = true;
            else answer.isChecked = false;
          }
          item.isAnswered = true;
        }
        return item;
      });
      setQuestionsAndAnswers(updatedQuestionsAndAnswers);
    },
    [questionsAndAnswers, swiperCurrentIndex]
  );

  const saveCurrentSurvey = useCallback((currentSwiperIndex: number) => {
    setSwiperCurrentIndex(currentSwiperIndex);
  }, []);

  const progressBarAndButtons = () => {
    if (questionsAndAnswers.length > 0)
      return (
        <View>
          <SurveyQuestionsPagination
            currentQuestionIndex={swiperCurrentIndex + 1}
            totalNumberOfQuestions={questionsAndAnswers.length}
          />
          <SurveyFooter
            swiperCurrentIndex={swiperCurrentIndex}
            swiperRef={swiperRef}
            showValidateButton={showValidateButton}
            questionIsAnswered={questionIsAnswered}
            setShowResult={setShowResult}
            isAccessibilityModeOn={isAccessibilityModeOn}
            setSwiperCurrentIndex={setSwiperCurrentIndex}
            trackingEvent={TrackingEvent.TND}
          />
        </View>
      );
  };

  const renderView = () => {
    if (showResult)
      return (
        <TndSurveyResult
          result={0}
          survey={questionsAndAnswers}
          startSurveyOver={restartSurvey}
          tndQuestionnaire={tndQuestionnaire}
        />
      );
    else
      return surveyCanBeStarted ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollviewContainer}>
            <TitleH1
              style={styles.marginHorizontal}
              title={tndQuestionnaire.nom}
              animated={false}
              ref={titleRef}
            />
            <CommonText style={[styles.marginHorizontal, styles.instruction]}>
              {Labels.tndSurvey.surveyContent.instruction}
            </CommonText>
            <View style={styles.surveyContainer}>
              <SurveyQuestionsList
                survey={questionsAndAnswers}
                swiperRef={swiperRef}
                swiperCurrentIndex={swiperCurrentIndex}
                updatePressedAnswer={updatePressedAnswer}
                saveCurrentSurvey={saveCurrentSurvey}
                isAccessibilityModeOn={isAccessibilityModeOn}
                trackingEvent={TrackingEvent.TND}
              />
            </View>
          </ScrollView>
          {progressBarAndButtons()}
        </>
      ) : null;
  };

  return (
    <View style={styles.mainContainer}>
      <TrackerHandler actionName={trackerAction} />
      <GraphQLQuery
        query={TndDbQueries.GET_TND_TEST(tndQuestionnaire.id)}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        getFetchedData={handleResults}
      />
      {renderView()}
    </View>
  );
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
  scrollviewContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  surveyContainer: {
    flex: 1,
    marginTop: Margins.smaller,
  },
});

export default TndSurveyContent;
