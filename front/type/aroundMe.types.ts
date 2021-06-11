/* eslint-disable @typescript-eslint/naming-convention */

import type { AroundMeConstants } from "../constants";

export interface CartographiePoisFromDB {
  id: number;
  categorie: AroundMeConstants.PoiCategorieEnum;
  type: AroundMeConstants.PoiTypeEnum;
  nom: string | null;
  telephone: string | null;
  courriel: string | null;
  site_internet: string | null;
  adresse: string;
  code_postal: number;
  commune: string;
  position_latitude: number;
  position_longitude: number;
}
