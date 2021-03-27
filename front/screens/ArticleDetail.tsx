import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
// @ts-expect-error
import { BO_URL } from "@env";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";
import HTML from "react-native-render-html";

import IconArrowLeft from "../assets/images/icone retour.svg";
import Button from "../components/form/Button";
import Icomoon from "../components/Icomoon";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type { Article, TabHomeParamList } from "../types";

interface Props {
  route: RouteProp<{ params: { id: number } }, "params">;
  navigation: StackNavigationProp<TabHomeParamList, "article">;
}

const ArticleDetail: FC<Props> = ({ route, navigation }) => {
  const articleId = route.params.id;
  const screenTitle = "Nom de l'étape";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const ARTICLE_DETAIL = gql`
    query GetAllArticles {
      article: articles_by_pk(id: ${articleId}) {
        id
        titre
        resume
        texte1: texte_1
        visuel {
          uploadFile: upload_file {
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
  const { loading, error, data } = useQuery(ARTICLE_DETAIL);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (error) {
      return (
        <View>
          <Text>{Labels.errorMsg}</Text>
        </View>
      );
    } else {
      const result = data as { article: Article };
      return (
        <View style={[styles.mainContainer]}>
          <View>
            <View style={[styles.flexStart]}>
              <Button
                title="Retour"
                icon={<IconArrowLeft width={24} />}
                rounded={false}
                disabled={false}
                action={() => {
                  navigation.goBack();
                }}
                titleStyle={{ color: Colors.secondaryGreen }}
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
      );
    }
  }
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
