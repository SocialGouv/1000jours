import { ApolloProvider } from "@apollo/client";
import type { FC, ReactElement } from "react";
import * as React from "react";

import { getGraphQLClient } from "./graphQLClient.service";

interface GraphQLProviderProps {
  appContainer: ReactElement;
}

const GraphQLProvider: FC<GraphQLProviderProps> = ({ appContainer }) => {
  return (
    <ApolloProvider client={getGraphQLClient()}>{appContainer}</ApolloProvider>
  );
};

export default GraphQLProvider;
