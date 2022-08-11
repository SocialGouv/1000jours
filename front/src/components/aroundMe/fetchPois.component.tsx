import type { Poi } from "@socialgouv/nos1000jours-lib";
import { GET_POIS_BY_GPSCOORDS } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import type { Region } from "react-native-maps";

import {
  AroundMeConstants,
  FetchPoliciesConstants,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLLazyQuery } from "../../services";
import type { CartoFilterStorage } from "../../type";
import { AroundMeUtils, StorageUtils } from "../../utils";

interface Props {
  triggerSearchByGpsCoords: boolean;
  region?: Region;
  setFetchedPois: (pois: Poi[]) => void;
  //chooseFilterMessage: () => void;
}

const FetchPois: React.FC<Props> = ({
  triggerSearchByGpsCoords,
  region,
  setFetchedPois,
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

    if (!savedFilters) return;

    setQueryVariables({
      lat1: topLeftPoint.latitude,
      lat2: bottomRightPoint.latitude,
      long1: topLeftPoint.longitude,
      long2: bottomRightPoint.longitude,
      types: savedFilters.types,
    });
    setTriggerGetPois(!triggerGetPois);
  };

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) void searchByGPSCoords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSearchByGpsCoords]);

  const handleResults = useCallback(
    (data: unknown) => {
      const { searchPois } = data as {
        searchPois: Poi[];
      };
      setFetchedPois(searchPois);
    },
    [setFetchedPois]
  );

  return (
    <GraphQLLazyQuery
      query={GET_POIS_BY_GPSCOORDS}
      fetchPolicy={FetchPoliciesConstants.NETWORK_ONLY}
      notifyOnNetworkStatusChange
      getFetchedData={handleResults}
      triggerLaunchQuery={triggerGetPois}
      variables={queryVariables}
      noLoader
    />
  );
};

export default FetchPois;
