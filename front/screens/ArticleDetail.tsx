import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
// @ts-expect-error
import { BO_URL } from "@env";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import HTML from "react-native-render-html";

import BackButton from "../components/BackButton";
import { ComfortaText } from "../components/StyledText";
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
  if (error) return <ComfortaText>{Labels.errorMsg}</ComfortaText>;

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
          <ComfortaText style={[styles.title]}>{screenTitle}</ComfortaText>
          <ComfortaText style={[styles.description]}>
            {description}
          </ComfortaText>
        </View>
        <View>
          <Image
            source={{
              uri: `${BO_URL}${result.article.visuel?.uploadFile.url}`,
            }}
            style={[styles.articleImage]}
          />
          <ComfortaText style={[styles.title]}>
            {result.article.titre}
          </ComfortaText>
          <View style={[styles.flexStart]}>
            {result.article.thematiques.map((thematiqueContainer, index) => {
              return (
                <View style={[styles.thematiqueContainer]} key={index}>
                  <ComfortaText style={[styles.thematique]}>
                    {thematiqueContainer.thematique.nom}
                  </ComfortaText>
                </View>
              );
            })}
          </View>
          <HTML
            baseFontStyle={styles.htmlContainer}
            source={{ html: result.article.texte1 }}
          />
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
  htmlContainer: {
    color: Colors.commonText,
    fontFamily: "comfortaa-regular",
    fontSize: 14,
    lineHeight: 22,
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
