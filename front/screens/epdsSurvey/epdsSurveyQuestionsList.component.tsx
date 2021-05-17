import * as React from "react";
import { StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import type { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

import { View } from "../../components/Themed";
import { Colors, Margins, Paddings, Sizes } from "../../constants";
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
    <View style={styles.flatListView}>
      <SwiperFlatList
        ref={swiperRef}
        index={swiperCurrentIndex}
        onChangeIndex={({ index }) => {
          saveCurrentSurvey(index);
        }}
        autoplay={false}
        disableGesture
        showPagination
        paginationDefaultColor={Colors.primaryYellowLight}
        paginationActiveColor={Colors.primaryYellowDark}
        paginationStyleItem={styles.swipePaginationItem}
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
    </View>
  );
};

const styles = StyleSheet.create({
  flatListView: {
    flex: 7,
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

export default EpdsSurveyQuestionsList;
