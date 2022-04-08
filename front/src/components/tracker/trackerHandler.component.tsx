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
      void trackScreenView({ name: screenName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenName]);

  useEffect(() => {
    const screenNameIsNotEmpty =
      screenName && StringUtils.stringIsNotNullNorEmpty(screenName);
    const actionNameIsNotEmpty =
      actionName && StringUtils.stringIsNotNullNorEmpty(actionName);

    if (screenNameIsNotEmpty && actionNameIsNotEmpty)
      void trackAction({ name: `${screenName} / ${actionName}` });
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
      const event: Event = {
        action: eventObject.action,
        category: eventCategory,
        name: eventObject.name,
        value: eventObject.value,
      };
      void trackEvent(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventObject]);

  return null;
};

export default TrackerHandler;
