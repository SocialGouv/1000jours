import { Picker, PickerIOS } from "@react-native-community/picker";
import type { ItemValue } from "@react-native-community/picker/typings/Picker";
import _ from "lodash";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Labels } from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { Colors, FontWeight, Margins } from "../../styles";
import { CommonText } from "./StyledText";

interface Props {
  updateNumberOfChildren: (numberOfChildren: number) => void;
}

const CustomNumberOfChildrenPicker: React.FC<Props> = ({
  updateNumberOfChildren,
}) => {
  const INITIAL_NUMBER_OF_CHILDREN = 1;
  const MAX_NUMBER_OF_CHILDREN = 4;
  const [numberOfChildren, setNumberOfChildren] = useState(
    INITIAL_NUMBER_OF_CHILDREN
  );

  const onPickherValueChanged = useCallback(
    (itemValue: ItemValue) => {
      setNumberOfChildren(Number(itemValue));
      updateNumberOfChildren(Number(itemValue));
    },
    [updateNumberOfChildren]
  );

  return (
    <View style={styles.rowView}>
      <CommonText style={styles.textStyle}>
        {Labels.epdsSurvey.beContacted.numberOfChildren}
      </CommonText>
      {PLATFORM_IS_IOS ? (
        <PickerIOS
          selectedValue={numberOfChildren}
          style={styles.pickerStyle}
          onValueChange={onPickherValueChanged}
        >
          {_.range(INITIAL_NUMBER_OF_CHILDREN, MAX_NUMBER_OF_CHILDREN).map(
            (value) => (
              <PickerIOS.Item key={value} label={String(value)} value={value} />
            )
          )}
        </PickerIOS>
      ) : (
        <Picker
          selectedValue={numberOfChildren}
          style={styles.pickerStyle}
          onValueChange={onPickherValueChanged}
        >
          {_.range(INITIAL_NUMBER_OF_CHILDREN, MAX_NUMBER_OF_CHILDREN).map(
            (value) => (
              <Picker.Item key={value} label={String(value)} value={value} />
            )
          )}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    width: 100,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    alignSelf: "center",
    color: Colors.primaryBlue,
    fontWeight: FontWeight.bold,
    marginRight: Margins.default,
  },
});

export default CustomNumberOfChildrenPicker;
