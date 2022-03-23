import * as StringUtils from "./strings.util";

describe("Strings utils", () => {
  it("String is not null or empty", () => {
    const emptyString = "";
    const nullString = undefined;
    const simpleString = "Simple string";
    expect(StringUtils.stringIsNotNullNorEmpty(emptyString)).toBe(false);
    expect(StringUtils.stringIsNotNullNorEmpty(nullString)).toBe(false);
    expect(StringUtils.stringIsNotNullNorEmpty(simpleString)).toBe(true);
  });

  it("String array is null or empty", () => {
    const emptyStringArray = null;
    const nullStringArray = undefined;
    const simpleStringArray = ["Simple string"];
    expect(StringUtils.stringArrayIsNullOrEmpty(emptyStringArray)).toBe(true);
    expect(StringUtils.stringArrayIsNullOrEmpty(nullStringArray)).toBe(true);
    expect(StringUtils.stringArrayIsNullOrEmpty(simpleStringArray)).toBe(false);
  });

  it("Arrays have same or different length and contain same or different values", () => {
    const firstArray = ["Car", "Boat", "Bus", "Plane"];
    const secondArray = ["Car", "Plane", "Bus", "Boat"];
    const thirdArray = ["Car", "Boat"];
    const fourthArray = ["A", "B", "C", "D"];
    expect(
      StringUtils.arraysHaveSameLengthAndContainSameValues(
        firstArray,
        secondArray
      )
    ).toBe(true); //Same length and same values as firstArray
    expect(
      StringUtils.arraysHaveSameLengthAndContainSameValues(
        firstArray,
        thirdArray
      )
    ).toBe(false); // Different length
    expect(
      StringUtils.arraysHaveSameLengthAndContainSameValues(
        firstArray,
        fourthArray
      )
    ).toBe(false); // Same length but different values
  });

  it(`Email is valid or invalid`, () => {
    const validEmail = "user@toto.fr";
    const invalidEmail = "user@toto";
    expect(StringUtils.validateEmail(validEmail)).toBe(true);
    expect(StringUtils.validateEmail(invalidEmail)).toBe(false);
  });

  it(`French phone number is valid or invalid`, () => {
    const validFrenchPhoneNumber = "0123456789";
    const invalidFrenchPhoneNumber = "5456a4";
    expect(StringUtils.validateFrenchPhoneNumber(validFrenchPhoneNumber)).toBe(
      true
    );
    expect(
      StringUtils.validateFrenchPhoneNumber(invalidFrenchPhoneNumber)
    ).toBe(false);
  });
});
