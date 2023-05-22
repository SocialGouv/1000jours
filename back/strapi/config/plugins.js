module.exports = ({ env }) => ({
  demarches: {
    token: env("DEMARCHES_SIMPLIFIEES_TOKEN"),
  },
  email: {
    provider: "smtp",
    providerOptions: {
      connectionTimeout: 1,
      host: env("MAIL_HOST"),
      password: env("MAIL_PASSWORD"),
      port: env("MAIL_PORT"),
      rejectUnauthorized: true,
      requireTLS: true,
      secure: false,
      username: env("MAIL_USER"),
    },
    settings: {
      from: env("MAIL_SEND_FROM"),
      replyTo: env("MAIL_SEND_FROM"),
    },
  },
  graphql: {
    amountLimit: 1500,
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
});
