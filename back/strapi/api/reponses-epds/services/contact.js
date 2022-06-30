"use strict";

const { contactConfirmed } = require("./contact-confirmed");

const emailTemplate = (info) => ({
  subject: "Demande de contact EPDS <%- prenom %>",
  text: `Bonjour,

    Une demande de contact suite à un test EPDS a été effectuée.

    Vous pouvez recontacter <%- prenom %> (<%- nombre_enfants %> enfant(s), dernier enfant le <%- naissance_dernier_enfant %>) :
    ${info.email ? `
    - à l'adresse suivante : <%- email %>`
      : ``
    }
    ${info.telephone ? `
    - au numéro suivant : <%- telephone %>`
      : ``
    }
    ${info.moyen ? `
    - préférence : <%- moyen %>`
      : ``
    } 
    ${info.horaires ? `
    - horaires : <%- horaires %>`
      : ``
    }

    L'équipe 1000 premiers jours.`,
  html: `<p>Bonjour,</p>

    <p>Une demande de contact suite à un test EPDS a été effectuée.</p>

    <p>Vous pouvez recontacter <%- prenom %> (<%- nombre_enfants %> enfant(s), dernier enfant né le <%- naissance_dernier_enfant %>) :
    <ul>
    ${info.email ? `
        <li>à l'adresse suivante : <a href="mailto:<%- email %>"><%- email %></a>`
      : ""
    }
    ${info.telephone ? ` </li>
      <li>au numéro suivant : <a href="tel:<%- telephone %>"><%- telephone %></a>`
      : ""
    }
    ${info.moyen ? ` </li>
      <li>préférence : <%- moyen %>`
      : ""
    }
    ${info.horaires ? ` </li>
      <li>horaires : <%- horaires %>`
      : ""
    }</li>
    </ul>
    </p>

    L'équipe 1000 premiers jours.`,
});

const contact = async ({
  email = "ND",
  telephone = "ND",
  prenom = "ND",
  nombre_enfants = "ND",
  naissance_dernier_enfant = "ND",
  moyen = "ND",
  horaires = "ND",
}) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");

  const info = {
    email,
    telephone,
    prenom,
    nombre_enfants,
    naissance_dernier_enfant,
    moyen,
    horaires,
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

    const isContactSuccess = res && /Ok/.test(res.response);
    if (isContactSuccess && info.email) {
      return contactConfirmed({
        email: info.email,
        prenom: info.prenom.split(" [")[0],
      });
    }
    return isContactSuccess;
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
};

module.exports = {
  contact,
};
