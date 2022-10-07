import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
// @ts-ignore
import apolloLogger from "apollo-link-logger";

const GRAPH_API_URI = process.env.REACT_APP_SIMPLESHEETS_API_URL ?? "http://localhost:4000/graph";

const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri: GRAPH_API_URI, fetchOptions: { mode: "cors" } });

const errorLink = onError(({ graphQLErrors, networkError, forward, response }) => {
  if (graphQLErrors) {
    graphQLErrors.map((graphQLError: any) => console.log("[GraphQL error]: ", graphQLError));
  }
  if (networkError) {
    console.log("[Network error]: ", networkError);
  }
});

const links = [errorLink, httpLink];
links.unshift(apolloLogger);

export const client = new ApolloClient({ cache, link: ApolloLink.from(links) });
