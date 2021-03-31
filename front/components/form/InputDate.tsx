import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import IconeCalendrier from "../../assets/images/icone calendrier.svg";
import Colors from "../../constants/Colors";

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
      <IconeCalendrier height={24} />
      <TextInput
        style={[styles.textInput]}
        onChangeText={onDayChange}
        value={day}
        placeholder="Jour"
        keyboardType="numeric"
        maxLength={2}
      />
      <TextInput
        style={[styles.textInput]}
        onChangeText={onMonthChange}
        value={month}
        placeholder="Mois"
        keyboardType="numeric"
        maxLength={2}
      />
      <TextInput
        style={[styles.textInput]}
        onChangeText={onYearChange}
        value={year}
        placeholder="Année"
        keyboardType="numeric"
        maxLength={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputDateContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: Colors.cardGrey,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: "center",
  },
});

export default InputDate;
