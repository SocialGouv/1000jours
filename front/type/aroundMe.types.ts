/* eslint-disable @typescript-eslint/naming-convention */

export interface CartographiePoisFromDB {
  id: number;
  cartographie_categorie: string;
  type: string;
  nom: string;
  geocode_adresse: string;
  geocode_code_postal: number;
  geocode_commune: string;
  telephone: string;
  courriel: string;
  site_internet: string;
  geocode_position_latitude: number;
  geocode_position_longitude: number;
}
