import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
// @ts-expect-error
import { BO_URL } from "@env";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { Image, ListItem } from "react-native-elements";
import HTML from "react-native-render-html";

import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type { Article, TabHomeParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList, "listArticles">;
}

const ListArticles: FC<Props> = ({ navigation }) => {
  const screenTitle = "Nom de l'étape";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const ALL_ARTICLES = gql`
    query GetAllArticles {
      articles {
        id
        titre
        resume
        visuel {
          uploadFile: upload_file {
            url
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(ALL_ARTICLES);
  const resume =
    "<p>C’est vous qui choisissez le moment où vous souhaitez avoir cet entretien, qui doit de préférence se dérouler durant le premier trimestre de la grossesse. Il permet notamment de définir le calendrier et le programme des séances de préparation à la naissance. Celles-ci sont au nombre de sept.C’est vous qui choisissez le moment où vous souhaitez avoir cet entretien, qui doit de préférence se dérouler durant le premier trimestre de la grossesse. Il permet notamment de définir le calendrier et le programme des séances de préparation à la naissance. Celles-ci sont au nombre de sept.C’est vous qui choisissez le moment où vous souhaitez avoir cet entretien, qui doit de préférence se dérouler durant le premier trimestre de la grossesse. Il permet notamment de définir le calendrier et le programme des séances de préparation à la naissance. Celles-ci sont au nombre de sept.</p>";

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (error) {
      console.log(error);
      return (
        <View>
          <Text>{Labels.errorMsg}</Text>
        </View>
      );
    } else {
      const result = data as { articles: Article[] };
      return (
        <View style={[styles.mainContainer]}>
          <View>
            <Text style={[styles.title]}>{screenTitle}</Text>
            <Text style={[styles.description]}>{description}</Text>
          </View>
          <View style={[styles.listContainer]}>
            <Text style={[styles.headerListInfo]}>
              {result.articles.length} article(s) à lire
            </Text>
            {result.articles.map((article, index) => {
              return (
                <ListItem
                  key={index}
                  bottomDivider
                  onPress={() => {
                    navigation.navigate("article", { id: article.id });
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
                      <HTML
                        renderers={{
                          p: (
                            _,
                            children,
                            convertedCSSStyles,
                            { allowFontScaling, key }
                          ) => {
                            return (
                              <Text
                                numberOfLines={3}
                                allowFontScaling={allowFontScaling}
                                key={key}
                                style={convertedCSSStyles}
                              >
                                {children}
                              </Text>
                            );
                          },
                        }}
                        source={{ html: resume }}
                        baseFontStyle={styles.articleDescriptionFont}
                      />
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </View>
        </View>
      );
    }
  }
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
