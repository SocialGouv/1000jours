import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const header = { "content-type": "application/json" };
const uri = `${process.env.API_URL}/graphql`;

export function getGraphQlClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    headers: header,
    uri: uri,
  });
}
