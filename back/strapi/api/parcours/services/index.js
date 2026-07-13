"use strict";

const PARCOURS_PROJET = 1;
const PARCOURS_CONCEPTION = 2;
const PARCOURS_GROSSESSE_DEBUT = 3;
const PARCOURS_GROSSESSE_SUITE_FIN = 4;
// à voir si l'accouchement est calculé
// const PARCOURS_ACCOUCHEMENT = 5;
const PARCOURS_ENFANT_3_PREMIERS_MOIS = 6;
const PARCOURS_ENFANT_4_MOIS_1_AN = 7;
const PARCOURS_ENFANT_1_AN_2_ANS = 8;

const getCurrent = async (infos) => {
  if (!infos) {
    throw new Error("missing informations");
  }

  const {
    projet,
    conception,
    grossesse,
    enfant,
    enfants,
    date: dateString,
  } = infos;

  let id = null;

  if (grossesse || enfant || enfants) {
    if (!dateString) {
      throw new Error("missing date");
    }

    const date = new Date(dateString);

    if (date.toString() === "Invalid Date") {
      throw new Error("invalide date");
    }

    id = grossesse ? calcGrossesse(date) : calcEnfant(date);
  } else if (projet) {
    id = PARCOURS_PROJET;
  }
  if (conception) {
    id = PARCOURS_CONCEPTION;
  }

  return id ? strapi.query("parcours").findOne({ id }) : null;
};

module.exports = { getCurrent };
