import * as StringUtils from "./strings.util";

describe("Strings utils", () => {
  describe("replaceAllText", () => {
    it("should replace searched text with new text", () => {
      const originalString = "The original string";
      const searchedPattern = "original";
      const replacingString = "replaced";
      expect(
        StringUtils.replaceAllText(
          originalString,
          searchedPattern,
          replacingString
        )
      ).toBe("The replaced string");
    });
  });

  describe("removeListHyphens", () => {
    it("should return empty string when string is undefined", () => {
      expect(StringUtils.removeListHyphens(undefined)).toBe("");
    });
    it("should remove hyphen after a line break", () => {
      expect(StringUtils.removeListHyphens("There is a \n- hyphen")).toBe(
        "There is a \n hyphen"
      );
    });
    it("should remove hyphen at the beginning of a line", () => {
      expect(StringUtils.removeListHyphens("-it starts with a hyphen")).toBe(
        "it starts with a hyphen"
      );
    });
  });

  describe("isNotNullNorEmpty", () => {
    it("should return false when string is null", () => {
      expect(StringUtils.isNotNullNorEmpty(undefined)).toBe(false);
    });
    it("should return false when string is empty", () => {
      expect(StringUtils.isNotNullNorEmpty("")).toBe(false);
    });
    it("should return true when string is not null nor empty", () => {
      expect(StringUtils.isNotNullNorEmpty("Simple String")).toBe(true);
    });
  });

  describe("isStringArrayNullOrEmpty", () => {
    it("should return true when array is null", () => {
      expect(StringUtils.isStringArrayNullOrEmpty(undefined)).toBe(true);
    });
    it("should return true when array is empty", () => {
      expect(StringUtils.isStringArrayNullOrEmpty([])).toBe(true);
    });
    it("should return false when array is not null nor empty", () => {
      expect(StringUtils.isStringArrayNullOrEmpty(["Simple string"])).toBe(
        false
      );
    });
  });

  describe("areArraysTheSameInContentAndLength", () => {
    it("should return false when arrays have same length but different content", () => {
      const firstArray = ["Car", "Boat", "Bus", "Plane"];
      const secondArray = ["A", "B", "C", "D"];
      expect(
        StringUtils.areArraysTheSameInContentAndLength(firstArray, secondArray)
      ).toBe(false);
    });
    it("should return false when arrays have different length", () => {
      const firstArray = ["Car", "Boat", "Bus", "Plane"];
      const secondArray = ["A", "B"];
      expect(
        StringUtils.areArraysTheSameInContentAndLength(firstArray, secondArray)
      ).toBe(false);
    });
    it("should return true when arrays have same length and content", () => {
      const firstArray = ["Car", "Boat", "Bus", "Plane"];
      const secondArray = ["Car", "Bus", "Plane", "Boat"];
      expect(
        StringUtils.areArraysTheSameInContentAndLength(firstArray, secondArray)
      ).toBe(true);
    });
  });

  describe("isValidEmail", () => {
    it("should return true when email is valid", () => {
      expect(StringUtils.isValidEmail("user@toto.fr")).toBe(true);
    });
    it("should return false when email is invalid", () => {
      expect(StringUtils.isValidEmail("user@toto")).toBe(false);
    });
  });

  describe("isValidFrenchPhoneNumber", () => {
    it("should return false when phone number is not French", () => {
      expect(StringUtils.isValidFrenchPhoneNumber("+349090909")).toBe(false);
    });
    it("should return false when phone number is not a valid phone number", () => {
      expect(StringUtils.isValidFrenchPhoneNumber("5456a4")).toBe(false);
    });
    it("should return true when phone number is a valid French phone number", () => {
      expect(StringUtils.isValidFrenchPhoneNumber("0123456789")).toBe(true);
    });
  });

  describe("formatPhoneNumber", () => {
    it("should format French phone number when it has 10 digits", () => {
      expect(StringUtils.formatPhoneNumber("0123456789")).toEqual(
        "01 23 45 67 89"
      );
    });
    it("should format French phone number when it starts with +33", () => {
      expect(StringUtils.formatPhoneNumber("+33123456789")).toEqual(
        "+33 1 23 45 67 89"
      );
    });
    it("should format French phone number when it starts with 0033", () => {
      expect(StringUtils.formatPhoneNumber("0033123456789")).toEqual(
        "+33 1 23 45 67 89"
      );
    });
  });
});
