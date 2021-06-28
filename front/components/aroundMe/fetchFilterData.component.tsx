import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";

import { DatabaseQueries } from "../../constants";
import type { PoiTypeFromDB, StepFromDB } from "../../type";

interface Props {
  children?: React.ReactNode;
  setPoiTypes: (poiTypes: PoiTypeFromDB[]) => void;
  setSteps: (steps: StepFromDB[]) => void;
}

const FetchFilterData: React.FC<Props> = ({
  children,
  setPoiTypes,
  setSteps,
}) => {
  const [getPoiTypeFilterData] = useLazyQuery(
    DatabaseQueries.AROUNDME_TYPES_FILTER,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        const { cartographieTypes } = data as {
          cartographieTypes: PoiTypeFromDB[];
        };
        setPoiTypes(cartographieTypes);
      },
    }
  );

  const [getPoiStepsFilterData] = useLazyQuery(
    DatabaseQueries.AROUNDME_STEPS_FILTER,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        const { etapes } = data as {
          etapes: StepFromDB[];
        };
        setSteps(etapes);
      },
    }
  );

  useEffect(() => {
    getPoiTypeFilterData();
    getPoiStepsFilterData();
  }, []);

  return <>{children}</>;
};

export default FetchFilterData;
