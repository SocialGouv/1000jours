/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useMutation } from "@apollo/client/react/hooks";
import * as React from "react";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import IconeResultatBien from "../../assets/images/icone_resultats_bien.svg";
import IconeResultatMoyen from "../../assets/images/icone_resultats_moyen.svg";
import IconeResultatPasBien from "../../assets/images/icone_resultats_pasbien.svg";
import { CustomButton, CustomSnackbar, TitleH1 } from "../../components";
import { CommonText, SecondaryText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  DatabaseQueries,
  EpdsConstants,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import type { EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils, NotificationUtils, StorageUtils } from "../../utils";
import EpdsResultContactMamanBlues from "./epdsResultContactMamanBlues.component";
import EpdsResultInformation from "./epdsResultInformation/epdsResultInformation.component";

interface Props {
  result: number;
  epdsSurvey: EpdsQuestionAndAnswers[];
  showBeContactedButton: boolean;
  lastQuestionHasThreePointsAnswer: boolean;
  startSurveyOver: () => void;
}

const clientNoCache = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { "content-type": "application/json" },
  uri: `${process.env.API_URL}/graphql?nocache`,
});

const EpdsLightResult: React.FC<Props> = ({
  result,
  epdsSurvey,
  showBeContactedButton,
  lastQuestionHasThreePointsAnswer,
  startSurveyOver,
}) => {
  const [addReponseQuery] = useMutation(DatabaseQueries.EPDS_ADD_RESPONSE, {
    client: clientNoCache,
    onError: (err) => {
      console.log(err);
    },
  });
  const [showSnackBar, setShowSnackBar] = useState(false);

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

      await addReponseQuery({
        variables: {
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
        },
      });
    };

    void saveEpdsSurveyResults();
  }, []);
  // Delete saved storage keys for EPDS survey
  void EpdsSurveyUtils.removeEpdsStorageItems();

  const getIcon = (icone: EpdsConstants.ResultIconValueEnum) => {
    const iconsMap = new Map<
      EpdsConstants.ResultIconValueEnum,
      React.ReactNode
    >();
    iconsMap.set(EpdsConstants.ResultIconValueEnum.bien, <IconeResultatBien />);
    iconsMap.set(
      EpdsConstants.ResultIconValueEnum.moyen,
      <IconeResultatMoyen />
    );
    iconsMap.set(
      EpdsConstants.ResultIconValueEnum.pasBien,
      <IconeResultatPasBien />
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

  return (
    <>
      <ScrollView>
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
        />
        <View style={styles.validateButton}>
          <CustomButton
            title={Labels.epdsSurvey.restartSurvey}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={() => {
              startSurveyOver();
            }}
          />
        </View>
      </ScrollView>
      <CustomSnackbar
        duration={AroundMeConstants.SNACKBAR_DURATION}
        visible={showSnackBar}
        isOnTop={false}
        backgroundColor={Colors.aroundMeSnackbar.background}
        onDismiss={() => {
          setShowSnackBar(false);
        }}
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

export default EpdsLightResult;
