"use strict";

const resourcesUrl =
  "https://1000jours-blues.fabrique.social.gouv.fr/ressources?mtm_campaign=ressources-email";
const landingBluesUrl = "https://1000jours-blues.fabrique.social.gouv.fr/";
const content1Email =
  "Vous avez demandé à recevoir les ressources liées aux difficultés maternelles.";
const content2Email =
  "Le lien suivant répertorie les adresses et contacts des professionnels, associations et autres organisations qui aident à faire en sorte que les difficultés maternelles puissent être connues, entendues et accompagnées";

const emailTemplate = () => ({
  html: `Bonjour,
    
    <p>
    ${content1Email}<br />
    ${content2Email}
    </p>

    <p>
      <a href="${resourcesUrl}">Accéder à nos ressources</a>
    </p>

    <p>
    Bien à vous, 
    <br />
    L'équipe "1000 premiers jours"
    </p>

    ${landingBluesUrl}
  `,
  subject:
    "1000 premiers jours - Les ressources liées aux difficultés maternelles",
  text: `Bonjour,
    
    ${content1Email}
    ${content2Email}

    Accéder à nos ressources : ${resourcesUrl}

    Bien à vous,
    L'équipe "1000 premiers jours"

    ${landingBluesUrl}
  `,
});

const partageRessourcesParMail = async ({ email = "ND" }) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");

  const info = { email };

  try {
    const res = await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        from: process.env["MAIL_SEND_FROM"],
        to: email,
      },
      emailTemplate(),
      info
    );

    return res && /Ok/.test(res.response);
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
};

module.exports = {
  partageRessourcesParMail,
};
