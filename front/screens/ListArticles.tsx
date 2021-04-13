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

interface Props {
  navigation: StackNavigationProp<TabHomeParamList, "listArticles">;
  route: RouteProp<{ params: { step: Step } }, "params">;
}

const ListArticles: FC<Props> = ({ navigation, route }) => {
  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;

  const ALL_ARTICLES = gql`
    query GetAllArticles {
      articles {
        id
        titre
        resume
        visuel {
          uploadFile: file {
            url
          }
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

  return (
    <ScrollView>
      <View style={[styles.mainContainer]}>
        <View>
          <CommonText style={[styles.title]}>{screenTitle}</CommonText>
          <CommonText style={[styles.description]}>{description}</CommonText>
        </View>
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
                  uri: `${process.env.BO_URL}${article.visuel?.uploadFile.url}`,
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
    height: 70,
  },
  articleDescriptionFont: {
    color: Colors.commonText,
    fontSize: 14,
    lineHeight: 20,
  },
  articleImage: {
    height: 130,
    width: 120,
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
  listContainer: {
    paddingTop: 15,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  mainContainer: {
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
