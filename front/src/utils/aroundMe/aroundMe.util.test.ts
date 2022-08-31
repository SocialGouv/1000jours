import type { LatLng, Region } from "react-native-maps";

import { AroundMeConstants } from "../../constants";
import { getLatLngPoint } from "./aroundMe.util";

describe("AroundMeUtils", () => {
  describe("getLatLngPoint", () => {
    const regionNantes: Region = {
      latitude: 47.223324097274556,
      latitudeDelta: 0.13430321917147126,
      longitude: -1.538015529513359,
      longitudeDelta: 0.13483263552188873,
    };

    it("Should return center point of a given region", () => {
      const expected: LatLng = {
        latitude: 47.223324097274556,
        longitude: -1.538015529513359,
      };

      expect(
        getLatLngPoint(regionNantes, AroundMeConstants.LatLngPointType.center)
      ).toEqual(expected);
    });

    it("Should return top left point of a given region", () => {
      const newLatitude: number =
        regionNantes.latitude + regionNantes.latitudeDelta / 2;
      const newLongitude: number =
        regionNantes.longitude - regionNantes.longitudeDelta / 2;
      const expected: LatLng = {
        latitude: newLatitude,
        longitude: newLongitude,
      };

      expect(
        getLatLngPoint(regionNantes, AroundMeConstants.LatLngPointType.topLeft)
      ).toEqual(expected);
    });

    it("Should return bottom right point of a given region", () => {
      const newLatitude: number =
        regionNantes.latitude - regionNantes.latitudeDelta / 2;
      const newLongitude: number =
        regionNantes.longitude + regionNantes.longitudeDelta / 2;
      const expected: LatLng = {
        latitude: newLatitude,
        longitude: newLongitude,
      };

      expect(
        getLatLngPoint(
          regionNantes,
          AroundMeConstants.LatLngPointType.bottomRight
        )
      ).toEqual(expected);
    });
  });
});
