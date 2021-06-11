module.exports = ({ env }) => ({
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "723ca8c711f1305897c937a5985c378f"),
    },
    watchIgnoreFiles: ["**/*.csv", "**/#*#", "**/*~"],
  },
  cron: {
    enabled: true,
  },
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // note: set to undefined if env is not present for admin build
  url: env("BACKOFFICE_URL", undefined),
});
