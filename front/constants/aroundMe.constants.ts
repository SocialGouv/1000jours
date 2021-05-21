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

export const getApiUrlWithParam = (postalCode: string): string =>
  `https://api-adresse.data.gouv.fr/search/?q=${postalCode}&limit=1`;
