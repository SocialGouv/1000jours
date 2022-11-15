import Constants from "expo-constants";
import type { FC } from "react";
import { useCallback } from "react";
import * as React from "react";
import type { AlertButton } from "react-native";
import { Alert, Linking } from "react-native";

import {
  ConfigQueries,
  FetchPoliciesConstants,
  Labels,
  Links,
} from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { GraphQLQuery } from "../../services";
import type { Config } from "../../types";
import { AppUtils } from "../../utils";

const CheckAppVersion: FC = () => {
  const showAlertUpdateAvailable = (lastAppVersion: string) => {
    const alertButtons: AlertButton[] = [
      { text: Labels.buttons.no },
      {
        onPress: () => {
          void Linking.openURL(
            PLATFORM_IS_IOS ? Links.appUrliOS : Links.appUrlAndroid
          );
        },
        text: Labels.appVersion.doUpdate,
      },
    ];
    Alert.alert(
      Labels.appVersion.update,
      `${Labels.appVersion.newVersionAvailable} (v.${lastAppVersion}).`,
      alertButtons
    );
  };

  const handleResults = useCallback((data: unknown) => {
    const result = data ? (data as { config: Config }) : undefined;
    const lastAppVersion = result?.config.lastAppVersionNumber ?? null;
    const currentVersion = Constants.manifest?.version ?? null;
    if (
      lastAppVersion &&
      AppUtils.hasNewVersionAvailable(currentVersion, lastAppVersion)
    ) {
      showAlertUpdateAvailable(lastAppVersion);
    }
  }, []);

  return (
    <GraphQLQuery
      query={ConfigQueries.CONFIG_GET_LAST_APP_VERSION}
      fetchPolicy={FetchPoliciesConstants.NO_CACHE}
      getFetchedData={handleResults}
      showErrorMessage={false}
    />
  );
};

export default CheckAppVersion;
