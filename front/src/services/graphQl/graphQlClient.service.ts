import type {
  ApolloClientOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const headers = { "content-type": "application/json" };
const uri = `${process.env.API_URL}/graphql`;

const getGraphQLClientOptions = (
  withNoCacheUri: boolean
): ApolloClientOptions<NormalizedCacheObject> => {
  return {
    cache,
    headers,
    uri: withNoCacheUri ? `${uri}?nocache` : uri,
  };
};

export const getGraphQlClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient(getGraphQLClientOptions(false));
};

export const getGraphQlClientNoCache =
  (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient(getGraphQlClientOptions(true));
  };
