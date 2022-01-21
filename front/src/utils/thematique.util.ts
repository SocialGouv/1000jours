import { IcomoonIcons } from "../components/base/icomoon.component";
import type { Thematique } from "../../types";

// Thematiques en dur pour le moment, à voir si on rajoute un champ au niveau des thématiques pour définir une icone directement depuis le BO.
export enum Thematiques {
  bienEtre = "Bien-être",
  demarchesEtFormalitesAdm = "Démarches et formalités administratives",
  handicapEnfants = "Handicap : enfants",
  handicapParents = "Handicap : parents",
  parentalite = "Parentalité",
  prendreSoinDeSonEnfant = "Prendre soin de son enfant",
  sante = "Santé",
}

export const getThematiqueIcon = (
  thematique: Thematique | undefined
): IcomoonIcons => {
  if (!thematique) return IcomoonIcons.calendrier;

  switch (thematique.nom) {
    case Thematiques.bienEtre:
      return IcomoonIcons.calendrier;
      break;
    case Thematiques.demarchesEtFormalitesAdm:
      return IcomoonIcons.mentionsLegales;
      break;
    case Thematiques.handicapEnfants:
      return IcomoonIcons.bebe;
      break;
    case Thematiques.handicapParents:
      return IcomoonIcons.parents;
      break;
    case Thematiques.parentalite:
      return IcomoonIcons.parents;
      break;
    case Thematiques.prendreSoinDeSonEnfant:
      return IcomoonIcons.calendrier;
      break;
    case Thematiques.sante:
      return IcomoonIcons.proSante;
      break;

    default:
      return IcomoonIcons.calendrier;
      break;
  }
};
