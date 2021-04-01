import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
// @ts-expect-error
import { BO_URL } from "@env";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { Image, ListItem } from "react-native-elements";

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
  if (error) return <Text>{Labels.errorMsg}</Text>;

  const result = data as { articles: Article[] };

  return (
    <ScrollView>
      <View style={[styles.mainContainer]}>
        <View>
          <Text style={[styles.title]}>{screenTitle}</Text>
          <Text style={[styles.description]}>{description}</Text>
        </View>
        <View style={[styles.listContainer]}>
          <Text style={[styles.headerListInfo]}>
            {result.articles.length} article(s) à lire
          </Text>
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
                  uri: `${BO_URL}${article.visuel?.uploadFile.url}`,
                }}
                style={[styles.articleImage]}
              />
              <ListItem.Content style={[styles.articleContent]}>
                <ListItem.Title style={[styles.articleTitle]}>
                  {article.titre}
                </ListItem.Title>
                <ListItem.Subtitle style={[styles.articleDescription]}>
                  <Text numberOfLines={3} allowFontScaling={true}>
                    {article.resume}
                  </Text>
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
    lineHeight: 22,
  },
  articleImage: {
    height: 130,
    width: 120,
  },
  articleTitle: {
    color: Colors.primaryBlue,
    fontSize: 17,
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
