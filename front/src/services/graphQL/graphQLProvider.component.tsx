import { ApolloProvider } from "@apollo/client";
import type { FC, ReactElement } from "react";
import * as React from "react";

import { getGraphQLClient } from "./graphQLClient.service";

interface TrackerProviderProps {
  appContainer: ReactElement;
}

const GraphQLProvider: FC<TrackerProviderProps> = ({ appContainer }) => {
  return (
    <ApolloProvider client={getGraphQLClient()}>{appContainer}</ApolloProvider>
  );
};

export default GraphQLProvider;
