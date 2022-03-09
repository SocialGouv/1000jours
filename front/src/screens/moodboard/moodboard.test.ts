import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

import { Formats, StorageKeysConstants } from "../../constants";
import * as Moodboard from "./moodboard.component";

describe("Moodboard component", () => {
  describe("saveMood", () => {
    const today: string = format(new Date(), Formats.dateISO);

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("setItem is called with StorageKeysConstants.moodsByDate and without old mood", async () => {
      await Moodboard.saveMood("Bien");
      const expected = [{ date: today, title: "Bien" }];

      expect(AsyncStorage.getItem).toBeCalledWith(
        StorageKeysConstants.moodsByDate
      );
      expect(AsyncStorage.setItem).toBeCalledWith(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(expected)
      );
    });

    it("setItem is called with StorageKeysConstants.moodsByDate and with old mood", async () => {
      const items = [{ date: "2022-01-01", title: "Très bien" }];
      void AsyncStorage.setItem(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(items)
      );

      await Moodboard.saveMood("Bien");
      const expected = [
        { date: "2022-01-01", title: "Très bien" },
        { date: today, title: "Bien" },
      ];

      expect(AsyncStorage.getItem).toBeCalledWith(
        StorageKeysConstants.moodsByDate
      );
      expect(AsyncStorage.setItem).toBeCalledWith(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(expected)
      );
    });
  });
});
