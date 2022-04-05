import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { FAB } from "react-native-elements";

import {
  DidYouKnow,
  ImageBanner,
  InShort,
  Links,
  SubTitle,
  TextHtml,
  Thematics,
  Title,
  UsefulArticle,
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
  FetchPoliciesConstants,
  HomeDbQueries,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, Margins, Paddings } from "../../styles";
import type {
  Article,
  ArticleInShortItem,
  ArticleLink,
  Step,
  TabHomeParamList,
} from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";

interface Props {
  route?: RouteProp<{ params: { id: number; step?: Step } }, "params">;
  navigation?: StackNavigationProp<TabHomeParamList>;
  _articleId?: number;
  _articleStep?: Step | undefined;
  isInCarousel?: boolean;
  goBack?: () => void;
}

const paddingMainContent = Paddings.default;
const paddingArticleContent = Paddings.light;

const ArticleDetail: FC<Props> = ({
  route,
  navigation,
  _articleId,
  _articleStep,
  isInCarousel,
  goBack,
}) => {
  const articleId = route ? route.params.id : _articleId;
  const screenTitle = route ? route.params.step?.nom : _articleStep?.nom;
  const description = route
    ? route.params.step?.description
    : _articleStep?.description;
  const [inShortArray, setInShortArray] = useState<ArticleInShortItem[]>([]);
  const [linksArray, setLinksArray] = useState<ArticleLink[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>();

  const [scrollerRef, setScrollerRef] = useState<ScrollView>();
  const scrollViewHeight = useRef(0);
  const scrollContentHeight = useRef(0);
  const articleHasBeenRead = useRef(false);
  const MIN_RATIO_FOR_HAS_BEEN_READ = 0.25;

  const setArticleInShortArray = useCallback((article: Article) => {
    setInShortArray([
      { icon: article.enbrefIcone1, text: article.enbrefTexte1 },
      { icon: article.enbrefIcone2, text: article.enbrefTexte2 },
      { icon: article.enbrefIcone3, text: article.enbrefTexte3 },
    ]);
  }, []);

  const setArticleLinksArray = useCallback((article: Article) => {
    setLinksArray([
      { label: article.lienTitre1, url: article.lienUrl1 },
      { label: article.lienTitre2, url: article.lienUrl2 },
      { label: article.lienTitre3, url: article.lienUrl3 },
      { label: article.lienTitre4, url: article.lienUrl4 },
    ]);
  }, []);

  const handleResults = useCallback(
    (data: unknown) => {
      const result = (data as { article: Article }).article;
      setArticleInShortArray(result);
      setArticleLinksArray(result);
      setCurrentArticle(result);
    },
    [setArticleInShortArray, setArticleLinksArray]
  );

  const onBackButtonPressed = useCallback(() => {
    if (goBack) goBack();
    else navigation?.goBack();
  }, [goBack, navigation]);

  const setArticleHasBeenRead = useCallback(async () => {
    if (articleId && !articleHasBeenRead.current) {
      articleHasBeenRead.current = true;
      const articlesRead: number[] =
        (await StorageUtils.getObjectValue(
          StorageKeysConstants.articlesRead
        )) ?? [];
      if (!articlesRead.includes(articleId)) {
        articlesRead.push(articleId);
        void StorageUtils.storeObjectValue(
          StorageKeysConstants.articlesRead,
          articlesRead
        );
      }
    }
  }, [articleId]);

  const hasBeenRead = useCallback(
    (nativeEvent: NativeScrollEvent) => {
      // L'article est considéré comme lu à partir du moment où l'utilisateur
      // à scroller au moins 25% de l'article
      if (
        nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
        nativeEvent.contentSize.height * MIN_RATIO_FOR_HAS_BEEN_READ
      ) {
        void setArticleHasBeenRead();
      }
    },
    [MIN_RATIO_FOR_HAS_BEEN_READ, setArticleHasBeenRead]
  );

  const checkScrollContentHeight = () => {
    // Considère que l'article est lu lorsqu'il est affiché entièrement à l'écran (sans avoir besoin de scroller)
    if (scrollContentHeight.current <= scrollViewHeight.current) {
      void setArticleHasBeenRead();
    }
  };

  const onContentSizeChange = useCallback((width: number, height: number) => {
    scrollContentHeight.current = height;
  }, []);

  const onScrollViewLayout = useCallback((event: LayoutChangeEvent) => {
    scrollViewHeight.current = event.nativeEvent.layout.height;
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hasBeenRead(event.nativeEvent);
    },
    [hasBeenRead]
  );

  useEffect(() => {
    // Attend que le contenu de la scrollView soit chargé (notamment les images de l'article)
    setTimeout(() => {
      checkScrollContentHeight();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTopHandler = useCallback(() => {
    if (scrollerRef) scrollerRef.scrollTo({ x: 0, y: 0 });
  }, [scrollerRef]);

  const updateScrollerRef = useCallback((scroller: ScrollView) => {
    setScrollerRef(scroller);
  }, []);

  return (
    <>
      {articleId && (
        <GraphQLQuery
          query={HomeDbQueries.ARTICLE_DETAILS_WITH_ID(articleId)}
          fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
          getFetchedData={handleResults}
        />
      )}
      {currentArticle && (
        <>
          <ScrollView
            onLayout={onScrollViewLayout}
            onScroll={onScroll}
            ref={updateScrollerRef}
            onContentSizeChange={onContentSizeChange}
            scrollEventThrottle={0}
          >
            <TrackerHandler
              screenName={`${TrackerUtils.TrackingEvent.ARTICLE} : ${currentArticle.titre}`}
            />
            <View style={isInCarousel ? null : styles.mainContainer}>
              {isInCarousel ? null : (
                <View>
                  <View style={styles.flexStart}>
                    <BackButton action={onBackButtonPressed} />
                  </View>
                  <TitleH1
                    title={screenTitle}
                    description={description}
                    animated
                  />
                </View>
              )}
              <View>
                <View style={isInCarousel ? null : styles.imageBannerContainer}>
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
                  <InShort inShortArray={inShortArray} />
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
                  <Links linksArray={linksArray} />
                  <UsefulArticle articleName={currentArticle.titre} />
                </View>
              </View>
            </View>
          </ScrollView>

          <FAB
            visible
            icon={{
              color: Colors.primaryBlueDark,
              name: "expand-less",
            }}
            size="small"
            placement="right"
            color={Colors.white}
            onPress={scrollTopHandler}
            accessibilityLabel={Labels.accessibility.articleGoToTop}
          />
        </>
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
    marginBottom: Margins.default,
    marginTop: Margins.default,
  },
  mainContainer: {
    padding: paddingMainContent,
  },
  shareButton: {
    marginBottom: 0,
  },
});

export default ArticleDetail;
