import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  epdsGender,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes
} from "../../constants";
import { Picker } from "@react-native-picker/picker";
import { EpdsGenders } from "../../type";
import Button from "../../components/form/Button";
import { StorageUtils } from "../../utils";

type EpdsGenderEntryProps = {
  goToEpdsSurvey: () => void;
};

const EpdsGenderEntry: React.FC<EpdsGenderEntryProps> = ({
  goToEpdsSurvey
}) => {
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [genderIsSelected, setGenderIsSelected] = useState(false);

  const renderPickerItems = EpdsGenders.map(
    (epdsGender: { value: string; label: string }) => {
      return (
        <Picker.Item
          label={epdsGender.label}
          value={epdsGender.value}
          key={epdsGender.value}
        />
      );
    }
  );

  const onPickerValueChanged = (newSelectedGender: any, _: number) => {
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
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    padding: Paddings.default
  },
  pickerView: {
    width: Sizes.giant,
    height: Sizes.xxl,
    color: Colors.commonText
  },
  validateButton: {
    marginTop: Margins.larger
  }
});

export default EpdsGenderEntry;
