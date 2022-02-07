import { useMutation } from "@apollo/client/react/hooks";
import Constants from "expo-constants";
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
  CommonText,
  CustomButton,
  CustomNumberOfChildrenPicker,
  CustomPostalCodeTextInput,
  Icomoon,
  IcomoonIcons,
  TitleH1,
} from "../../components/baseComponents";
import { DatabaseQueries, Labels } from "../../constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const SubmitNewFilter: React.FC<Props> = ({ visible, hideModal }) => {
  useEffect(() => {
    if (!visible) return;
  }, [visible]);

  const [sendCartoSuggestions] = useMutation(
    DatabaseQueries.CARTO_SEND_SUGGESTIONS,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const [newPois, setNewPois] = useState("");
  const [newPoisIsEmpty, setNewPoisIsEmpty] = useState(true);
  const [newSuggestions, setNewSuggestions] = useState("");
  const [newSuggestionsIsEmpty, setNewSuggestionsIsEmpty] = useState(true);
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [postalCode, setPostalCode] = useState("");
  const instructionsAndPlaceholders =
    Labels.aroundMe.submitNewFilter.instructions;

  const getChangeFunctionAndValue = (index: number) => {
    if (index === 0)
      return {
        function: setNewPois,
        setIsEmpty: setNewPoisIsEmpty,
        value: newPois,
      };
    else
      return {
        function: setNewSuggestions,
        setIsEmpty: setNewSuggestionsIsEmpty,
        value: newSuggestions,
      };
  };

  const onValidate = async () => {
    if (!newPoisIsEmpty && !newSuggestionsIsEmpty) {
      hideModal();
      await sendCartoSuggestions({
        variables: {
          codePostal: postalCode,
          nombreEnfants: numberOfChildren,
          nouveauxPois: newPois,
          suggestionsAmeliorations: newSuggestions,
        },
      });
      setNewPois("");
      setNewPoisIsEmpty(true);
      setNewSuggestions("");
      setNewPoisIsEmpty(true);
    }
  };

  const renderSection = (
    section: {
      instruction: string;
      placeholder: string;
    },
    index: number
  ) => {
    const functionAndValue = getChangeFunctionAndValue(index);
    return (
      <View style={styles.sectionView}>
        <CommonText style={styles.partsTitle}>{section.instruction}</CommonText>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            functionAndValue.function(text);
            functionAndValue.setIsEmpty(text.trimEnd().length === 0);
          }}
          value={functionAndValue.value}
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
          <TitleH1
            title={Labels.aroundMe.submitNewFilter.title}
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
                  {renderSection(instructionAndPlaceholder, index)}
                </View>
              )
            )}
            <CustomNumberOfChildrenPicker
              updateNumberOfChildren={setNumberOfChildren}
            />
            <CustomPostalCodeTextInput updatePostalCode={setPostalCode} />
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <CustomButton
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
              <CustomButton
                title={Labels.buttons.validate}
                titleStyle={styles.buttonTitleStyle}
                rounded={true}
                disabled={false}
                action={() => {
                  void onValidate();
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
    marginVertical: Margins.smaller,
  },
  postalCodeInput: {
    backgroundColor: Colors.cardGrey,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    paddingHorizontal: Paddings.smaller,
  },
  sectionView: {
    marginVertical: Margins.default,
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
