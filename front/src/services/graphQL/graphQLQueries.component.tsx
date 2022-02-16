import type { WatchQueryFetchPolicy } from "@apollo/client";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import type { FC } from "react";
import { useEffect, useState } from "react";
import * as React from "react";

import { ErrorMessage, Loader } from "../../components/baseComponents";
import { FetchPoliciesConstants } from "../../constants";

interface Props {
  query: string;
  fetchPolicy?: WatchQueryFetchPolicy;
  updateFetchedData: (data: unknown) => void;
}

export const GraphQLQuery: FC<Props> = ({
  query,
  fetchPolicy,
  updateFetchedData,
}) => {
  const { loading, error, data } = useQuery(gql(query), {
    fetchPolicy,
    onCompleted: () => {
      updateFetchedData(data);
    },
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  return null;
};

interface PropsLazy extends Props {
  triggerLaunchQuery: boolean;
}

export const GraphQLLazyQuery: FC<PropsLazy> = ({
  query,
  fetchPolicy,
  updateFetchedData,
  triggerLaunchQuery,
}) => {
  const [componentIsInitialized, setComponentIsInitialized] = useState(false);
  const [fetchData, { loading, error, data, called, refetch }] = useLazyQuery(
    gql(query),
    {
      fetchPolicy: fetchPolicy ?? FetchPoliciesConstants.NETWORK_ONLY,
      onCompleted: () => {
        updateFetchedData(data);
      },
    }
  );

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (called) void refetch();
      else void fetchData();
    }
  }, [triggerLaunchQuery]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  return null;
};
