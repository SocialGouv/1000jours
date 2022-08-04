/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { EpdsAssets } from "../../components/assets";
import {
  CommonText,
  CustomButton,
  CustomSnackbar,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import EpdsResultContactMamanBlues from "../../components/epdsSurvey/epdsResultContactMamanBlues.component";
import EpdsResultInformation from "../../components/epdsSurvey/epdsResultInformation/epdsResultInformation.component";
import {
  EpdsConstants,
  EpdsDbQueries,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { useAccessibilityReader } from "../../hooks";
import { GraphQLMutation } from "../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils, NotificationUtils, StorageUtils } from "../../utils";

interface Props {
  result: number;
  epdsSurvey: EpdsQuestionAndAnswers[];
  showBeContactedButton: boolean;
  lastQuestionHasThreePointsAnswer: boolean;
  startSurveyOver: () => void;
}

const EpdsResult: FC<Props> = ({
  result,
  epdsSurvey,
  showBeContactedButton,
  lastQuestionHasThreePointsAnswer,
  startSurveyOver,
}) => {
  const [queryVariables, setQueryVariables] = useState<unknown>();
  const [triggerLaunchQuery, setTriggerLaunchQuery] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const isAccessibilityModeOn = useAccessibilityReader();

  const labelsResultats = Labels.epdsSurvey.resultats;

  useEffect(() => {
    const saveEpdsSurveyResults = async () => {
      const newCounter =
        await EpdsSurveyUtils.incrementEpdsSurveyCounterAndGetNewValue();
      // Si newCounter est égal à 1, cela signifie que c'est la première fois que le test EPDS a été passé, on peut alors programmer la notif de rappel
      if (newCounter === 1) {
        await NotificationUtils.scheduleEpdsNotification();
      }
      const genderValue = await StorageUtils.getStringValue(
        StorageKeysConstants.epdsGenderKey
      );

      const answersScores = EpdsSurveyUtils.getEachQuestionScore(epdsSurvey);

      setQueryVariables({
        compteur: newCounter,
        genre: genderValue,
        reponseNum1: answersScores[0],
        reponseNum10: answersScores[9],
        reponseNum2: answersScores[1],
        reponseNum3: answersScores[2],
        reponseNum4: answersScores[3],
        reponseNum5: answersScores[4],
        reponseNum6: answersScores[5],
        reponseNum7: answersScores[6],
        reponseNum8: answersScores[7],
        reponseNum9: answersScores[8],
        score: result,
      });
      setTriggerLaunchQuery(!triggerLaunchQuery);
    };

    void saveEpdsSurveyResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delete saved storage keys for EPDS survey
  void EpdsSurveyUtils.removeEpdsStorageItems();

  const getIcon = (icone: EpdsConstants.ResultIconValueEnum) => {
    const iconsMap = new Map<
      EpdsConstants.ResultIconValueEnum,
      React.ReactNode
    >();
    iconsMap.set(
      EpdsConstants.ResultIconValueEnum.bien,
      <EpdsAssets.IconeResultatBien />
    );
    iconsMap.set(
      EpdsConstants.ResultIconValueEnum.moyen,
      <EpdsAssets.IconeResultatMoyen />
    );
    iconsMap.set(
      EpdsConstants.ResultIconValueEnum.pasBien,
      <EpdsAssets.IconeResultatPasBien />
    );
    return iconsMap.get(icone);
  };

  const iconAndStateOfMind = EpdsSurveyUtils.getResultIconAndStateOfMind(
    result,
    lastQuestionHasThreePointsAnswer
  );
  const introductionText = EpdsSurveyUtils.getResultIntroductionText(
    result,
    lastQuestionHasThreePointsAnswer
  );
  const colorStyle = { color: iconAndStateOfMind.color };
  const beContactedColors =
    EpdsSurveyUtils.getPrimaryAndSecondaryBeContactedColors(
      result,
      lastQuestionHasThreePointsAnswer
    );

  const onHideSnackBar = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  return (
    <>
      <GraphQLMutation
        query={EpdsDbQueries.EPDS_ADD_RESPONSE}
        variables={queryVariables}
        triggerLaunchMutation={triggerLaunchQuery}
      />
      <ScrollView ref={scrollRef}>
        <TitleH1
          title={Labels.epdsSurveyLight.titleLight}
          animated={false}
          style={styles.marginHorizontal}
        />
        <View style={styles.rowView}>
          {getIcon(iconAndStateOfMind.icon)}
          <CommonText style={[styles.stateOfMind, colorStyle]}>
            {iconAndStateOfMind.stateOfMind}
          </CommonText>
        </View>
        <SecondaryText style={[styles.text, styles.fontBold]}>
          {Labels.epdsSurveyLight.oserEnParler}
        </SecondaryText>
        <SecondaryText style={styles.text}>
          {introductionText.text}
          {introductionText.boldText && (
            <SecondaryText style={[styles.text, styles.fontBold]}>
              {introductionText.boldText}
            </SecondaryText>
          )}
        </SecondaryText>
        {result < EpdsConstants.RESULT_WELL_VALUE && (
          <SecondaryText style={[styles.text, styles.fontBold]}>
            {labelsResultats.retakeTestInvitation}
          </SecondaryText>
        )}
        {showBeContactedButton && (
          <EpdsResultContactMamanBlues
            primaryColor={beContactedColors.primaryColor}
            secondaryColor={beContactedColors.secondaryColor}
            showSnackBar={setShowSnackBar}
          />
        )}
        <EpdsResultInformation
          leftBorderColor={Colors.primaryBlue}
          informationList={Labels.epdsSurveyLight.professionalsList}
          scrollRef={scrollRef}
        />
        <View style={styles.validateButton}>
          <CustomButton
            title={Labels.epdsSurvey.restartSurvey}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={startSurveyOver}
          />
        </View>
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

export default EpdsResult;
