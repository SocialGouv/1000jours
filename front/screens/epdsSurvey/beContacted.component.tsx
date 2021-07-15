import * as React from "react";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Button,
  CommonText,
  Icomoon,
  IcomoonIcons,
  TitleH1,
} from "../../components";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";

interface Props {
  visible: boolean;
  hideModal: () => void;
}

enum PersonalInformationType {
  firstName = "firstName",
  email = "email",
  phoneNumber = "phoneNumber",
}

const BeContacted: React.FC<Props> = ({ visible, hideModal }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getLabel = (informationType: PersonalInformationType) => {
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
    return labelMap.get(informationType);
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

  const renderTextInputView = (informationType: PersonalInformationType) => {
    return (
      <View style={styles.rowView}>
        <CommonText style={styles.textStyle}>
          {getLabel(informationType)}
        </CommonText>
        <TextInput
          style={styles.textInput}
          onChangeText={(text: string) => {
            onChangeText(informationType, text);
          }}
          placeholder={getLabel(informationType)}
        />
      </View>
    );
  };

  const onValidate = () => {
    console.log(`Email à envoyer :\\n
    - prénom : ${firstName}
    - email : ${email}
    - téléphone : ${phoneNumber}`);
  };

  // NB enfants et date de naissance du dernier
  // mail ou numéro
  return (
    <>
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.behindOfModal}>
          <View style={styles.mainContainer}>
            <TitleH1
              title={Labels.epdsSurvey.beContacted.title}
              animated={false}
            />
            <TouchableOpacity
              style={styles.closeModalView}
              onPress={() => {
                hideModal();
              }}
            >
              <Icomoon
                name={IcomoonIcons.fermer}
                size={Sizes.xs}
                color={Colors.primaryBlue}
              />
            </TouchableOpacity>
            {renderTextInputView(PersonalInformationType.firstName)}
            {renderTextInputView(PersonalInformationType.email)}
            {renderTextInputView(PersonalInformationType.phoneNumber)}
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
                    hideModal();
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={Labels.buttons.validate}
                  titleStyle={styles.buttonTitleStyle}
                  rounded={true}
                  disabled={false}
                  action={() => {
                    onValidate();
                    hideModal();
                  }}
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
  },
  buttonContainer: {
    flex: 1,
  },
  buttonTitleStyle: {
    fontSize: Sizes.sm,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: Margins.default,
  },
  closeModalView: {
    margin: Margins.default,
    position: "absolute",
    right: 0,
    top: 0,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    borderWidth: 1,
    flex: 1,
    margin: Margins.default,
    padding: Paddings.default,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Margins.default,
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
