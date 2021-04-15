module.exports = ({ env }) => ({
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "723ca8c711f1305897c937a5985c378f"),
    },
  },
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
});
