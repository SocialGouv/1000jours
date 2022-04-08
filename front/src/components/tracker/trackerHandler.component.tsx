import Constants from "expo-constants";
import type { Event } from "matomo-tracker-react-native";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

import type { TrackerEvent, TrackerSearch } from "../../type";
import { StringUtils } from "../../utils";

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

  useEffect(() => {
    if (screenName && StringUtils.stringIsNotNullNorEmpty(screenName))
      void trackScreenView({
        name: screenName,
        userInfo: {
          dimension1: Constants.manifest.version ?? "", // dimension1 = AppVersion
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const screenNameIsNotEmpty =
      screenName && StringUtils.stringIsNotNullNorEmpty(screenName);
    const actionNameIsNotEmpty =
      actionName && StringUtils.stringIsNotNullNorEmpty(actionName);

    if (screenNameIsNotEmpty && actionNameIsNotEmpty)
      void trackAction({
        name: `${screenName} / ${actionName}`,
        userInfo: {
          dimension1: Constants.manifest.version ?? "", // dimension1 = AppVersion
        },
      });
    else if (actionNameIsNotEmpty) void trackAction({ name: `${actionName}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionName]);

  useEffect(() => {
    if (
      searchObject?.keyword &&
      StringUtils.stringIsNotNullNorEmpty(searchObject.keyword) &&
      searchObject.category &&
      StringUtils.stringIsNotNullNorEmpty(searchObject.category)
    ) {
      searchObject.userInfo = {
        dimension1: Constants.manifest.version ?? "", // dimension1 = AppVersion
      };
      void trackSiteSearch(searchObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchObject]);

  useEffect(() => {
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
        userInfo: {
          dimension1: Constants.manifest.version ?? "", // dimension1 = AppVersion
        },
        value: eventObject.value,
      };
      void trackEvent(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventObject]);

  return null;
};

export default TrackerHandler;
