import { AppUtils } from ".";

describe("App utils", () => {
  describe("hasNewVersionAvailable", () => {
    it("hasNewVersionAvailable is called with null", () => {
      const currentVersion = "1.1.1";
      const lastVersionAvailable = null;
      const hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);
    });

    it("hasNewVersionAvailable is called with same version", () => {
      const currentVersion = "1.1.1";
      const lastVersionAvailable = "1.1.1";
      const hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);
    });

    it("hasNewVersionAvailable is called with older versions", () => {
      const currentVersion = "1.1.1";
      let lastVersionAvailable = "1.1.0";
      let hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);

      lastVersionAvailable = "1.0.2";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);

      lastVersionAvailable = "0.2.2";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);
    });

    it("hasNewVersionAvailable is called with new versions", () => {
      const currentVersion = "1.1.1";
      let lastVersionAvailable = "1.1.2";
      let hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(true);

      lastVersionAvailable = "1.2.0";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(true);

      lastVersionAvailable = "2.0.0";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(true);
    });
  });
});
