"use strict";

const emailTemplate = (info) => ({
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

const contactConfirmed = async ({ email, prenom = "ND" }) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");
  if (!email) throw new Error("Au moins une adresse email est nécessaire");

  const info = {
    email,
    prenom,
  };

  try {
    const res = await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        from: process.env["MAIL_SEND_FROM"],
        to: email,
      },
      emailTemplate(info),
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
