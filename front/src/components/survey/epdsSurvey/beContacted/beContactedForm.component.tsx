import { format } from "date-fns";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HelperText } from "react-native-paper";

import {
  AccessibiltyConstants,
  Formats,
  Labels,
  StorageKeysConstants,
} from "../../../../constants";
import { Colors, Margins, Paddings, Sizes } from "../../../../styles";
import type { BeContactedData } from "../../../../type";
import {
  AccessibilityUtils,
  StorageUtils,
  StringUtils,
} from "../../../../utils";
import { Datepicker, SecondaryText } from "../../../baseComponents";

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

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);

  const componentRef = React.useRef<View>(null);

  useEffect(() => {
    const initDataWithStorageValue = async () => {
      const childBirthdayStr = await getUserChildBirthday();
      setChildBirthDate(childBirthdayStr);
    };

    void initDataWithStorageValue();

    setTimeout(() => {
      AccessibilityUtils.setAccessibilityFocusOnText(componentRef);
    }, AccessibiltyConstants.TIMEOUT_FOCUS);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkEmailInput = (text: string) => {
    if (text.trimEnd().length > 0) {
      setEmailIsValid(StringUtils.isValidEmail(text.trimEnd()));
    } else setEmailIsValid(true);
  };

  const checkPhoneInput = (text: string) => {
    if (text.trimEnd().length > 0) {
      setPhoneNumberIsValid(
        StringUtils.isValidFrenchPhoneNumber(text.trimEnd())
      );
    } else setPhoneNumberIsValid(true);
  };

  const RenderTextInputView = (
    informationType: PersonalInformationType,
    isMandatory: boolean,
    ref?: React.RefObject<View>
  ) => {
    const isPhoneNumber =
      informationType === PersonalInformationType.phoneNumber;
    const label: string = getPersonalInformationTypeLabel(informationType);
    const placeholder: string =
      getPersonalInformationTypePlaceholder(informationType);

    const onChangeText = useCallback(
      (textInput: string) => {
        switch (informationType) {
          case PersonalInformationType.firstName:
            setFirstName(textInput);
            break;
          case PersonalInformationType.email:
            setEmail(textInput);
            checkEmailInput(textInput);
            break;
          case PersonalInformationType.phoneNumber:
            setPhoneNumber(textInput);
            checkPhoneInput(textInput);
            break;
        }
      },
      [informationType]
    );

    return (
      <View style={styles.textInputView}>
        <View>
          <Text ref={ref}>
            <SecondaryText style={styles.textInputLabel}>
              {isMandatory ? `${label}* :` : `${label} :`}
            </SecondaryText>
          </Text>

          <TextInput
            keyboardType={isPhoneNumber ? "phone-pad" : "default"}
            style={styles.textInput}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.primaryBlue}
          />

          {informationType === PersonalInformationType.email &&
            !emailIsValid && (
              <HelperText type="error">
                {Labels.epdsSurvey.beContacted.invalidEmail}
              </HelperText>
            )}
          {informationType === PersonalInformationType.phoneNumber &&
            !phoneNumberIsValid && (
              <HelperText type="error">
                {Labels.epdsSurvey.beContacted.invalidPhoneNumber}
              </HelperText>
            )}
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
      {RenderTextInputView(PersonalInformationType.email, byEmail)}
      {RenderTextInputView(PersonalInformationType.phoneNumber, bySms)}
    </>
  );

  const renderInputBySms = () => (
    <>
      {RenderTextInputView(PersonalInformationType.phoneNumber, bySms)}
      {RenderTextInputView(PersonalInformationType.email, byEmail)}
    </>
  );

  const reduceNumberOfChildren = useCallback(() => {
    setNumberOfChildren(numberOfChildren - 1);
  }, [numberOfChildren]);

  const increaseNumberOfChildren = useCallback(() => {
    setNumberOfChildren(numberOfChildren + 1);
  }, [numberOfChildren]);

  const onDateChanged = useCallback((date: Date) => {
    setChildBirthDate(format(date, format(date, Formats.dateISO)));
  }, []);

  return (
    <View style={{ marginTop: Margins.light }}>
      {RenderTextInputView(
        PersonalInformationType.firstName,
        false,
        componentRef
      )}
      {byEmail ? renderInputByEmail() : renderInputBySms()}

      <View style={styles.rowView}>
        <SecondaryText style={{ fontSize: Sizes.sm }}>
          {Labels.epdsSurvey.beContacted.numberOfChildren}
        </SecondaryText>

        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.counterbutton}
            disabled={numberOfChildren == 0}
            onPress={reduceNumberOfChildren}
            accessibilityLabel={Labels.accessibility.beContacted.less}
            accessibilityRole="button"
            accessibilityState={{ disabled: numberOfChildren == 0 }}
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
            onPress={increaseNumberOfChildren}
            accessibilityRole="button"
            accessibilityLabel={Labels.accessibility.beContacted.more}
          >
            <SecondaryText style={styles.counterSign}>+</SecondaryText>
          </TouchableOpacity>
        </View>
      </View>

      {numberOfChildren > 0 && (
        <View style={styles.columnView}>
          <SecondaryText style={{ fontSize: Sizes.sm }}>
            {Labels.profile.childBirthday.lastChild} :
          </SecondaryText>
          <Datepicker
            date={
              childBirthDate.length > 0 ? new Date(childBirthDate) : undefined
            }
            onChange={onDateChanged}
          />
        </View>
      )}
    </View>
  );
};

export const getUserChildBirthday = async (): Promise<string> =>
  (await StorageUtils.getStringValue(
    StorageKeysConstants.userChildBirthdayKey
  )) ?? "";

export const checkValidForm = (
  data: BeContactedData,
  byEmail: boolean,
  bySms: boolean
): boolean => {
  let isEmailValid = false;
  if (data.email) isEmailValid = StringUtils.isValidEmail(data.email.trimEnd());

  let isPhoneValid = false;
  if (data.phoneNumber) {
    isPhoneValid = StringUtils.isValidFrenchPhoneNumber(
      data.phoneNumber.trimEnd()
    );
    data.phoneNumber = StringUtils.formatPhoneNumber(data.phoneNumber);
  }

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
    fontSize: Sizes.xs,
    paddingHorizontal: Paddings.smaller,
  },
  textInputLabel: {
    fontSize: Sizes.sm,
    marginBottom: Margins.smaller,
  },
  textInputView: {
    marginBottom: Margins.larger,
  },
});

export default BeContactedForm;
