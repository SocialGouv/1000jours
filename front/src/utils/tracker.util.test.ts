import AsyncStorage from "@react-native-async-storage/async-storage";
import { sub } from "date-fns";

import {
  dateWithMinHoursDelayIsBeforeNow,
  MIN_HOURS_DELAY_TO_TRACK_NEW_OPENING,
} from "./tracker.util";

describe("Storage util", () => {
  describe("dateWithMinHoursDelayIsBeforeNow", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it(`Opening app, less than ${MIN_HOURS_DELAY_TO_TRACK_NEW_OPENING} hours after last opening`, () => {
      const lastOpeningDate = new Date();
      const result = dateWithMinHoursDelayIsBeforeNow(lastOpeningDate);
      expect(result).toBe(false);
    });

    it(`Opening app, more than ${MIN_HOURS_DELAY_TO_TRACK_NEW_OPENING} hours after last opening`, () => {
      const lastOpeningDate = sub(new Date(), {
        hours: MIN_HOURS_DELAY_TO_TRACK_NEW_OPENING,
        seconds: 1,
      });
      const result = dateWithMinHoursDelayIsBeforeNow(lastOpeningDate);
      expect(result).toBe(true);
    });
  });
});
