import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Labels } from "../../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../../styles";
import { EpdsAssets } from "../../assets";
import {
  CommonText,
  CustomButton,
  SecondaryText,
  TitleH1,
  View,
} from "../../baseComponents";

interface Props {
  onBoardingIsDone: () => void;
}

const EpdsOnboarding: React.FC<Props> = ({ onBoardingIsDone }) => {
  const getIcon = (index: number) => {
    const iconsMap = new Map<number, React.ReactNode>();
    iconsMap.set(0, <EpdsAssets.IconeRepondreQuestions />);
    iconsMap.set(1, <EpdsAssets.IconeAccederResultats />);
    iconsMap.set(2, <EpdsAssets.IconeTrouverAide />);
    iconsMap.set(3, <EpdsAssets.IconeRepasserTest />);

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

  const renderStep = (label: string, index: number) => {
    return (
      <View style={styles.step} key={index}>
        <View style={styles.iconWithTitle}>
          <View>
            {getIcon(index)}
            <CommonText
              style={styles.stepNum}
              allowFontScaling={false}
              accessible={false}
            >
              {index + 1}
            </CommonText>
          </View>
        </View>
        <View>
          <CommonText
            style={styles.stepTitle}
            allowFontScaling={false}
            accessibilityLabel={`
            ${Labels.accessibility.step} ${index + 1} 
            ${label}
          `}
          >
            {label}
          </CommonText>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.mainContentContainer}
    >
      <SecondaryText style={styles.paragraphTitle}>
        {Labels.epdsSurvey.onboarding.steps.title}
        {" :"}
      </SecondaryText>
      <View style={styles.stepsContainer}>
        {Labels.epdsSurvey.onboarding.steps.elements.map((label, index) =>
          renderStep(label, index)
        )}
      </View>

      <SecondaryText style={styles.reminder}>
        {Labels.epdsSurvey.onboarding.reminder}
      </SecondaryText>
      <View style={styles.validateButton}>
        <CustomButton
          title={Labels.buttons.start}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={false}
          action={onBoardingIsDone}
        />
      </View>

      <View style={styles.descriptionEpdsContainer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  descriptionEpdsContainer: {
    borderBottomColor: Colors.borderGrey,
    borderLeftColor: Colors.primaryBlueDark,
    borderLeftWidth: 4,
    borderRightColor: Colors.borderGrey,
    borderTopColor: Colors.borderGrey,
    borderWidth: 1,
    marginBottom: Margins.light,
    marginTop: Margins.larger,
    padding: Paddings.light,
  },
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
    marginVertical: Margins.default,
  },
  step: {
    flexBasis: "48%", // 2 colonnes de 50% - 2% (marginLeft + marginRight)
    margin: "1%",
    textAlign: "center",
  },
  stepNum: {
    bottom: -Paddings.smallest,
    color: Colors.primaryBlueLight,
    fontSize: Sizes.xxxxl,
    fontWeight: "bold",
    left: -Paddings.larger,
    position: "absolute",
  },
  stepTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xs,
    fontWeight: "bold",
    textAlign: "center",
  },
  stepsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  validateButton: {
    alignItems: "center",
    marginTop: Margins.default,
  },
});

export default EpdsOnboarding;
