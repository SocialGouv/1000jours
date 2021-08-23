"use strict";

const emailTemplate = (info) => ({
  subject: "Demande de contact EPDS <%- prenom %>",
  text: `Bonjour,

    Une demande de contact suite à un test EPDS a été effectuée.

    Vous pouvez recontacter <%- prenom %> (<%- nombre_enfants %> enfant(s), dernier enfant le <%- naissance_dernier_enfant %>) :
    - à l'adresse suivante : <%- email %>${
      info.telephone
        ? ` ;
    - au numéro suivant : <%- telephone %>`
        : ``
    }.

    L'équipe 1000 premiers jours.`,
  html: `<p>Bonjour,</p>

    <p>Une demande de contact suite à un test EPDS a été effectuée.</p>

    <p>Vous pouvez recontacter <%- prenom %> (<%- nombre_enfants %> enfant(s), dernier enfant né le <%- naissance_dernier_enfant %>) :
    <ul>
      <li>à l'adresse suivante : <a href="mailto:<%- email %>"><%- email %></a>${
        info.telephone
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

    La patiente <%- nom %> <%- prenom %> vient de compléter un test EPDS et souhaite partager le résultat avec vous.
    Vous pouvez la contacter grâce aux informations suivantes : 
    
    Adresse mail : <%- email %>
    Téléphone : <%- telephone %>

    Score total du questionnaire EPDS  :  <%- score %> / 30

    Détails des réponses :
    Question / Réponse / Score
    ${buildTextResponse(info.detailScore, 0)}
    ${buildTextResponse(info.detailScore, 1)}
    ${buildTextResponse(info.detailScore, 2)}
    ${buildTextResponse(info.detailScore, 3)}
    ${buildTextResponse(info.detailScore, 4)}
    ${buildTextResponse(info.detailScore, 5)}
    ${buildTextResponse(info.detailScore, 6)}
    ${buildTextResponse(info.detailScore, 7)}
    ${buildTextResponse(info.detailScore, 8)}
    ${buildTextResponse(info.detailScore, 9)}
    `,
  html: `<p>Bonjour,</p>

  <p>La patiente <%- nom %> <%- prenom %> vient de compléter un test EPDS et souhaite partager le résultat avec vous.
  Vous pouvez la contacter grâce aux informations suivantes : </p>

  <p>Adresse mail : <%- email %><br />
  Téléphone : <%- telephone %></p>

  <p>Score total du questionnaire EPDS  :  <%- score %> / 30</p>

  <p>Détails des réponses :
    <table>
      <tr>
        <th>Question</th>
        <th>Réponse</th> 
        <th>Score</th>
      </tr>
      ${buildHtmlDetailScore(info.detailScore)}
    </table>
  </p>
  `,
});

const buildTextResponse = (detailScore, index) => {
  return `${index + 1} / ${detailScore[index]} / ${detailScore[index]}`;
}

const buildHtmlDetailScore = (detailScore) => {
  return detailScore.map((value, index) => {
    return `
    <tr>
      <td>${index + 1}</td>
      <td>${value}</td>
      <td>${value}</td>
    </tr>
    `;
  })
}

const partage = async ({
  email,
  emailPro,
  telephone,
  prenom = "ND",
  nom = "ND",
  score = "ND",
  detailScore = "ND"
}) => {
  if (!emailPro)
    throw new Error("Le service mail n'est pas configuré");

  if (!email) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    email,
    emailPro,
    telephone,
    prenom,
    nom,
    score,
    detailScore
  };

  try {
    const res = await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        from: process.env["MAIL_SEND_FROM"],
        to: emailPro,
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
