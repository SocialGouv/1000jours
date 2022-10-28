import type { LatLng } from "react-native-maps";

import { AroundMeUtils } from "..";
import { searchRegionByPostalCode } from "./search.util";

describe("Search Util", () => {
  describe("searchRegionByPostalCode", () => {
    let mockGetPostalCodeCoords: any = undefined;
    const mockData: LatLng = { latitude: 47.220676, longitude: -1.563173 };

    beforeAll(() => {
      mockGetPostalCodeCoords = jest
        .spyOn(AroundMeUtils, "getPostalCodeCoords")
        .mockResolvedValue(mockData);
    });

    it("should return lat/long by postal code", async () => {
      const result = await searchRegionByPostalCode("44000");
      expect(result).toEqual(mockData);

      mockGetPostalCodeCoords.mockRestore();
    });

    it("should return error for invavalid postal code (too short)", async () => {
      const result = await searchRegionByPostalCode("440");
      expect(result).toEqual(undefined);

      mockGetPostalCodeCoords.mockRestore();
    });

    it("should return error for invavalid postal code (not a number)", async () => {
      const result = await searchRegionByPostalCode("hello");
      expect(result).toEqual(undefined);

      mockGetPostalCodeCoords.mockRestore();
    });
  });
});
