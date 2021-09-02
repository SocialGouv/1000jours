import { gql, useLazyQuery } from "@apollo/client";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { GET_POIS_BY_GPSCOORDS } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useEffect } from "react";
import type { Region } from "react-native-maps";

import {
  AroundMeConstants,
  FetchPoliciesConstants,
  StorageKeysConstants,
} from "../../constants";
import type { CartoFilterStorage } from "../../type";
import { AroundMeUtils, StorageUtils, StringUtils } from "../../utils";

interface Props {
  children?: React.ReactNode;
  triggerSearchByGpsCoords: boolean;
  postalCode: string;
  region: Region;
  setFetchedPois: (pois: Poi[]) => void;
  chooseFilterMessage: () => void;
  searchIsReady: boolean;
  setIsLoading: (value: boolean) => void;
  locationPermissionIsGranted: boolean;
}

const FetchPoisCoords: React.FC<Props> = ({
  children,
  triggerSearchByGpsCoords,
  region,
  setFetchedPois,
  chooseFilterMessage,
  searchIsReady,
  setIsLoading,
  locationPermissionIsGranted,
}) => {
  const [getPoisByGpsCoords] = useLazyQuery(gql(GET_POIS_BY_GPSCOORDS), {
    fetchPolicy: FetchPoliciesConstants.NO_CACHE,
    onCompleted: (data) => {
      const { searchPois } = data as {
        searchPois: Poi[];
      };
      setFetchedPois(searchPois);
    },
  });

  const searchByGPSCoords = async () => {
    const topLeftPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.topLeft
    );
    const bottomRightPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.bottomRight
    );

    const isFirstLaunch: boolean | null = await StorageUtils.getObjectValue(
      StorageKeysConstants.cartoIsFirstLaunch
    );
    if (isFirstLaunch === null)
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.cartoIsFirstLaunch,
        true
      );

    const cartoIsFirstLaunch = isFirstLaunch === null;

    const savedFilters: CartoFilterStorage | undefined =
      await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);
    if (
      !cartoIsFirstLaunch &&
      (!savedFilters ||
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (savedFilters &&
          StringUtils.stringArrayIsNullOrEmpty(savedFilters.types) &&
          StringUtils.stringArrayIsNullOrEmpty(savedFilters.etapes)))
    ) {
      chooseFilterMessage();
      return;
    }

    const variables = {
      etapes: savedFilters?.etapes ? savedFilters.etapes : [],
      lat1: topLeftPoint.latitude,
      lat2: bottomRightPoint.latitude,
      long1: topLeftPoint.longitude,
      long2: bottomRightPoint.longitude,
      thematiques: savedFilters?.thematiques ? savedFilters.thematiques : [],
      types: savedFilters?.types ? savedFilters.types : [],
    };
    getPoisByGpsCoords({
      variables,
    });
  };

  useEffect(() => {
    if (!searchIsReady) {
      if (!locationPermissionIsGranted) setIsLoading(false);
      return;
    }
    void searchByGPSCoords();
  }, [triggerSearchByGpsCoords]);

  return <>{children}</>;
};

export default FetchPoisCoords;
