import * as React from "react";
import { StyleSheet } from "react-native";

import IconeResultatBien from "../../assets/images/icone_resultats_bien.svg";
import IconeResultatMoyen from "../../assets/images/icone_resultats_moyen.svg";
import IconeResultatPasBien from "../../assets/images/icone_resultats_pasbien.svg";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes
} from "../../constants";
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
      <View style={styles.rowView}>
        <View>{getIcon(resultData.icon)}</View>
        <CommonText style={[styles.stateOfMind, resultData.colorStyle]}>
          {resultData.resultLabels.stateOfMind}
        </CommonText>
      </View>
      <CommonText style={[styles.text, styles.fontBold]}>
        {labelsResultats.introduction}
        {result} {resultData.resultLabels.intervalle}.
      </CommonText>
      <CommonText style={styles.text}>
        {resultData.resultLabels.explication}
      </CommonText>
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    marginLeft: Margins.default
  },
  stateOfMind: {
    fontWeight: FontWeight.bold,
    fontSize: Sizes.sm,
    marginTop: Margins.smaller,
    paddingHorizontal: Paddings.default
  },
  text: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.mmd,
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default
  },
  fontBold: {
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold
  }
});

export default EpdsResult;
