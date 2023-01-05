import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

import { View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { TrackerUtils } from "../../utils";

const EPDS_WIDGET_SOURCE = "1000j-application";

// TODO: refacto & clear
const TabEpdsScreen: FC = () => {
  const getViewToDisplay = () => {
    // TODO: urilisation de la branche de dev du widget pour les tests
    // uri à utiliser `${process.env.EPDS_WIDGET_URL}/?source=${EPDS_WIDGET_SOURCE}`
    const url =
      "https://nos1000jours-blues-epds-widget-feat-modific-4nhlqn.dev.fabrique.social.gouv.fr/";

    return (
      <WebView
        originWhitelist={["*"]}
        source={{
          uri: `${url}/?source=${EPDS_WIDGET_SOURCE}`,
        }}
        style={{ height: "100%", width: "100%" }}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TrackerHandler screenName={TrackerUtils.TrackingEvent.EPDS} />
      {getViewToDisplay()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default TabEpdsScreen;
