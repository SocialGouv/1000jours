import type { Action, Event } from "matomo-tracker-react-native";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

import type { TrackerEvent, TrackerSearch } from "../../type";
import { StringUtils, TrackerUtils } from "../../utils";

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
    if (screenName && StringUtils.stringIsNotNullNorEmpty(screenName)) {
      const launchTrackScreenView = async () => {
        const params: Action = {
          name: screenName,
          ...(await TrackerUtils.getUserInfoForTracker()),
        };
        await trackScreenView(params);
      };

      void launchTrackScreenView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const screenNameIsNotEmpty =
      screenName && StringUtils.stringIsNotNullNorEmpty(screenName);
    const actionNameIsNotEmpty =
      actionName && StringUtils.stringIsNotNullNorEmpty(actionName);

    const launchTrackAction = async () => {
      const name = actionNameIsNotEmpty
        ? screenNameIsNotEmpty
          ? `${screenName} / ${actionName}`
          : `${actionName}`
        : "";

      if (name.length > 0) {
        const params: Action = {
          name,
          ...(await TrackerUtils.getUserInfoForTracker()),
        };
        void trackAction(params);
      }
    };

    void launchTrackAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionName]);

  useEffect(() => {
    if (
      searchObject?.keyword &&
      StringUtils.stringIsNotNullNorEmpty(searchObject.keyword) &&
      searchObject.category &&
      StringUtils.stringIsNotNullNorEmpty(searchObject.category)
    ) {
      const launchTrackSiteSearch = async () => {
        const params = {
          ...searchObject,
          ...(await TrackerUtils.getUserInfoForTracker()),
        };
        await trackSiteSearch(params);
      };

      void launchTrackSiteSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchObject]);

  useEffect(() => {
    const eventCategory = "MobileApp";
    const eventValue = 0;

    const eventNameIsNotEmpty =
      eventObject?.name && eventObject.name.length > 0;
    const eventActionIsNotEmpty =
      eventObject?.action && eventObject.action.length > 0;

    if (eventNameIsNotEmpty && eventActionIsNotEmpty) {
      const launchTrackEvent = async () => {
        const event: Event = {
          action: eventObject.action,
          category: eventCategory,
          name: eventObject.name,
          value: eventValue,
          ...(await TrackerUtils.getUserInfoForTracker()),
        };
        await trackEvent(event);
      };

      void launchTrackEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventObject]);

  return null;
};

export default TrackerHandler;
