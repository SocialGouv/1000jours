import type { FC } from "react";
import { useCallback } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  CommonText,
  CustomButton,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels } from "../../constants";
import { Margins } from "../../styles";
import { LinkingUtils, TrackerUtils } from "../../utils";

const TabEpdsScreen: FC = () => {
  const onOpenWidget = useCallback(() => {
    const EPDS_WIDGET_SOURCE = "1000j-application";

    void LinkingUtils.openWebsite(
      `${process.env.EPDS_WIDGET_URL}/?source=${EPDS_WIDGET_SOURCE}`,
      false
    );
  }, []);

  const getViewToDisplay = () => {
    return (
      <View style={styles.mainView}>
        <CommonText style={styles.textDescription}>
          {Labels.epdsSurvey.epdsPresentation.description}
        </CommonText>
        <CustomButton
          title={Labels.epdsSurvey.epdsPresentation.button}
          rounded
          action={onOpenWidget}
        />
        <CommonText style={styles.textDescription}>
          {Labels.epdsSurvey.epdsPresentation.tools}
        </CommonText>
        <CustomButton
          title={Labels.epdsSurvey.epdsPresentation.button}
          rounded
          action={onOpenWidget}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <TrackerHandler screenName={TrackerUtils.TrackingEvent.EPDS} />
      {getViewToDisplay()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Margins.larger,
  },
  mainView: {
    backgroundColor: "transparent",
  },
  textDescription: {
    marginVertical: Margins.larger,
  },
});

export default TabEpdsScreen;
