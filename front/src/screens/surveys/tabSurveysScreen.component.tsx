import type { FC } from "react";
import { useCallback } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  CommonText,
  CustomButton,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import ZeroAccidentBanner from "../../components/zeroAccident/zeroAccidentBanner.component";
import { ConfigQueries, FetchPoliciesConstants, Labels } from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import type { SurveyBanner } from "../../type/survey.types";
import type { Config } from "../../types";
import { LinkingUtils, RootNavigation, TrackerUtils } from "../../utils";

const TabSurveysScreen: FC = () => {
  const [config, setConfig] = React.useState<Config | null>(null);

  const handleConfig = useCallback((data: unknown) => {
    const result = data ? (data as { config: Config }) : undefined;
    if (result?.config) {
      setConfig(result.config);
    }
  }, []);

  const openEpdsSurvey = useCallback(() => {
    const EPDS_WIDGET_SOURCE = "1000j-application";
    void LinkingUtils.openWebsite(
      `${process.env.EPDS_WIDGET_URL}/?source=${EPDS_WIDGET_SOURCE}`,
      false
    );
  }, []);

  const openTndSurvey = useCallback(() => {
    void RootNavigation.navigate("tndSurvey");
  }, []);

  const openRecosanteSurvey = useCallback(() => {
    const RECOSANTE_WIDGET_SOURCE = "1000j-application";
    void LinkingUtils.openWebsite(
      `https://recosante.beta.gouv.fr/download?source=${RECOSANTE_WIDGET_SOURCE}`,
      false
    );
  }, []);
  const surveysBanner: SurveyBanner[] = [
    {
      buttonTitle: Labels.surveys.epds.buttonTitle,
      description: Labels.surveys.epds.description,
      onPress: openEpdsSurvey,
      title: Labels.surveys.epds.title,
    },
    {
      buttonTitle: Labels.surveys.tnd.buttonTitle,
      description: Labels.surveys.tnd.description,
      onPress: openTndSurvey,
      title: Labels.surveys.tnd.title,
    },
    {
      buttonTitle: Labels.surveys.recosante.buttonTitle,
      description: Labels.surveys.recosante.description,
      onPress: openRecosanteSurvey,
      title: Labels.surveys.recosante.title,
    },
  ];

  return (
    <ScrollView style={styles.mainContainer}>
      <TrackerHandler screenName={TrackerUtils.TrackingEvent.SURVEYS} />
      <TitleH1
        animated={false}
        title={Labels.surveys.title}
        description={Labels.surveys.description}
        style={styles.header}
      />
      <GraphQLQuery
        query={ConfigQueries.CONFIG_ZERO_ACCIDENT}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        getFetchedData={handleConfig}
        showErrorMessage={false}
        noLoader
        noLoaderBackdrop
      />
      {config?.activationZeroAccident && (
        <ZeroAccidentBanner
          title={Labels.zeroAccident.survey.title}
          buttonTitle={Labels.zeroAccident.survey.buttonTitle}
          fromPage="Surveys"
        />
      )}
      {surveysBanner.map((survey, index) => (
        <View key={index} style={styles.surveyBlock}>
          <CommonText style={styles.bannerTitle}>{survey.title}</CommonText>
          <SecondaryText style={styles.bannerDescription}>
            {survey.description}
          </SecondaryText>
          <CustomButton
            title={survey.buttonTitle}
            rounded
            action={survey.onPress}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerButtonTitle: {
    fontSize: Sizes.sm,
    textTransform: "uppercase",
  },
  bannerDescription: {
    color: Colors.commonText,
    marginVertical: Margins.light,
  },
  bannerTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
  },
  header: {
    paddingBottom: Paddings.larger,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: Paddings.larger,
    paddingVertical: Paddings.default,
  },
  surveyBlock: {
    backgroundColor: Colors.primaryBlueLight,
    borderLeftColor: Colors.primaryBlueDark,
    borderLeftWidth: 3,
    marginBottom: Paddings.largest,
    marginVertical: Paddings.default,
    padding: Paddings.default,
  },
});

export default TabSurveysScreen;
