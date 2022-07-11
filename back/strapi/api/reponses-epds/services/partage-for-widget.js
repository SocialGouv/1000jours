"use strict";

const _ = require('lodash');
const { createPdf } = require('../../pdf/services');
const fs = require('fs');
const path = require('path');

const relativeDirPath = path.relative(".", `public`);

const WIDGET_URL = process.env["WIDGET_URL"];
const SOURCE_FROM_EMAIL = "fromEmail";
const WIDGET_URL_CONTACT = `${WIDGET_URL}/contact/to-be-contacted/?source=${SOURCE_FROM_EMAIL}`;
const URL_FOR_PRO_SANTE = `${WIDGET_URL_CONTACT}&mtm_campaign=abtesting_intention&mtm_kwd=pro_sante&mtm_source=email`;
const URL_FOR_ENTOURAGE = `${WIDGET_URL_CONTACT}&mtm_campaign=abtesting_intention&mtm_kwd=entourage&mtm_source=email`;

const filename = (prenom, date) => {
  const newDate = date.replace("/", "").replace("/", "");
  return `1000J-BLUES-Resultats-EPDS-${newDate}-${prenom}.pdf`;
};

const reminderLabel =
  "Pour rappel, la dépression post-partum touche 100 000 femmes et 75 000 hommes chaque année en France. Elle tue une femme par mois. Mais, en parler c'est déjà se soigner.";

// Footer
const footerText = () => `

- 1000 jours - Blues : https://1000jours-blues.fabrique.social.gouv.fr/ 
- La fabrique numérique des ministères sociaux : https://www.fabrique.social.gouv.fr/
`;

const footerHtml = () => `
  <p>
    <img height="90" src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/logo_1000j_blues_a0341d9114.png"/>
    <img height="90" src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/logo_republique_francaise_365a280a09.png"/>
  </p>
`;

// Bloc Maman Blues
const mamanBluesBloc = (url) => `
  <p>
    <div style="
      padding:16px; 
      text-align:center; 
      justify-content:center; 
      flex-wrap:wrap; 
      background-color:#FFEDDF; 
      border:2px #E86405 solid;">
      <div style="display:contents;">
        <img alt="Portrait d'Elise" src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/portrait_elise_d95a2bb0bd.jpg" 
          style="
            height:100px; 
            border:5px #E86405 solid; 
            border-radius:50%;" />
        <div style="
          margin-top:16px; 
          margin-bottom:16px;">
          <b>Trouvez un accompagnement personnalisé près de chez vous </b> auprès de professionnels sensibilisés aux difficultés maternelles en échangeant avec Elise, présidente de l’association Maman Blues
        </div>
      </div>
      <a href=${url}>
        <button style="
          min-width:40%; 
          text-transform:uppercase; 
          background-color:#E86405; 
          border-radius:25px; 
          line-height:1.5rem;
          color:white;
          border-color:transparent;">être contacté(e)</button>
      </a>
    </div>
  </p>
`;

// Contenu du PDF
const pdfContent = (info) =>
  _.template(`<p>
    Résultats du test EPDS de <%- prenom %></br>
    Fait le <%- date %>
  </p>

  <p>
    <%- mood_level %>
  </p>

  <p>
    <table border="1" cellspacing="0" cellpadding="5">
      <tr>
        <th>Question</th>
        <th>Réponse</th> 
      </tr>
      ${[...new Array(10)].map((_, i) => buildHtmlDetailScore(info, i)).join("\n    ")}
    </table>
  </p>
`)(info);

const buildHtmlDetailScore = (info, index) =>
  `
  <tr>
    <td>${info.detail_questions[index]}</td>
    <td>${info.detail_reponses[index]}</td>
  </tr>
  `;

// Email pour le patient
const emailForHimselfHtml = (info) =>
  _.template(`<p>Bonjour <%- prenom %>,</p>

<p>Le <%- date %>, vous avez passé le test EPDS (échelle d'auto-évaluation d'un état dépressif dite échelle d'Édimbourg).</p>

<p>Vous trouverez votre résultat au questionnaire en pièce jointe. Nous vous invitons à le communiquer à votre professionnel de santé.</p>

<p>${reminderLabel}</p>

<p>N'hésitez pas à demander de l'aide en montrant le résultat de ce test à votre professionnel de santé.</p>

${mamanBluesBloc(URL_FOR_PRO_SANTE)}

${footerHtml()}
`)(info);

const emailForHimselfText = (info) =>
  _.template(`Bonjour <%- prenom %>,

Le <%- date %>, vous avez passé le test EPDS (échelle d'auto-évaluation d'un état dépressif dite échelle d'Édimbourg).

Vous trouverez votre résultat au questionnaire en pièce jointe. Nous vous invitons à le communiquer à votre professionnel de santé.

${reminderLabel}

N'hésitez pas à demander de l'aide en montrant le résultat de ce test à votre professionnel de santé.

${footerText()}
`)(info);

const emailForHimselfTemplate = (info) => ({
  html: emailForHimselfHtml(info),
  subject: _.template("1000 premiers jours : <%- prenom %>, votre résultat au questionnaire post-partum")(info),
  text: emailForHimselfText(info),
});

// Email pour l'entourage du patient
const emailForEntourageHtml = (info) =>
  _.template(`<p>Bonjour,</p>

<p>Le <%- date %>, <%- prenom %> a passé le test EPDS. C'est un questionnaire d'auto-évaluation d'un état dépressif utilisé par les professionnels de santé. Elle/Il a souhaité partager le résultat avec vous pour vous tenir informer.</p>

<p><%- prenom %> a besoin de votre soutien. Vous trouverez son résultat au questionnaire en pièce jointe.</p>

<p>${reminderLabel}</p>

<p>Nous vous invitons à accompagner <%- prenom %> dans cette démarche en demandant de l'aide aux professionnels de santé qui la suivent (sage-femme, médecin traitant ...).</p>

${mamanBluesBloc(URL_FOR_ENTOURAGE)}

${footerHtml()}
`)(info);

const emailForEntourageText = (info) =>
  _.template(`Bonjour,

Le <%- date %>, <%- prenom %> a passé le test EPDS. C'est un questionnaire d'auto-évaluation d'un état dépressif utilisé par les professionnels de santé. Elle/Il a souhaité partager le résultat avec vous pour vous tenir informer.

<%- prenom %> a besoin de votre soutien. Vous trouverez son résultat au questionnaire en pièce jointe.

${reminderLabel}

Nous vous invitons à accompagner <%- prenom %> dans cette démarche en demandant de l'aide aux professionnels de santé qui la suivent (sage-femme, médecin traitant ...).

${footerText()}
`)(info);

const emailForEntourageTemplate = (info) => ({
  html: emailForEntourageHtml(info),
  subject: _.template("[IMPORTANT] <%- prenom %> souhaite vous partager son résultat au questionnaire post-partum 1000 premiers jours")(info),
  text: emailForEntourageText(info),
});

// Partage
const partageForWidget = async (info, emailTemplate) => {
  if (!info.email) throw new Error("Au moins une adresse email est nécessaire");

  // Création du PDF
  try {
    await createPdf(filename(info.prenom, info.date), pdfContent(info));
  } catch (e) {
    console.error(e);
    throw new Error("Erreur lors de la création du pdf");
  }

  // Envoi du mail
  try {
    const resSending = await strapi.plugins.email.services.email.send({
      from: process.env["MAIL_SEND_FROM"],
      to: info.email,
      attachments: [
        {
          content: fs.createReadStream(
            path.join(relativeDirPath, filename(info.prenom, info.date))
          ),
          contentType: "application/pdf",
          filename: filename(info.prenom, info.date),
        },
      ],
      ...emailTemplate,
    });

    fs.rm(
      path.join(relativeDirPath, filename(info.prenom, info.date)),
      { recursive: false },
      (err) => {
        if (err) console.error(err);
      }
    );

    return resSending && /Ok/.test(resSending.response);
  } catch (e) {
    console.error(e);
  }
};

const partagePourSoiMeme = async ({
  date = "ND",
  detail_questions = "ND",
  detail_reponses = "ND",
  email,
  mood_level = "ND",
  prenom = "ND",
}) => {
  if (!email) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    date,
    detail_questions,
    detail_reponses,
    email,
    mood_level,
    prenom,
  };

  return partageForWidget(info, emailForHimselfTemplate(info));
};

const partageEntourage = async ({
  date = "ND",
  detail_questions = "ND",
  detail_reponses = "ND",
  email,
  mood_level = "ND",
  prenom = "ND",
}) => {
  if (!email) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    date,
    detail_questions,
    detail_reponses,
    email,
    mood_level,
    prenom,
  };

  return partageForWidget(info, emailForEntourageTemplate(info));
};

module.exports = {
  partageEntourage,
  partagePourSoiMeme,
};
