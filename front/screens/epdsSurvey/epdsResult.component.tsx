/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import { StyleSheet } from "react-native";

import IconeResultatBien from "../../assets/images/icone_resultats_bien.svg";
import IconeResultatMoyen from "../../assets/images/icone_resultats_moyen.svg";
import IconeResultatPasBien from "../../assets/images/icone_resultats_pasbien.svg";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  EpdsConstants,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import { EpdsSurveyUtils } from "../../utils";

interface Props {
  result: number;
}

const EpdsResult: React.FC<Props> = ({ result }) => {
  const labelsResultats = Labels.epdsSurvey.resultats;
  const resultData = EpdsSurveyUtils.getResultLabelAndStyle(result);

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
      <View style={styles.professionalBanner}>
        <CommonText style={styles.professionalTitle}>
          {Labels.article.firstThreeMonths.title}
        </CommonText>
        <CommonText style={styles.professionalDescription}>
          {Labels.article.firstThreeMonths.description}
        </CommonText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fontBold: {
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
  },
  professionalBanner: {
    borderStartColor: Colors.primaryYellowDark,
    borderStartWidth: Margins.smaller,
    margin: Margins.default,
    padding: Paddings.default,
  },
  professionalDescription: {
    color: Colors.commonText,
    // marginVertical: 10,
  },
  professionalTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
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
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.mmd,
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
  },
});

export default EpdsResult;
