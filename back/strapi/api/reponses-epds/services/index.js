"use strict";

const emailTemplate = (info) => ({
  subject: "Demande de contact EPDS <%- prenom %>",
  text: `Bonjour,

    Une demande de contact suite à un test EPDS a été effectuée.

    Vous pouvez recontacter <%- prenom %> (<%- nombre_enfants %> enfant(s), dernier enfant le <%- naissance_dernier_enfant %>) :
    - à l'adresse suivante : <%- email %>${info.telephone
      ? ` ;
    - au numéro suivant : <%- telephone %>`
      : ``
    }.

    L'équipe 1000 premiers jours.`,
  html: `<p>Bonjour,</p>

    <p>Une demande de contact suite à un test EPDS a été effectuée.</p>

    <p>Vous pouvez recontacter <%- prenom %> (<%- nombre_enfants %> enfant(s), dernier enfant né le <%- naissance_dernier_enfant %>) :
    <ul>
      <li>à l'adresse suivante : <a href="mailto:<%- email %>"><%- email %></a>${info.telephone
      ? ` ;</li>
      <li>au numéro suivant : <a href="tel:<%- telephone %>"><%- telephone %></a>`
      : ""
    }.</li>
    </ul>
    </p>

    L'équipe 1000 premiers jours.`,
});

const contact = async ({
  email,
  telephone,
  prenom = "ND",
  nombre_enfants = "ND",
  naissance_dernier_enfant = "ND",
}) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");

  if (!email) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    email,
    telephone,
    prenom,
    nombre_enfants,
    naissance_dernier_enfant,
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

    return res && !!res.response.match(/Ok/);
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
};

/* PARTAGE DES RESULTATS */
const emailPartageTemplate = (info) => ({
  subject: "Résultats au questionnaire EPDS de <%- prenom %>",
  text: `Bonjour,

    La patiente <%- prenom %> <%- nom %> vient de compléter un test EPDS et souhaite partager le résultat avec vous.
    Vous pouvez la contacter grâce aux informations suivantes : 
    
    Adresse mail : <%- email %>
    Téléphone : <%- telephone %>

    Score total du questionnaire EPDS  :  <%- score %> / 30

    Détails des réponses :
    Question / Réponse / Score
    ${[...new Array(10)].map((_, i) => buildTextResponse(info, i)).join('\n    ')}
    `,
  html: `
  <p>Bonjour,</p>

  <p>La patiente <b><%- prenom %> <%- nom %></b> vient de compléter un test EPDS et souhaite partager le résultat avec vous.
  Vous pouvez la contacter grâce aux informations suivantes : </p>

  <p>Adresse mail : <%- email %><br />
  Téléphone : <%- telephone %></p>

  <p>Score total du questionnaire EPDS  :  <%- score %> / 30</p>

  <p>Détails des réponses :
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <th>Question</th>
        <th>Réponse</th> 
        <th>Score</th>
      </tr>
      ${[...new Array(10)].map((_, i) => buildHtmlDetailScore(info, i)).join('\n    ')}
    </table>
  </p>
  `,
});

const buildTextResponse = (info, index) =>
  `${info.detail_questions[index]} / ${info.detail_reponses[index]} / ${info.detail_score[index]}`;


const buildHtmlDetailScore = (info, index) =>
  `
  <tr>
    <td>${info.detail_questions[index]}</td>
    <td>${info.detail_reponses[index]}</td>
    <td>${info.detail_score[index]}</td>
  </tr>
  `;

const partage = async ({
  email,
  email_pro,
  telephone,
  prenom = "ND",
  nom = "ND",
  score = "ND",
  detail_questions = "ND",
  detail_score = "ND",
  detail_reponses = "ND"
}) => {
  if (!email_pro) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    email,
    email_pro,
    telephone,
    prenom,
    nom,
    score,
    detail_questions,
    detail_score,
    detail_reponses
  };

  try {
    const res = await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        from: process.env["MAIL_SEND_FROM"],
        to: email_pro,
      },
      emailPartageTemplate(info),
      info
    );

    return res && !!res.response.match(/Ok/);
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
};

module.exports = {
  contact,
  partage
};
