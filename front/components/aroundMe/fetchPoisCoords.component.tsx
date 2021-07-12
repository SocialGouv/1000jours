import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";
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
  chooseFilterMessage: () => void;
}

const FetchPoisCoords: React.FC<Props> = ({
  children,
  triggerSearchByGpsCoords,
  region,
  setFetchedPois,
  chooseFilterMessage,
}) => {
  const [isFirstResearch, setIsFirstResearch] = useState(false);
  const [getPoisByGpsCoords] = useLazyQuery(
    DatabaseQueries.AROUNDME_POIS_BY_GPSCOORDS,
    {
      fetchPolicy: "no-cache",
      onCompleted: async (data) => {
        const { searchPois } = data as {
          searchPois: CartographiePoisFromDB[];
        };
        if (isFirstResearch) {
          setIsFirstResearch(false);

          if (
            searchPois.length <= AroundMeConstants.MAX_NUMBER_POI_WITHOUT_FILTER
          ) {
            setFetchedPois(searchPois);
          } else {
            await searchByGPSCoords(true);
          }
        } else {
          setFetchedPois(searchPois);
        }
      },
    }
  );

  const searchByGPSCoords = async (withFilter: boolean) => {
    const topLeftPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.topLeft
    );
    const bottomRightPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.bottomRight
    );

    let paramsVariables = null;

    if (withFilter) {
      const savedFilters: CartoFilterStorage | undefined =
        await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);
      if (
        !savedFilters ||
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (savedFilters &&
          StringUtils.stringArrayIsNullOrEmpty(savedFilters.types) &&
          StringUtils.stringArrayIsNullOrEmpty(savedFilters.etapes))
      ) {
        chooseFilterMessage();
        return;
      }
      paramsVariables = {
        etapes: savedFilters.etapes,
        types: savedFilters.types,
      };
    }

    const variables = {
      ...paramsVariables,
      lat1: topLeftPoint.latitude,
      lat2: bottomRightPoint.latitude,
      long1: topLeftPoint.longitude,
      long2: bottomRightPoint.longitude,
    };
    getPoisByGpsCoords({
      variables,
    });
  };

  useEffect(() => {
    setIsFirstResearch(true);
    void searchByGPSCoords(false);
  }, [triggerSearchByGpsCoords]);

  return <>{children}</>;
};

export default FetchPoisCoords;
