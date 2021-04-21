import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Colors from "../../constants/Colors";
import Icomoon, { IcomoonIcons } from "../Icomoon";

interface Props {
  day: string;
  month: string;
  year: string;
  onDayChange: (text: string) => void;
  onMonthChange: (text: string) => void;
  onYearChange: (text: string) => void;
}

const InputDate: React.FC<Props> = ({
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <View style={styles.inputDateContainer}>
      <Icomoon
        name={IcomoonIcons.calendrier}
        size={24}
        color={Colors.primaryBlue}
      />
      <TextInput
        style={[styles.textInput]}
        onChangeText={onDayChange}
        value={day}
        placeholder="Jour"
        keyboardType="phone-pad"
        maxLength={2}
      />
      <TextInput
        style={[styles.textInput]}
        onChangeText={onMonthChange}
        value={month}
        placeholder="Mois"
        keyboardType="phone-pad"
        maxLength={2}
      />
      <TextInput
        style={[styles.textInput]}
        onChangeText={onYearChange}
        value={year}
        placeholder="Année"
        keyboardType="phone-pad"
        maxLength={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputDateContainer: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 15,
  },
  textInput: {
    backgroundColor: Colors.cardGrey,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    maxWidth: 80,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: "center",
  },
});

export default InputDate;
