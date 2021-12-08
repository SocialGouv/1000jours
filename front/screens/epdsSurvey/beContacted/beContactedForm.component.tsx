import { format } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { HelperText } from "react-native-paper";

import { Datepicker, SecondaryText } from "../../../components";
import {
  Colors,
  Formats,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../../constants";
import type { BeContactedData } from "../../../type";
import { StorageUtils, StringUtils } from "../../../utils";

interface Props {
  byEmail: boolean;
  bySms: boolean;
  validForm: (isValid: boolean) => void;
  setData: (data: BeContactedData) => void;
}

enum PersonalInformationType {
  firstName = "firstName",
  email = "email",
  phoneNumber = "phoneNumber",
}

const BeContactedForm: React.FC<Props> = ({
  byEmail,
  bySms,
  validForm,
  setData,
}) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [childBirthDate, setChildBirthDate] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  useEffect(() => {
    const initDataWithStorageValue = async () => {
      const childBirthdayStr = await getUserChildBirthday();
      setChildBirthDate(childBirthdayStr);
    };

    void initDataWithStorageValue();
  }, []);

  useEffect(() => {
    const data: BeContactedData = {
      email: email,
      firstName: firstName,
      lastChildBirthDate: childBirthDate,
      numberOfChildren: numberOfChildren,
      phoneNumber: phoneNumber,
    };

    if (checkValidForm(data, byEmail, bySms)) {
      setData(data);
      validForm(true);
    } else validForm(false);
  }, [firstName, phoneNumber, email, numberOfChildren, childBirthDate]);

  const getPersonalInformationTypeLabel = (
    informationType: PersonalInformationType
  ): string => {
    switch (informationType) {
      case PersonalInformationType.firstName:
        return Labels.epdsSurvey.beContacted.yourFirstname;
      case PersonalInformationType.email:
        return Labels.epdsSurvey.beContacted.yourEmail;
      case PersonalInformationType.phoneNumber:
        return Labels.epdsSurvey.beContacted.yourPhoneNumber;
      default:
        return "Error";
    }
  };

  const getPersonalInformationTypePlaceholder = (
    informationType: PersonalInformationType
  ): string => {
    switch (informationType) {
      case PersonalInformationType.firstName:
        return Labels.epdsSurvey.beContacted.yourFirstnamePlaceholder;
      case PersonalInformationType.email:
        return Labels.epdsSurvey.beContacted.yourEmailPlaceholder;
      case PersonalInformationType.phoneNumber:
        return Labels.epdsSurvey.beContacted.yourPhoneNumberPlaceholder;
      default:
        return "Error";
    }
  };

  const getPersonalInformationTypeError = (
    informationType: PersonalInformationType
  ): string => {
    switch (informationType) {
      case PersonalInformationType.email:
        return Labels.epdsSurvey.beContacted.invalidEmail;
      case PersonalInformationType.phoneNumber:
        return Labels.epdsSurvey.beContacted.invalidPhoneNumber;
      default:
        return "";
    }
  };

  const showInputError = (
    informationType: PersonalInformationType
  ): boolean => {
    console.log(informationType);
    switch (informationType) {
      case PersonalInformationType.email:
        console.log(email);
        console.log(StringUtils.validateEmail(email.trimEnd()));
        return !StringUtils.validateEmail(email.trimEnd());
      case PersonalInformationType.phoneNumber:
        return !StringUtils.validateFrenchPhoneNumber(phoneNumber.trimEnd());
      default:
        return false;
    }
  };

  const onChangeText = (
    informationType: PersonalInformationType,
    textInput: string
  ) => {
    switch (informationType) {
      case PersonalInformationType.firstName:
        setFirstName(textInput);
        break;
      case PersonalInformationType.email:
        setEmail(textInput);
        break;
      case PersonalInformationType.phoneNumber:
        setPhoneNumber(textInput);
        break;
    }
  };

  const renderTextInputView = (
    informationType: PersonalInformationType,
    isMandatory: boolean
  ) => {
    const isPhoneNumber =
      informationType === PersonalInformationType.phoneNumber;
    const label: string = getPersonalInformationTypeLabel(informationType);
    const placeholder: string =
      getPersonalInformationTypePlaceholder(informationType);

    const [showError, setShowError] = useState(false);

    return (
      <View style={styles.textInputView}>
        <View>
          <SecondaryText style={styles.textInputLabel}>
            {isMandatory ? `${label}* :` : `${label} :`}
          </SecondaryText>

          <TextInput
            keyboardType={isPhoneNumber ? "phone-pad" : "default"}
            style={styles.textInput}
            onChangeText={(text: string) => {
              onChangeText(informationType, text);
              setShowError(showInputError(informationType));
            }}
            placeholder={placeholder}
            placeholderTextColor={Colors.primaryBlue}
          />

          {showError ? (
            <HelperText type="error">
              {getPersonalInformationTypeError(informationType)}
            </HelperText>
          ) : null}
        </View>

        {isMandatory ? (
          <SecondaryText style={styles.subTextStyle}>
            {Labels.epdsSurvey.beContacted.requiredField}
          </SecondaryText>
        ) : null}
      </View>
    );
  };

  const renderInputByEmail = () => (
    <>
      {renderTextInputView(PersonalInformationType.email, byEmail)}
      {renderTextInputView(PersonalInformationType.phoneNumber, bySms)}
    </>
  );

  const renderInputBySms = () => (
    <>
      {renderTextInputView(PersonalInformationType.phoneNumber, bySms)}
      {renderTextInputView(PersonalInformationType.email, byEmail)}
    </>
  );

  return (
    <View style={{ marginTop: Margins.light }}>
      {renderTextInputView(PersonalInformationType.firstName, false)}
      {byEmail ? renderInputByEmail() : renderInputBySms()}

      <View style={styles.rowView}>
        <SecondaryText>
          {Labels.epdsSurvey.beContacted.numberOfChildren}
        </SecondaryText>

        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.counterbutton}
            disabled={numberOfChildren == 0}
            onPress={() => {
              setNumberOfChildren(numberOfChildren - 1);
            }}
          >
            <SecondaryText
              style={[
                numberOfChildren > 0
                  ? styles.counterSign
                  : styles.counterSignDisabled,
              ]}
            >
              -
            </SecondaryText>
          </TouchableOpacity>
          <SecondaryText style={{ textAlignVertical: "center" }}>
            {numberOfChildren}
          </SecondaryText>
          <TouchableOpacity
            style={styles.counterbutton}
            onPress={() => {
              setNumberOfChildren(numberOfChildren + 1);
            }}
          >
            <SecondaryText style={styles.counterSign}>+</SecondaryText>
          </TouchableOpacity>
        </View>
      </View>

      {numberOfChildren > 0 && (
        <View style={styles.columnView}>
          <SecondaryText>
            {Labels.profile.childBirthday.lastChild} :
          </SecondaryText>
          <Datepicker
            date={
              childBirthDate.length > 0 ? new Date(childBirthDate) : undefined
            }
            onChange={(date) => {
              setChildBirthDate(format(date, format(date, Formats.dateISO)));
            }}
          />
        </View>
      )}
    </View>
  );
};

export const getUserChildBirthday = async (): Promise<string> => {
  return (
    (await StorageUtils.getStringValue(
      StorageKeysConstants.userChildBirthdayKey
    )) ?? ""
  );
};

export const checkValidForm = (
  data: BeContactedData,
  byEmail: boolean,
  bySms: boolean
): boolean => {
  let isEmailValid = false;
  if (data.email)
    isEmailValid = StringUtils.validateEmail(data.email.trimEnd());

  let isPhoneValid = false;
  if (data.phoneNumber)
    isPhoneValid = StringUtils.validateFrenchPhoneNumber(
      data.phoneNumber.trimEnd()
    );

  if (data.numberOfChildren > 0 && !data.lastChildBirthDate) return false;
  if (byEmail && isEmailValid) return true;
  if (bySms && isPhoneValid) return true;
  return false;
};

const styles = StyleSheet.create({
  columnView: {
    marginVertical: Margins.default,
  },
  counter: {
    flexDirection: "row",
  },
  counterSign: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xl,
  },
  counterSignDisabled: {
    color: Colors.primaryBlueDisabled,
    fontSize: Sizes.xl,
  },
  counterbutton: {
    alignItems: "center",
    paddingHorizontal: Margins.larger,
  },
  rowView: {
    alignItems: "center",
    flexDirection: "row",
  },
  subTextStyle: {
    color: Colors.grey,
    fontSize: Sizes.xs,
    marginTop: Margins.smaller,
  },
  textInput: {
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    fontSize: Sizes.xxs,
    paddingHorizontal: Paddings.smaller,
  },
  textInputLabel: {
    fontSize: Sizes.xs,
    marginBottom: Margins.smaller,
  },
  textInputView: {
    marginBottom: Margins.larger,
  },
});

export default BeContactedForm;
