"use strict";

const {
  addMonths,
  addWeeks,
  addYears,
  isAfter,
  isBefore,
  subWeeks,
} = require("date-fns");

const ETAPE_PROJET = 1;
const ETAPE_CONCEPTION = 2;
const ETAPE_GROSSESSE_DEBUT = 3;
const ETAPE_GROSSESSE_SUITE_FIN = 4;
// à voir si l'accouchement est calculé
// const ETAPE_ACCOUCHEMENT = 5;
const ETAPE_ENFANT_3_PREMIERS_MOIS = 6;
const ETAPE_ENFANT_4_MOIS_1_AN = 7;
const ETAPE_ENFANT_1_AN_2_ANS = 8;

const GROSSESSE_TRIMESTRE_2_SEMAINES_SA = 16;
const GROSSESSE_TOTAL_SEMAINES_SA = 41;

const calcGrossesse = (terme) => {
  const now = new Date();

  const grossesseDebut = subWeeks(terme, GROSSESSE_TOTAL_SEMAINES_SA);

  if (isBefore(now, grossesseDebut)) {
    throw new Error("La date du terme est trop dans le futur");
  } else if (isBefore(terme, now)) {
    throw new Error("La date du terme ne peut être dans le passé");
  }

  const trimestre2 = addWeeks(
    grossesseDebut,
    GROSSESSE_TRIMESTRE_2_SEMAINES_SA
  );

  return isBefore(now, trimestre2)
    ? ETAPE_GROSSESSE_DEBUT
    : ETAPE_GROSSESSE_SUITE_FIN;
};

const calcEnfant = (naissance) => {
  const now = new Date();

  if (isBefore(now, naissance)) {
    throw new Error(
      "La date de naissance de l'enfant ne peut être dans le futur"
    );
  }

  if (isAfter(now, addYears(naissance, 2))) {
    throw new Error("L'enfant est agé(e) de plus de 2 ans");
  }

  if (isAfter(now, addYears(naissance, 1))) {
    return ETAPE_ENFANT_1_AN_2_ANS;
  }
  if (isAfter(now, addMonths(naissance, 3))) {
    return ETAPE_ENFANT_4_MOIS_1_AN;
  }
  return ETAPE_ENFANT_3_PREMIERS_MOIS;
};

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

  let id = null

  if (grossesse || enfant || enfants) {
    if (!dateString) {
      throw new Error("Date obligatoire");
    }

    const date = new Date(dateString);

    if (date.toString() === "Invalid Date") {
      throw new Error("Date invalide");
    }

    id = grossesse ? calcGrossesse(date) : calcEnfant(date);
  } else if (projet) {
    id = ETAPE_PROJET;
  }
  if (conception) {
    id = ETAPE_CONCEPTION;
  }

  return id ? strapi.query("etape").findOne({ id }) : null;
};

module.exports = { getCurrent };
