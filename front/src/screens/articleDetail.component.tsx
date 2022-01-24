import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ErrorMessage, Loader, TitleH1 } from "../components";
import DidYouKnow from "../components/article/didYouKnow.component";
import ImageBanner from "../components/article/imageBanner.component";
import InShort from "../components/article/inShort.component";
import Links from "../components/article/links.component";
import SubTitle from "../components/article/subTitle.component";
import TextHtml from "../components/article/textHtml.component";
import Thematics from "../components/article/thematics.component";
import Title from "../components/article/title.component";
import BackButton from "../components/baseComponents/backButton.component";
import { View } from "../components/Themed";
import { FetchPoliciesConstants } from "../constants";
import { Paddings } from "../styles";
import type {
  Article,
  ArticleInShortItem,
  ArticleLink,
  Step,
  TabHomeParamList,
} from "../types";
import { TrackerUtils } from "../utils";

interface Props {
  route: RouteProp<{ params: { id: number; step?: Step } }, "params">;
  navigation: StackNavigationProp<TabHomeParamList>;
}

const paddingMainContent = Paddings.default;
const paddingArticleContent = Paddings.light;

const ArticleDetail: FC<Props> = ({ route, navigation }) => {
  const { trackScreenView } = useMatomo();
  const articleId = route.params.id;
  const screenTitle = route.params.step?.nom;
  const description = route.params.step?.description;
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
          id
          hash
          url
          height
          width
        }
        thematiques {
          nom
          id
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(ARTICLE_DETAIL, {
    fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
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

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  const result = data as { article: Article };
  trackScreenView(
    `${TrackerUtils.TrackingEvent.ARTICLE} : ${result.article.titre}`
  );
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
          <TitleH1
            title={screenTitle}
            description={description}
            animated={true}
          />
        </View>
        <View>
          <ImageBanner visuel={result.article.visuel} />
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
              html={result.article.texte2}
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
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainContainer: {
    padding: paddingMainContent,
  },
});

export default ArticleDetail;
