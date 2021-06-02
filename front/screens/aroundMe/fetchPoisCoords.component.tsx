import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";
import type { Region } from "react-native-maps";

import { AroundMeConstants, DatabaseQueries } from "../../constants";
import type { CartographiePoisFromDB } from "../../type";
import { AroundMeUtils } from "../../utils";

interface Props {
  children?: React.ReactNode;
  triggerSearchByGpsCoords: boolean;
  region: Region;
  setFetchedPois: (pois: CartographiePoisFromDB[]) => void;
}

const FetchPoisCoords: React.FC<Props> = ({
  children,
  triggerSearchByGpsCoords,
  region,
  setFetchedPois,
}) => {
  const [getPois] = useLazyQuery(DatabaseQueries.AROUNDME_POIS_BY_GPSCOORDS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const fetchedData = (data as {
        searchPois: CartographiePoisFromDB[];
      }).searchPois;
      setFetchedPois(fetchedData);
    },
  });

  useEffect(() => {
    const topLeftPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.topLeft
    );
    const bottomRightPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.bottomRight
    );
    const variables = {
      lat1: topLeftPoint.latitude,
      lat2: bottomRightPoint.latitude,
      long1: topLeftPoint.longitude,
      long2: bottomRightPoint.longitude,
    };
    getPois({
      variables,
    });
  }, [triggerSearchByGpsCoords]);

  return <>{children}</>;
};

export default FetchPoisCoords;
