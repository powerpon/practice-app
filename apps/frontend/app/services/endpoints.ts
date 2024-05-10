import axios from 'axios';
import { appConfig } from '~/config';

export const endpoints = {
  async graphQLRequest(gqlCommand: string) {
    return await axios.post(appConfig.graphqlEndpoint, {
      query: gqlCommand,
    });
  },
};
