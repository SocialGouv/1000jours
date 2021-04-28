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

  const labelsResultats = Labels.epdsSurvey.resultats;
  const labels = result <= 9 ? labelsResultats.moinsDeNeuf : result <= 12 ? labelsResultats.entreDixEtDouze : labelsResultats.plusDeTreize;

  return (
    <View>
      <CommonText style={styles.title}>{Labels.epdsSurvey.title}</CommonText>
      <CommonText style={styles.description}>
        {Labels.epdsSurvey.description}
      </CommonText>
      <CommonText style={[styles.description]}>{labelsResultats.introduction}{result} {labels.intervalle}</CommonText>
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
    paddingHorizontal: 15
  }
});

export default EpdsResult;
