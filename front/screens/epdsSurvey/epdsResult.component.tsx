/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMutation } from "@apollo/client/react/hooks";
import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

import IconeResultatBien from "../../assets/images/icone_resultats_bien.svg";
import IconeResultatMoyen from "../../assets/images/icone_resultats_moyen.svg";
import IconeResultatPasBien from "../../assets/images/icone_resultats_pasbien.svg";
import { CommonText, SecondaryText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
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
import { EpdsSurveyUtils, NotificationUtils, StorageUtils } from "../../utils";
import EpdsResultInformation from "./epdsResultInformation/epdsResultInformation.component";

interface Props {
  result: number;
}

const EpdsResult: React.FC<Props> = ({ result }) => {
  const [addReponseQuery] = useMutation(DatabaseQueries.EPDS_ADD_RESPONSE, {
    onError: (err) => {
      console.log(err);
    },
  });

  const labelsResultats = Labels.epdsSurvey.resultats;
  const resultData = EpdsSurveyUtils.getResultLabelAndStyle(result);

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
      await addReponseQuery({
        variables: { compteur: newCounter, genre: genderValue, score: result },
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

  const colorStyle = { color: resultData.color };

  return (
    <ScrollView>
      <View style={styles.rowView}>
        <View>{getIcon(resultData.icon)}</View>
        <CommonText style={[styles.stateOfMind, colorStyle]}>
          {resultData.resultLabels.stateOfMind}
        </CommonText>
      </View>
      <SecondaryText style={[styles.text, styles.fontBold]}>
        {labelsResultats.introduction}
        {result} {resultData.resultLabels.intervalle}.
      </SecondaryText>
      <SecondaryText style={styles.text}>
        {resultData.resultLabels.explication}
      </SecondaryText>
      <SecondaryText style={[styles.text, styles.fontBold]}>
        {labelsResultats.retakeTestInvitation}
      </SecondaryText>
      <EpdsResultInformation
        leftBorderColor={resultData.color}
        informationList={resultData.resultLabels.professionalsList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fontBold: {
    fontWeight: FontWeight.bold,
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
    flexDirection: "row",
    marginLeft: Margins.default,
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
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
  },
});

export default EpdsResult;
