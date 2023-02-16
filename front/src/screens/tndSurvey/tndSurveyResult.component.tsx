/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  CustomSnackbar,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import EpdsResultInformation from "../../components/survey/epdsSurvey/epdsResultInformation/epdsResultInformation.component";
import { Labels, TndDbQueries } from "../../constants";
import { useAccessibilityReader } from "../../hooks";
import { GraphQLMutation } from "../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { SurveyQuestionAndAnswers } from "../../type";
import type { TndAnswers, TndQuestionnaire } from "../../type/tndSurvey.types";
import { TndSurveyUtils } from "../../utils";

interface Props {
  result: number;
  survey: SurveyQuestionAndAnswers[];
  startSurveyOver: () => void;
  tndQuestionnaire: TndQuestionnaire;
}

const TndSurveyResult: FC<Props> = ({ survey, tndQuestionnaire }) => {
  const [queryVariables, setQueryVariables] = useState<unknown>();
  const [triggerLaunchQuery, setTriggerLaunchQuery] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [tndAnswers, setTndAnswers] = useState<TndAnswers | undefined>(
    undefined
  );
  const scrollRef = useRef<ScrollView>(null);
  const isAccessibilityModeOn = useAccessibilityReader();

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

  useEffect(() => {
    saveSurveyResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHideSnackBar = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  const getTextToDisplay = useCallback(() => {
    return tndAnswers ? (
      <View style={styles.surveyResultTextContainer}>
        <SecondaryText style={[styles.text, styles.fontBold]}>
          {tndAnswers.signesAlerte
            ? Labels.tndSurvey.surveyResult.warningText
            : Labels.tndSurvey.surveyResult.text}
        </SecondaryText>
      </View>
    ) : null;
  }, [tndAnswers]);

  return (
    <>
      <GraphQLMutation
        query={TndDbQueries.ADD_TND_RESPONSES}
        variables={queryVariables}
        triggerLaunchMutation={triggerLaunchQuery}
      />
      <ScrollView ref={scrollRef}>
        <TitleH1
          title={Labels.tndSurvey.surveyResult.title}
          description={Labels.tndSurvey.surveyResult.description}
          animated={true}
          style={styles.marginHorizontal}
        />
        {getTextToDisplay()}
        <EpdsResultInformation
          leftBorderColor={Colors.primaryBlue}
          informationList={Labels.epdsSurveyLight.professionalsList}
          scrollRef={scrollRef}
        />
      </ScrollView>
      <CustomSnackbar
        isAccessibilityModeOn={isAccessibilityModeOn}
        visible={showSnackBar}
        isOnTop={false}
        backgroundColor={Colors.aroundMeSnackbar.background}
        onDismiss={onHideSnackBar}
        textColor={Colors.aroundMeSnackbar.text}
        text={Labels.epdsSurvey.beContacted.beContactedSent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fontBold: {
    fontWeight: FontWeight.bold,
  },
  fontButton: {
    fontSize: Sizes.md,
    textTransform: "uppercase",
  },
  marginHorizontal: {
    marginHorizontal: Margins.default,
  },
  rowView: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginHorizontal: Margins.default,
  },
  stateOfMind: {
    alignSelf: "center",
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingHorizontal: Paddings.default,
  },
  surveyResultTextContainer: {
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
