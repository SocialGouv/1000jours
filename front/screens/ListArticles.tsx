import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Image, ListItem } from "react-native-elements";

import Button from "../components/form/Button";
import { CommonText } from "../components/StyledText";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
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

  const STEP_ARTICLES = gql`
    query GetStepArticles {
      etape(id: ${route.params.step.id}) {
        articles {
          id
          titre
          resume
          visuel {
            url
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(STEP_ARTICLES, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

  const articles = (data as { etape: { articles: Article[] } }).etape.articles;

  const navigateToSurvey = () => {
    navigation.navigate("epdsSurvey");
  };

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <CommonText style={styles.title}>{screenTitle}</CommonText>
        <CommonText style={styles.description}>{description}</CommonText>
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
      <View style={styles.listContainer}>
        <CommonText style={styles.headerListInfo}>
          {articles.length} article(s) à lire
        </CommonText>
        {articles.map((article, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => {
              navigation.navigate("article", {
                id: article.id,
                step: route.params.step,
              });
            }}
            containerStyle={styles.listItem}
          >
            <Image
              source={{
                uri: `${process.env.API_URL}${article.visuel?.url}`,
              }}
              containerStyle={styles.articleImage}
            />
            <ListItem.Content style={styles.articleContent}>
              <ListItem.Title style={styles.articleTitleContainer}>
                <CommonText style={styles.articleTitle}>
                  {article.titre}
                </CommonText>
              </ListItem.Title>
              <ListItem.Subtitle style={styles.articleDescription}>
                <CommonText
                  style={styles.articleDescriptionFont}
                  numberOfLines={3}
                  allowFontScaling={true}
                >
                  {article.resume}
                </CommonText>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleContent: {
    justifyContent: "center",
  },
  articleDescription: {
    color: Colors.commonText,
  },
  articleDescriptionFont: {
    color: Colors.commonText,
    fontSize: 14,
    lineHeight: 20,
  },
  articleImage: {
    height: 100,
    width: 100,
  },
  articleTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 16,
  },
  articleTitleContainer: {
    paddingBottom: 15,
  },
  bannerButton: {
    alignSelf: "flex-end",
  },
  bannerDescription: {
    color: Colors.commonText,
    marginVertical: 10,
  },
  bannerTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 16,
  },
  description: {
    color: Colors.commonText,
  },
  headerListInfo: {
    color: Colors.secondaryGreen,
    fontSize: 14,
  },
  listContainer: {
    padding: 15,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  threeFirstMonthsBanner: {
    backgroundColor: Colors.primaryYellowLight,
    borderStartColor: Colors.primaryYellowDark,
    borderStartWidth: 5,
    padding: 15,
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  topContainer: {
    padding: 15,
  },
});

export default ListArticles;
