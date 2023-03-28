import Constants from "expo-constants";
import * as React from "react";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";

import {
  ConfigQueries,
  FetchPoliciesConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { GraphQLQuery } from "../../services";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import type { Config } from "../../types";
import { AppUtils, HtmlUtils, StorageUtils } from "../../utils";
import { TitleH1, View } from "../baseComponents";

const NewFeatures: React.FC = () => {
  const [html, setHtml] = useState<string | undefined>(undefined);

  const storeNewFeaturesVersion = useCallback(
    async (currentVersion: string, news: string | null): Promise<void> => {
      const versions =
        ((await StorageUtils.getObjectValue(
          StorageKeysConstants.newFeaturesAlreadyPop
        )) as string[] | null) ?? [];
      if (
        currentVersion &&
        (await AppUtils.hasNewFeaturesToShow(currentVersion, news))
      ) {
        versions.push(currentVersion);
        await StorageUtils.storeObjectValue(
          StorageKeysConstants.newFeaturesAlreadyPop,
          versions
        );
      }
    },
    []
  );

  const handleResults = useCallback(
    (data: unknown) => {
      const result = data ? (data as { config: Config }) : undefined;
      if (result?.config.news) {
        const htmlToDisplay = HtmlUtils.cleanImgContainer(result.config.news);
        setHtml(htmlToDisplay);
        const currentVersion = Constants.manifest?.version;
        if (currentVersion)
          void storeNewFeaturesVersion(currentVersion, result.config.news);
      }
    },
    [storeNewFeaturesVersion]
  );

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.mainContentContainer}
    >
      <GraphQLQuery
        query={ConfigQueries.CONFIG_GET_ALL}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        getFetchedData={handleResults}
        showErrorMessage={false}
      />
      {html && (
        <View style={styles.webviewContainer}>
          <TitleH1
            title={Labels.newFeatures.title}
            animated={false}
            description={Labels.newFeatures.description}
            style={styles.mainTitle}
          />
          <HTML
            WebView={WebView}
            source={{ html: html }}
            contentWidth={SCREEN_WIDTH}
            tagsStyles={{ img: styles.img, li: styles.li }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const imgBorderWidth = 1;
const imgWidth = SCREEN_WIDTH - (Margins.default + imgBorderWidth) * 2;

const styles = StyleSheet.create({
  fontButton: {
    fontSize: Sizes.xs,
    textTransform: "uppercase",
  },
  img: {
    borderColor: Colors.primaryBlue,
    borderWidth: imgBorderWidth,
    marginBottom: Margins.default,
    width: imgWidth,
  },
  li: {
    paddingBottom: Paddings.default,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: Paddings.default,
  },
  mainContentContainer: {
    justifyContent: "space-around",
  },
  mainTitle: {
    paddingBottom: Paddings.larger,
  },
  validateButton: {
    alignItems: "center",
    marginTop: Margins.default,
  },
  webviewContainer: {
    paddingBottom: Paddings.default,
  },
});

export default NewFeatures;
