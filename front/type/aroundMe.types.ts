/* eslint-disable @typescript-eslint/naming-convention */

export interface CartographiePoisFromDB {
  id: number;
  cartographie_categorie: string;
  type: string;
  nom: string | null;
  telephone: string | null;
  courriel: string | null;
  site_internet: string | null;
  geocode_adresse: string;
  geocode_code_postal: number;
  geocode_commune: string;
  geocode_position_latitude: number;
  geocode_position_longitude: number;
}
