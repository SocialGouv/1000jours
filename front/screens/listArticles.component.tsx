import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import {
  BackButton,
  Button,
  CommonText,
  ErrorMessage,
  Filters,
  Loader,
  SecondaryText,
  TitleH1,
  View,
} from "../components";
import ArticleCard from "../components/article/articleCard.component";
import {
  Colors,
  FetchPoliciesConstants,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../constants";
import type {
  Article,
  ArticleFilter,
  Step,
  TabHomeParamList,
  Thematique,
} from "../types";
import { TrackerUtils } from "../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
  route: RouteProp<{ params: { step: Step } }, "params">;
}
/* Je pense que je modifierai ça plus tard, je trouve pas ça très propre de stocker un ID du back dans le front comme ça,
peut-être que ça devrait être au back, lorsqu'il retourne les articles, de dire s'il faut afficher la bannière via un booléen, à discuter */
const ETAPE_ENFANT_3_PREMIERS_MOIS = 6;

const ListArticles: FC<Props> = ({ navigation, route }) => {
  const { trackScreenView } = useMatomo();
  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;
  const stepIsFirstThreeMonths =
    route.params.step.id == ETAPE_ENFANT_3_PREMIERS_MOIS;

  useEffect(() => {
    trackScreenView(
      `${TrackerUtils.TrackingEvent.ARTICLE_LIST} : ${route.params.step.nom}`
    );
  }, []);

  const [articles, setArticles] = React.useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = React.useState<Article[]>([]);
  const [showArticles, setShowArticles] = React.useState(false);

  const STEP_ARTICLES = gql`
    query GetStepArticles {
      articles(sort: "ordre", where: {
        etapes: { id: ${route.params.step.id} }
      })
      {
        id
        titre
        resume
        visuel {
          url
          height
          width
        }
        thematiques {
          nom
          id
        }
      }
    }
  `;

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
      trackScreenView(
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

  const { loading, error, data } = useQuery(STEP_ARTICLES, {
    fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
  });

  useEffect(() => {
    if (!loading && data) {
      const articlesToShow = _.filter(articles, (article) => !article.hide);
      setFilteredArticles(articlesToShow);
      setShowArticles(true);
    }
  }, [articles]);

  useEffect(() => {
    if (!loading && data) {
      const results = (data as { articles: Article[] }).articles;
      setArticles(results);
    }
  }, [loading, data]);

  if (error) return <ErrorMessage error={error} />;

  return (
    <ScrollView style={styles.scrollView}>
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
          <Button
            buttonStyle={styles.bannerButton}
            titleStyle={styles.bannerButtonTitle}
            title={Labels.article.firstThreeMonths.buttonLabel}
            rounded={true}
            disabled={false}
            action={navigateToSurvey}
          />
        </View>
      )}

      <Filters articles={articles} applyFilters={applyFilters} />

      {showArticles ? (
        <View style={styles.listContainer}>
          <SecondaryText style={styles.headerListInfo}>
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
