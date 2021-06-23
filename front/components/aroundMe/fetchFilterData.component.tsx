import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";

import { DatabaseQueries } from "../../constants";
import type { PoiTypeFromDB } from "../../type";

interface Props {
  children?: React.ReactNode;
  setPoiTypes: (poiTypes: PoiTypeFromDB[]) => void;
}

const FetchFilterData: React.FC<Props> = ({ children, setPoiTypes }) => {
  const [getFilterData] = useLazyQuery(DatabaseQueries.AROUNDME_TYPES_FILTER, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const fetchedData = (
        data as {
          cartographieTypes: PoiTypeFromDB[];
        }
      ).cartographieTypes;
      setPoiTypes(fetchedData);
    },
  });

  useEffect(() => {
    getFilterData();
  }, []);

  return <>{children}</>;
};

export default FetchFilterData;
