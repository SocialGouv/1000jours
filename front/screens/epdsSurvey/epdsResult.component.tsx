import { FC } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import { FontWeight } from "../../constants/Layout";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { EpdsSurveyUtils } from "../../utils";

interface Props {
  result: number;
}

const EpdsResult: FC<Props> = ({ result }) => {
  const labelsResultats = Labels.epdsSurvey.resultats;
  const {
    stateOfMind,
    label,
    colorStyle
  } = EpdsSurveyUtils.getResultLabelAndStyle(result);

  return (
    <View>
      <CommonText style={styles.title}>{Labels.epdsSurvey.title}</CommonText>
      <CommonText style={[styles.title, colorStyle]}>{stateOfMind}</CommonText>
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
  }
});

export default EpdsResult;
