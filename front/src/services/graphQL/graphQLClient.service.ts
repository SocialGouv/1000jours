import type {
  ApolloClientOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";

const cache = new InMemoryCache();
const headers = { "content-type": "application/json" };
const uri = `${process.env.API_URL}/graphql`;

// Apollo RetryLink : https://www.apollographql.com/docs/react/api/link/apollo-link-retry
const MAX_ATTEMPTS = 10;
const INITIAL_DELAY = 300;
const retryLink = new RetryLink({
  attempts: {
    max: MAX_ATTEMPTS,
    retryIf: (error) => !!error,
  },
  delay: {
    initial: INITIAL_DELAY,
    jitter: true,
    max: Infinity,
  },
});

const getGraphQLClientOptions = (
  withNoCacheUri: boolean
): ApolloClientOptions<NormalizedCacheObject> => {
  return {
    cache,
    headers,
    link: ApolloLink.from([retryLink, new HttpLink({ uri })]),
    uri: withNoCacheUri ? `${uri}?nocache` : uri,
  };
};

export const getGraphQLClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient(getGraphQLClientOptions(false));
};

export const getGraphQLClientNoCache =
  (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient(getGraphQLClientOptions(true));
  };
