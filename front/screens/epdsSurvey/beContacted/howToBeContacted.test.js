import HowToBeContacted from "./howToBeContacted.component";

describe("Strings utils", () => {
  it("String is not null or empty", () => {
    const emptyString = "";
    const nullString = undefined;
    const simpleString = "Simple string";

    HowToBeContacted.sh
    expect(StringUtils.stringIsNotNullNorEmpty(emptyString)).toBe(false);
  });
})