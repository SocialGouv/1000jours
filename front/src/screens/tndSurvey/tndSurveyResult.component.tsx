/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";

import ImgBtnReview from "../../assets/images/btn-review-sp-plus.svg";
import { ArticleCard } from "../../components";
import { CommonText, TitleH1, View } from "../../components/baseComponents";
import {
  FetchPoliciesConstants,
  HomeDbQueries,
  Labels,
  Links,
  TndDbQueries,
} from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { GraphQLMutation, GraphQLQuery } from "../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { SurveyQuestionAndAnswers } from "../../type";
import type { TndAnswers, TndQuestionnaire } from "../../type/tndSurvey.types";
import type { Article } from "../../types";
import { LinkingUtils, TndSurveyUtils } from "../../utils";

interface Props {
  result: number;
  survey: SurveyQuestionAndAnswers[];
  startSurveyOver: () => void;
  tndQuestionnaire: TndQuestionnaire;
}

const TndSurveyResult: FC<Props> = ({ survey, tndQuestionnaire }) => {
  const [queryVariables, setQueryVariables] = useState<unknown>();
  const [triggerLaunchQuery, setTriggerLaunchQuery] = useState(false);
  const [tndAnswers, setTndAnswers] = useState<TndAnswers | undefined>(
    undefined
  );
  const [handicapArticles, setHandicapArticles] = useState<Article[]>([]);

  const saveSurveyResults = () => {
    const answers = TndSurveyUtils.formatTndResponses(tndQuestionnaire, survey);
    setTndAnswers(answers);
    setQueryVariables({
      domaineAvecReponseNon: answers.domaineAvecReponseNon,
      questionnaire: answers.questionnaire,
      reponseNon: answers.reponseNon,
      reponseOui: answers.reponseOui,
      reponses: answers.reponses,
      signesAlerte: answers.signesAlerte,
    });
    setTriggerLaunchQuery(!triggerLaunchQuery);
  };

  const handleResults = useCallback((data: unknown) => {
    const result = data as { articles: Article[] };
    setHandicapArticles(result.articles);
  }, []);

  const tndReview = useCallback(() => {
    void LinkingUtils.openWebsite(Links.tndReviewUrl, false);
  }, []);

  useEffect(() => {
    saveSurveyResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTextToDisplay = useCallback(() => {
    if (tndAnswers && tndQuestionnaire.resultat) {
      const html = tndAnswers.signesAlerte
        ? tndQuestionnaire.resultat.texteAlerte
        : tndQuestionnaire.resultat.texteRas;
      return (
        <View style={styles.surveyResultTextContainer}>
          <HTML
            WebView={WebView}
            source={{ html: html }}
            contentWidth={SCREEN_WIDTH}
          />
          <View>
            <TouchableOpacity style={styles.btnReview} onPress={tndReview}>
              <ImgBtnReview height={Sizes.xxxxxl} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }, [tndAnswers, tndQuestionnaire, tndReview]);

  return (
    <>
      <GraphQLMutation
        query={TndDbQueries.ADD_TND_RESPONSES}
        variables={queryVariables}
        triggerLaunchMutation={triggerLaunchQuery}
      />
      <GraphQLQuery
        query={HomeDbQueries.LIST_ARTICLES_HANDICAP}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        getFetchedData={handleResults}
      />
      <ScrollView>
        {tndQuestionnaire.resultat?.titre && (
          <TitleH1
            title={tndQuestionnaire.resultat.titre}
            description={tndQuestionnaire.resultat.description}
            animated={true}
            style={styles.marginHorizontal}
          />
        )}
        {getTextToDisplay()}
        {handicapArticles.length > 0 && (
          <View style={styles.listArticles}>
            <CommonText style={styles.listArticlesTitle}>
              {Labels.tndSurvey.surveyResult.articlesToRead}
            </CommonText>
            {handicapArticles.map((article, index) => (
              <View key={index}>
                <ArticleCard
                  selectedArticleId={article.id}
                  articles={handicapArticles}
                  isFromTndScreen={true}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  btnReview: {
    alignItems: "center",
    marginTop: Paddings.default,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    margin: Margins.default,
  },
  fontBold: {
    fontWeight: FontWeight.bold,
  },
  fontButton: {
    fontSize: Sizes.md,
    textTransform: "uppercase",
  },
  listArticles: {
    paddingBottom: Paddings.light,
    paddingHorizontal: Paddings.default,
  },
  listArticlesTitle: {
    color: Colors.secondaryGreen,
    fontSize: Sizes.xs,
    fontStyle: "italic",
    paddingTop: Paddings.default,
    paddingVertical: Paddings.smaller,
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
  marginHorizontal: {
    marginHorizontal: Margins.default,
  },
  rowView: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginHorizontal: Margins.default,
  },
  surveyResultTextContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.default,
  },
  text: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.mmd,
    marginHorizontal: Margins.default,
    paddingTop: Paddings.default,
  },
  validateButton: {
    alignItems: "center",
    paddingBottom: Paddings.default,
  },
});

export default TndSurveyResult;
