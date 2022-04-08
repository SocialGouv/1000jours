import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Article } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

import {
  BackButton,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import { Labels } from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { Colors, Paddings, Sizes } from "../../styles";
import type { Step, TabHomeParamList } from "../../types";
import ArticleDetail from "./articleDetail.component";

interface Props {
  route?: RouteProp<
    { params: { id: number; step?: Step; articles: Article[] } },
    "params"
  >;
  navigation: StackNavigationProp<TabHomeParamList>;
}

interface RenderItemProps {
  item: Article;
  index: number;
}

const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.8);

const ArticleSwipe: FC<Props> = ({ route, navigation }) => {
  const ref = useRef(null);

  const articles: Article[] = route ? route.params.articles : [];
  const step: Step | undefined = route?.params.step;
  const articleId: number = route ? route.params.id : 0;

  const firstItemIndexToShow = articles.findIndex(
    (item) => item.id == articleId
  );

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return (
        <View style={styles.itemViewLabelContainer}>
          <ArticleDetail
            _articleId={item.id}
            _articleStep={step}
            isInCarousel
          />
        </View>
      );
    },
    [step]
  );

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.flexStart}>
          <BackButton action={onGoBack} />
        </View>
        <TitleH1 title={step?.nom} animated />
        <SecondaryText>{Labels.articleSwipe.content}</SecondaryText>
      </View>

      <Carousel
        ref={ref}
        data={articles}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView
        firstItem={firstItemIndexToShow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.default,
  },
  itemViewLabelContainer: {
    alignItems: "center",
    borderBottomLeftRadius: Sizes.xxxxs,
    borderBottomRightRadius: Sizes.xxxxs,
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    flex: 2,
    justifyContent: "center",
    width: "100%",
  },
  mainContainer: {
    height: "100%",
  },
});

export default ArticleSwipe;
