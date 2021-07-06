module.exports = ({ env }) => ({
  connections: {
    default: {
      connector: "bookshelf",
      options: {
        debug: false,
      },
      settings: {
        client: "postgres",
        database: env("DATABASE_NAME", "strapi"),
        host: env("DATABASE_HOST", "postgres"),
        password: env("DATABASE_PASSWORD", "strapi"),
        port: env.int("DATABASE_PORT", 5432),
        ssl: env.bool("DATABASE_SSL", false),
        username: env("DATABASE_USERNAME", "strapi"),
      },
    },
  },
  defaultConnection: "default",
});
