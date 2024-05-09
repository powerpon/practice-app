import { defineConfig } from "../defineConfig";

export function createLocalConfig() {
  return defineConfig({
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT ?? '',
  });
}
