//Pour l'instant on affiche la zone de Paris par défaut (si pas de code postal ni géoloc activée), on verra pour la suite
export const COORDINATE_PARIS = {
  latitude: 48.85253057447118,
  longitude: 2.342685107141733,
};

export const POPULATION_STEP_TWO_MILLION = 2000000;
export const POPULATION_STEP_EIGHT_HUNDRED_THOUSAND = 800000;
export const POPULATION_STEP_THREE_HUNDRED_THOUSAND = 300000;

export const ZOOM_HIGH = 14;
export const ZOOM_MIDDLE = 13;
export const ZOOM_LOW = 12;
export const ZOOM_DEFAULT = 12;

export const ALTITUDE_HIGH = 14000;
export const ALTITUDE_MIDDLE = 18000;
export const ALTITUDE_LOW = 20000;
export const ALTITUDE_DEFAULT = 20000;

export const INITIAL_COORDINATES = {
  latitude: COORDINATE_PARIS.latitude,
  longitude: COORDINATE_PARIS.longitude,
};

export const POSTAL_CODE_MAX_LENGTH = 5;
export const PAGINATION_NUMBER_ADDRESSES_LIST = 20;
export const MAX_NUMBER_POI_WITHOUT_FILTER = 20;

export const getApiUrlWithParam = (postalCode: string): string =>
  `https://api-adresse.data.gouv.fr/search/?q=${postalCode}&type=municipality&limit=1`;

export const getApiGouvUrlForPopulation = (
  lat: number,
  long: number
): string => `https://geo.api.gouv.fr/communes?lat=${lat}&lon=${long}&fields=&format=json&geometry=centre
`;

export enum LatLngPointType {
  topLeft = "topLeft",
  bottomRight = "bottomRight",
  center = "center",
}

export const SNACKBAR_DURATION = 3000;

export enum PoiCategorieEnum {
  structure = "structure",
  professionnel = "professionnel",
}

export enum PoiTypeEnum {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  planning_familial = "planning_familial",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  maison_de_naissance = "maison_de_naissance",
  maternite = "maternite",
  pmi = "pmi", // pas d'icône
  saad = "saad",
  cpam = "cpam", // pas d'icône
  caf = "caf", // pas d'icône
  mairie = "mairie", // pas d'icône
}

export enum CartoFilterEnum {
  type = "type",
  etape = "etape",
}

export const MAPVIEW_MIN_ZOOM_LEVEL = 11;
export const ANIMATE_CAMERA_DURATION = 500;

export const ERROR_LOCATION_PROVIDER_UNAVAILABLE_MESSAGE =
  "Location provider is unavailable. Make sure that location services are enabled.";

export const GET_POSITION_MAX_ATTEMPTS = 100;

// TODO: Delete after carto refacto
export const DEFAULT_DELTA = 0.1;
export const DELTA_HIGH = 0.01;
export const DELTA_MIDDLE = 0.02;
export const DELTA_LOW = 0.03;

export const INITIAL_REGION = {
  latitude: COORDINATE_PARIS.latitude,
  latitudeDelta: DEFAULT_DELTA,
  longitude: COORDINATE_PARIS.longitude,
  longitudeDelta: DEFAULT_DELTA,
};
