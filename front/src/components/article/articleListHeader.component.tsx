import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import type {
  Article,
  ArticleFilter,
  Step,
  TabHomeParamList,
  Thematique,
} from "../../types";
import { TrackerUtils } from "../../utils";
import ArticlesFilter from "../article/articlesFilter.component";
import BackButton from "../baseComponents/backButton.component";
import CustomButton from "../baseComponents/customButton.component";
import { CommonText, SecondaryText } from "../baseComponents/StyledText";
import { View } from "../baseComponents/Themed";
import TitleH1 from "../baseComponents/titleH1.component";

interface Props {
  title: string;
  description?: string;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setTrackerAction: React.Dispatch<React.SetStateAction<string>>;
  navigation: StackNavigationProp<TabHomeParamList>;
  step?: Step;
}

/* Je pense que je modifierai ça plus tard, je trouve pas ça très propre de stocker un ID du back dans le front comme ça,
peut-être que ça devrait être au back, lorsqu'il retourne les articles, de dire s'il faut afficher la bannière via un booléen, à discuter */
const ETAPE_ENFANT_3_PREMIERS_MOIS = 6;

const ArticleListHeader: FC<Props> = ({
  title,
  description,
  articles,
  setArticles,
  setTrackerAction,
  navigation,
  step,
}) => {
  const stepIsFirstThreeMonths = step
    ? step.id == ETAPE_ENFANT_3_PREMIERS_MOIS
    : false;

  const sendFiltersTracker = useCallback(
    (filters: ArticleFilter[]) => {
      filters.forEach((filter) => {
        setTrackerAction(
          `${TrackerUtils.TrackingEvent.FILTER_ARTICLES} - ${filter.thematique.nom}`
        );
      });
    },
    [setTrackerAction]
  );

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

  const applyFilters = useCallback(
    (filters: ArticleFilter[]) => {
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
    },
    [articles, sendFiltersTracker, setArticles]
  );

  const navigateToSurvey = useCallback(() => {
    navigation.navigate("epdsSurvey");
  }, [navigation]);

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View>
      <View style={styles.topContainer}>
        <View style={[styles.flexStart]}>
          <BackButton action={onGoBack} />
        </View>
        <TitleH1 title={title} description={description} animated={false} />
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
    </View>
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
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  threeFirstMonthsBanner: {
    backgroundColor: Colors.primaryYellowLight,
    marginBottom: Paddings.light,
    padding: Paddings.default,
  },
  topContainer: {
    paddingTop: Paddings.default,
  },
});

export default ArticleListHeader;
