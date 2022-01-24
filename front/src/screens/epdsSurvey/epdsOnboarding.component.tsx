import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import IconeAccederResultats from "../../assets/images/epds/onboarding_acceder_resultats.svg";
import IconeRepasserTest from "../../assets/images/epds/onboarding_repasser_test.svg";
import IconeRepondreQuestions from "../../assets/images/epds/onboarding_repondre_questions.svg";
import IconeTrouverAide from "../../assets/images/epds/onboarding_trouver_aide.svg";
import { TitleH1 } from "../../components";
import CustomButton from "../../components/baseComponents/customButton.component";
import { CommonText, SecondaryText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";

interface Props {
  onBoardingIsDone: () => void;
}

const EpdsOnboarding: React.FC<Props> = ({ onBoardingIsDone }) => {
  const getIcon = (index: number) => {
    const iconsMap = new Map<number, React.ReactNode>();
    iconsMap.set(0, <IconeRepondreQuestions />);
    iconsMap.set(1, <IconeAccederResultats />);
    iconsMap.set(2, <IconeTrouverAide />);
    iconsMap.set(3, <IconeRepasserTest />);

    return iconsMap.get(index);
  };

  const getDescriptionWithBoldWords = (
    boldIndexes: number[],
    label: string
  ) => {
    return label.split(" ").map((eachWord: string, index: number) => {
      return (
        <SecondaryText
          key={`text_${index}`}
          style={boldIndexes.includes(index) && styles.fontBold}
        >
          {eachWord}{" "}
        </SecondaryText>
      );
    });
  };

  const renderStep = (index: number) => {
    return (
      <View style={styles.iconWithTitle}>
        <View>{getIcon(index)}</View>
        <CommonText style={styles.stepNum} allowFontScaling={false}>
          {index + 1}
        </CommonText>
        <CommonText style={styles.stepTitle} allowFontScaling={false}>
          {Labels.epdsSurvey.onboarding.steps.elements[index]}
        </CommonText>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.mainContentContainer}
    >
      <TitleH1 title={Labels.epdsSurvey.onboarding.title} animated={false} />
      {Labels.epdsSurvey.onboarding.paragraphs.map((paragraph, index) => (
        <View key={index}>
          <SecondaryText style={styles.paragraph}>
            <SecondaryText style={styles.paragraphTitle}>
              {paragraph.title}
              {" : "}
            </SecondaryText>
            {getDescriptionWithBoldWords(
              paragraph.boldIndexes,
              paragraph.description
            )}
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
        <CustomButton
          title={Labels.buttons.start}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={false}
          action={() => {
            onBoardingIsDone();
          }}
        />
      </View>
    </ScrollView>
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
  iconWithTitle: {
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    margin: Margins.default,
  },
  mainContentContainer: {
    justifyContent: "space-around",
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
    textAlign: "center",
  },
  validateButton: {
    alignItems: "center",
    marginTop: Margins.larger,
  },
});

export default EpdsOnboarding;
