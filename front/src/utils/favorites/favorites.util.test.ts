import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../../constants";
import { getObjectValue } from "../storage.util";
import { handleOnFavorite } from "./favorites.util";

describe("Favorites utils", () => {
  describe("handleOnFavorite", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should add article id to favorites and schedule favorites notification when article id is not in favorites", async () => {
      await handleOnFavorite(true, 1234);

      const expected = [1234];

      await getObjectValue(StorageKeysConstants.favoriteArticlesIds).then(
        (data) => {
          expect(data).toEqual(expected);
        }
      );
    });

    it("should not add article id to favorites when article id is already in favorites", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.favoriteArticlesIds,
        JSON.stringify([1234])
      );

      await handleOnFavorite(true, 1234);

      const expected = [1234];
      await getObjectValue(StorageKeysConstants.favoriteArticlesIds).then(
        (data) => {
          expect(data).toEqual(expected);
        }
      );
    });

    it("should remove article id from favorites", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.favoriteArticlesIds,
        JSON.stringify([1234])
      );

      await handleOnFavorite(false, 1234);

      const expected: number[] = [];
      await getObjectValue(StorageKeysConstants.favoriteArticlesIds).then(
        (data) => {
          expect(data).toEqual(expected);
        }
      );
    });
  });
});
