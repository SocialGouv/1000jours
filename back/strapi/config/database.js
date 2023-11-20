module.exports = ({ env }) => ({
  connections: {
    default: {
      connector: "bookshelf",
      options: {},
      settings: {
        client: "postgres",
        database: env("DATABASE_NAME", "strapi"),
        host: env("DATABASE_HOST", "postgres"),
        password: env("DATABASE_PASSWORD", "strapi"),
        port: env.int("DATABASE_PORT", 5432),
        ssl: getSslConfig(env),
        username: env("DATABASE_USERNAME", "strapi"),
      },
    },
  },
  defaultConnection: "default",
});

function getSslConfig(env) {
  if (env.bool("DATABASE_SSL", false)) {
    return { rejectUnauthorized: false }; // For self-signed certificates
  }
  return false;
}
