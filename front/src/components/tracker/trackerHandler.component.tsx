import Constants from "expo-constants";
import _ from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

import { StorageKeysConstants } from "../../constants";
import type { TrackerEvent, TrackerSearch } from "../../type";
import type { TrackerUserInfo } from "../../type/userInfo.types";
import type { ProfileGender, Step, UserSituation } from "../../types";
import { StorageUtils, StringUtils } from "../../utils";

interface TrackerHandlerProps {
  screenName?: string;
  actionName?: string;
  searchObject?: TrackerSearch;
  eventObject?: TrackerEvent;
}

const TrackerHandler: FC<TrackerHandlerProps> = ({
  screenName,
  actionName,
  searchObject,
  eventObject,
}) => {
  const { trackScreenView, trackAction, trackSiteSearch, trackEvent } =
    useMatomo();

  const getUserInfo = async () => {
    const userSituations = (await StorageUtils.getObjectValue(
      StorageKeysConstants.userSituationsKey
    )) as UserSituation[] | null;
    const gender = (await StorageUtils.getObjectValue(
      StorageKeysConstants.userGenderKey
    )) as ProfileGender | null;
    const currentStep = (await StorageUtils.getObjectValue(
      StorageKeysConstants.currentStep
    )) as Step | null;

    let userSituationLabel = null;
    if (userSituations) {
      const userSituation = _.find(userSituations, { isChecked: true });
      userSituationLabel = userSituation?.label ?? null;
    }

    const userInfo: TrackerUserInfo = {
      dimension1: Constants.expoConfig?.version ?? "",
      dimension2: userSituationLabel,
      dimension3: gender?.label ?? null,
      dimension4: currentStep?.nom ?? null,
    };
    return userInfo;
  };

  const onChangeScreenName = async () => {
    const userInfo = await getUserInfo();
    if (screenName && StringUtils.isNotNullNorEmpty(screenName))
      void trackScreenView({
        name: screenName,
        userInfo,
      });
  };

  const onChangeActionName = async () => {
    const userInfo = await getUserInfo();
    const screenNameIsNotEmpty =
      screenName && StringUtils.isNotNullNorEmpty(screenName);
    const actionNameIsNotEmpty =
      actionName && StringUtils.isNotNullNorEmpty(actionName);

    if (screenNameIsNotEmpty && actionNameIsNotEmpty)
      void trackAction({
        name: `${screenName} / ${actionName}`,
        userInfo,
      });
    else if (actionNameIsNotEmpty) void trackAction({ name: `${actionName}` });
  };

  const onChangeSearchObject = async () => {
    const userInfo = await getUserInfo();
    if (
      searchObject?.keyword &&
      StringUtils.isNotNullNorEmpty(searchObject.keyword) &&
      searchObject.category &&
      StringUtils.isNotNullNorEmpty(searchObject.category)
    ) {
      searchObject.userInfo = userInfo;
      void trackSiteSearch(searchObject);
    }
  };

  const onChangeEventObject = async () => {
    const userInfo = await getUserInfo();
    const eventCategory = "MobileApp";
    const eventNameIsNotEmpty =
      eventObject?.name && eventObject.name.length > 0;
    const eventActionIsNotEmpty =
      eventObject?.action && eventObject.action.length > 0;

    if (eventNameIsNotEmpty && eventActionIsNotEmpty) {
      const event: TrackerEvent = {
        action: eventObject.action,
        category: eventCategory,
        name: eventObject.name,
        userInfo,
        value: eventObject.value,
      };
      void trackEvent(event);
    }
  };

  useEffect(() => {
    void onChangeScreenName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenName]);

  useEffect(() => {
    void onChangeActionName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionName]);

  useEffect(() => {
    void onChangeSearchObject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchObject]);

  useEffect(() => {
    void onChangeEventObject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventObject]);

  return null;
};

export default TrackerHandler;
