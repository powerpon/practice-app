import axios from 'axios';

export const endpoints = {
  async graphQLRequest(gqlCommand: string) {
    return await axios.post(process.env.GRAPHQL_ENDPOINT as string, {
      query: gqlCommand,
    });
  },
};
