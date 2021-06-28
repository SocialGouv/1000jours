import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";

import { DatabaseQueries } from "../../constants";

interface Props {
  children?: React.ReactNode;
  setFilterData: (filterData: unknown) => void;
}

const FetchFilterData: React.FC<Props> = ({ children, setFilterData }) => {
  const [getFilterData] = useLazyQuery(DatabaseQueries.AROUNDME_FILTER_DATA, {
    fetchPolicy: "no-cache",
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
