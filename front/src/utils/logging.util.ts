import * as Sentry from "@sentry/react-native";

export const initMonitoring = (): void => {
  const enabled = process.env.SENTRY_ENABLED !== "false";
  Sentry.init({
    // @ts-expect-error: enableProfiling is not typed but supported internally
    enableProfiling: false,
    dsn: process.env.SENTRY_DSN,
    enabled: enabled,
  });
};

// Throwing an error will trigger Sentry
export const reportError = (errorMessage: string | undefined): void => {
  Sentry.captureException(errorMessage);
};
