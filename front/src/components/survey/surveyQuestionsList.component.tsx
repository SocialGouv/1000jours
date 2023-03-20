import * as React from "react";
import { useCallback } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import type { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

import type { SurveyAnswer, SurveyQuestionAndAnswers } from "../../type";
import type { TrackingEvent } from "../../utils/tracking/tracker.util";
import SurveyQuestion from "./surveyQuestion.component";

interface SurveyQuestionsListProps {
  survey: SurveyQuestionAndAnswers[];
  swiperRef: React.RefObject<SwiperFlatListRefProps>;
  swiperCurrentIndex: number;
  updatePressedAnswer: (answer: SurveyAnswer) => void;
  isAccessibilityModeOn: boolean;
  trackingEvent: TrackingEvent;
  saveCurrentSurvey?: (value: number) => void;
}

const SurveyQuestionsList: React.FC<SurveyQuestionsListProps> = ({
  survey,
  swiperRef,
  swiperCurrentIndex,
  updatePressedAnswer,
  isAccessibilityModeOn,
  trackingEvent,
  saveCurrentSurvey,
}) => {
  const [nextButtonState, setNextButtonState] = React.useState(false);
  const onSwiperIndexChanged = useCallback(
    (item: { index: number; prevIndex: number }) => {
      if (saveCurrentSurvey) saveCurrentSurvey(item.index);
      setNextButtonState(!nextButtonState);
    },
    [nextButtonState, saveCurrentSurvey]
  );

  return (
    <>
      {isAccessibilityModeOn ? (
        <SurveyQuestion
          key={swiperCurrentIndex}
          totalNumberOfQuestions={survey.length}
          questionAndAnswers={survey[swiperCurrentIndex]}
          updatePressedAnswer={updatePressedAnswer}
          nextButtonState={nextButtonState}
          trackingEvent={trackingEvent}
        />
      ) : (
        <SwiperFlatList
          ref={swiperRef}
          index={swiperCurrentIndex}
          onChangeIndex={onSwiperIndexChanged}
          autoplay={false}
          disableGesture
          importantForAccessibility="no"
          renderAll={true}
        >
          {survey.map((questionView, questionIndex) => (
            <SurveyQuestion
              key={questionIndex}
              totalNumberOfQuestions={survey.length}
              questionAndAnswers={questionView}
              updatePressedAnswer={updatePressedAnswer}
              nextButtonState={nextButtonState}
              trackingEvent={trackingEvent}
            />
          ))}
        </SwiperFlatList>
      )}
    </>
  );
};

export default SurveyQuestionsList;
