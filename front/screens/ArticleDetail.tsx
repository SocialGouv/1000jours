import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import DidYouKnow from "../components/article/DidYouKnow";
import ImageBanner from "../components/article/ImageBanner";
import InShort from "../components/article/InShort";
import Links from "../components/article/Links";
import SubTitle from "../components/article/SubTitle";
import TextHtml from "../components/article/TextHtml";
import Thematics from "../components/article/Thematics";
import Title from "../components/article/Title";
import BackButton from "../components/BackButton";
import { CommonText, SecondaryText } from "../components/StyledText";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import { FontWeight } from "../constants/Layout";
import type {
  Article,
  ArticleInShortItem,
  ArticleLink,
  Step,
  TabHomeParamList,
} from "../types";

interface Props {
  route: RouteProp<{ params: { id: number; step: Step } }, "params">;
  navigation: StackNavigationProp<TabHomeParamList, "article">;
}

const ArticleDetail: FC<Props> = ({ route, navigation }) => {
  const articleId = route.params.id;
  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;
  let inShortArray: ArticleInShortItem[] = [];
  let linksArray: ArticleLink[] = [];

  const ARTICLE_DETAIL = gql`
    query GetArticleDetail {
      article(id: ${articleId}) {
        id
        titre
        resume
        texteTitre1: texte_1_titre
        texte1: texte_1
        texteTitre2: texte_2_titre
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
          url
        }
        thematiques {
          nom
          id
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(ARTICLE_DETAIL, {
    fetchPolicy: "no-cache",
  });

  const setInShortArray = (article: Article) => {
    inShortArray = [
      { icon: article.enbrefIcone1, text: article.enbrefTexte1 },
      { icon: article.enbrefIcone2, text: article.enbrefTexte2 },
      { icon: article.enbrefIcone3, text: article.enbrefTexte3 },
    ];
  };
  const setLinksArray = (article: Article) => {
    linksArray = [
      { label: article.lienTitre1, url: article.lienUrl1 },
      { label: article.lienTitre2, url: article.lienUrl2 },
      { label: article.lienTitre3, url: article.lienUrl3 },
      { label: article.lienTitre4, url: article.lienUrl4 },
    ];
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
          <SecondaryText style={[styles.title]}>{screenTitle}</SecondaryText>
          {description && (
            <CommonText style={[styles.description]}>{description}</CommonText>
          )}
        </View>
        <View>
          <ImageBanner imageUrl={result.article.visuel?.url} />
          <View style={styles.articleDetails}>
            <Title title={result.article.titre} />
            <Thematics items={result.article.thematiques} />
            <SubTitle title={result.article.texteTitre1} />
            <TextHtml html={result.article.texte1} />
            <DidYouKnow description={result.article.leSaviezVous} />
            <SubTitle title={result.article.texteTitre2} />
            <TextHtml html={result.article.texte2} />
            <InShort inShortArray={inShortArray} />
            <Links linksArray={linksArray} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleDetails: {
    paddingHorizontal: 15,
    paddingTop: 10,
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
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 18,
    fontWeight: FontWeight.black,
    marginVertical: 5,
    textTransform: "uppercase",
  },
});

export default ArticleDetail;
