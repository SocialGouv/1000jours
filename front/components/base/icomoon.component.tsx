import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import * as React from "react";

import IcomoonConfig from "../../assets/icomoon/selection.json";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export enum IcomoonIcons {
  partager = "partager",
  synchroniser = "synchroniser",
  commenter = "commenter",
  mairie = "mairie",
  email = "email",
  aide = "aide",
  droit = "droit",
  structuresAccueil = "structures-accueil",
  planningFamilial = "planning-f",
  delaisCalendrier = "delais-calendrier",
  maisonNaissance = "maison-naissance",
  maternite = "maternite",
  calendrier = "calendrier",
  calendrierActive = "calendrier-active",
  dent = "dent",
  favoris = "favoris",
  menu = "menu",
  fermer = "fermer",
  retour = "retour",
  haut = "haut",
  bas = "bas",
  precedent = "precedent",
  suivant = "suivant",
  autourDeMoi = "autour-de-moi",
  autourDeMoiActive = "autour-de-moi-active",
  biberon = "biberon",
  bebe = "bebe",
  ajouter = "ajouter",
  actualiser = "actualiser",
  accueil = "accueil",
  accueilActive = "accueil-active",
  notification = "notification",
  position = "position",
  telephone = "telephone",
  point = "point",
  postPartum = "post-partum",
  postPartumActive = "post-partum-active",
  proSante = "pro-sante",
  modifier = "modifier",
  filtrer = "filtrer",
  recherche = "recherche",
  informations = "informations",
  profil = "profil",
  parents = "parents",
  entourage = "entourage",
  exporter = "exporter",
  radioChecked = "radio-checked",
  radioUnchecked = "radio-unchecked",
  mentionsLegales = "mentions-legales",
  politiquesConfidentialite = "politiques-confidentialite",
  glossaire = "glossaire",
  stepParentheque = "step-parentheque",
  stepProjetParent = "step-projet-parent",
  stepConception = "step-conception",
  stepDebutDeGrossesse = "step-debut-de-grossesse",
  stepFinDeGrossesse = "step-fin-de-grossesse",
  stepAccouchement = "step-accouchement",
  step4PremiersMois = "step-4-premiers-mois",
  step4MoisA1An = "step-4-mois-a-1-an",
  step1A2Ans = "step-1-a-2-ans",
  stepProjetParentActive = "step-projet-parent-active",
  stepConceptionActive = "step-conception-active",
  stepDebutDeGrossesseActive = "step-debut-de-grossesse-active",
  stepFinDeGrossesseActive = "step-fin-de-grossesse-active",
  stepAccouchementActive = "step-accouchement-active",
  step4PremiersMoisActive = "step-4-premiers-mois-active",
  step4MoisA1AnActive = "step-4-mois-a-1-an-active",
  step1A2AnsActive = "step-1-a-2-ans-active",
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
