import { gql, useLazyQuery } from "@apollo/client";
import { AROUNDME_FILTER_DATA } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useEffect } from "react";

import { FetchPoliciesConstants } from "../../constants";

interface Props {
  children?: React.ReactNode;
  setFilterData: (filterData: unknown) => void;
}

const FetchFilterData: React.FC<Props> = ({ children, setFilterData }) => {
  const [getFilterData] = useLazyQuery(gql(AROUNDME_FILTER_DATA), {
    fetchPolicy: FetchPoliciesConstants.NO_CACHE,
    onCompleted: (data) => {
      setFilterData(data);
    },
  });

  useEffect(() => {
    getFilterData();
  }, []);

  return <>{children}</>;
};

export default FetchFilterData;
