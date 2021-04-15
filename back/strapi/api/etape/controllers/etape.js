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

const calcGrossesse = (ctx, terme) => {
  const now = new Date();

  const grossesseDebut = subWeeks(terme, GROSSESSE_TOTAL_SEMAINES_SA);

  if (isBefore(now, grossesseDebut)) {
    ctx.badRequest("terme is too much in the future");
    return;
  } else if (isBefore(terme, now)) {
    ctx.badRequest("terme is in the past");
    return;
  }

  const trimestre2 = addWeeks(
    grossesseDebut,
    GROSSESSE_TRIMESTRE_2_SEMAINES_SA
  );

  return isBefore(now, trimestre2)
    ? ETAPE_GROSSESSE_DEBUT
    : ETAPE_GROSSESSE_SUITE_FIN;
};

const calcEnfant = (ctx, naissance) => {
  const now = new Date();

  if (isBefore(now, naissance)) {
    ctx.badRequest("naissance is in the future");
    return;
  }

  if (isAfter(now, addYears(naissance, 2))) {
    ctx.badRequest("enfant > 2 ans");
    return;
  }

  if (isAfter(now, addYears(naissance, 1))) {
    return ETAPE_ENFANT_1_AN_2_ANS;
  }
  if (isAfter(now, addMonths(naissance, 3))) {
    return ETAPE_ENFANT_4_MOIS_1_AN;
  }
  return ETAPE_ENFANT_3_PREMIERS_MOIS;
};

const getCurrent = async (ctx) => {
  if (!ctx.request.body.input.infos) {
    ctx.badRequest("missing informations");
    return;
  }

  const {
    projet,
    conception,
    grossesse,
    enfant,
    enfants,
    date: dateString,
  } = ctx.request.body.input.infos;

  if (grossesse || enfant || enfants) {
    if (!dateString) {
      ctx.badRequest("missing date");
      return;
    }

    const date = new Date(dateString);

    if (date.toString() === "Invalid Date") {
      ctx.badRequest("invalid date");
      return;
    }

    const id = grossesse ? calcGrossesse(ctx, date) : calcEnfant(ctx, date);
    if (!id) return null;

    return { date, id };
  }
  if (projet) {
    return { id: ETAPE_PROJET };
  }
  if (conception) {
    return { id: ETAPE_CONCEPTION };
  }

  return { id: null };
};

module.exports = { getCurrent };
