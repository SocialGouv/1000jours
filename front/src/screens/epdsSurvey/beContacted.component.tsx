import { useMutation } from "@apollo/client/react/hooks";
import { Picker } from "@react-native-community/picker";
import { format } from "date-fns";
import Constants from "expo-constants";
import { range } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HelperText } from "react-native-paper";

import {
  Button,
  CloseButton,
  CommonText,
  Datepicker,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  TitleH1,
} from "../../components";
import {
  Colors,
  DatabaseQueries,
  FontWeight,
  Formats,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import type { BeContactedData } from "../../type";
import { StorageUtils, StringUtils } from "../../utils";

interface Props {
  visible: boolean;
  hideModal: (showSnackBar: boolean) => void;
}

enum PersonalInformationType {
  firstName = "firstName",
  email = "email",
  phoneNumber = "phoneNumber",
}

const BeContacted: React.FC<Props> = ({ visible, hideModal }) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameIsEmpty, setFirstNameIsEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailIsEmpty, setEmailIsEmpty] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [childBirthDate, setChildBirthDate] = useState("");
  const [childBirthDateIsEmpty, setChildBirthDateIsEmpty] = useState(false);

  const [sendContactInformation] = useMutation(
    DatabaseQueries.EPDS_CONTACT_INFORMATION,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    const initDataWithStorageValue = async () => {
      const childBirthdayStr =
        (await StorageUtils.getStringValue(
          StorageKeysConstants.userChildBirthdayKey
        )) ?? "";
      setChildBirthDate(childBirthdayStr);
    };
    void initDataWithStorageValue();
  }, []);

  const getLabelAndIsEmptyVariable = (
    informationType: PersonalInformationType
  ): BeContactedData => {
    const labelMap = new Map<PersonalInformationType, string>();
    labelMap.set(
      PersonalInformationType.firstName,
      Labels.epdsSurvey.beContacted.yourFirstname
    );
    labelMap.set(
      PersonalInformationType.email,
      Labels.epdsSurvey.beContacted.yourEmail
    );
    labelMap.set(
      PersonalInformationType.phoneNumber,
      Labels.epdsSurvey.beContacted.yourPhoneNumber
    );
    const isEmail = informationType === PersonalInformationType.email;
    return {
      isEmptyVariable: getIsEmptyValue(informationType),
      label: labelMap.get(informationType),
      subLabel: isEmail
        ? Labels.epdsSurvey.beContacted.mailsCanBeReceivedInSpams
        : undefined,
    };
  };

  const getIsEmptyValue = (informationType: PersonalInformationType) => {
    switch (informationType) {
      case PersonalInformationType.firstName:
        return firstNameIsEmpty;
      case PersonalInformationType.email:
        return emailIsEmpty;
      case PersonalInformationType.phoneNumber:
    }
  };

  const onChangeText = (
    informationType: PersonalInformationType,
    textInput: string
  ) => {
    switch (informationType) {
      case PersonalInformationType.firstName:
        setFirstName(textInput);
        setFirstNameIsEmpty(false);
        break;
      case PersonalInformationType.email:
        setEmail(textInput);
        setEmailIsEmpty(false);
        if (textInput.trimEnd().length > 0) {
          setEmailIsValid(StringUtils.validateEmail(textInput.trimEnd()));
        } else setEmailIsValid(true);
        break;
      case PersonalInformationType.phoneNumber:
        setPhoneNumber(textInput);
        if (textInput.trimEnd().length > 0) {
          setPhoneNumberIsValid(
            StringUtils.validateFrenchPhoneNumber(textInput.trimEnd())
          );
        } else setPhoneNumberIsValid(true);
        break;
    }
  };

  const renderTextInputView = (
    informationType: PersonalInformationType,
    isMandatory: boolean
  ) => {
    const isPhoneNumber =
      informationType === PersonalInformationType.phoneNumber;
    const { label, isEmptyVariable, subLabel } =
      getLabelAndIsEmptyVariable(informationType);
    return (
      <View>
        <View style={styles.rowView}>
          <CommonText style={styles.textStyle}>
            {isMandatory ? `${label} *` : label}
          </CommonText>

          <View>
            <TextInput
              keyboardType={isPhoneNumber ? "phone-pad" : "default"}
              style={styles.textInput}
              onChangeText={(text: string) => {
                onChangeText(informationType, text);
              }}
              placeholder={
                isPhoneNumber
                  ? Labels.epdsSurvey.beContacted.yourPhoneNumberPlaceholder
                  : label
              }
            />
            {isMandatory && isEmptyVariable && (
              <HelperText type="error">{Labels.mandatoryField}</HelperText>
            )}
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
        </View>
        <SecondaryText style={styles.secondaryTextStyle}>
          {subLabel}
        </SecondaryText>
      </View>
    );
  };

  const isValidForm = () => {
    let isValid = true;
    if (!StringUtils.stringIsNotNullNorEmpty(email)) {
      setEmailIsEmpty(!StringUtils.stringIsNotNullNorEmpty(email));
      isValid = false;
    }
    if (!emailIsValid || !phoneNumberIsValid) isValid = false;

    return isValid;
  };

  const onValidate = async () => {
    if (isValidForm()) {
      let dateAsString = null;
      if (StringUtils.stringIsNotNullNorEmpty(childBirthDate)) {
        const date = new Date(childBirthDate);
        dateAsString = format(date, Formats.dateFR).replace(/\//g, "-");
      }

      await sendContactInformation({
        variables: {
          email,
          naissanceDernierEnfant: dateAsString,
          nombreEnfants: numberOfChildren,
          prenom: firstName,
          telephone: phoneNumber,
        },
      });

      setFirstName("");
      setFirstNameIsEmpty(false);
      setEmail("");
      setEmailIsValid(true);
      setEmailIsEmpty(false);
      setPhoneNumber("");
      setPhoneNumberIsValid(true);
      setNumberOfChildren(1);
      setChildBirthDate("");
      setChildBirthDateIsEmpty(false);
      hideModal(true);
    }
  };

  return (
    <>
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.behindOfModal}>
          <View style={styles.mainContainer}>
            <View style={styles.modalHeader}>
              <TitleH1
                title={Labels.epdsSurvey.beContacted.title}
                animated={false}
                style={{ paddingTop: Paddings.default }}
              />
              <CloseButton
                onPress={() => {
                  hideModal(false);
                }}
                clear={true}
              />
            </View>

            <ScrollView style={{ paddingEnd: Paddings.default }}>
              {renderTextInputView(PersonalInformationType.firstName, false)}
              {renderTextInputView(PersonalInformationType.email, true)}
              {renderTextInputView(PersonalInformationType.phoneNumber, false)}
              <View style={styles.rowView}>
                <CommonText style={styles.textStyle}>
                  {Labels.epdsSurvey.beContacted.numberOfChildren}
                </CommonText>
                <Picker
                  selectedValue={numberOfChildren}
                  style={{ height: 30, width: 100 }}
                  onValueChange={(itemValue) => {
                    setNumberOfChildren(Number(itemValue));
                  }}
                >
                  {range(1, 3).map((value) => (
                    <Picker.Item
                      key={value}
                      label={String(value)}
                      value={value}
                    />
                  ))}
                </Picker>
              </View>
              {numberOfChildren > 0 && (
                <View style={styles.columnView}>
                  <CommonText style={styles.textStyle}>
                    {Labels.profile.childBirthday.lastChild}
                  </CommonText>
                  <Datepicker
                    date={
                      childBirthDate.length > 0
                        ? new Date(childBirthDate)
                        : undefined
                    }
                    onChange={(date) => {
                      setChildBirthDate(
                        format(date, format(date, Formats.dateISO))
                      );
                      setChildBirthDateIsEmpty(false);
                    }}
                  />
                  {childBirthDateIsEmpty && (
                    <HelperText style={styles.center} type="error">
                      {Labels.mandatoryField}
                    </HelperText>
                  )}
                </View>
              )}
            </ScrollView>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <Button
                  title={Labels.buttons.cancel}
                  titleStyle={styles.buttonTitleStyle}
                  rounded={false}
                  disabled={false}
                  icon={
                    <Icomoon
                      name={IcomoonIcons.fermer}
                      size={14}
                      color={Colors.primaryBlue}
                    />
                  }
                  action={() => {
                    hideModal(false);
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={Labels.buttons.validate}
                  titleStyle={styles.buttonTitleStyle}
                  rounded={true}
                  disabled={false}
                  action={onValidate}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  behindOfModal: {
    backgroundColor: Colors.transparentGrey,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonTitleStyle: {
    fontSize: Sizes.sm,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginEnd: Margins.default,
    marginTop: Margins.default,
  },
  center: {
    alignSelf: "center",
  },
  closeModalButton: {
    padding: Paddings.default,
    position: "absolute",
    right: 0,
    top: 0,
  },
  closeModalView: {
    padding: Paddings.larger,
    position: "absolute",
    right: 0,
    top: 0,
  },
  columnView: {
    marginVertical: Margins.default,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    borderWidth: 1,
    display: "flex",
    flex: 1,
    margin: Margins.default,
    paddingBottom: Paddings.default,
    paddingStart: Paddings.default,
  },
  mandatory: {
    color: "red",
  },
  modalHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Margins.default,
  },
  secondaryTextStyle: {
    color: Colors.primaryBlue,
    marginRight: Margins.default,
  },
  textInput: {
    borderBottomColor: Colors.primaryBlue,
    borderBottomWidth: 1,
    paddingHorizontal: Paddings.smaller,
    width: SCREEN_WIDTH / 2,
  },
  textStyle: {
    color: Colors.primaryBlue,
    fontWeight: FontWeight.bold,
    marginRight: Margins.default,
  },
});

export default BeContacted;
