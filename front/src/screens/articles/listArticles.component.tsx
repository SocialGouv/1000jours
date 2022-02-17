import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import type { FC } from "react";
import { useEffect, useState } from "react";
import * as React from "react";
import { AccessibilityInfo, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { ArticleCard, ArticlesFilter } from "../../components";
import {
  BackButton,
  CommonText,
  CustomButton,
  Loader,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { FetchPoliciesConstants, HomeDbQueries, Labels } from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type {
  Article,
  ArticleFilter,
  Step,
  TabHomeParamList,
  Thematique,
} from "../../types";
import { TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
  route: RouteProp<{ params: { step: Step } }, "params">;
}
/* Je pense que je modifierai ça plus tard, je trouve pas ça très propre de stocker un ID du back dans le front comme ça,
peut-être que ça devrait être au back, lorsqu'il retourne les articles, de dire s'il faut afficher la bannière via un booléen, à discuter */
const ETAPE_ENFANT_3_PREMIERS_MOIS = 6;

const ListArticles: FC<Props> = ({ navigation, route }) => {
  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;
  const stepIsFirstThreeMonths =
    route.params.step.id == ETAPE_ENFANT_3_PREMIERS_MOIS;
  const [trackerAction, setTrackerAction] = useState("");

  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    const articlesToShow = _.filter(articles, (article) => !article.hide);
    setFilteredArticles(articlesToShow);
    setShowArticles(true);
    if (articlesToShow.length > 0)
      AccessibilityInfo.announceForAccessibility(
        articleToReadAccessibilityLabel()
      );
  }, [articles]);

  const handleResults = (data: unknown) => {
    const results = (data as { articles: Article[] }).articles;
    setArticles(results);
  };

  const navigateToSurvey = () => {
    navigation.navigate("epdsSurvey");
  };

  const matchWithFilters = (article: Article, filters: ArticleFilter[]) => {
    let isMatching = false;
    article.thematiques.map((thematique: Thematique) => {
      const res = _.filter(filters, ["thematique", thematique]);
      if (res.length > 0) {
        isMatching = true;
      }
    });
    return isMatching;
  };

  const sendFiltersTracker = (filters: ArticleFilter[]) => {
    filters.forEach((filter) => {
      setTrackerAction(
        `${TrackerUtils.TrackingEvent.FILTER_ARTICLES} - ${filter.thematique.nom}`
      );
    });
  };

  const applyFilters = (filters: ArticleFilter[]) => {
    const activeFilters = _.filter(filters, { active: true });
    sendFiltersTracker(activeFilters);
    const result = articles.map((article) => {
      let hide = false;
      if (activeFilters.length > 0)
        hide = !matchWithFilters(article, activeFilters);

      return {
        ...article,
        hide: hide,
      };
    });

    setArticles(result);
  };

  const articleToReadAccessibilityLabel = () =>
    `${filteredArticles.length} ${Labels.accessibility.articleToRead}`;

  return (
    <ScrollView style={styles.scrollView}>
      <TrackerHandler
        screenName={`${TrackerUtils.TrackingEvent.ARTICLE_LIST} : ${route.params.step.nom}`}
        actionName={trackerAction}
      />
      <GraphQLQuery
        query={HomeDbQueries.LIST_ARTICLES_WITH_STEP(route.params.step.id)}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        updateFetchedData={handleResults}
      />
      <View style={styles.topContainer}>
        <View style={[styles.flexStart]}>
          <BackButton
            action={() => {
              navigation.goBack();
            }}
          />
        </View>
        <TitleH1
          title={screenTitle}
          description={description}
          animated={false}
        />
      </View>
      {stepIsFirstThreeMonths && (
        <View style={styles.threeFirstMonthsBanner}>
          <CommonText style={styles.bannerTitle}>
            {Labels.article.firstThreeMonths.title}
          </CommonText>
          <SecondaryText style={styles.bannerDescription}>
            {Labels.article.firstThreeMonths.description}
          </SecondaryText>
          <CustomButton
            buttonStyle={styles.bannerButton}
            titleStyle={styles.bannerButtonTitle}
            title={Labels.article.firstThreeMonths.buttonLabel}
            rounded={true}
            disabled={false}
            action={navigateToSurvey}
          />
        </View>
      )}
      <ArticlesFilter articles={articles} applyFilters={applyFilters} />
      {showArticles ? (
        <View style={styles.listContainer}>
          <SecondaryText
            style={styles.headerListInfo}
            accessibilityLabel={articleToReadAccessibilityLabel()}
          >
            {filteredArticles.length} {Labels.listArticles.articlesToRead}
          </SecondaryText>
          {filteredArticles.map((article, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={1000}
              delay={0}
            >
              <ArticleCard article={article} step={route.params.step} />
            </Animatable.View>
          ))}
        </View>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerButton: {
    alignSelf: "flex-end",
    marginHorizontal: Margins.default,
  },
  bannerButtonTitle: {
    fontSize: Sizes.sm,
    textTransform: "uppercase",
  },
  bannerDescription: {
    color: Colors.commonText,
    marginVertical: Margins.light,
  },
  bannerTitle: {
    color: Colors.primaryYellowDark,
    fontSize: Sizes.sm,
  },
  borderLeftRadius: {
    borderBottomLeftRadius: Sizes.xxxxxs,
    borderTopLeftRadius: Sizes.xxxxxs,
  },
  description: {
    color: Colors.commonText,
  },
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headerListInfo: {
    color: Colors.secondaryGreen,
    fontSize: Sizes.xs,
    fontStyle: "italic",
    paddingVertical: Paddings.smaller,
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  threeFirstMonthsBanner: {
    backgroundColor: Colors.primaryYellowLight,
    marginBottom: Paddings.light,
    padding: Paddings.default,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: FontWeight.black,
    textTransform: "uppercase",
  },
  topContainer: {
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
  },
});

export default ListArticles;
