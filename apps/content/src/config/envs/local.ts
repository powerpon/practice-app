import { defineConfig } from "../defineConfig";

export function createLocalConfig() {
  return defineConfig({
      contentstackStackApiKey: process.env.CONTENTSTACK_STACK_API_KEY,
      contentstackManagementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
      contentstackNotesContentTypeId: process.env.CONTENTSTACK_NOTES_CONTENT_TYPE_ID,
      contentstackEuEndpoint: process.env.CONTENTSTACK_EU_ENDPOINT,
      contentstackPublishLocale: process.env.CONTENTSTACK_PUBLISH_LOCALE,
      contentstackPublishEnvironment: process.env.CONTENTSTACK_PUBLISH_ENVIRONMENT,
  });
}
