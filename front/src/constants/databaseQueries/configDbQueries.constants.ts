export const CONFIG_GET_ALL = `
  query GetConfig {
    config {
      lastAppVersionNumber
      news
    }
  }
`;

export const CONFIG_ZERO_ACCIDENT = `
  query GetConfig {
    config {
      activationZeroAccident
    }
  }
`;
