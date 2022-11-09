import { deg2rad, rad2deg } from "./number.util";

describe("Number utils", () => {
  describe("deg2rad", () => {
    it("Shoudl return radian", () => {
      const deg = 180;
      const expected = (deg / 180) * Math.PI;
      expect(deg2rad(deg)).toEqual(expected);
    });
  });

  describe("rad2deg", () => {
    it("Shoudl return degree", () => {
      const rad = 3;
      const expected = (rad / Math.PI) * 180;
      expect(rad2deg(rad)).toEqual(expected);
    });
  });
});
