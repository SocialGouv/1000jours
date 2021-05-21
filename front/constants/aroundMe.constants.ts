//Pour l'instant on affiche la zone de Paris par défaut (si pas de code postal ni géoloc activée), on verra pour la suite
export const COORDINATE_PARIS = {
  latitude: 48.85253057447118,
  longitude: 2.342685107141733,
};

export const INITIAL_REGION = {
  latitude: COORDINATE_PARIS.latitude,
  latitudeDelta: 0.20964114339699336,
  longitude: COORDINATE_PARIS.longitude,
  longitudeDelta: 0.21492373198270798,
};

export const POSTAL_CODE_MAX_LENGTH = 5;
