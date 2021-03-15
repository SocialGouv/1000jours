"use strict";

type Informations = {
  projet: boolean,
  conception: boolean,
  grossesse: boolean,
  enfant: boolean,
  enfants: boolean,
  date: Date,
}

type Context = {
  badRequest: (message: string) => void,
  request: {
    body: {
      input: {
        infos: Informations
      }
    }
  }
}

import {
  isBefore,
  isAfter,
  addWeeks,
  subWeeks,
  addMonths,
  addYears,
} from "date-fns";

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

const calcGrossesse = (ctx: Context, terme: Date): number | void => {
  const now = new Date();

  const grossesseDebut = subWeeks(terme, GROSSESSE_TOTAL_SEMAINES_SA);

  if (isBefore(now, grossesseDebut)) {
    return ctx.badRequest("terme is too much in the future");
  } else if (isBefore(terme, now)) {
    return ctx.badRequest("terme is in the past");
  }

  const trimestre2 = addWeeks(
    grossesseDebut,
    GROSSESSE_TRIMESTRE_2_SEMAINES_SA
  );

  return isBefore(now, trimestre2)
    ? ETAPE_GROSSESSE_DEBUT
    : ETAPE_GROSSESSE_SUITE_FIN;
};

const calcEnfant = (ctx: Context, naissance: Date): number | void => {
  const now = new Date();

  if (isBefore(now, naissance)) {
    return ctx.badRequest("naissance is in the future");
  }

  if (isAfter(now, addYears(naissance, 2))) {
    return ctx.badRequest("enfant > 2 ans");
  }

  if (isAfter(now, addYears(naissance, 1))) {
    return ETAPE_ENFANT_1_AN_2_ANS;
  }
  if (isAfter(now, addMonths(naissance, 3))) {
    return ETAPE_ENFANT_4_MOIS_1_AN;
  }
  return ETAPE_ENFANT_3_PREMIERS_MOIS;
};

const getCurrent = async (ctx: Context) => {
  if (!ctx.request.body?.input?.infos) {
    return ctx.badRequest("missing informations");
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
      return ctx.badRequest("missing date");
    }

    const date = new Date(dateString);

    if (date.toString() === "Invalid Date") {
      return ctx.badRequest("invalid date");
    }

    const id = grossesse ? calcGrossesse(ctx, date) : calcEnfant(ctx, date);
    if (!id) return null

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

export { getCurrent };
