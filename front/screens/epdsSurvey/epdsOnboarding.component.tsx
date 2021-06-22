import * as React from "react";
import { StyleSheet } from "react-native";

import IconeAccederResultats from "../../assets/images/epds/onboarding_acceder_resultats.svg";
import IconeEtreAccompagne from "../../assets/images/epds/onboarding_etre_accompagne.svg";
import IconeRepondreQuestions from "../../assets/images/epds/onboarding_repondre_questions.svg";
import IconeTrouverAide from "../../assets/images/epds/onboarding_trouver_aide.svg";
import { TitleH1 } from "../../components";
import Button from "../../components/base/button.component";
import { CommonText, SecondaryText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";

interface Props {
  onBoardingIsDone: () => void;
}

const EpdsOnboarding: React.FC<Props> = ({ onBoardingIsDone }) => {
  const getIcon = (index: number) => {
    const iconsMap = new Map<number, React.ReactNode>();
    iconsMap.set(0, <IconeEtreAccompagne />);
    iconsMap.set(1, <IconeRepondreQuestions />);
    iconsMap.set(2, <IconeAccederResultats />);
    iconsMap.set(3, <IconeTrouverAide />);
    return iconsMap.get(index);
  };

  const renderStep = (index: number) => {
    return (
      <View style={styles.iconWithTitle}>
        <View>{getIcon(index)}</View>
        <CommonText style={styles.stepNum}>{index + 1}</CommonText>
        <CommonText style={styles.stepTitle}>
          {Labels.epdsSurvey.onboarding.steps.elements[index]}
        </CommonText>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TitleH1 title={Labels.epdsSurvey.onboarding.title} animated={false} />
      {Labels.epdsSurvey.onboarding.paragraphs.map((paragraph, index) => (
        <View key={index}>
          <SecondaryText style={styles.paragraph}>
            <SecondaryText style={styles.paragraphTitle}>
              {paragraph.title}
              {" : "}
            </SecondaryText>
            <SecondaryText>{paragraph.description}</SecondaryText>
          </SecondaryText>
        </View>
      ))}
      <SecondaryText style={styles.reminder}>
        {Labels.epdsSurvey.onboarding.reminder}
      </SecondaryText>
      <SecondaryText style={styles.paragraphTitle}>
        {Labels.epdsSurvey.onboarding.steps.title}
        {" :"}
      </SecondaryText>
      <View style={styles.row}>
        {renderStep(0)}
        {renderStep(1)}
      </View>
      <View style={styles.row}>
        {renderStep(2)}
        {renderStep(3)}
      </View>
      <View style={styles.validateButton}>
        <Button
          title={Labels.buttons.start}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={false}
          action={() => {
            onBoardingIsDone();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fontButton: {
    fontSize: Sizes.xs,
    textTransform: "uppercase",
  },
  iconWithTitle: {
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-around",
    margin: Margins.default,
  },
  paragraph: {
    marginVertical: Margins.smallest,
  },
  paragraphTitle: {
    color: Colors.primaryBlue,
    fontWeight: FontWeight.bold,
  },
  reminder: {
    fontWeight: FontWeight.bold,
    marginVertical: Margins.smallest,
  },
  row: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: Margins.smaller,
  },
  stepNum: {
    color: Colors.primaryBlueLight,
    fontSize: Sizes.xxxxl,
    fontWeight: "bold",
    left: 0,
    paddingTop: Margins.larger,
    position: "absolute",
  },
  stepTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xs,
    fontWeight: "bold",
  },
  validateButton: {
    alignItems: "center",
    marginTop: Margins.larger,
  },
});

export default EpdsOnboarding;
