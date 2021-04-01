import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
// @ts-expect-error
import { BO_URL } from "@env";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";
import HTML from "react-native-render-html";

import BackButton from "../components/BackButton";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type { Article, Step, TabHomeParamList } from "../types";

interface Props {
  route: RouteProp<{ params: { id: number; step: Step } }, "params">;
  navigation: StackNavigationProp<TabHomeParamList, "article">;
}

const ArticleDetail: FC<Props> = ({ route, navigation }) => {
  const articleId = route.params.id;
  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;

  const ARTICLE_DETAIL = gql`
    query GetAllArticles {
      article: articles_by_pk(id: ${articleId}) {
        id
        titre
        resume
        texte1: texte_1
        visuel {
          uploadFile: file {
            url
          }
        }
        thematiques {
          thematique {
            nom
            id
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(ARTICLE_DETAIL, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{Labels.errorMsg}</Text>;

  const result = data as { article: Article };
  return (
    <ScrollView>
      <View style={[styles.mainContainer]}>
        <View>
          <View style={[styles.flexStart]}>
            <BackButton
              action={() => {
                navigation.goBack();
              }}
            />
          </View>
          <Text style={[styles.title]}>{screenTitle}</Text>
          <Text style={[styles.description]}>{description}</Text>
        </View>
        <View>
          <Image
            source={{
              uri: `${BO_URL}${result.article.visuel?.uploadFile.url}`,
            }}
            style={[styles.articleImage]}
          />
          <Text style={[styles.title]}>{result.article.titre}</Text>
          <View style={[styles.flexStart]}>
            {result.article.thematiques.map((thematiqueContainer, index) => {
              return (
                <View style={[styles.thematiqueContainer]} key={index}>
                  <Text style={[styles.thematique]}>
                    {thematiqueContainer.thematique.nom}
                  </Text>
                </View>
              );
            })}
          </View>
          <HTML source={{ html: result.article.texte1 }} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleImage: {
    height: 150,
    marginBottom: 15,
    marginTop: 15,
    width: "100%",
  },
  description: {
    color: Colors.commonText,
  },
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainContainer: {
    padding: 15,
  },
  thematique: {
    color: Colors.primaryBlue,
  },
  thematiqueContainer: {
    backgroundColor: Colors.primaryBlueLight,
    borderRadius: 8,
    marginRight: 8,
    padding: 6,
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
});

export default ArticleDetail;
