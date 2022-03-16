import { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
import type { FC, ReactElement } from "react";
import { useEffect } from "react";
import * as React from "react";

import { TrackerUtils } from "../../utils";

interface TrackerProviderProps {
  appContainer: ReactElement;
}

export const TrackerProvider: FC<TrackerProviderProps> = ({ appContainer }) => {
  return (
    <MatomoProvider instance={TrackerUtils.matomoInstance}>
      {appContainer}
    </MatomoProvider>
  );
};

export const TrackerAppStart: FC = () => {
  const { trackAppStart } = useMatomo();
  useEffect(() => {
    const launchTrackAppStart = async () => {
      await trackAppStart(await TrackerUtils.getUserInfoForTracker());
    };

    void launchTrackAppStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
