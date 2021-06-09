import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { CommonText, SecondaryText } from "../components";
import DidYouKnow from "../components/article/DidYouKnow";
import ImageBanner from "../components/article/ImageBanner";
import InShort from "../components/article/InShort";
import Links from "../components/article/Links";
import SubTitle from "../components/article/SubTitle";
import TextHtml from "../components/article/TextHtml";
import Thematics from "../components/article/Thematics";
import Title from "../components/article/Title";
import BackButton from "../components/BackButton";
import { View } from "../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../constants";
import type {
  Article,
  ArticleInShortItem,
  ArticleLink,
  Step,
  TabHomeParamList,
} from "../types";
import { TrackerUtils } from "../utils";

interface Props {
  route: RouteProp<{ params: { id: number; step: Step } }, "params">;
  navigation: StackNavigationProp<TabHomeParamList, "article">;
}

const paddingMainContent = Paddings.default;
const paddingArticleContent = Paddings.light;

const ArticleDetail: FC<Props> = ({ route, navigation }) => {
  const { trackScreenView } = useMatomo();
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
  trackScreenView(
    `${TrackerUtils.TrackingEvent.ARTICLE} : ${result.article.titre}`
  );
  setInShortArray(result.article);
  setLinksArray(result.article);

  const html =
    '<p style="text-align:justify;"><strong>Deux préventions compatibles :</strong></p><figure class="media"><oembed url="https://www.youtube.com/watch?v=Hmj3LToi4W8"></oembed></figure><p style="text-align:justify;">L’aplatissement du crâne, sans gravité, se produit si bébé bouge peu la tête. On peut l’éviter, en variant ses positions à l’éveil&nbsp;:</p><ul><li style="text-align:justify;">dans les bras</li><li style="text-align:justify;">sur un tapis avec ses jouets autour de lui</li><li style="text-align:justify;">sur le ventre lors du change</li><li style="text-align:justify;">limitez le temps d’immobilisation&nbsp;(le cosy, juste pour le trajet)</li></ul><p style="text-align:justify;">Dormir sur le dos est primordial pour sa sécurité. Mais il bouge en dormant (sans cale-bébé) et regarde autour de lui&nbsp;(sans tour de lit). &nbsp;</p>';
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
            <TextHtml
              html={result.article.texte1}
              offsetTotal={paddingMainContent + paddingArticleContent}
            />
            <DidYouKnow description={result.article.leSaviezVous} />
            <SubTitle title={result.article.texteTitre2} />
            <TextHtml
              html={html}
              offsetTotal={paddingMainContent + paddingArticleContent}
            />
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
    paddingHorizontal: paddingArticleContent,
    paddingTop: Paddings.light,
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
    paddingHorizontal: paddingMainContent,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.black,
    marginVertical: Margins.smallest,
    textTransform: "uppercase",
  },
});

export default ArticleDetail;
