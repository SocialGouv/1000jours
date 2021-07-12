//Pour l'instant on affiche la zone de Paris par défaut (si pas de code postal ni géoloc activée), on verra pour la suite
export const COORDINATE_PARIS = {
  latitude: 48.85253057447118,
  longitude: 2.342685107141733,
};

export const DEFAULT_LATITUDE_DELTA = 0.2;
export const DEFAULT_LONGITUDE_DELTA = 0.2;

export const INITIAL_REGION = {
  latitude: COORDINATE_PARIS.latitude,
  latitudeDelta: DEFAULT_LATITUDE_DELTA,
  longitude: COORDINATE_PARIS.longitude,
  longitudeDelta: DEFAULT_LONGITUDE_DELTA,
};

export const POSTAL_CODE_MAX_LENGTH = 5;
export const PAGINATION_NUMBER_ADDRESSES_LIST = 20;
export const MAX_NUMBER_POI_WITHOUT_FILTER = 50;

export const getApiUrlWithParam = (postalCode: string): string =>
  `https://api-adresse.data.gouv.fr/search/?q=${postalCode}&type=municipality&limit=1`;

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

export const MAPVIEW_MIN_ZOOM_LEVEL = 10;
