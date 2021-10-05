import { PickerIOS } from "@react-native-community/picker";
import { range } from "lodash";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Colors, FontWeight, Labels, Margins } from "../../constants";
import { CommonText } from "..";

interface Props {
  updateNumberOfChildren: (numberOfChildren: number) => void;
}

const CustomNumberOfChildrenPicker: React.FC<Props> = ({
  updateNumberOfChildren,
}) => {
  const INITIAL_NUMBER_OF_CHILDREN = 0;
  const MAX_NUMBER_OF_CHILDREN = 4;
  const [numberOfChildren, setNumberOfChildren] = useState(
    INITIAL_NUMBER_OF_CHILDREN
  );

  return (
    <View style={styles.rowView}>
      <CommonText style={styles.textStyle}>
        {Labels.epdsSurvey.beContacted.numberOfChildren}
      </CommonText>
      <PickerIOS
        selectedValue={numberOfChildren}
        style={styles.pickerStyle}
        onValueChange={(itemValue) => {
          setNumberOfChildren(Number(itemValue));
          updateNumberOfChildren(Number(itemValue));
        }}
      >
        {range(INITIAL_NUMBER_OF_CHILDREN, MAX_NUMBER_OF_CHILDREN).map(
          (value) => (
            <PickerIOS.Item key={value} label={String(value)} value={value} />
          )
        )}
      </PickerIOS>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    width: 60,
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
