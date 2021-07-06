/* eslint-disable @typescript-eslint/naming-convention */

import type { AroundMeConstants } from "../constants";

export interface CartographiePoisFromDB {
  id: number;
  categorie: AroundMeConstants.PoiCategorieEnum;
  type: AroundMeConstants.PoiTypeEnum;
  nom: string;
  telephone: string | null;
  courriel: string | null;
  site_internet: string | null;
  adresse: string;
  code_postal: number;
  commune: string;
  position_latitude: number;
  position_longitude: number;
}

export interface PoiTypeFromDB {
  nom: string;
  categorie: string;
}
export interface StepFromDB {
  nom: string;
}

export interface CartoFilter {
  name: string;
  active: boolean;
  filterType: AroundMeConstants.CartoFilterEnum;
}

export interface FetchedFilterFromDb {
  structures: CartoFilter[];
  professionnels: CartoFilter[];
  etapes: CartoFilter[];
}

export interface CartoFilterStorage {
  types: string[];
  etapes: string[];
}
