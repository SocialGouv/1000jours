import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

interface TrackerHandlerProps {
  screenName?: string;
  actionName?: string;
  searchKeyword?: string;
}

const TrackerHandler: FC<TrackerHandlerProps> = ({
  screenName,
  actionName,
  searchKeyword,
}) => {
  const { trackScreenView, trackAction, trackSiteSearch } = useMatomo();

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

  return null;
};

export default TrackerHandler;
