"use strict";

const path = require('path');
const fs = require('fs');
const html_to_pdf = require('html-pdf-node');
const slugify = require('slugify')

const relativeDirPath = path.relative('.', `public`);

const r = (Math.random() + 1).toString(36).substring(7);
const filename = (nom) => slugify(`resultats epds ${nom} ${r}`, `-`) + ".pdf";

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
  html: emailPartageHtml(info),
});

const emailPartageHtml = (info) => (
  `<p>Bonjour,</p>

  <p>La patiente <b>${info.prenom} ${info.nom}</b> vient de compléter un test EPDS et souhaite partager le résultat avec vous.
  Vous pouvez la contacter grâce aux informations suivantes : </p>

  <p>Adresse mail : ${info.email}<br />
  Téléphone : ${info.telephone}</p>

  <p>Score total du questionnaire EPDS  :  ${info.score} / 30</p>

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
  `
)

const emailPartagePatientTemplate = (info, resourcesUrl) => ({
  subject: "Résultats au questionnaire EPDS de <%- prenom %>",
  text: `Bonjour,

    Vous venez de passer le test EPDS. Vous trouverez ci-après votre score au test ainsi qu'une liste de structures et professionnels que vous pouvez contacter.

    Score total du questionnaire EPDS  :  <%- score %> / 30

    Des ressources sont à votre disposition sur le site : ${resourcesUrl}
    `,
  html: `
  <p>Bonjour,</p>

  <p>Vous venez de passer le test EPDS. Vous trouverez ci-après votre score au test ainsi qu'une liste de structures et professionnels que vous pouvez contacter.</p>

  <p>Score total du questionnaire EPDS  :  <%- score %> / 30</p>

  <p>Des ressources sont à votre disposition sur le site : <a href="${resourcesUrl}" target="_blank">${resourcesUrl}</a></p>
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
  email = "ND",
  email_pro,
  email_pro_secondaire = "ND",
  telephone = "ND",
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
    email_pro_secondaire,
    telephone,
    prenom,
    nom,
    score,
    detail_questions,
    detail_score,
    detail_reponses
  };

  const emailResponse = await new Promise(async (resolve) => {
    await createPdf(info).then(() => {
      const resPro = strapi.plugins.email.services.email.sendTemplatedEmail(
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
          ]
        },
        emailPartageTemplate(info),
        info
      );

      if (email) {
        const resPatient = strapi.plugins.email.services.email.sendTemplatedEmail(
          {
            from: process.env["MAIL_SEND_FROM"],
            to: email
          },
          emailPartagePatientTemplate(info, process.env["RESOURCES_URL"]),
          info
        );
      }

      resolve(resPro)

      fs.rm(relativeDirPath + '/' + filename(nom), { recursive: false }, (err) => {
        if (err) console.error(err);
      });
    });
  })

  try {
    return (emailResponse && !!emailResponse.response.match(/Ok/))
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
}

function createPdf(info) {
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

module.exports = {
  partage
};
