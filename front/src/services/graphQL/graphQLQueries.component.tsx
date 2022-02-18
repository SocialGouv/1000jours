import type { OperationVariables, WatchQueryFetchPolicy } from "@apollo/client";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import type { FC } from "react";
import { useEffect, useState } from "react";
import * as React from "react";

import { ErrorMessage } from "../../components/baseComponents";
import { FetchPoliciesConstants } from "../../constants";
import { GraphQLLoader } from "..";

interface Props {
  query: string;
  fetchPolicy?: WatchQueryFetchPolicy;
  updateFetchedData: (data: unknown) => void;
  notifyOnNetworkStatusChange?: boolean;
  noLoader?: boolean;
  noLoaderBackdrop?: boolean;
}

export const GraphQLQuery: FC<Props> = ({
  query,
  fetchPolicy,
  updateFetchedData,
  notifyOnNetworkStatusChange,
  noLoader,
  noLoaderBackdrop,
}) => {
  const { loading, error, data } = useQuery(gql(query), {
    fetchPolicy: fetchPolicy ?? FetchPoliciesConstants.NETWORK_ONLY,
    notifyOnNetworkStatusChange,
    onCompleted: () => {
      updateFetchedData(data);
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
  updateFetchedData,
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
      else {
        const queryVariables: OperationVariables = { variables };
        void fetchData(queryVariables);
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
