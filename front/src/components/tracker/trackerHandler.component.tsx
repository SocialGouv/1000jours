import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";

interface TrackerHandlerProps {
  screenName: string;
  actionName?: string;
}

const TrackerHandler: FC<TrackerHandlerProps> = ({
  screenName,
  actionName,
}) => {
  const { trackScreenView, trackAction } = useMatomo();

  useEffect(() => {
    void trackScreenView({ name: screenName });
  }, []);

  useEffect(() => {
    if (actionName && actionName.length > 0)
      void trackAction({ name: `${screenName} / ${actionName}` });
  }, [actionName]);

  return null;
};

export default TrackerHandler;
