import { gql, useLazyQuery } from "@apollo/client";
import { AROUNDME_FILTER_DATA } from "@socialgouv/nos1000jours-lib";
import type * as React from "react";
import { useEffect } from "react";

import { FetchPoliciesConstants } from "../../constants";

interface Props {
  setFilterData: (filterData: unknown) => void;
}

const FetchFilterData: React.FC<Props> = ({ setFilterData }) => {
  const [getFilterData] = useLazyQuery(gql(AROUNDME_FILTER_DATA), {
    fetchPolicy: FetchPoliciesConstants.NO_CACHE,
    onCompleted: (data) => {
      setFilterData(data);
    },
  });

  useEffect(() => {
    void getFilterData();
  }, []);

  return null;
};

export default FetchFilterData;
