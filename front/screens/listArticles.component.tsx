import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Image, ListItem } from "react-native-elements";

import DefaultImage from "../assets/images/default.png";
import {
  Button,
  CommonText,
  Filters,
  SecondaryText,
  TitleH1,
  View,
} from "../components";
import {
  Colors,
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
  navigation: StackNavigationProp<TabHomeParamList, "listArticles">;
  route: RouteProp<{ params: { step: Step } }, "params">;
}
/* Je pense que je modifierai ça plus tard, je trouve pas ça très propre de stocker un ID du back dans le front comme ça,
peut-être que ça devrait être au back, lorsqu'il retourne les articles, de dire s'il faut afficher la bannière via un booléen, à discuter */
const ETAPE_ENFANT_3_PREMIERS_MOIS = 6;

const ListArticles: FC<Props> = ({ navigation, route }) => {
  const { trackScreenView } = useMatomo();
  trackScreenView(
    `${TrackerUtils.TrackingEvent.ARTICLE_LIST} : ${route.params.step.nom}`
  );

  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;
  const stepIsFirstThreeMonths =
    route.params.step.id == ETAPE_ENFANT_3_PREMIERS_MOIS;

  const [filteredArticles, setFilteredArticles] = React.useState<Article[]>([]);

  const STEP_ARTICLES = gql`
    query GetStepArticles {
      articles(where: { 
        etapes: { id: ${route.params.step.id} }
      })
      {
        id
        titre
        resume
        visuel {
          url
        }
        thematiques {
          nom
          id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(STEP_ARTICLES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading && data) {
      const articles = (data as { articles: Article[] }).articles;
      setFilteredArticles(articles);
    }
  }, [loading, data]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

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

  const applyFilters = (filters: ArticleFilter[]) => {
    const activeFilters = _.filter(filters, { active: true });
    const result = filteredArticles.map((article) => {
      if (activeFilters.length > 0)
        article.hide = !matchWithFilters(article, activeFilters);
      else article.hide = false;

      return article;
    });
    setFilteredArticles(result);
  };

  return (
    <ScrollView>
      <View style={styles.topContainer}>
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
          <CommonText style={styles.bannerDescription}>
            {Labels.article.firstThreeMonths.description}
          </CommonText>
          <Button
            buttonStyle={styles.bannerButton}
            title={Labels.article.firstThreeMonths.buttonLabel}
            rounded={true}
            disabled={false}
            action={navigateToSurvey}
          />
        </View>
      )}

      <Filters articles={filteredArticles} applyFilters={applyFilters} />

      <View style={styles.listContainer}>
        <SecondaryText style={styles.headerListInfo}>
          {_.filter(filteredArticles, (article) => !article.hide).length}{" "}
          {Labels.listArticles.articlesToRead}
        </SecondaryText>
        {_.filter(filteredArticles, (article) => !article.hide).map(
          (article, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={1000}
              delay={500 * index}
            >
              <ListItem
                bottomDivider
                onPress={() => {
                  navigation.navigate("article", {
                    id: article.id,
                    step: route.params.step,
                  });
                }}
                pad={0}
                containerStyle={[
                  styles.listItemContainer,
                  styles.borderLeftRadius,
                ]}
                style={[styles.listItem, styles.borderLeftRadius]}
              >
                <Image
                  defaultSource={DefaultImage}
                  source={{
                    uri: article.visuel?.url,
                  }}
                  containerStyle={[
                    styles.articleImage,
                    styles.borderLeftRadius,
                  ]}
                />
                <ListItem.Content style={styles.articleContent}>
                  <ListItem.Title style={styles.articleTitleContainer}>
                    <CommonText style={styles.articleTitle}>
                      {article.titre}
                    </CommonText>
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.articleDescription}>
                    <SecondaryText
                      style={styles.articleDescriptionFont}
                      numberOfLines={3}
                      allowFontScaling={true}
                    >
                      {article.resume}
                    </SecondaryText>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </Animatable.View>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleContent: {
    justifyContent: "center",
    padding: Paddings.default,
  },
  articleDescription: {
    color: Colors.commonText,
  },
  articleDescriptionFont: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.lg,
  },
  articleImage: {
    height: "100%",
    resizeMode: "contain",
    width: Sizes.thumbnail,
  },
  articleTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
  },
  articleTitleContainer: {
    paddingBottom: Paddings.light,
  },
  bannerButton: {
    alignSelf: "flex-end",
    marginHorizontal: Margins.default,
  },
  bannerDescription: {
    color: Colors.commonText,
    marginVertical: Margins.light,
  },
  bannerTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
  },
  borderLeftRadius: {
    borderBottomLeftRadius: Sizes.xxxxxs,
    borderTopLeftRadius: Sizes.xxxxxs,
  },
  description: {
    color: Colors.commonText,
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
  listItem: {
    marginVertical: Margins.smallest,
  },
  listItemContainer: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    padding: 0,
  },
  threeFirstMonthsBanner: {
    backgroundColor: Colors.primaryYellowLight,
    borderStartColor: Colors.primaryYellowDark,
    borderStartWidth: 5,
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
