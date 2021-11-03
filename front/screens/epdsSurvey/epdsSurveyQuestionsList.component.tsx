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
  return (
    <SwiperFlatList
      ref={swiperRef}
      index={swiperCurrentIndex}
      onChangeIndex={({ index }) => {
        saveCurrentSurvey(index);
      }}
      autoplay={false}
      disableGesture
      importantForAccessibility="no"
    >
      {epdsSurvey.map((questionView, questionIndex) => (
        <EpdsQuestion
          key={questionIndex}
          questionAndAnswers={questionView}
          updatePressedAnswer={updatePressedAnswer}
        />
      ))}
    </SwiperFlatList>
  );
};

export default EpdsSurveyQuestionsList;
