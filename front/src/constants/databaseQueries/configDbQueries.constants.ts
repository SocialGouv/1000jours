export const CONFIG_GET_LAST_APP_VERSION = `
  query GetLastAppVersion {
    config {
      lastAppVersionNumber
    }
  }
`;

export const CONFIG_GET_NEWS = `
  query GetNews {
    config {
      news
    }
  }
`;
