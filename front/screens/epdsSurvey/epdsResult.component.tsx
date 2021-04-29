import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import { FontWeight } from "../../constants/Layout";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { EpdsSurveyUtils } from "../../utils";
import IconeResultatBien from "../../assets/images/icone_resultats_bien.svg";
import IconeResultatMoyen from "../../assets/images/icone_resultats_moyen.svg";
import IconeResultatPasBien from "../../assets/images/icone_resultats_pasbien.svg";

interface Props {
  result: number;
}

const EpdsResult: React.FC<Props> = ({ result }) => {
  // result = 5;
  const labelsResultats = Labels.epdsSurvey.resultats;
  const {
    stateOfMind,
    label,
    colorStyle,
    icone
  } = EpdsSurveyUtils.getResultLabelAndStyle(result);

  let resultIcone;
  if (icone === "BIEN") resultIcone = { image: <IconeResultatBien /> };
  else if (icone === "MOYEN") resultIcone = { image: <IconeResultatMoyen /> };
  else resultIcone = { image: <IconeResultatPasBien /> };

  return (
    <View>
      <CommonText style={styles.title}>{Labels.epdsSurvey.title}</CommonText>
      <View style={styles.rowView}>
        <View>{resultIcone.image}</View>
        <CommonText style={[styles.title, colorStyle, styles.stateOfMind]}>
          {stateOfMind}
        </CommonText>
      </View>
      <CommonText style={[styles.description, styles.fontBold]}>
        {labelsResultats.introduction}
        {result} {label.intervalle}.
      </CommonText>
      <CommonText style={[styles.description]}>{label.explication}</CommonText>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingHorizontal: 15
  },
  description: {
    color: Colors.commonText,
    fontSize: 12,
    fontWeight: FontWeight.medium,
    lineHeight: 20,
    paddingHorizontal: 15,
    paddingTop: 10
  },
  fontBold: {
    fontSize: 13,
    fontWeight: FontWeight.bold
  },
  rowView: {
    marginLeft: 10,
    flexDirection: "row",
  },
  stateOfMind: {
    fontWeight: FontWeight.medium,
    marginTop: 10,
  }
});

export default EpdsResult;
