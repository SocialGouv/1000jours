import { ShareUtils } from "..";

describe("Share utils", () => {
  const title = "Test title";
  const message = "Test message";
  const url = "https://testurl.com";

  describe("buildShareContent", () => {
    it("buildShareContent is called with url on Android", () => {
      const expectdMessage = `${message} ${url}`;
      const expectedResult = { message: expectdMessage, title, url };
      const isAndroid = true;
      expect(
        ShareUtils.buildShareContent(isAndroid, title, message, url)
      ).toEqual(expectedResult);
    });

    it("buildShareContent is called without url on Android", () => {
      const expectedResult = { message, title, url: undefined };
      const isAndroid = true;
      expect(
        ShareUtils.buildShareContent(isAndroid, title, message, undefined)
      ).toEqual(expectedResult);
    });

    it("buildShareContent is called with url on iOS", () => {
      const expectedResult = { message, title, url };
      const isAndroid = false;
      expect(
        ShareUtils.buildShareContent(isAndroid, title, message, url)
      ).toEqual(expectedResult);
    });

    it("buildShareContent is called without url on iOS", () => {
      const expectedResult = { message, title, url: undefined };
      const isAndroid = false;
      expect(
        ShareUtils.buildShareContent(isAndroid, title, message, undefined)
      ).toEqual(expectedResult);
    });
  });
});
