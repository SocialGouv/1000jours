/* eslint-disable @typescript-eslint/naming-convention */
import type { PoiCategorieEnum, PoiTypeEnum } from "./constants";

export interface Poi {
  id: number;
  categorie: PoiCategorieEnum;
  type: PoiTypeEnum;
  nom: string;
  telephone?: string;
  courriel?: string;
  site_internet?: string;
  adresse: string;
  code_postal: number;
  commune: string;
  position_latitude: number;
  position_longitude: number;
}
export interface PoisCount {
  count: number;
}

export interface PoiType {
  nom: string;
  categorie: string;
}
export interface Step {
  nom: string;
}
