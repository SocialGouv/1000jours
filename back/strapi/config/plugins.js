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
});
