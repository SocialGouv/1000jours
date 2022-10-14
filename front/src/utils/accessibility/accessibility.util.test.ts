import { AccessibilityUtils } from "..";

describe("Accessibility utils", () => {
  describe("getSnackBarDuration", () => {
    it("should return longer duration when accessibility is on", () => {
      expect(AccessibilityUtils.getSnackBarDuration(true)).toEqual(5000);
    });
    it("should return standard duration when accessibility is off", () => {
      expect(AccessibilityUtils.getSnackBarDuration(false)).toEqual(4000);
    });
  });

  describe("getCleanAccessibilityLabel", () => {
    const cleanLabel = "Label de test";
    const dirtyLabel = "Label(s) de test(s)";
    it("should return the same label", () => {
      expect(AccessibilityUtils.getCleanAccessibilityLabel(cleanLabel)).toEqual(
        cleanLabel
      );
    });
    it("should return the label", () => {
      expect(AccessibilityUtils.getCleanAccessibilityLabel(dirtyLabel)).toEqual(
        cleanLabel
      );
    });
  });
});
