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
  StorageKeysConstants,
} from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { GraphQLQuery } from "../../services";
import type { Config } from "../../types";
import {
  AppUtils,
  NotificationUtils,
  RootNavigation,
  StorageUtils,
  TndNotificationUtils,
} from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";

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

  const needToScheduleTndNotifications = async () => {
    const notifs = await NotificationUtils.getAllNotificationsByType(
      NotificationType.tnd
    );
    if (notifs.length === 0) {
      const childBirthday = await StorageUtils.getStringValue(
        StorageKeysConstants.userChildBirthdayKey
      );
      if (childBirthday)
        await TndNotificationUtils.scheduleTndNotifications(
          childBirthday,
          true
        );
    }
  };

  const onAppUpdated = useCallback(
    async (currentVersion: string, news: string | null) => {
      await StorageUtils.storeStringValue(
        StorageKeysConstants.lastVersionLaunchKey,
        currentVersion
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.forceToScheduleEventsNotif,
        true
      );

      // Programme les notifications pour passer le repérage TND si nécessaire
      await needToScheduleTndNotifications();

      if (await AppUtils.hasNewFeaturesToShow(currentVersion, news)) {
        void RootNavigation.navigate("newFeatures");
      }
    },
    []
  );

  const handleResults = useCallback(
    async (data: unknown) => {
      const result = data ? (data as { config: Config }) : undefined;
      const lastAppVersion = result?.config.lastAppVersionNumber ?? null;
      const news = result?.config.news ?? null;
      const currentVersion = Constants.expoConfig?.version ?? null;
      if (
        lastAppVersion &&
        AppUtils.hasNewVersionAvailable(currentVersion, lastAppVersion)
      ) {
        showAlertUpdateAvailable(lastAppVersion);
      }

      if (currentVersion && (await AppUtils.hasBeenUpdated(currentVersion))) {
        await onAppUpdated(currentVersion, news);
      }
    },
    [onAppUpdated]
  );

  return (
    <GraphQLQuery
      query={ConfigQueries.CONFIG_GET_ALL}
      fetchPolicy={FetchPoliciesConstants.NO_CACHE}
      getFetchedData={handleResults}
      showErrorMessage={false}
      noLoader
      noLoaderBackdrop
    />
  );
};

export default CheckAppVersion;
