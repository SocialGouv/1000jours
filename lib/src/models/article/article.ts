export interface Article {
  id: number;
  titre: string;
  resume: string;
  texteTitre1: string;
  texte1: string;
  texteTitre2: string;
  texte2: string;
  leSaviezVous: string;
  enbrefTexte1: string;
  enbrefTexte2: string;
  enbrefTexte3: string;
  enbrefIcone1: string;
  enbrefIcone2: string;
  enbrefIcone3: string;
  lienTitre1: string;
  lienTitre2: string;
  lienTitre3: string;
  lienTitre4: string;
  lienUrl1: string;
  lienUrl2: string;
  lienUrl3: string;
  lienUrl4: string;
  visuel?: Visuel;
  thematiques: Thematique[];
  hide?: boolean;
}

export interface Visuel {
  url: string;
  height: number;
  width: number;
}

export interface Thematique {
  id: number;
  nom: string;
}
