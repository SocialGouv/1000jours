/* eslint-disable @typescript-eslint/naming-convention */
import type { AroundMeConstants } from "../constants";

export interface AddressDetailsType {
  professionalName: string;
  postalAddress: string;
  phoneNumber: string;
  emailAddress: string;
  website: string;
  accessibilityInfo: string;
  poiType: AroundMeConstants.PoiTypeEnum;
}

export interface CartographiePoisFromDB {
  id: number;
  cartographie_categorie: string;
  type: string;
  nom: string;
  telephone: string;
  courriel: string;
  site_internet: string;
  geocode_adresse: string;
  geocode_code_postal: number;
  geocode_commune: string;
  geocode_position_latitude: number;
  geocode_position_longitude: number;
}
