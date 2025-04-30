"use strict";

const { contactConfirmed } = require("./contact-confirmed");

const emailTemplate = (info) => ({
  html: `<p>Bonjour,</p>

    <p>Une demande de contact suite à un test EPDS a été effectuée.</p>

    <p>Vous pouvez recontacter <%- prenom %> (<%- nombre_enfants %> enfant(s), dernier enfant né le <%- naissance_dernier_enfant %>) :
    <ul>
    ${
      info.email
        ? ` <li>à l'adresse suivante : <a href="mailto:<%- email %>"><%- email %></a></li>`
        : ""
    }
    ${
      info.telephone
        ? ` <li>au numéro suivant : <a href="tel:<%- telephone %>"><%- telephone %></a></li>`
        : ""
    }
    ${info.moyen ? ` <li>préférence : <%- moyen %></li>` : ""}
    ${info.horaires ? ` <li>horaires : <%- horaires %></li>` : ""}
    ${
      info.score_question_dix
        ? ` <li>score à la question 10 "Il m’est arrivé de penser à me faire du mal" : <%- score_question_dix %> / 3</li>`
        : ""
    }
    ${info.langue ? ` <li>langue: <%- langue %></li>` : ""}
    </ul>
    </p>

    L'équipe 1000 premiers jours.`,
  subject: "Demande de contact EPDS <%- prenom %>",
  text: `Bonjour,

    Une demande de contact suite à un test EPDS a été effectuée.

    Vous pouvez recontacter <%- prenom %> (<%- situation %>) :
    ${
      info.email
        ? `
    - à l'adresse suivante : <%- email %>`
        : ``
    }
    ${
      info.telephone
        ? `
    - au numéro suivant : <%- telephone %>`
        : ``
    }
    ${
      info.moyen
        ? `
    - préférence : <%- moyen %>`
        : ``
    } 
    ${
      info.horaires
        ? `
    - horaires : <%- horaires %>`
        : ``
    }
    ${
      info.score_question_dix
        ? `
    - score à la question 10 "Il m’est arrivé de penser à me faire du mal" : <%- score_question_dix %> / 3`
        : ``
    }
    ${
      info.score
        ? `
    - score EPDS : <%- score %> / 30`
        : ``
    }
    ${
      info.langue
        ? `
    - langue : <%- langue %>`
        : ``
    }
    ${
      info.departement
        ? `
    - departement : <%- departement %>`
        : ``
    }
    ${
      info.nb_mois_de_grossesse
        ? `
    - nombre de mois de grossesse : <%- nb_mois_de_grossesse %>`
        : ``
    }
    ${
      info.nb_mois_dernier_enfant
        ? `
    - nombre de mois du dernier enfant : <%- nb_mois_dernier_enfant %>`
        : ``
    }
    
    L'équipe 1000 premiers jours.`,
});

const contact = async ({
  email = "ND",
  horaires = "ND",
  moyen = "ND",
  prenom = "ND",
  naissance_dernier_enfant = "ND",
  nombre_enfants = "ND",
  score_question_dix = "ND",
  telephone = "ND",
  langue = "ND",
  situation = "ND",
  score = "ND",
  departement = "ND",
  nb_mois_de_grossesse = "ND",
  nb_mois_dernier_enfant = "ND",
}) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");

  const info = {
    email,
    horaires,
    moyen,
    naissance_dernier_enfant,
    nombre_enfants,
    prenom,
    score_question_dix,
    telephone,
    langue,
    situation,
    score,
    departement,
    nb_mois_de_grossesse,
    nb_mois_dernier_enfant,
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
        typeContact: moyen,
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
