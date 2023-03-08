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
import { Labels } from "../../constants";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import type { SurveyBanner } from "../../type/survey.types";
import { RootNavigation, TrackerUtils } from "../../utils";

const TabSurveysScreen: FC = () => {
  const openEpdsSurvey = useCallback(() => {
    void RootNavigation.navigate("epdsSurvey");
  }, []);
  const openTndSurvey = useCallback(() => {
    void RootNavigation.navigate("tndSurvey");
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
    marginBottom: Paddings.light,
    marginVertical: Paddings.default,
    padding: Paddings.default,
  },
});

export default TabSurveysScreen;
