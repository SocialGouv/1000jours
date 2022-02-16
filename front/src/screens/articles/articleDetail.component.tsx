import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  DidYouKnow,
  ImageBanner,
  InShort,
  Links,
  SubTitle,
  TextHtml,
  Thematics,
  Title,
} from "../../components";
import {
  BackButton,
  ShareButton,
  SharePageType,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  DatabaseQueries,
  FetchPoliciesConstants,
  Labels,
} from "../../constants";
import { GraphQlQuery } from "../../services";
import { Paddings } from "../../styles";
import type {
  Article,
  ArticleInShortItem,
  ArticleLink,
  Step,
  TabHomeParamList,
} from "../../types";
import { TrackerUtils } from "../../utils";

interface Props {
  route?: RouteProp<{ params: { id: number; step?: Step } }, "params">;
  navigation?: StackNavigationProp<TabHomeParamList>;
  _articleId?: number;
  _articleStep?: Step | undefined;
  goBack?: () => void;
}

const paddingMainContent = Paddings.default;
const paddingArticleContent = Paddings.light;

const ArticleDetail: FC<Props> = ({
  route,
  navigation,
  _articleId,
  _articleStep,
  goBack,
}) => {
  const articleId = route ? route.params.id : _articleId;
  const screenTitle = route ? route.params.step?.nom : _articleStep?.nom;
  const description = route
    ? route.params.step?.description
    : _articleStep?.description;
  let inShortArray: ArticleInShortItem[] = [];
  let linksArray: ArticleLink[] = [];
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>();

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

  const handleResults = (data: unknown) => {
    const result = (data as { article: Article }).article;
    setInShortArray(result);
    setLinksArray(result);
    setCurrentArticle(result);
  };

  return (
    <>
      {articleId && (
        <GraphQlQuery
          query={DatabaseQueries.ARTICLE_DETAILS_WITH_ID(articleId)}
          fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
          updateFetchedData={handleResults}
        />
      )}
      {currentArticle && (
        <ScrollView>
          <TrackerHandler
            screenName={`${TrackerUtils.TrackingEvent.ARTICLE} : ${currentArticle.titre}`}
          />
          <View style={[styles.mainContainer]}>
            <View>
              <View style={[styles.flexStart]}>
                <BackButton
                  action={() => {
                    if (goBack) goBack();
                    else navigation?.goBack();
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
              <View style={styles.imageBannerContainer}>
                <ImageBanner visuel={currentArticle.visuel} />
                <View style={styles.flexEnd}>
                  <ShareButton
                    buttonTitle={Labels.buttons.share}
                    title={Labels.appName}
                    message={`${Labels.share.article.messageStart} "${currentArticle.titre}" ${Labels.share.article.messageEnd}`}
                    page={SharePageType.article}
                    id={currentArticle.id}
                    buttonStyle={styles.shareButton}
                  />
                </View>
              </View>
              <View style={styles.articleDetails}>
                <Title title={currentArticle.titre} />
                <Thematics items={currentArticle.thematiques} />
                <SubTitle title={currentArticle.texteTitre1} />
                <TextHtml
                  html={currentArticle.texte1}
                  offsetTotal={paddingMainContent + paddingArticleContent}
                />
                <DidYouKnow description={currentArticle.leSaviezVous} />
                <SubTitle title={currentArticle.texteTitre2} />
                <TextHtml
                  html={currentArticle.texte2}
                  offsetTotal={paddingMainContent + paddingArticleContent}
                />
                <InShort inShortArray={inShortArray} />
                <Links linksArray={linksArray} />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  articleDetails: {
    paddingHorizontal: paddingArticleContent,
    paddingTop: Paddings.light,
  },
  flexEnd: {
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    bottom: Paddings.light,
    position: "absolute",
    right: Paddings.light,
  },
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageBannerContainer: {
    marginBottom: 15,
    marginTop: 15,
  },
  mainContainer: {
    padding: paddingMainContent,
  },
  shareButton: {
    marginBottom: 0,
  },
});

export default ArticleDetail;
