import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import * as React from "react";

import IcomoonConfig from "../assets/icomoon/selection.json";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export enum IcomoonIcons {
  calendrier = "calendrier",
  dent = "dent",
  favoris = "favoris",
  menu = "menu",
  fermer = "fermer",
  retour = "retour",
  suivant = "suivant",
  autourDeMoi = "autour-de-moi",
  biberon = "biberon",
  bebe = "bebe",
  ajouter = "ajouter",
  actualiser = "actualiser",
  accueil = "accueil",
  notification = "notification",
  position = "position",
  modifier = "modifier",
  filtrer = "filtrer",
  recherche = "recherche",
  informations = "informations",
  profil = "profil",
  parents = "parents",
  entourage = "entourage",
  mentionsLegales = "mentions-legales",
  glossaire = "glossaire",
  stepProjetParent = "step-projet-parent",
  stepConception = "step-conception",
  stepDebutDeGrossesse = "step-debut-de-grossesse",
  stepFinDeGrossesse = "step-fin-de-grossesse",
  stepAccouchement = "step-accouchement",
  step4PremiersMois = "step-4-premiers-mois",
  step4MoisA1An = "step-4-mois-a-1-an",
  step1A2Ans = "step-1-a-2-ans",
}

const Icomoon: React.FC<Props> = ({ name, size, color }) => {
  const Icon = createIconSetFromIcoMoon(
    IcomoonConfig,
    "IcoMoon",
    "icomoon.ttf"
  );
  return <Icon name={name} size={size} color={color} />;
};

export default Icomoon;
