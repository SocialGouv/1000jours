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
  showErrorMessage?: boolean;
}

export const GraphQLQuery: FC<Props> = ({
  query,
  fetchPolicy,
  getFetchedData,
  notifyOnNetworkStatusChange,
  noLoader,
  noLoaderBackdrop,
  showErrorMessage = true,
}) => {
  const { loading, error, data } = useQuery(gql(query), {
    fetchPolicy: fetchPolicy ?? FetchPoliciesConstants.NETWORK_ONLY,
    notifyOnNetworkStatusChange,
    onCompleted: (data) => {
      getFetchedData(data);
    },
    onError(error) {
      console.error(error);
    },
  });

  if (loading)
    return (
      <GraphQLLoader noLoader={noLoader} noLoaderBackdrop={noLoaderBackdrop} />
    );
  if (error && showErrorMessage) return <ErrorMessage error={error} />;
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
      onCompleted: (data) => {
        getFetchedData(data);
      },
      onError(error) {
        console.error(error);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerLaunchQuery]);

  if (loading)
    return (
      <GraphQLLoader noLoader={noLoader} noLoaderBackdrop={noLoaderBackdrop} />
    );
  if (error) return <ErrorMessage error={error} />;
  return null;
};
