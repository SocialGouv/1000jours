import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { LatLng, Region } from "react-native-maps";

import { AroundMeConstants } from "../constants";

export default class SharedCartoData {
  static instance: SharedCartoData | null = null;

  _fetchedPois: Poi[] = [];

  _region: Region = AroundMeConstants.INITIAL_REGION;

  _selectedPoiIndex = -1;

  _userLocation: LatLng = { latitude: -1, longitude: -1 };

  static get inst(): SharedCartoData {
    if (SharedCartoData.instance === null) {
      SharedCartoData.instance = new SharedCartoData();
    }
    return SharedCartoData.instance;
  }

  static get fetchedPois(): Poi[] {
    return SharedCartoData.inst._fetchedPois;
  }

  static set fetchedPois(fetchedPois: Poi[]) {
    SharedCartoData.inst._fetchedPois = fetchedPois;
  }

  static get region(): Region {
    return SharedCartoData.inst._region;
  }

  static set region(region: Region) {
    SharedCartoData.inst._region = region;
  }

  static get selectedPoiIndex(): number {
    return SharedCartoData.inst._selectedPoiIndex;
  }

  static set selectedPoiIndex(selectedPoiIndex: number) {
    SharedCartoData.inst._selectedPoiIndex = selectedPoiIndex;
  }

  static get userLocation(): LatLng {
    return SharedCartoData.inst._userLocation;
  }

  static set userLocation(userLocation: LatLng) {
    SharedCartoData.inst._userLocation = userLocation;
  }
}
