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
  chooseFilterMessage: () => void;
}

const FetchPoisCoords: React.FC<Props> = ({
  children,
  triggerSearchByGpsCoords,
  region,
  setFetchedPois,
  chooseFilterMessage,
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
  useEffect(() => {
    const searchByGPSCoords = async () => {
      const topLeftPoint = AroundMeUtils.getLatLngPoint(
        region,
        AroundMeConstants.LatLngPointType.topLeft
      );
      const bottomRightPoint = AroundMeUtils.getLatLngPoint(
        region,
        AroundMeConstants.LatLngPointType.bottomRight
      );

      const savedFilters: CartoFilterStorage =
        await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);
      if (
        StringUtils.stringArrayIsNullOrEmpty(savedFilters.types) &&
        StringUtils.stringArrayIsNullOrEmpty(savedFilters.etapes)
      ) {
        chooseFilterMessage();
        return;
      }
      const variables = {
        etapes: savedFilters.etapes,
        lat1: topLeftPoint.latitude,
        lat2: bottomRightPoint.latitude,
        long1: topLeftPoint.longitude,
        long2: bottomRightPoint.longitude,
        types: savedFilters.types,
      };
      getPoisByGpsCoords({
        variables,
      });
    };
    void searchByGPSCoords();
  }, [triggerSearchByGpsCoords]);

  return <>{children}</>;
};

export default FetchPoisCoords;
