import * as React from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import type { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import EpdsQuestion from "./epdsQuestion.component";

interface EpdsSurveyQuestionsListProps {
  epdsSurvey: EpdsQuestionAndAnswers[];
  swiperRef: React.RefObject<SwiperFlatListRefProps>;
  swiperCurrentIndex: number;
  saveCurrentSurvey: (value: number) => void;
  updatePressedAnswer: (answer: EpdsAnswer) => void;
}

const EpdsSurveyQuestionsList: React.FC<EpdsSurveyQuestionsListProps> = ({
  epdsSurvey,
  swiperRef,
  swiperCurrentIndex,
  saveCurrentSurvey,
  updatePressedAnswer,
}) => {
  const [nextButtonState, setNextButtonState] = React.useState(false);

  return (
    <SwiperFlatList
      ref={swiperRef}
      index={swiperCurrentIndex}
      onChangeIndex={({ index }) => {
        saveCurrentSurvey(index);
        setNextButtonState(!nextButtonState);
      }}
      autoplay={false}
      disableGesture
      importantForAccessibility="no"
    >
      {epdsSurvey.map((questionView, questionIndex) => (
        <EpdsQuestion
          key={questionIndex}
          totalNumberOfQuestions={epdsSurvey.length}
          questionAndAnswers={questionView}
          updatePressedAnswer={updatePressedAnswer}
          nextButtonState={nextButtonState}
        />
      ))}
    </SwiperFlatList>
  );
};

export default EpdsSurveyQuestionsList;
