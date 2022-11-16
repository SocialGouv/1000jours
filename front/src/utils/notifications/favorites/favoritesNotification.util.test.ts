import { FavoritesNotificationUtils } from "../..";

describe("Favorites Notification Utils", () => {
  describe("buildFavoritesNotificationContent", () => {
    it("should return favorites notification content input", () => {
      expect(
        FavoritesNotificationUtils.buildFavoritesNotificationContent()
      ).toEqual({
        body: "Vous avez placé des articles dans vos favoris, n'hésitez pas à les consulter.",
        data: {
          redirectFromRoot: false,
          redirectParams: null,
          redirectTitle: "Consulter",
          redirectTo: "articleFavorites",
          type: "favorites",
        },
        title: "Vos favoris",
      });
    });
  });
});
