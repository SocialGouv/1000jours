"use strict";

const _ = require('lodash');
const { createPdf } = require('../../pdf/services');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const relativeDirPath = path.relative(".", `public`);

const r = (Math.random() + 1).toString(36).substring(7);
const filename = (prenom) =>
  slugify(`ResultatsEPDS ${prenom} ${r}`, `-`) + ".pdf";

// Footer
const footerText = () => `

- 1000 jours - Blues : https://1000jours-blues.fabrique.social.gouv.fr/ 
- La fabrique numérique des ministères sociaux : https://www.fabrique.social.gouv.fr/
`;

const footerHtml = () => `
  <p>
    <img height="90" src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/logo_1000j_blues_a0341d9114.png"/>
    <img height="90" src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/logo_republique_francaise_365a280a09.png"/>
    <img height="90" src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/logo_fabrique_96bbfe643b.png"/>
  </p>
`;

// Contenu du PDF // TODO: mood + question + reponses
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

<p>Le <%- date %>, vous avez passé le test EPDS (échelle d'auto-évaluation d'un état dépressif dite échelle d'Édimbourg) sur le site <b><a href="<%- url_test %>">ICI</a></b>.</p>

<p>Vous trouverez votre résultat au questionnaire en pièce jointe. Nous vous invitons à le communiquer à votre professionnel de santé.</p>

<p>Pour rappel, la dépression post-partum touche 100 000 femmes et 75 000 hommes chaque année en France. Elle tue une femme par mois.</p>

<p>En parler c'est déjà se soigner. N'hésitez pas à demander de l'aide. À tout moment, vous pouvez échanger avec Elise, présidente de l'association Maman Blues.</p>

${footerHtml()}
`)(info);

const emailForHimselfText = (info) =>
  _.template(`Bonjour <%- prenom %>,

Le <%- date %>, vous avez passé le test EPDS (échelle d'auto-évaluation d'un état dépressif dite échelle d'Édimbourg) sur le site <%- url_test %>.

Vous trouverez votre résultat au questionnaire en pièce jointe. Nous vous invitons à le communiquer à votre professionnel de santé.

Pour rappel, la dépression post-partum touche 100 000 femmes et 75 000 hommes chaque année en France. Elle tue une femme par mois.

En parler c'est déjà se soigner. N'hésitez pas à demander de l'aide. À tout moment, vous pouvez échanger avec Elise, présidente de l'association Maman Blues.

${footerText()}
`)(info);

const emailForHimselfTemplate = (info) => ({
  html: emailForHimselfHtml(info),
  subject: _.template("1000J - BLUES : <%- prenom %>, votre résultat au questionnaire EPDS")(info),
  text: emailForHimselfText(info),
});

// Email pour l'entourage du patient
const emailForEntourageTemplate = (info) => ({
  html: "",
  subject: "",
  text: "",
});

// Partage
const partageForWidget = async ({
  date = "ND",
  detail_questions = "ND",
  detail_reponses = "ND",
  email,
  mood_level = "ND",
  prenom = "ND",
  url_test = "ND",
}) => {
  if (!email) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    date,
    detail_questions,
    detail_reponses,
    email,
    mood_level,
    prenom,
    url_test,
  };

  // Création du PDF // TODO:
  // try {
  //   await createPdf(filename(info.prenom), pdfContent(info));
  // } catch (e) {
  //   console.error(e);
  //   throw new Error("Erreur lors de la création du pdf");
  // }

  // Envoi du mail
  try {
    const resSending = await strapi.plugins.email.services.email.send({
      from: process.env["MAIL_SEND_FROM"],
      to: email,
      // attachments: [ // TODO:
      //   {
      //     content: fs.createReadStream(
      //       path.join(relativeDirPath, filename(info.prenom))
      //     ),
      //     contentType: "application/pdf",
      //     filename: filename(info.prenom),
      //   },
      // ],
      ...emailForHimselfTemplate(info),
    });

    fs.rm(
      relativeDirPath + "/" + filename(info.prenom),
      { recursive: false },
      (err) => {
        if (err) console.error(err);
      }
    );

    return resSending && !!resSending.response.match(/Ok/);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  partageForWidget,
};
