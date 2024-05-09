import { createLocalConfig } from "./envs/local";

function getConfig() {
    return createLocalConfig();
}

export const appConfig = getConfig();
