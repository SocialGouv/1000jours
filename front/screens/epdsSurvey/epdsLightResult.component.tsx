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
import { Button, CustomSnackbar, TitleH1 } from "../../components";
import { SecondaryText } from "../../components/StyledText";
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
import BeContacted from "./beContacted.component";
import EpdsResultInformation from "./epdsResultInformation/epdsResultInformation.component";

interface Props {
  result: number;
  epdsSurvey: EpdsQuestionAndAnswers[];
  showBeContactedButton: boolean;
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
  startSurveyOver,
}) => {
  const [addReponseQuery] = useMutation(DatabaseQueries.EPDS_ADD_RESPONSE, {
    client: clientNoCache,
    onError: (err) => {
      console.log(err);
    },
  });
  const [showBeContactedModal, setShowBeContactedModal] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const labelsResultats = Labels.epdsSurvey.resultats;
  const resultData = EpdsSurveyUtils.getResultLabelAndStyleLight();

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

  return (
    <>
      <ScrollView>
        <TitleH1 title={Labels.epdsSurveyLight.titleLight} animated={false} />
        <View style={styles.rowView}>
          {getIcon(EpdsSurveyUtils.getResultIconLight(result))}
        </View>
        <SecondaryText style={[styles.text, styles.fontBold]}>
          {Labels.epdsSurveyLight.oserEnParler}
        </SecondaryText>
        <SecondaryText style={styles.text}>
          {Labels.epdsSurveyLight.changementsImportants}
        </SecondaryText>
        <SecondaryText style={[styles.text, styles.fontBold]}>
          {labelsResultats.retakeTestInvitation}
        </SecondaryText>
        {showBeContactedButton && (
          <View style={styles.validateButton}>
            <Button
              title={Labels.epdsSurvey.beContacted.button}
              titleStyle={styles.fontButton}
              rounded={true}
              disabled={false}
              action={() => {
                setShowBeContactedModal(true);
              }}
            />
          </View>
        )}
        <EpdsResultInformation
          leftBorderColor={Colors.white}
          informationList={resultData.resultLabels.professionalsList}
        />
        <View style={styles.validateButton}>
          <Button
            title={Labels.epdsSurvey.restartSurvey}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={() => {
              startSurveyOver();
            }}
          />
        </View>
        <BeContacted
          visible={showBeContactedModal}
          hideModal={(showSB: boolean) => {
            setShowBeContactedModal(false);
            setShowSnackBar(showSB);
          }}
        />
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
    fontSize: Sizes.xs,
    textTransform: "uppercase",
  },
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    paddingBottom: Margins.smaller,
    paddingTop: Margins.smallest,
  },
  professionalBanner: {
    borderStartColor: Colors.primaryYellowDark,
    borderStartWidth: Margins.smaller,
    margin: Margins.default,
    padding: Paddings.default,
  },
  rowView: {
    alignSelf: "center",
    flexDirection: "row",
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
    paddingTop: Paddings.default,
  },
  validateButton: {
    alignItems: "center",
    paddingTop: Paddings.light,
  },
});

export default EpdsLightResult;
