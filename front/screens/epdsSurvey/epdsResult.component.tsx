import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import { FontWeight } from "../../constants/Layout";
import BackButton from "../../components/BackButton";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";

interface Props {
  result: number;
  backToSurvey: () => void;
}

const EpdsResult: React.FC<Props> = ({ result, backToSurvey }) => {

  result = 15;
  const labelsResultats = Labels.epdsSurvey.resultats;
  const labels = result <= 9 ? labelsResultats.moinsDeNeuf : result <= 12 ? labelsResultats.entreDixEtDouze : labelsResultats.plusDeTreize;
  const style = result <= 9 ? styles.green : result <= 12 ? styles.yellow : styles.red;
  const stateOfMind = labels.stateOfMind;

  return (
    <View>
      <CommonText style={styles.title}>{Labels.epdsSurvey.title}</CommonText>
      <CommonText style={[styles.title, style]}>{stateOfMind}</CommonText>
      <CommonText style={[styles.description, styles.fontBold]}>{labelsResultats.introduction}{result} {labels.intervalle}.</CommonText>
      <CommonText style={[styles.description]}>{labels.explication}</CommonText>
      <BackButton action={backToSurvey} />
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
    paddingTop: 10,
  },
  fontBold: {
    fontSize: 13,
    fontWeight: FontWeight.bold,
  },
  red: {
    color: Colors.secondaryRedLight,
  },
  yellow: {
    color: Colors.primaryYellowDark,
  },
  green: {
    color: Colors.secondaryGreenDark,
  },
});

export default EpdsResult;
