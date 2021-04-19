import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Image, ListItem } from "react-native-elements";

import { CommonText } from "../components/StyledText";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type { Article, Step, TabHomeParamList } from "../types";
import Button from "../components/form/Button";

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
  const stepIs3FirstMonths = route.params.step.id == ETAPE_ENFANT_3_PREMIERS_MOIS;
  
  const ALL_ARTICLES = gql`
    query GetAllArticles {
      articles {
        id
        titre
        resume
        visuel {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(ALL_ARTICLES, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

  const result = data as { articles: Article[] };

  const navigateToSurvey = () => {
    console.log("navigateToSurvey");
  };

  return (
    <ScrollView>
        <View style={[styles.topContainer]}>
          <CommonText style={[styles.title]}>{screenTitle}</CommonText>
          <CommonText style={[styles.description]}>{description}</CommonText>
        </View>
        {stepIs3FirstMonths && (
          <View style={[styles.threeFirstMonthsBanner]}>
            <CommonText style={[styles.bannerTitle]}>{Labels.article.threeFirstMonths.title}</CommonText>
            <CommonText style={[styles.bannerDescription]}>{Labels.article.threeFirstMonths.description}</CommonText>
                <Button
                  buttonStyle={styles.bannerButton}
                  title={Labels.article.threeFirstMonths.buttonLabel}
                  rounded={true}
                  disabled={false}
                  action={navigateToSurvey}
                />
          </View>)}
        <View style={[styles.listContainer]}>
          <CommonText style={[styles.headerListInfo]}>
            {result.articles.length} article(s) à lire
          </CommonText>
          {result.articles.map((article, index) => (
            <ListItem
              key={index}
              bottomDivider
              onPress={() => {
                navigation.navigate("article", {
                  id: article.id,
                  step: route.params.step,
                });
              }}
              containerStyle={[styles.listItem]}
            >
              <Image
                source={{
                  uri: `${process.env.API_URL}${article.visuel?.url}`,
                }}
                style={[styles.articleImage]}
              />
              <ListItem.Content style={[styles.articleContent]}>
                <ListItem.Title style={[styles.articleTitleContainer]}>
                  <CommonText style={[styles.articleTitle]}>
                    {article.titre}
                  </CommonText>
                </ListItem.Title>
                <ListItem.Subtitle style={[styles.articleDescription]}>
                  <CommonText
                    style={[styles.articleDescriptionFont]}
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
  description: {
    color: Colors.commonText,
  },
  headerListInfo: {
    color: Colors.secondaryGreen,
    fontSize: 14,
  },
  threeFirstMonthsBanner: {
    borderStartWidth: 5,
    borderStartColor: Colors.primaryYellowDark,
    backgroundColor: Colors.primaryYellowLight,
    padding: 15,
  },
  bannerTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 16,
  },
  bannerDescription: {
    color: Colors.commonText,
    marginVertical: 10,
  },
  bannerButton: {
    alignSelf: "flex-end",
  },
  listContainer: {
    padding: 15,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  topContainer: {
    padding: 15,
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
});

export default ListArticles;
