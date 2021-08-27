/* eslint-disable @typescript-eslint/naming-convention */

import type { AroundMeConstants } from "../constants";

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
