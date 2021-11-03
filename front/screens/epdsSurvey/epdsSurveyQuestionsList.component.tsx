import * as React from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import type { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

import { View } from "../../components/Themed";
import type { EpdsAnswer, EpdsQuestionAndAnswers } from "../../type";
import EpdsQuestion from "./epdsQuestion.component";
import EpdsSurveyQuestionsPagination from "./epdsSurveyQuestionsPagination.component";

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
    <View>
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
          <View key={questionIndex}>
            <EpdsQuestion
              questionAndAnswers={questionView}
              updatePressedAnswer={updatePressedAnswer}
            />
          </View>
        ))}
      </SwiperFlatList>
      <EpdsSurveyQuestionsPagination
        currentQuestionIndex={swiperCurrentIndex + 1}
        totalNumberOfQuestions={epdsSurvey.length}
      />
    </View>
  );
};

export default EpdsSurveyQuestionsList;
