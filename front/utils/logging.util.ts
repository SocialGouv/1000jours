import * as Sentry from "sentry-expo";

export const initMonitoring = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true,
  });
};

// Throwing an error will trigger Sentry
export const reportError = (errorMessage: any) => {
  throw new Error(errorMessage);
};
