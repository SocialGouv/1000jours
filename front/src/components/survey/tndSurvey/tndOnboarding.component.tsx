import * as React from "react";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";

import {
  FetchPoliciesConstants,
  Labels,
  TndDbQueries,
} from "../../../constants";
import { SCREEN_WIDTH } from "../../../constants/platform.constants";
import { GraphQLQuery } from "../../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../../styles";
import type { TndQuestionnaireIntroduction } from "../../../type/tndSurvey.types";
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

const TndOnboarding: React.FC<Props> = ({ onBoardingIsDone }) => {
  const [intro, setIntro] = useState<TndQuestionnaireIntroduction | undefined>(
    undefined
  );
  const getIcon = (index: number) => {
    const iconsMap = new Map<number, React.ReactNode>();
    iconsMap.set(0, <EpdsAssets.IconeRepondreQuestions />);
    iconsMap.set(1, <EpdsAssets.IconeTrouverAide />);

    return iconsMap.get(index);
  };

  const handleResults = useCallback((data: unknown) => {
    const result = data as {
      questionnaireTndIntroduction: TndQuestionnaireIntroduction;
    };
    setIntro(result.questionnaireTndIntroduction);
  }, []);

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
      <GraphQLQuery
        query={TndDbQueries.GET_ONBOARDING}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        getFetchedData={handleResults}
      />
      {intro && (
        <>
          <TitleH1
            title={intro.titre}
            animated={false}
            description={intro.description}
            style={styles.mainTitle}
          />
          <SecondaryText style={styles.paragraphTitle}>
            {Labels.tndSurvey.onboarding.steps.title}
          </SecondaryText>
          <View style={styles.stepsContainer}>
            {Labels.tndSurvey.onboarding.steps.elements.map((label, index) =>
              renderStep(label, index)
            )}
          </View>
          <HTML
            WebView={WebView}
            source={{ html: intro.texte1 }}
            ignoredStyles={["color", "textAlign"]}
            contentWidth={SCREEN_WIDTH}
          />
          <View style={styles.validateButton}>
            <CustomButton
              title={Labels.buttons.start}
              titleStyle={styles.fontButton}
              rounded={true}
              disabled={false}
              action={onBoardingIsDone}
            />
          </View>
          <View style={styles.descriptionSurveyContainer}>
            <HTML
              WebView={WebView}
              source={{ html: intro.texte2 }}
              ignoredStyles={["color", "textAlign"]}
              contentWidth={SCREEN_WIDTH}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  descriptionSurveyContainer: {
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
  mainTitle: {
    paddingBottom: Paddings.larger,
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

export default TndOnboarding;
