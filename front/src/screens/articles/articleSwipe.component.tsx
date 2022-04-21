import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Article } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

import {
  BackButton,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels } from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { Colors, Paddings, Sizes } from "../../styles";
import type { Step, TabHomeParamList } from "../../types";
import { TrackerUtils } from "../../utils";
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

  const [trackerName, setTrackerName] = useState<string>();

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

  useEffect(() => {
    snapToItem(firstItemIndexToShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const snapToItem = useCallback((index: number) => {
    setTrackerName(articles[index].titre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.mainContainer}>
      {trackerName && (
        <TrackerHandler
          screenName={`${TrackerUtils.TrackingEvent.ARTICLE} : ${trackerName}`}
        />
      )}

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
        onSnapToItem={snapToItem}
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
    borderColor: Colors.borderGrey,
    borderRadius: Sizes.xxxxs,
    borderWidth: 1,
  },
  mainContainer: {
    height: "100%",
  },
});

export default ArticleSwipe;
