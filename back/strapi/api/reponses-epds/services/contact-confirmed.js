/* eslint-disable sort-keys-fix/sort-keys-fix */
"use strict";

const TYPE_CONTACT_EMAIL = "email";

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

const emailTemplateForSMS = (info) => ({
  subject: "1000 premiers jours - suite à votre demande",
  text: `Bonjour <%- prenom %>,

    Nous sommes l'équipe des "1000 premiers jours - Blues" en charge des réponses suite au passage du questionnaire sur la dépression du post-partum.
    Nous vous confirmons avoir bien reçu votre demande.
    Nous vous contacterons en respectant les créneaux que vous avez choisis.

    En parler, c'est déjà se soigner.

    L'équipe "1000 premiers jours - Blues"
    
    ${footerText}`,
  html: `<p>Bonjour <%- prenom %>,</p>

    <p>
      Nous sommes l'équipe des "1000 premiers jours - Blues" en charge des réponses suite au passage du questionnaire sur la dépression du post-partum.<br/>
      Nous vous confirmons avoir bien reçu votre demande.<br/>
      Nous vous contacterons en respectant les créneaux que vous avez choisis.
    </p>

    <p>En parler, c'est déjà se soigner.</p>

    <p>
      <img src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/cercle_vertueux_3a7bb0fb95.png" style="max-width:300px;"/>
    </p>

    L'équipe "1000 premiers jours - Blues"

    ${footerHtml()}`,
});

const emailTemplateForEmail = (info) => ({
  subject: "1000 premiers jours - Suite à votre questionnaire, échangeons",
  text: `Bonjour <%- prenom %>,

  Nous sommes l'équipe des "1000 premiers jours - Blues" en charge des réponses suite au passage du questionnaire sur la dépression du post-partum.
  Vous avez demandé à être recontactée et nous sommes à votre écoute.

  Souhaiteriez-vous nous en dire plus vous concernant ? Ce que vous vivez, quels sont vos besoins si vous parvenez à les exprimer ? Votre lieu de résidence afin de vous orienter vers des professionnels et/ou structures adaptées le cas échéant ?
  
  Vous pouvez répondre directement à cet e-mail. Nous vous répondrons dans les plus brefs délais.
  
  Bien à vous,
  L'équipe "1000 premiers jours - Blues"
  
  https://1000jours.fabrique.social.gouv.fr/
    
    ${footerText}`,
  html: `<p>Bonjour <%- prenom %>,</p>

    <p>
      Nous sommes l'équipe des "1000 premiers jours - Blues" en charge des réponses suite au passage du questionnaire sur la dépression du post-partum.<br/>
      Vous avez demandé à être recontactée et nous sommes à votre écoute.
    </p>

    <p>
      Souhaiteriez-vous nous en dire plus vous concernant ? Ce que vous vivez, quels sont vos besoins si vous parvenez à les exprimer ? Votre lieu de résidence afin de vous orienter vers des professionnels et/ou structures adaptées le cas échéant ?
    </p>

    <p>
      Vous pouvez répondre directement à cet e-mail. Nous vous répondrons dans les plus brefs délais.
    </p>

    <p>
      <img src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/cercle_vertueux_3a7bb0fb95.png" style="max-width:300px;"/>
    </p>

    <p>
      Bien à vous,<br/>
      L'équipe "1000 premiers jours - Blues"
    </p>

    <p>
      <a href="https://1000jours.fabrique.social.gouv.fr/" style="text-decoration: none">https://1000jours.fabrique.social.gouv.fr/</a>
    </p>

    ${footerHtml()}`,
});

const contactConfirmed = async ({
  email,
  prenom = "ND",
  typeContact = "ND",
}) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");
  if (!email) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    email,
    prenom,
    typeContact,
  };

  const emailTemplate =
    typeContact === TYPE_CONTACT_EMAIL
      ? emailTemplateForEmail(info)
      : emailTemplateForSMS(info);

  try {
    const res = await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        from: process.env["MAIL_SEND_FROM"],
        replyTo: {
          address: "1000joursblues@fabrique.social.gouv.fr",
          personalName: "Elise des 1000 premiers jours",
        },
        to: email,
      },
      emailTemplate,
      info
    );

    return res && /Ok/.test(res.response);
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
};

module.exports = {
  contactConfirmed,
};
