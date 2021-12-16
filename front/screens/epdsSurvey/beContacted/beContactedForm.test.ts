import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../../../constants";
import type { BeContactedData } from "./../../../type/epdsSurvey.types";
import * as BeContactedForm from "./beContactedForm.component";

describe("BeContactedForm component", () => {
  describe("getUserChildBirthday", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("Have child birth in storage", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.userChildBirthdayKey,
        "21-06-2021"
      );

      const result = await BeContactedForm.getUserChildBirthday();
      expect(result).toBe("21-06-2021");
    });

    it("Have no child birth in storage", async () => {
      const result = await BeContactedForm.getUserChildBirthday();
      expect(result).toBe("");
    });
  });

  describe("checkValidForm", () => {
    it("Have selected email and complete email", () => {
      const data: BeContactedData = {
        email: "toto@email.fr",
        firstName: "firstName",
        hours: [],
        lastChildBirthDate: "21-06-2021",
        numberOfChildren: 1,
        phoneNumber: "",
        type: "email",
      };

      expect(BeContactedForm.checkValidForm(data, true, false)).toBe(true);
    });

    it("Have selected email and no complete email", () => {
      const data: BeContactedData = {
        email: "",
        firstName: "firstName",
        hours: [],
        lastChildBirthDate: "21-06-2021",
        numberOfChildren: 1,
        phoneNumber: "0123456789",
        type: "email",
      };

      expect(BeContactedForm.checkValidForm(data, true, false)).toBe(false);
    });

    it("Have selected phone and complete phone number", () => {
      const data: BeContactedData = {
        email: "",
        firstName: "firstName",
        hours: ["matin", "midi"],
        lastChildBirthDate: "21-06-2021",
        numberOfChildren: 1,
        phoneNumber: "0123456789",
        type: "sms",
      };

      expect(BeContactedForm.checkValidForm(data, false, true)).toBe(true);
    });

    it("Have selected phone and no complete phone number", () => {
      const data: BeContactedData = {
        email: "toto@email.fr",
        firstName: "firstName",
        hours: ["matin", "midi"],
        lastChildBirthDate: "21-06-2021",
        numberOfChildren: 1,
        phoneNumber: "",
        type: "sms",
      };

      expect(BeContactedForm.checkValidForm(data, false, true)).toBe(false);
    });

    it("Have selected 1 child but no date", () => {
      const data: BeContactedData = {
        email: "toto@email.fr",
        firstName: "firstName",
        hours: ["matin", "midi"],
        lastChildBirthDate: "",
        numberOfChildren: 1,
        phoneNumber: "",
        type: "sms",
      };

      expect(BeContactedForm.checkValidForm(data, false, true)).toBe(false);
    });

    it("Have selected 1 child with date", () => {
      const data: BeContactedData = {
        email: "",
        firstName: "firstName",
        hours: ["matin", "midi"],
        lastChildBirthDate: "21-01-2021",
        numberOfChildren: 1,
        phoneNumber: "0123456789",
        type: "sms",
      };

      expect(BeContactedForm.checkValidForm(data, false, true)).toBe(true);
    });

    it("Have selected 0 child", () => {
      const data: BeContactedData = {
        email: "",
        firstName: "firstName",
        hours: ["matin", "midi"],
        lastChildBirthDate: "",
        numberOfChildren: 0,
        phoneNumber: "0123456789",
        type: "sms",
      };

      expect(BeContactedForm.checkValidForm(data, false, true)).toBe(true);
    });
  });
});
