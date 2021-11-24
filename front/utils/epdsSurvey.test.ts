import * as EpdsSurveyUtils from "./epdsSurvey.util";

describe("EPDS Survey utils", () => {
  it("Score is less than 11", () => {
    expect(EpdsSurveyUtils.showContactReminder(5)).toBe(false);
  });

  it("Score is 11", () => {
    expect(EpdsSurveyUtils.showContactReminder(11)).toBe(false);
  });

  it("Score is greater than 11", () => {
    expect(EpdsSurveyUtils.showContactReminder(14)).toBe(true);
  });
});
