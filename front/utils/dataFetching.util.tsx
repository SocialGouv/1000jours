import type { DocumentNode } from "@apollo/client";
import { useLazyQuery, useQuery } from "@apollo/client";
import * as React from "react";
import { ActivityIndicator } from "react-native";

import { CommonText } from "../components/StyledText";
import { Labels } from "../constants";
import type { DataFetchingType } from "../type";

export const fetchData = (query: DocumentNode): DataFetchingType => {
  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
  });

  if (loading)
    return {
      isFetched: false,
      loadingOrErrorComponent: <ActivityIndicator size="large" />,
    };
  if (error)
    return {
      isFetched: false,
      loadingOrErrorComponent: <CommonText>{Labels.errorMsg}</CommonText>,
    };

  return { isFetched: true, response: data };
};

export const fetchDataLazy = (query: DocumentNode): DataFetchingType => {
  const [getDataLazy, { loading, data }] = useLazyQuery(query, {
    fetchPolicy: "no-cache",
  });

  if (loading)
    return {
      isFetched: false,
      loadingOrErrorComponent: <ActivityIndicator size="large" />,
    };

  return { isFetched: true, response: data };
};
