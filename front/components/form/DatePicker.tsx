import type { Event } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../../constants/Colors";
import Icomoon, { IcomoonIcons } from "../Icomoon";

interface Props {
  date: Date;
  onChange: (event: Event, date?: Date | undefined) => void;
}

const Datepicker: React.FC<Props> = ({ date, onChange }) => {
  return (
    <View style={[styles.flexRow]}>
      <Icomoon
        name={IcomoonIcons.calendrier}
        size={24}
        color={Colors.primaryBlue}
      />
      <DateTimePicker
        dateFormat="day month year"
        locale="fr-FR"
        value={date}
        mode="date"
        display="default"
        textColor={Colors.primaryBlue}
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
