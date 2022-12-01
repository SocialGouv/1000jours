"use strict";

// TODO:
const emailTemplate = (info) => ({
  html: "",
  subject: "",
  text: "",
});

const partageRessourcesByMail = async ({ email = "ND" }) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");

  const info = {
    email,
  };

  try {
    const res = await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        from: process.env["MAIL_SEND_FROM"],
        to: process.env["MAIL_SEND_TO"],
      },
      emailTemplate(info),
      info
    );

    return res && /Ok/.test(res.response);
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
};

module.exports = {
  partageRessourcesByMail,
};
