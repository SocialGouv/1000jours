import type { Event } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";

import Colors from "../../constants/Colors";

interface Props {
  date: Date;
  onChange: (event: Event, date?: Date | undefined) => void;
}

const Datepicker: React.FC<Props> = ({ date, onChange }) => {
  return (
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
  );
};

export default Datepicker;
