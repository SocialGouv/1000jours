import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";
import type { Region } from "react-native-maps";

import {
  AroundMeConstants,
  DatabaseQueries,
  StorageKeysConstants,
} from "../../constants";
import type { CartoFilterStorage, CartographiePoisFromDB } from "../../type";
import { AroundMeUtils, StorageUtils, StringUtils } from "../../utils";

interface Props {
  children?: React.ReactNode;
  triggerSearchByGpsCoords: boolean;
  postalCode: string;
  region: Region;
  setFetchedPois: (pois: CartographiePoisFromDB[]) => void;
  setIsLoading: (value: boolean) => void;
  chooseFilterMessage: () => void;
  searchIsReady: boolean;
}

const FetchPoisCoords: React.FC<Props> = ({
  children,
  triggerSearchByGpsCoords,
  region,
  setFetchedPois,
  setIsLoading,
  chooseFilterMessage,
  searchIsReady,
}) => {
  const [getPoisByGpsCoords] = useLazyQuery(
    DatabaseQueries.AROUNDME_POIS_BY_GPSCOORDS,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        const { searchPois } = data as {
          searchPois: CartographiePoisFromDB[];
        };
        setFetchedPois(searchPois);
      },
    }
  );

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
      types: savedFilters?.types ? savedFilters.types : [],
    };
    getPoisByGpsCoords({
      variables,
    });
  };

  useEffect(() => {
    if (!searchIsReady) {
      setIsLoading(false);
      return;
    }
    void searchByGPSCoords();
  }, [triggerSearchByGpsCoords]);

  return <>{children}</>;
};

export default FetchPoisCoords;
