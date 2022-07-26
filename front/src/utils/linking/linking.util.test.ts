import { Linking } from "react-native";

import { LinkingUtils } from "..";

describe("Linking util", () => {
  describe("openWebsite", () => {
    const linkingSpy = jest.spyOn(Linking, "openURL");

    afterEach(() => {
      linkingSpy.mockRestore();
    });

    it("should not open URL when it is undefined", async () => {
      await LinkingUtils.openWebsite(undefined);

      expect(linkingSpy).toHaveBeenCalledTimes(0);
    });

    it("should not open URL when it is null", async () => {
      await LinkingUtils.openWebsite(null);

      expect(linkingSpy).toHaveBeenCalledTimes(0);
    });

    it("should open URL when it starts with HTTP", async () => {
      await LinkingUtils.openWebsite("http://google.com");

      expect(linkingSpy).toHaveBeenCalled();
    });

    it("should open URL when it starts with HTTPS", async () => {
      await LinkingUtils.openWebsite("https://google.com");

      expect(linkingSpy).toHaveBeenCalled();
    });

    it("should open URL when it starts with WWW and needs to be reformatted", async () => {
      await LinkingUtils.openWebsite("www.yelp.com");

      expect(linkingSpy).toHaveBeenCalled();
    });

    it("should open URL when it has no prefix and needs to be reformatted", async () => {
      await LinkingUtils.openWebsite("yelp.com");

      expect(linkingSpy).toHaveBeenCalled();
    });
  });
});
