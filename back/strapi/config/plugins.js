module.exports = {
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
};
