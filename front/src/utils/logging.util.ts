import * as Sentry from "sentry-expo";
import { Native } from "sentry-expo";

export const initMonitoring = (): void => {
  const enabled = process.env.SENTRY_ENABLED !== "false";
  Sentry.init({
    debug: true,
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    enabled: enabled,
  });
};

// Throwing an error will trigger Sentry
export const reportError = (errorMessage: string | undefined): void => {
  Native.captureException(errorMessage);
};
