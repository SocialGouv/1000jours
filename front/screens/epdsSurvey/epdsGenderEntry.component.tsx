import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";

import Button from "../../components/form/Button";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  epdsGender,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import { EpdsGenders } from "../../type";
import { StorageUtils } from "../../utils";

interface EpdsGenderEntryProps {
  goToEpdsSurvey: () => void;
}

const EpdsGenderEntry: React.FC<EpdsGenderEntryProps> = ({
  goToEpdsSurvey,
}) => {
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [genderIsSelected, setGenderIsSelected] = useState(false);

  const renderPickerItems = EpdsGenders.map(
    (gender: { value: string; label: string }) => {
      return (
        <Picker.Item
          label={gender.label}
          value={gender.value}
          key={gender.value}
        />
      );
    }
  );

  const onPickerValueChanged = (
    newSelectedGender: React.SetStateAction<string | undefined>
  ) => {
    setSelectedGender(newSelectedGender);
    setGenderIsSelected(true);
  };

  const onGenderSaved = async () => {
    if (selectedGender) {
      await StorageUtils.storeStringValue(epdsGender, selectedGender);
      goToEpdsSurvey();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CommonText style={styles.instruction}>
        {Labels.epdsSurvey.genderEntry.instruction}
      </CommonText>
      <Picker
        style={styles.pickerView}
        selectedValue={selectedGender}
        onValueChange={onPickerValueChanged}
      >
        {renderPickerItems}
      </Picker>
      <View style={styles.validateButton}>
        <Button
          title={Labels.buttons.validate}
          rounded={true}
          disabled={!genderIsSelected}
          action={onGenderSaved}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    padding: Paddings.default,
  },
  mainContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  pickerView: {
    color: Colors.commonText,
    height: Sizes.xxl,
    width: Sizes.giant,
  },
  validateButton: {
    marginTop: Margins.larger,
  },
});

export default EpdsGenderEntry;
