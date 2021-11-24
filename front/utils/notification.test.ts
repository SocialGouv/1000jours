import * as NotificationUtils from "./notification.util";

describe("Notification utils", () => {
  it("1 day in millis", () => {
    expect(NotificationUtils.convertDayInMillis(1)).toEqual(86400000);
  });

  it("1 day in seconds", () => {
    expect(NotificationUtils.convertDayInSeconds(1)).toEqual(86400);
  });
});
