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
} from "../../components/baseComponents";
import EpdsResultInformation from "../../components/survey/epdsSurvey/epdsResultInformation/epdsResultInformation.component";
import { EpdsConstants, Labels, TndDbQueries } from "../../constants";
import { useAccessibilityReader } from "../../hooks";
import { GraphQLMutation } from "../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { SurveyQuestionAndAnswers } from "../../type";
import type { TndTest } from "../../type/tndSurvey.types";
import { TndSurveyUtils } from "../../utils";

interface Props {
  result: number;
  survey: SurveyQuestionAndAnswers[];
  startSurveyOver: () => void;
  tndTest: TndTest;
}

const TndSurveyResult: FC<Props> = ({ result, survey, tndTest }) => {
  const [queryVariables, setQueryVariables] = useState<unknown>();
  const [triggerLaunchQuery, setTriggerLaunchQuery] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const isAccessibilityModeOn = useAccessibilityReader();

  const labelsResultats = Labels.epdsSurvey.resultats;

  const saveSurveyResults = () => {
    console.log("saveSurveyResults");
    const tndAnswers = TndSurveyUtils.formatTndResponses(tndTest, survey);
    setQueryVariables({
      non: tndAnswers.non,
      oui: tndAnswers.oui,
      reponses: tndAnswers.reponses,
      test: tndAnswers.test,
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

  return (
    <>
      <GraphQLMutation
        query={TndDbQueries.ADD_TND_RESPONSES}
        variables={queryVariables}
        triggerLaunchMutation={triggerLaunchQuery}
      />
      <ScrollView ref={scrollRef}>
        <TitleH1
          title={Labels.epdsSurveyLight.titleLight}
          animated={false}
          style={styles.marginHorizontal}
        />
        <SecondaryText style={[styles.text, styles.fontBold]}>
          {Labels.epdsSurveyLight.oserEnParler}
        </SecondaryText>
        {result < EpdsConstants.RESULT_WELL_VALUE && (
          <SecondaryText style={[styles.text, styles.fontBold]}>
            {labelsResultats.retakeTestInvitation}
          </SecondaryText>
        )}
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
