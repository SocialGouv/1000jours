module.exports = ({ env }) => ({
  graphql: {
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    },
    depthLimit: 7,
    endpoint: "/graphql",
    playgroundAlways: true,
    shadowCRUD: true,
  },
  sentry: {
    dsn: env("SENTRY_DSN"),
  },
  email: {
    provider: "smtp",
    providerOptions: {
      host: env("MAIL_HOST"),
      port: env("MAIL_PORT"),
      secure: false,
      username: env("MAIL_USER"),
      password: env("MAIL_PASSWORD"),
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: env("MAIL_SEND_FROM"),
      replyTo: env("MAIL_SEND_FROM"),
    },
  },
  demarches: {
    token: env("DEMARCHES_SIMPLIFIEES_TOKEN"),
  },
});
