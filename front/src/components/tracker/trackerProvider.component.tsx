import { MatomoProvider } from "matomo-tracker-react-native";
import type { FC, ReactElement } from "react";
import * as React from "react";

import { TrackerUtils } from "../../utils";

interface Props {
  appContainer: ReactElement;
}

const TrackerProvider: FC<Props> = ({ appContainer }) => {
  return (
    <MatomoProvider instance={TrackerUtils.matomoInstance}>
      {appContainer}
    </MatomoProvider>
  );
};

export default TrackerProvider;
