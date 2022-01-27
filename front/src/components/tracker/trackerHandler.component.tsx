import type { Event } from "matomo-tracker-react-native";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

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
    if (screenName && screenName.length > 0)
      void trackScreenView({ name: screenName });
  }, []);

  useEffect(() => {
    const screenNameIsNotEmpty = screenName && screenName.length > 0;
    const actionNameIsNotEmpty = actionName && actionName.length > 0;

    if (screenNameIsNotEmpty && actionNameIsNotEmpty)
      void trackAction({ name: `${screenName} / ${actionName}` });
    else if (actionNameIsNotEmpty) void trackAction({ name: `${actionName}` });
  }, [actionName]);

  useEffect(() => {
    if (searchKeyword && searchKeyword.length > 0)
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
