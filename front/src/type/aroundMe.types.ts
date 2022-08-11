import type { AroundMeConstants } from "../constants";

export interface CartoFilter {
  name: string;
  active: boolean;
  filterType: AroundMeConstants.CartoFilterEnum;
}

export interface FetchedFilterFromDb {
  structures: CartoFilter[];
  professionnels: CartoFilter[];
}

export interface CartoFilterStorage {
  types: string[];
}
