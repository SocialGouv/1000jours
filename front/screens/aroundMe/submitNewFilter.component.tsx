import * as React from "react";
import { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  Button,
  CommonText,
  Icomoon,
  IcomoonIcons,
  TitleH1,
} from "../../components";
import CustomNumberOfChildrenPicker from "../../components/base/customNumberOfChildrenPicker.component";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const SubmitNewFilter: React.FC<Props> = ({ visible, hideModal }) => {
  useEffect(() => {
    if (!visible) return;
  }, [visible]);

  const [numberOfChildrens, setNumberOfChildrens] = useState(1);
  const instructionsAndPlaceholders =
    Labels.aroundMe.submitNewFilter.instructions;

  const renderSection = (section: {
    instruction: string;
    placeholder: string;
  }) => {
    return (
      <View>
        <CommonText style={styles.partsTitle}>{section.instruction}</CommonText>
        <TextInput
          style={styles.textInput}
          // onChangeText={onPostalCodeChanged}
          // value={section.placeholder}
          placeholder={section.placeholder}
          placeholderTextColor={Colors.primaryBlue}
          numberOfLines={4}
          maxLength={200}
        />
      </View>
    );
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.behindOfModal}>
        <View style={styles.mainContainer}>
          <TitleH1 title={Labels.aroundMe.filter.title} animated={false} />
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
          <ScrollView>
            {instructionsAndPlaceholders.map(
              (
                instructionAndPlaceholder: {
                  instruction: string;
                  placeholder: string;
                },
                index: number
              ) => (
                <View key={index}>
                  {renderSection(instructionAndPlaceholder)}
                </View>
              )
            )}
            <CustomNumberOfChildrenPicker
              updateNumberOfChildren={(number) => {
                console.log(number);
                setNumberOfChildrens(number);
              }}
            />
            <View style={styles.rowView}>
              {/* <TextInput
                style={[
                  styles.postalCodeInput,
                  PLATFORM_IS_IOS && styles.widthForIos,
                ]}
                onChangeText={onPostalCodeChanged}
                value={postalCodeInput}
                placeholder={Labels.aroundMe.postalCodeInputPlaceholder}
                keyboardType="number-pad"
                maxLength={AroundMeConstants.POSTAL_CODE_MAX_LENGTH}
              /> */}
            </View>
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
                  hideModal();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
    padding: Paddings.default,
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
  partsTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: "bold",
  },
  postalCodeInput: {
    backgroundColor: Colors.cardGrey,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    paddingHorizontal: Paddings.smaller,
  },
  rowView: {
    flexDirection: "row",
  },
  textInput: {
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.normal),
    paddingHorizontal: Paddings.smaller,
    width: "100%",
  },
});

export default SubmitNewFilter;
