import type { Poi } from "@socialgouv/nos1000jours-lib";
import { GET_POIS_BY_GPSCOORDS } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useEffect, useState } from "react";
import type { Region } from "react-native-maps";

import {
  AroundMeConstants,
  FetchPoliciesConstants,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLLazyQuery } from "../../services";
import type { CartoFilterStorage } from "../../type";
import { AroundMeUtils, StorageUtils, StringUtils } from "../../utils";

interface Props {
  triggerSearchByGpsCoords: boolean;
  region?: Region;
  setFetchedPois: (pois: Poi[]) => void;
  chooseFilterMessage: () => void;
}

const FetchPois: React.FC<Props> = ({
  triggerSearchByGpsCoords,
  region,
  setFetchedPois,
  chooseFilterMessage,
}) => {
  const [componentIsInitialized, setComponentIsInitialized] = useState(false);
  const [triggerGetPois, setTriggerGetPois] = useState(false);
  const [queryVariables, setQueryVariables] = useState<unknown>();

  const searchByGPSCoords = async () => {
    if (!region) return;
    const topLeftPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.topLeft
    );
    const bottomRightPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.bottomRight
    );

    const savedFilters: CartoFilterStorage | undefined =
      await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);

    if (
      !savedFilters ||
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (savedFilters &&
        StringUtils.stringArrayIsNullOrEmpty(savedFilters.types) &&
        StringUtils.stringArrayIsNullOrEmpty(savedFilters.thematiques))
    ) {
      chooseFilterMessage();
      return;
    }

    setQueryVariables({
      lat1: topLeftPoint.latitude,
      lat2: bottomRightPoint.latitude,
      long1: topLeftPoint.longitude,
      long2: bottomRightPoint.longitude,
      thematiques: savedFilters.thematiques,
      types: savedFilters.types,
    });
    setTriggerGetPois(!triggerGetPois);
  };

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) void searchByGPSCoords();
  }, [triggerSearchByGpsCoords]);

  const handleResults = (data: unknown) => {
    const { searchPois } = data as {
      searchPois: Poi[];
    };
    setFetchedPois(searchPois);
  };

  return (
    <GraphQLLazyQuery
      query={GET_POIS_BY_GPSCOORDS}
      fetchPolicy={FetchPoliciesConstants.NETWORK_ONLY}
      notifyOnNetworkStatusChange
      updateFetchedData={handleResults}
      triggerLaunchQuery={triggerGetPois}
      variables={queryVariables}
      noLoader
    />
  );
};

export default FetchPois;
