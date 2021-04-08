import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
// @ts-expect-error
import { BO_URL } from "@env";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { Image, ListItem } from "react-native-elements";
import HTML from "react-native-render-html";

import BabyIcon from "../assets/images/icone bébé.svg";
import BabyBottleIcon from "../assets/images/icone biberon.svg";
import ParentsIcon from "../assets/images/icone parents.svg";
import BackButton from "../components/BackButton";
import { CommonText } from "../components/StyledText";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type {
  Article,
  ArticleInShortItem,
  ArticleLink,
  Step,
  TabHomeParamList,
} from "../types";
import { InShortIcon } from "../types";

interface Props {
  route: RouteProp<{ params: { id: number; step: Step } }, "params">;
  navigation: StackNavigationProp<TabHomeParamList, "article">;
}

const ArticleDetail: FC<Props> = ({ route, navigation }) => {
  const articleId = route.params.id;
  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;
  const inShortArray: ArticleInShortItem[] = [];
  const linksArray: ArticleLink[] = [];

  const getInShortIcon = (icon: string) => {
    const iconSize = 40;
    if (InShortIcon.baby === icon) return <BabyIcon width={iconSize} />;
    if (InShortIcon.parents === icon) return <ParentsIcon width={iconSize} />;
    if (InShortIcon.babyBottle === icon)
      return <BabyBottleIcon width={iconSize} />;
    return null;
  };

  const goToUrl = (url: string) => {
    void Linking.openURL(url);
  };

  const ARTICLE_DETAIL = gql`
    query GetArticleDetail {
      article: articles_by_pk(id: ${articleId}) {
        id
        titre
        resume
        texte1: texte_1
        texte2: texte_2
        leSaviezVous: le_saviez_vous
        enbrefTexte1: enbref_1_texte
        enbrefTexte2: enbref_2_texte
        enbrefTexte3: enbref_3_texte
        enbrefIcone1: enbref_1_icone
        enbrefIcone2: enbref_2_icone
        enbrefIcone3: enbref_3_icone
        lienTitre1: lien_1_titre
        lienTitre2: lien_2_titre
        lienTitre3: lien_3_titre
        lienTitre4: lien_4_titre
        lienUrl1: lien_1_url
        lienUrl2: lien_2_url
        lienUrl3: lien_3_url
        lienUrl4: lien_4_url
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

  const setInShortArray = (article: Article) => {
    if (article.enbrefTexte1)
      inShortArray.push({
        description: article.enbrefTexte1,
        icon: article.enbrefIcone1,
      });
    if (article.enbrefTexte2)
      inShortArray.push({
        description: article.enbrefTexte2,
        icon: article.enbrefIcone2,
      });
    if (article.enbrefTexte3)
      inShortArray.push({
        description: article.enbrefTexte3,
        icon: article.enbrefIcone3,
      });
  };
  const setLinksArray = (article: Article) => {
    if (article.lienUrl1)
      linksArray.push({
        label: article.lienTitre1,
        url: article.lienUrl1,
      });
    if (article.lienUrl2)
      linksArray.push({
        label: article.lienTitre2,
        url: article.lienUrl2,
      });
    if (article.lienUrl3)
      linksArray.push({
        label: article.lienTitre3,
        url: article.lienUrl3,
      });
    if (article.lienUrl4)
      linksArray.push({
        label: article.lienTitre4,
        url: article.lienUrl4,
      });
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

  const result = data as { article: Article };
  setInShortArray(result.article);
  setLinksArray(result.article);
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
          <CommonText style={[styles.title]}>{screenTitle}</CommonText>
          <CommonText style={[styles.description]}>{description}</CommonText>
        </View>
        <View>
          {/* Visuel */}
          <Image
            source={{
              uri: `${BO_URL}${result.article.visuel?.uploadFile.url}`,
            }}
            style={[styles.articleImage]}
          />

          {/* Titre */}
          <CommonText style={[styles.title]}>{result.article.titre}</CommonText>

          {/* Thématiques */}
          <View style={[styles.flexStart]}>
            {result.article.thematiques.map((thematiqueContainer, index) => {
              return (
                <View style={[styles.thematiqueContainer]} key={index}>
                  <CommonText style={[styles.thematique]}>
                    {thematiqueContainer.thematique.nom}
                  </CommonText>
                </View>
              );
            })}
          </View>

          {/* Texte 1 */}
          <HTML
            baseFontStyle={styles.htmlContainer}
            source={{ html: result.article.texte1 }}
          />

          {/* Le Saviez-Vous ? */}
          <View style={styles.didYouKnowContainer}>
            <View style={[styles.cardTitleContainer, styles.positionRelative]}>
              <CommonText style={[styles.didYouKnowTitle]}>
                {Labels.article.didYouKnowTitle}
              </CommonText>
              <Text
                style={[
                  styles.cardBackgroundSymbol,
                  styles.didYouKnowBackgroundSymbol,
                ]}
              >
                ?
              </Text>
            </View>
            <CommonText style={[styles.didYouKnowContent]}>
              {result.article.leSaviezVous}
            </CommonText>
          </View>

          {/* Texte 2 */}
          <HTML
            baseFontStyle={styles.htmlContainer}
            source={{ html: result.article.texte2 }}
          />

          {/* En Bref */}
          <View style={styles.inShortContainer}>
            <View style={[styles.cardTitleContainer, styles.positionRelative]}>
              <CommonText style={[styles.inShortTitle]}>
                {Labels.article.inShortTitle}
              </CommonText>
              <Text
                style={[
                  styles.cardBackgroundSymbol,
                  styles.inShortBackgroundSymbol,
                ]}
              >
                !
              </Text>
            </View>

            <View style={styles.inShortListItemsContainer}>
              {inShortArray.map((item, i) => (
                <ListItem key={i} containerStyle={[styles.listItemContainer]}>
                  {getInShortIcon(item.icon)}
                  <ListItem.Content>
                    <ListItem.Title>
                      <CommonText style={[styles.listItemTitle]}>
                        {item.description}
                      </CommonText>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>

          {/* Liens */}
          <View style={styles.linksContainer}>
            {linksArray.map((item, i) => (
              <CommonText
                key={i}
                style={[styles.link]}
                onPress={() => {
                  goToUrl(item.url);
                }}
              >
                {item.label}
              </CommonText>
            ))}
          </View>
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
  cardBackgroundSymbol: {
    fontSize: 50,
    fontWeight: "bold",
    paddingLeft: 18,
    position: "absolute",
    zIndex: -1,
  },
  cardTitleContainer: {
    backgroundColor: "transparent",
    flex: 1,
    height: 35,
    justifyContent: "center",
    paddingLeft: 18,
  },
  colorPrimaryBlueDark: {
    color: Colors.primaryBlueDark,
  },
  description: {
    color: Colors.commonText,
  },
  didYouKnowBackgroundSymbol: {
    color: Colors.primaryYellowLight,
  },
  didYouKnowContainer: {
    backgroundColor: Colors.cardGrey,
    borderLeftColor: Colors.primaryYellow,
    borderLeftWidth: 4,
    paddingVertical: 12,
  },
  didYouKnowContent: {
    color: Colors.primaryBlueDark,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 18,
    paddingTop: 5,
  },
  didYouKnowTitle: {
    color: Colors.primaryYellow,
    fontSize: 16,
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
  },
  inShortBackgroundSymbol: {
    color: Colors.secondaryGreenLight,
  },
  inShortContainer: {
    backgroundColor: Colors.cardGrey,
    borderLeftColor: Colors.secondaryGreen,
    borderLeftWidth: 4,
    paddingVertical: 12,
  },
  inShortListItemsContainer: {
    backgroundColor: "transparent",
  },
  inShortTitle: {
    color: Colors.secondaryGreen,
    fontSize: 16,
    marginVertical: "auto",
  },
  link: {
    color: Colors.commonText,
    flexDirection: "column",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textDecorationLine: "underline",
  },
  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
  listItemContainer: {
    backgroundColor: "transparent",
  },
  listItemTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 14,
  },
  mainContainer: {
    padding: 15,
  },
  positionRelative: {
    position: "relative",
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
