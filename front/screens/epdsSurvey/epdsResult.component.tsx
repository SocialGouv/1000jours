import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";

import IconeResultatBien from "../../assets/images/icone_resultats_bien.svg";
import IconeResultatMoyen from "../../assets/images/icone_resultats_moyen.svg";
import IconeResultatPasBien from "../../assets/images/icone_resultats_pasbien.svg";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { Colors, FontWeight, Labels } from "../../constants";
import { EpdsIconResultEnum } from "../../type";
import { EpdsSurveyUtils } from "../../utils";

interface Props {
  result: number;
}

const EpdsResult: React.FC<Props> = ({ result }) => {
  const labelsResultats = Labels.epdsSurvey.resultats;
  const resultData = EpdsSurveyUtils.getResultLabelAndStyle(result);

  const getIcon = (icone: EpdsIconResultEnum) => {
    const iconsMap = new Map<EpdsIconResultEnum, React.ReactNode>();
    iconsMap.set(EpdsIconResultEnum.BIEN, <IconeResultatBien />);
    iconsMap.set(EpdsIconResultEnum.MOYEN, <IconeResultatMoyen />);
    iconsMap.set(EpdsIconResultEnum.PAS_BIEN, <IconeResultatPasBien />);
    return iconsMap.get(icone);
  };

  return (
    <View>
      <CommonText style={styles.title}>{Labels.epdsSurvey.title}</CommonText>
      <View style={styles.rowView}>
        <View>{getIcon(resultData.icon)}</View>
        <CommonText
          style={[styles.title, resultData.colorStyle, styles.stateOfMind]}
        >
          {resultData.resultLabels.stateOfMind}
        </CommonText>
      </View>
      <CommonText style={[styles.description, styles.fontBold]}>
        {labelsResultats.introduction}
        {result} {resultData.resultLabels.intervalle}.
      </CommonText>
      <CommonText style={[styles.description]}>
        {resultData.resultLabels.explication}
      </CommonText>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    color: Colors.commonText,
    fontSize: 12,
    fontWeight: FontWeight.medium,
    lineHeight: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  fontBold: {
    fontSize: 13,
    fontWeight: FontWeight.bold,
  },
  rowView: {
    flexDirection: "row",
    marginLeft: 10,
  },
  stateOfMind: {
    fontWeight: FontWeight.medium,
    marginTop: 10,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
});

export default EpdsResult;
