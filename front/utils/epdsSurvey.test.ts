import * as EpdsSurveyUtils from "./epdsSurvey.util";

describe("EPDS Survey utils", () => {
  it("Score is less than 11 & question 10 score is 0", () => {
    expect(EpdsSurveyUtils.showContactReminder(5, 0)).toBe(false);
  });

  it("Score is less than 11 & question 10 score is 3", () => {
    expect(EpdsSurveyUtils.showContactReminder(5, 3)).toBe(true);
  });

  it("Score is 11 & question 10 score is 0", () => {
    expect(EpdsSurveyUtils.showContactReminder(11, 0)).toBe(false);
  });

  it("Score is greater than 11 & question 10 score is 0", () => {
    expect(EpdsSurveyUtils.showContactReminder(14, 0)).toBe(true);
  });

  it("Score is greater than 11 & question 10 score is 3", () => {
    expect(EpdsSurveyUtils.showContactReminder(14, 3)).toBe(true);
  });
});
