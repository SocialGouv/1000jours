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

    Je m'appelle Elise, je suis membre de l'association Maman Blues et de l'équipe des 1000 premiers jours.
    Je vous confirme que j'ai bien reçu votre demande.
    Je vous contacterai en respectant les créneaux que vous avez choisis.

    En parler, c'est déjà se soigner.

    Elise des 1000 premiers jours`,
  html: `<p>Bonjour <%- prenom %>,</p>

    <p>
      Je m'appelle Elise, je suis membre de l'association Maman Blues et de l'équipe des 1000 premiers jours.<br/>
      Je vous confirme que j'ai bien reçu votre demande.<br/>
      Je vous contacterai en respectant les créneaux que vous avez choisis.
    </p>

    <p>En parler, c'est déjà se soigner.</p>

    <p>
      <img src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/cercle_vertueux_3a7bb0fb95.png" style="max-width:300px;"/>
    </p>

    Elise des 1000 premiers jours`,
});

const emailTemplateForEmail = (info) => ({
  subject: "1000 premiers jours - Suite à votre questionnaire, échangeons",
  text: `Bonjour <%- prenom %>,

    Je suis Elise, la bénévole de Maman Blues en charge des réponses suite au passage du questionnaire sur la dépression du post-partum.
    Vous avez demandé à être recontactée.

    Souhaiteriez-vous m'en dire plus vous concernant ? Ce que vous vivez, quels sont vos besoins si vous parvenez à les exprimer ? votre lieu de résidence pour vous orienter vers des professionnels et/ou structures adaptées le cas échéant ?

    Je vous laisse me répondre pour pouvoir vous aider au mieux.
    Sachez que vous pouvez me répondre ici mais si vous préférez par sms ou directement à l'oral, c'est tout à fait possible.
    Mon numéro : 06.14.03.57.05

    Bien à vous,
    Elise pour l'équipe "1000 premiers jours"

    https://1000jours.fabrique.social.gouv.fr/
    
    ${footerText}`,
  html: `<p>Bonjour <%- prenom %>,</p>

    <p>
      Je suis Elise, la bénévole de Maman Blues en charge des réponses suite au passage du questionnaire sur la dépression du post-partum.<br/>
      Vous avez demandé à être recontactée.
    </p>

    <p>
      Souhaiteriez-vous m'en dire plus vous concernant ? Ce que vous vivez, quels sont vos besoins si vous parvenez à les exprimer ? votre lieu de résidence pour vous orienter vers des professionnels et/ou structures adaptées le cas échéant ?
    </p>

    <p>
      Je vous laisse me répondre pour pouvoir vous aider au mieux.<br/>
      Sachez que vous pouvez me répondre ici mais si vous préférez par sms ou directement à l'oral, c'est tout à fait possible.<br/>
      Mon numéro : 06.14.03.57.05
    </p>

    <p>
      <img src="https://backoffice-les1000jours.fabrique.social.gouv.fr/uploads/cercle_vertueux_3a7bb0fb95.png" style="max-width:300px;"/>
    </p>

    <p>
      Bien à vous,<br/>
      Elise pour l'équipe "1000 premiers jours"
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
