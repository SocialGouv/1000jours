import type { UserInfos, UserSituation } from "../types";
import Labels from "./Labels";

export const GROSSESSE_TRIMESTRE_2_SEMAINES_SA = 16;
export const GROSSESSE_TOTAL_SEMAINES_SA = 41;

export enum StepId {
  projet = 1,
  conception = 2,
  grossesseDebut = 3,
  grossesseSuiteFin = 4,
  // à voir si l'accouchement est calculé
  // accouchement = 5,
  enfant3PremiersMois = 6,
  enfant4Mois1An = 7,
  enfant1An2Ans = 8,
  nonConcerne = 9,
}

export enum UserInfo {
  projet = "projet",
  conception = "conception",
  grossesse = "grossesse",
  enfant = "enfant",
  enfants = "enfants",
  nonConcerne = "nonConcerné",
}

export const DEFAULT_USER_INFOS: UserInfos = {
  conception: false,
  date: null,
  enfant: false,
  enfants: false,
  grossesse: false,
  nonConcerne: false,
  projet: false,
};

export const USER_SITUATIONS: UserSituation[] = [
  {
    childBirthdayLabel: "",
    childBirthdayRequired: false,
    id: UserInfo.projet,
    isChecked: false,
    label: Labels.profile.situations.project,
  },
  {
    childBirthdayLabel: "",
    childBirthdayRequired: false,
    id: UserInfo.conception,
    isChecked: false,
    label: Labels.profile.situations.search,
  },
  {
    childBirthdayLabel: Labels.profile.childBirthday.planned,
    childBirthdayRequired: true,
    id: UserInfo.grossesse,
    isChecked: false,
    label: Labels.profile.situations.pregnant,
  },
  {
    childBirthdayLabel: Labels.profile.childBirthday.firstChild,
    childBirthdayRequired: true,
    id: UserInfo.enfant,
    isChecked: false,
    label: Labels.profile.situations.oneChild,
  },
  {
    childBirthdayLabel: Labels.profile.childBirthday.lastChild,
    childBirthdayRequired: true,
    id: UserInfo.enfants,
    isChecked: false,
    label: Labels.profile.situations.severalChildren,
  },
  {
    childBirthdayLabel: "",
    childBirthdayRequired: false,
    id: "nonConcerné",
    isChecked: false,
    label: Labels.profile.situations.notConcerned,
  },
];
