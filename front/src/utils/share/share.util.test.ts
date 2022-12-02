import { ShareUtils } from "..";

describe("Share utils", () => {
  const title = "Test title";
  const message = "Test message";
  const url = "https://testurl.com";

  describe("buildShareContent", () => {
    it("should return share content with message and url concatenation when url is defined on Android", () => {
      const expectedMessage = `${message} ${url}`;
      const expectedResult = { message: expectedMessage, title, url };
      const isAndroid = true;
      expect(
        ShareUtils.buildShareContent(isAndroid, title, message, url)
      ).toEqual(expectedResult);
    });

    it("should return share content with simple message on Android", () => {
      const expectedResult = { message, title };
      const isAndroid = true;
      expect(ShareUtils.buildShareContent(isAndroid, title, message)).toEqual(
        expectedResult
      );
    });

    it("should return share content with simple message and url when url is defined on iOS", () => {
      const expectedResult = { message, title, url };
      const isAndroid = false;
      expect(
        ShareUtils.buildShareContent(isAndroid, title, message, url)
      ).toEqual(expectedResult);
    });

    it("should return share content with simple message on iOS", () => {
      const expectedResult = { message, title };
      const isAndroid = false;
      expect(ShareUtils.buildShareContent(isAndroid, title, message)).toEqual(
        expectedResult
      );
    });
  });
});
