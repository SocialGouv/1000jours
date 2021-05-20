import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Image, ListItem } from "react-native-elements";

import Filters from "../components/article/Filters";
import Button from "../components/form/Button";
import { CommonText, SecondaryText } from "../components/StyledText";
import { View } from "../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../constants";
import type { Article, Step, TabHomeParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList, "listArticles">;
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

  const applyFilter = (id: number, active: boolean) => {
    const result = filteredArticles.map((article) => {
      const thematique = _.find(article.thematiques, { id: id });
      if (thematique) article.hide = !active;
      return article;
    });
    setFilteredArticles(result);
  };

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <SecondaryText style={styles.title}>{screenTitle}</SecondaryText>
        {description !== null && description.length > 0 && (
          <SecondaryText style={styles.description}>
            {description}
          </SecondaryText>
        )}
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

      <Filters articles={filteredArticles} applyFilter={applyFilter} />

      <View style={styles.listContainer}>
        <SecondaryText style={styles.headerListInfo}>
          {_.filter(filteredArticles, (article) => !article.hide).length}{" "}
          {Labels.listArticles.articlesToRead}
        </SecondaryText>
        {_.filter(filteredArticles, (article) => !article.hide).map(
          (article, index) => (
            <ListItem
              key={index}
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
                source={{
                  uri: article.visuel?.url,
                }}
                containerStyle={[styles.articleImage, styles.borderLeftRadius]}
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
