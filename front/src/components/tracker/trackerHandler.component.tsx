import type { Event } from "matomo-tracker-react-native";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

import { StringUtils } from "../../utils";

interface TrackerHandlerProps {
  screenName?: string;
  actionName?: string;
  searchKeyword?: string;
  eventName?: string;
  eventAction?: string;
}

const TrackerHandler: FC<TrackerHandlerProps> = ({
  screenName,
  actionName,
  searchKeyword,
  eventName,
  eventAction,
}) => {
  const { trackScreenView, trackAction, trackSiteSearch, trackEvent } =
    useMatomo();

  useEffect(() => {
    if (screenName && StringUtils.stringIsNotNullNorEmpty(screenName))
      void trackScreenView({ name: screenName });
  }, []);

  useEffect(() => {
    const screenNameIsNotEmpty =
      screenName && StringUtils.stringIsNotNullNorEmpty(screenName);
    const actionNameIsNotEmpty =
      actionName && StringUtils.stringIsNotNullNorEmpty(actionName);

    if (screenNameIsNotEmpty && actionNameIsNotEmpty)
      void trackAction({ name: `${screenName} / ${actionName}` });
    else if (actionNameIsNotEmpty) void trackAction({ name: `${actionName}` });
  }, [actionName]);

  useEffect(() => {
    if (searchKeyword && StringUtils.stringIsNotNullNorEmpty(searchKeyword))
      void trackSiteSearch({ keyword: searchKeyword });
  }, [searchKeyword]);

  useEffect(() => {
    const eventCategory = "MobileApp";
    const eventValue = 0;

    const eventNameIsNotEmpty = eventName && eventName.length > 0;
    const eventActionIsNotEmpty = eventAction && eventAction.length > 0;

    if (eventNameIsNotEmpty && eventActionIsNotEmpty) {
      const event: Event = {
        action: eventAction,
        category: eventCategory,
        name: eventName,
        value: eventValue,
      };
      void trackEvent(event);
    }
  }, [eventName, eventAction]);

  return null;
};

export default TrackerHandler;
