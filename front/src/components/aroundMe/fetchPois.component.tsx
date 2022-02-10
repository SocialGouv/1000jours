import { gql, useLazyQuery } from "@apollo/client";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { GET_POIS_BY_GPSCOORDS } from "@socialgouv/nos1000jours-lib";
import type * as React from "react";
import { useEffect, useState } from "react";
import type { Region } from "react-native-maps";

import {
  AroundMeConstants,
  FetchPoliciesConstants,
  StorageKeysConstants,
} from "../../constants";
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

  const [getPoisByGpsCoords] = useLazyQuery(gql(GET_POIS_BY_GPSCOORDS), {
    fetchPolicy: FetchPoliciesConstants.NETWORK_ONLY,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const { searchPois } = data as {
        searchPois: Poi[];
      };
      setFetchedPois(searchPois);
    },
  });

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

    const variables = {
      lat1: topLeftPoint.latitude,
      lat2: bottomRightPoint.latitude,
      long1: topLeftPoint.longitude,
      long2: bottomRightPoint.longitude,
      thematiques: savedFilters.thematiques,
      types: savedFilters.types,
    };
    void getPoisByGpsCoords({
      variables,
    });
  };

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) void searchByGPSCoords();
  }, [triggerSearchByGpsCoords]);

  return null;
};

export default FetchPois;
