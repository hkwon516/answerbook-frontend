import config from "./development.json";

export default {
  appId: process.env.NEXT_PUBLIC_APP_ID || config.appId,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || config.serverURL,
  webappURL: process.env.NEXT_PUBLIC_WEBAPP_URL || config.webappURL,
};
