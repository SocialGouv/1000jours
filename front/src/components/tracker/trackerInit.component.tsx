import type MatomoTracker from "matomo-tracker-react-native";
import { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
import type { FC, ReactElement } from "react";
import { useEffect, useState } from "react";
import * as React from "react";

import { TrackerUtils } from "../../utils";

interface TrackerProviderProps {
  appContainer: ReactElement;
}

export const TrackerProvider: FC<TrackerProviderProps> = ({ appContainer }) => {
  const [matomoInstance, setMatomoInstance] = useState<
    MatomoTracker | undefined
  >();

  useEffect(() => {
    const getMatomoInstance = async () => {
      setMatomoInstance(await TrackerUtils.matomoInstance());
    };
    void getMatomoInstance();
  }, []);

  return matomoInstance ? (
    <MatomoProvider instance={matomoInstance}>{appContainer}</MatomoProvider>
  ) : null;
};

export const TrackerAppStart: FC = () => {
  const { trackAppStart } = useMatomo();
  useEffect(() => {
    void trackAppStart({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
