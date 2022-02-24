import { IcomoonIcons } from "../components/baseComponents/icomoon.component";
import type { Thematique } from "../types";

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
    case Thematiques.demarchesEtFormalitesAdm:
      return IcomoonIcons.mentionsLegales;
    case Thematiques.handicapEnfants:
      return IcomoonIcons.bebe;
    case Thematiques.handicapParents:
      return IcomoonIcons.parents;
    case Thematiques.parentalite:
      return IcomoonIcons.parents;
    case Thematiques.prendreSoinDeSonEnfant:
      return IcomoonIcons.calendrier;
    case Thematiques.sante:
      return IcomoonIcons.proSante;
    default:
      return IcomoonIcons.calendrier;
  }
};
