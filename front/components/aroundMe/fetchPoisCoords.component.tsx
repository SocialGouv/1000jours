import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";
import type { Region } from "react-native-maps";

import {
  AroundMeConstants,
  DatabaseQueries,
  StorageKeysConstants,
} from "../../constants";
import type { CartographiePoisFromDB } from "../../type";
import { AroundMeUtils, StorageUtils } from "../../utils";

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
      const savedTypeFilter: string[] = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoFilterKey
      );
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!savedTypeFilter || savedTypeFilter.length === 0) {
        chooseFilterMessage();
      } else {
        const variables = {
          lat1: topLeftPoint.latitude,
          lat2: bottomRightPoint.latitude,
          long1: topLeftPoint.longitude,
          long2: bottomRightPoint.longitude,
          types: savedTypeFilter,
        };
        getPoisByGpsCoords({
          variables,
        });
      }
    };
    void searchByGPSCoords();
  }, [triggerSearchByGpsCoords]);

  return <>{children}</>;
};

export default FetchPoisCoords;
