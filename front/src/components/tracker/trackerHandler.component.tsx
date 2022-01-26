import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

interface TrackerHandlerProps {
  screenName?: string;
  actionName?: string;
}

const TrackerHandler: FC<TrackerHandlerProps> = ({
  screenName,
  actionName,
}) => {
  const { trackScreenView, trackAction } = useMatomo();

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

  return null;
};

export default TrackerHandler;
