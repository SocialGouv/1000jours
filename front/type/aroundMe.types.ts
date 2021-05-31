/* eslint-disable @typescript-eslint/naming-convention */

export interface CartographiePoisFromDB {
  id: number;
  cartographie_categorie: string;
  type: string;
  nom: string;
  adresse: string;
  code_postal: number;
  commune: string;
  telephone: string;
  courriel: string;
  site_internet: string;
  position_latitude: number;
  position_longitude: number;
}
