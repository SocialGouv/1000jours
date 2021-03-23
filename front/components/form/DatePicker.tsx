import type { Event } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import IconeCalendrier from "../../assets/images/icone calendrier.svg";
import Colors from "../../constants/Colors";

interface Props {
  date: Date;
  onChange: (event: Event, date?: Date | undefined) => void;
}

const Datepicker: React.FC<Props> = ({ date, onChange }) => {
  return (
    <View style={[styles.flexRow]}>
      <IconeCalendrier height={24} />
      <DateTimePicker
        dateFormat="day month year"
        locale="fr-FR"
        value={date}
        mode="date"
        display="default"
        textColor={Colors.primaryColor}
        onChange={onChange}
        style={{
          alignSelf: "center",
          width: 130,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Datepicker;
