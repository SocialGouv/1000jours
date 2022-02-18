import type { OperationVariables, WatchQueryFetchPolicy } from "@apollo/client";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import type { FC } from "react";
import { useEffect, useState } from "react";
import * as React from "react";

import { ErrorMessage, GraphQLLoader } from "../../components/baseComponents";
import { FetchPoliciesConstants } from "../../constants";

interface Props {
  query: string;
  fetchPolicy?: WatchQueryFetchPolicy;
  getFetchedData: (data: unknown) => void;
  notifyOnNetworkStatusChange?: boolean;
  noLoader?: boolean;
  noLoaderBackdrop?: boolean;
}

export const GraphQLQuery: FC<Props> = ({
  query,
  fetchPolicy,
  getFetchedData,
  notifyOnNetworkStatusChange,
  noLoader,
  noLoaderBackdrop,
}) => {
  const { loading, error, data } = useQuery(gql(query), {
    fetchPolicy: fetchPolicy ?? FetchPoliciesConstants.NETWORK_ONLY,
    notifyOnNetworkStatusChange,
    onCompleted: () => {
      getFetchedData(data);
    },
  });

  if (loading)
    return (
      <GraphQLLoader noLoader={noLoader} noLoaderBackdrop={noLoaderBackdrop} />
    );
  if (error) return <ErrorMessage error={error} />;
  return null;
};

interface PropsLazy extends Props {
  triggerLaunchQuery: boolean;
  variables?: unknown;
}

export const GraphQLLazyQuery: FC<PropsLazy> = ({
  query,
  fetchPolicy,
  getFetchedData,
  notifyOnNetworkStatusChange,
  triggerLaunchQuery,
  variables,
  noLoader,
  noLoaderBackdrop,
}) => {
  const [componentIsInitialized, setComponentIsInitialized] = useState(false);
  const [fetchData, { loading, error, data, called, refetch }] = useLazyQuery(
    gql(query),
    {
      fetchPolicy: fetchPolicy ?? FetchPoliciesConstants.NETWORK_ONLY,
      notifyOnNetworkStatusChange,
      onCompleted: () => {
        getFetchedData(data);
      },
    }
  );

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) {
      if (variables) {
        const queryVariables: OperationVariables = { variables };
        void fetchData(queryVariables);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (called) void refetch();
        else void fetchData();
      }
    }
  }, [triggerLaunchQuery]);

  if (loading)
    return (
      <GraphQLLoader noLoader={noLoader} noLoaderBackdrop={noLoaderBackdrop} />
    );
  if (error) return <ErrorMessage error={error} />;
  return null;
};
