"use strict";

const { contactConfirmed } = require("./contact-confirmed");

const emailSubject = "Demande de contact EPDS <%- prenom %>";
const emailTemplateHelloMsg = "Bonjour,";
const emailTemplateAskContactMsg =
  "Une demande de contact suite à un test EPDS a été effectuée.";
const emailTemplateRecontactMsg =
  "Vous pouvez recontacter <%- prenom %> (<%- situation %>) :";
const emailTemplateInfosEmail = "à l'adresse suivante : <%- email %>";
const emailTemplateInfosPhone = "au numéro suivant : <%- telephone %>";
const emailTemplateInfosPreference = "préférence : <%- moyen %>";
const emailTemplateInfosHoraires = "horaires : <%- horaires %>";
const emailTemplateInfosScoreQ10 =
  'score à la question 10 "Il m’est arrivé de penser à me faire du mal" : <%- score_question_dix %> / 3';
const emailTemplateInfosScore = "score EPDS : <%- score %> / 30";
const emailTemplateInfosLangue = "langue : <%- langue %>";
const emailTemplateInfosDepartement = "departement : <%- departement %>";
const emailTemplateInfosNbMoisGrossesse =
  "nombre de mois de grossesse : <%- nb_mois_de_grossesse %>";
const emailTemplateInfosNbMoisDernierEnfant =
  "nombre de mois du dernier enfant : <%- nb_mois_dernier_enfant %>";
const emailTemplateSignature = "L'équipe 1000 premiers jours.";

const emailTemplate = (info) => ({
  html: `
    <p>${emailTemplateHelloMsg}</p>
    <p>${emailTemplateAskContactMsg}</p>
    <p>${emailTemplateRecontactMsg}
      <ul>
        <li>${emailTemplateInfosPhone}</li>
        <li>${emailTemplateInfosPreference}</li>
        <li>${emailTemplateInfosHoraires}</li>
        <li>${emailTemplateInfosScoreQ10}</li>
        <li>${emailTemplateInfosScore}</li>
        <li>${emailTemplateInfosLangue}</li>
        <li>${emailTemplateInfosDepartement}</li>
        <li>${emailTemplateInfosNbMoisGrossesse}</li>
        <li>${emailTemplateInfosNbMoisDernierEnfant}</li>
      </ul>
    </p>
    <p>${emailTemplateSignature}</p>
  `,
  subject: emailSubject,
  text: `
    ${emailTemplateHelloMsg}

    ${emailTemplateAskContactMsg}

    ${emailTemplateRecontactMsg}
    - ${emailTemplateInfosPhone}
    - ${emailTemplateInfosPreference}
    - ${emailTemplateInfosHoraires}
    - ${emailTemplateInfosScoreQ10}
    - ${emailTemplateInfosScore}
    - ${emailTemplateInfosLangue}
    - ${emailTemplateInfosDepartement}
    - ${emailTemplateInfosNbMoisGrossesse}
    - ${emailTemplateInfosNbMoisDernierEnfant}
    
    ${emailTemplateSignature}
  `,
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
    email: email ?? "ND",
    horaires: horaires ?? "ND",
    moyen: moyen ?? "ND",
    naissance_dernier_enfant: naissance_dernier_enfant ?? "ND",
    nombre_enfants: nombre_enfants ?? "ND",
    prenom: prenom ?? "ND",
    score_question_dix: score_question_dix ?? "ND",
    telephone: telephone ?? "ND",
    langue: langue ?? "ND",
    situation: situation ?? "ND",
    score: score ?? "ND",
    departement: departement ?? "ND",
    nb_mois_de_grossesse: nb_mois_de_grossesse ?? "ND",
    nb_mois_dernier_enfant: nb_mois_dernier_enfant ?? "ND",
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
