"use strict";

const path = require('path');
const fs = require('fs');
const html_to_pdf = require('html-pdf-node');
const slugify = require('slugify');
const _ = require('lodash');

const RESOURCES_URL = process.env["RESOURCES_URL"];
const relativeDirPath = path.relative('.', `public`);

const r = (Math.random() + 1).toString(36).substring(7);
const filename = (nom) => slugify(`resultats epds ${nom} ${r}`, `-`) + ".pdf";

/*** PRO ***/
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

const emailPartageHtml = (info) =>
  _.template(`<p>Bonjour,</p>

  <p>La patiente <b><%- prenom %> <%- nom %></b> vient de compléter un test EPDS et souhaite partager le résultat avec vous.
  Vous pouvez la contacter grâce aux informations suivantes : </p>

  <p>Adresse mail : <%- email %><br />
  Téléphone : <%- telephone %></p>

  <p>Score total du questionnaire EPDS : <%- score %> / 30</p>

  <p>Détails des réponses :
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <th>Question</th>
        <th>Réponse</th> 
        <th>Score</th>
      </tr>
      ${[...new Array(10)].map((_, i) => buildHtmlDetailScore(info, i)).join('\n    ')}
      <tr>
        <td colSpan="3">
          <i>
            Id questionnaire : <%- id_reponses %>
          </i>
        </td>
      </tr>
    </table>
  </p>
  `)(info);

const emailPartageProTemplate = (info) => ({
  subject: _.template("Résultats au questionnaire EPDS de <%- prenom %>")(info),
  text: _.template(`Bonjour,

    La patiente <%- prenom %> <%- nom %> vient de compléter un test EPDS et souhaite partager le résultat avec vous.
    Vous pouvez la contacter grâce aux informations suivantes : 
    
    Adresse mail : <%- email %>
    Téléphone : <%- telephone %>

    Score total du questionnaire EPDS : <%- score %> / 30

    Détails des réponses :
    Question / Réponse / Score
    ${[...new Array(10)].map((_, i) => buildTextResponse(info, i)).join('\n    ')}
    Id questionnaire : <%- id_reponses %>
    `)(info),
  html: emailPartageHtml(info),
});

/*** PATIENT ***/
const buildTextAppBloc = () =>
  `
  Gardez votre compagnon numérique 1000J dans votre poche pour vous aider au quotidien :
  - Android : https://play.google.com/store/apps/details?id=com.fabrique.millejours
  - iOS : https://apps.apple.com/us/app/1000-premiers-jours/id1573729958
  `;

const buildHtmlAppBloc = () =>
  `
  <p>Gardez votre compagnon numérique 1000J dans votre poche pour vous aider au quotidien : <br/>
    <a href="https://play.google.com/store/apps/details?id=com.fabrique.millejours" style="text-decoration: none">
      <img src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/logo_playstore_b9c60a2a46.png"/>
    </a>
    &emsp;
    <a href="https://apps.apple.com/us/app/1000-premiers-jours/id1573729958">
      <img src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/logo_appstore_356683af57.png"/>
    </a>
  </p>
  `;

const showAppBloc = (info) => info.score < 13 && info.detail_score[9] < 3;

const scoreOpinion = (info) => {
  if (info.score < 9 && info.detail_score[9] < 3) {
    return "Votre score est rassurant.";
  } else if (info.score >= 9 && info.score < 13 && info.detail_score[9] < 3) {
    return "Votre score présente un risque, nous vous recommandons de garder le contact avec votre professionnel.";
  } else if (info.score >= 13 || info.detail_score[9] == 3) {
    return "Votre score présente un risque, il est important de garder le contact avec votre professionnel.";
  }
}

const emailPartagePatientTemplate = (info) => ({
  subject: _.template("Résultats au questionnaire EPDS de <%- prenom %>")(info),
  text: _.template(`Bonjour,

    Suite à votre passage de l'EPDS avec un professionnel, nous nous permettons de vous envoyer le score du questionnaire.

    Score total du questionnaire EPDS : <% - score %> / 30 - ${scoreOpinion(info)}

    L'identifiant de votre test est : <%- id_reponses %>

    Nous en profitons pour vous adresser le lien à une liste de structures et de professionnels sensibilisés à l'accompagnement périnatal. 
    ${RESOURCES_URL}

    Vous pourrez ainsi trouver l'aide adaptée à vos besoins.

    Bien cordialement,
    L'application 1000 premiers jours

    ${showAppBloc(info) ? buildTextAppBloc() : ""}
  `)(info),
  html: _.template(`
    <p> Bonjour,</p >

    <p>Suite à votre passage de l'EPDS avec un professionnel, nous nous permettons de vous envoyer le score du questionnaire.</p>

    <p>Score total du questionnaire EPDS : <%- score %> / 30 - ${scoreOpinion(info)}</p>

    <p>L'identifiant de votre test est : <%- id_reponses %></p>

    <p>Nous en profitons pour vous adresser le lien à une liste de structures et de professionnels sensibilisés à l'accompagnement périnatal.<br/><a href="${RESOURCES_URL}" target="_blank">${RESOURCES_URL}</a></p>

    <p>Vous pourrez ainsi trouver l'aide adaptée à vos besoins.</p>

    <p>Bien cordialement,<br/>
    L'application 1000 premiers jours</p>

    ${showAppBloc(info) ? buildHtmlAppBloc() : ""}
  `)(info),
});

const createPdf = (info) => {
  const options = {
    format: 'A4',
    path: relativeDirPath + '/' + filename(info.nom),
    margin: {
      top: 25,
      left: 25,
      bottom: 25,
      right: 25
    }
  };

  const file = {
    content: emailPartageHtml(info)
  };

  return html_to_pdf.generatePdf(file, options)
}

const partage = async ({
  email = "ND",
  email_pro,
  email_pro_secondaire = "ND",
  telephone = "ND",
  prenom = "ND",
  nom = "ND",
  score = "ND",
  detail_questions = "ND",
  detail_score = "ND",
  detail_reponses = "ND",
  id_reponses = "ND"
}) => {
  if (!email_pro) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    email,
    email_pro,
    email_pro_secondaire,
    telephone,
    prenom,
    nom,
    score,
    detail_questions,
    detail_score,
    detail_reponses,
    id_reponses
  };

  try {
    await createPdf(info);
  } catch (e) {
    console.error(e);
    throw new Error("Erreur lors de la création du pdf");
  }

  if (email) {
    try {
      await strapi.plugins.email.services.email.send(
        {
          from: process.env["MAIL_SEND_FROM"],
          to: email,
          ...emailPartagePatientTemplate(info)
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  try {
    const resPro = await strapi.plugins.email.services.email.send(
      {
        from: process.env["MAIL_SEND_FROM"],
        to: email_pro,
        cc: [email_pro_secondaire],
        attachments: [
          {
            filename: filename(nom),
            contentType: 'application/pdf',
            content: fs.createReadStream(path.join(relativeDirPath, filename(nom)))
          }
        ],
        ...emailPartageProTemplate(info)
      }
    );

    fs.rm(relativeDirPath + '/' + filename(nom), { recursive: false }, (err) => {
      if (err) console.error(err);
    });

    return (resPro && !!resPro.response.match(/Ok/))
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
}

module.exports = {
  partage,
  showAppBloc,
  scoreOpinion
};
