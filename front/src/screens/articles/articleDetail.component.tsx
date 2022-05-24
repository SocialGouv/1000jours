import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text as DefaultText,
} from "react-native";
import {
  AccessibilityInfo,
  findNodeHandle,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FAB } from "react-native-paper";

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
  SecondaryText,
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
import { TIMEOUT_FOCUS } from "../../constants/accessibility.constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { GraphQLQuery } from "../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type {
  Article,
  ArticleInShortItem,
  ArticleLink,
  Step,
  TabHomeParamList,
} from "../../types";
import { ArticleUtils, StorageUtils, TrackerUtils } from "../../utils";

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
  const articleTitleRef = React.useRef<DefaultText>(null);

  const [scrollerRef, setScrollerRef] = useState<ScrollView>();
  const [articleHasBeenRead, setArticleHasBeenRead] = useState(false);
  const MIN_RATIO_FOR_HAS_BEEN_READ = 0.55;
  const WIDTH_FOR_HTML = Math.round(SCREEN_WIDTH * 0.6);

  useEffect(() => {
    const checkArticleRead = async () => {
      if (articleId) {
        setArticleHasBeenRead(await ArticleUtils.isArticleRead(articleId));
      }
    };

    void checkArticleRead();

    // Force le focus sur le titre de l'article
    setAccessibilityFocus();
  }, [articleId]);

  const setAccessibilityFocus = () => {
    setTimeout(() => {
      if (articleTitleRef.current) {
        const reactTag = findNodeHandle(articleTitleRef.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        } else console.warn("ReactTag Not Found");
      }
    }, TIMEOUT_FOCUS);
  };

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

  const updateArticleHasBeenRead = useCallback(async () => {
    if (articleId && !articleHasBeenRead) {
      setArticleHasBeenRead(true);
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
  }, [articleHasBeenRead, articleId]);

  const hasBeenRead = useCallback(
    (nativeEvent: NativeScrollEvent) => {
      // L'article est considéré comme lu à partir du moment où l'utilisateur
      // a scrollé au moins 50% de l'article
      if (
        nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
        nativeEvent.contentSize.height * MIN_RATIO_FOR_HAS_BEEN_READ
      ) {
        void updateArticleHasBeenRead();
      }
    },
    [MIN_RATIO_FOR_HAS_BEEN_READ, updateArticleHasBeenRead]
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hasBeenRead(event.nativeEvent);
    },
    [hasBeenRead]
  );

  const scrollTopHandler = useCallback(() => {
    if (scrollerRef) scrollerRef.scrollTo({ x: 0, y: 0 });
  }, [scrollerRef]);

  const updateScrollerRef = useCallback((scroller: ScrollView) => {
    setScrollerRef(scroller);
  }, []);

  const renderReadArticleElement = articleHasBeenRead && (
    <View style={styles.articleIsReadView}>
      <SecondaryText style={styles.articleIsReadText}>
        {Labels.article.readArticle}
      </SecondaryText>
    </View>
  );

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
            onScroll={onScroll}
            ref={updateScrollerRef}
            scrollEventThrottle={0}
          >
            {!isInCarousel && (
              <TrackerHandler
                screenName={`${TrackerUtils.TrackingEvent.ARTICLE} : ${currentArticle.titre}`}
              />
            )}
            <View style={isInCarousel ? styles.borderRadius : styles.mainContainer}>
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
              <View style={styles.borderRadius}>
                <View style={[isInCarousel ? styles.borderRadius : styles.imageBannerContainer]}>
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
                  {renderReadArticleElement}
                </View>
                <View style={styles.articleDetails}>
                  <Title title={currentArticle.titre} ref={articleTitleRef} />
                  <Thematics items={currentArticle.thematiques} />
                  <InShort inShortArray={inShortArray} />
                  <SubTitle title={currentArticle.texteTitre1} />
                  <TextHtml
                    html={currentArticle.texte1}
                    offsetTotal={paddingMainContent + paddingArticleContent}
                    screenWidth={WIDTH_FOR_HTML}
                  />
                  <DidYouKnow description={currentArticle.leSaviezVous} />
                  <SubTitle title={currentArticle.texteTitre2} />
                  <TextHtml
                    html={currentArticle.texte2}
                    offsetTotal={paddingMainContent + paddingArticleContent}
                    screenWidth={WIDTH_FOR_HTML}
                  />
                  <Links linksArray={linksArray} />
                  <UsefulArticle articleName={currentArticle.titre} />
                </View>
              </View>
            </View>
          </ScrollView>

          <FAB
            visible
            icon="chevron-up"
            small
            color={Colors.primaryBlueDark}
            onPress={scrollTopHandler}
            accessibilityLabel={Labels.accessibility.articleGoToTop}
            style={styles.fabButton}
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
  articleIsReadText: {
    color: Colors.secondaryGreenDark,
    fontWeight: FontWeight.bold,
    padding: Paddings.smaller,
  },
  articleIsReadView: {
    borderRadius: Sizes.xxxxxs,
    bottom: Paddings.light,
    left: Paddings.light,
    position: "absolute",
  },
  borderRadius: {
    borderRadius: Sizes.xxxxs
  },
  fabButton: {
    color: Colors.primaryBlueDark,
    backgroundColor: Colors.white,
    borderColor: Colors.borderGrey,
    borderWidth: 2,
    position: 'absolute',
    margin: Margins.default,
    right: 0,
    bottom: 0,
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
