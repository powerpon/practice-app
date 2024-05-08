import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://countries.trevorblades.com/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './graphql/gql-codegen/': {
      preset: 'client',
      plugins: [],
    }
  },
  ignoreNoDocuments: true,
};

export default config;