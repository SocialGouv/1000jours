import type { Event } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addYears, format } from "date-fns";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect, useState } from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";

import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import Icomoon, { IcomoonIcons } from "../Icomoon";
import Button from "./Button";

interface Props {
  date?: Date;
  onChange: (date: Date) => void;
}

const majorVersionIOS = parseInt(Platform.Version.toString(), 10);
const Datepicker: React.FC<Props> = ({ date, onChange }) => {
  const buildButtonTitle = (newDate: Date | undefined) =>
    newDate ? format(newDate, "dd/MM/yyyy") : "dd/mm/yyyy";

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [validatedDate, setValidatedDate] = useState(date);
  const [buttonLabel, setButtonLabel] = useState(buildButtonTitle(date));

  const validate = (newDate: Date | undefined) => {
    setModalVisible(false);
    setValidatedDate(newDate);
    if (newDate !== undefined) onChange(newDate);
  };

  const dateTimePickerChange = (newDate: Date | undefined) => {
    if (Platform.OS === "ios") {
      setSelectedDate(newDate);
      // Valide la date automatiquement pour les device >= iOS 14 (UX/UI très différente)
      if (majorVersionIOS >= 14) validate(newDate);
    } else {
      setModalVisible(false);
      if (newDate !== undefined) {
        setSelectedDate(newDate);
        setValidatedDate(newDate);
        onChange(newDate);
      }
    }
  };

  useEffect(() => {
    setButtonLabel(buildButtonTitle(validatedDate));
  }, [validatedDate]);

  const minDate = addYears(new Date(), -100);
  const maxDate = addYears(new Date(), 100);

  const dateTimePicker: React.ReactNode = (
    <DateTimePicker
      locale="fr-FR"
      value={selectedDate ?? new Date()}
      mode="date"
      display="default"
      minimumDate={minDate}
      maximumDate={maxDate}
      textColor={Colors.primaryBlue}
      onChange={(event: Event, newDate?: Date) => {
        dateTimePickerChange(newDate);
      }}
      style={styles.dateTimePicker}
    />
  );

  return (
    <View style={styles.centeredView}>
      <Button
        rounded={false}
        action={() => {
          setSelectedDate(validatedDate ?? new Date());
          setModalVisible(true);
        }}
        title={buttonLabel}
        icon={
          <Icomoon
            name={IcomoonIcons.calendrier}
            size={24}
            color={Colors.primaryBlue}
          />
        }
      />
      {modalVisible ? (
        Platform.OS === "android" ? (
          dateTimePicker
        ) : (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalContainer}>{dateTimePicker}</View>
                <View
                  style={[styles.buttonsContainer, styles.justifyContentCenter]}
                >
                  <View style={[styles.buttonContainer]}>
                    <Button
                      title={Labels.buttons.cancel}
                      rounded={false}
                      disabled={false}
                      action={() => {
                        setModalVisible(false);
                      }}
                    />
                  </View>
                  <View style={[styles.buttonContainer]}>
                    <Button
                      title={Labels.buttons.validate}
                      rounded={false}
                      disabled={false}
                      action={() => {
                        validate(selectedDate);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  centeredView: {
    alignItems: majorVersionIOS < 14 ? "stretch" : "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  dateTimePicker: {
    width: majorVersionIOS < 14 ? "100%" : 130,
  },
  footer: {
    flex: 1,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    paddingVertical: 10,
  },
  modalView: {
    alignItems: majorVersionIOS < 14 ? "stretch" : "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default Datepicker;
