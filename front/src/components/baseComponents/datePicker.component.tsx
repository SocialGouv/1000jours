import type { Event } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addYears, format, subYears } from "date-fns";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

import { Formats, Labels, Locales } from "../../constants";
import {
  MAJOR_VERSION_IOS,
  PLATFORM_IS_ANDROID,
  PLATFORM_IS_IOS,
} from "../../constants/platform.constants";
import { Colors, Margins, Paddings, Shadow, Sizes } from "../../styles";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  date?: Date;
  onChange: (date: Date) => void;
  color?: string;
}

const Datepicker: React.FC<Props> = ({ date, onChange, color }) => {
  const buildButtonTitle = (newDate: Date | undefined): string =>
    newDate ? format(newDate, Formats.dateFR) : Labels.dateFormatLabel;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [validatedDate, setValidatedDate] = useState(date);
  const [buttonLabel, setButtonLabel] = useState(buildButtonTitle(date));

  const validate = useCallback(
    (newDate: Date | undefined) => () => {
      setModalVisible(false);
      setValidatedDate(newDate);
      if (newDate !== undefined) onChange(newDate);
    },
    [onChange]
  );

  const dateTimePickerChange = useCallback(
    (newDate: Date | undefined) => {
      if (PLATFORM_IS_IOS) {
        setSelectedDate(newDate);
        // Valide la date automatiquement pour les device >= iOS 14 (UX/UI très différente)
        if (MAJOR_VERSION_IOS >= 14) validate(newDate);
      } else {
        setModalVisible(false);
        if (newDate !== undefined) {
          setSelectedDate(newDate);
          setValidatedDate(newDate);
          onChange(newDate);
        }
      }
    },
    [onChange, validate]
  );

  useEffect(() => {
    setButtonLabel(buildButtonTitle(validatedDate));
  }, [validatedDate]);

  const onDateTimePickerChanged = useCallback(
    (event: Event, newDate?: Date) => {
      dateTimePickerChange(newDate);
    },
    [dateTimePickerChange]
  );

  const minDate = subYears(new Date(), 100);
  const maxDate = addYears(new Date(), 100);

  const dateTimePicker: React.ReactNode = (
    <DateTimePicker
      locale={Locales.frFR}
      value={selectedDate ?? new Date()}
      mode="date"
      display="default"
      minimumDate={minDate}
      maximumDate={maxDate}
      textColor={Colors.primaryBlue}
      onChange={onDateTimePickerChanged}
      style={styles.dateTimePicker}
    />
  );

  const onShowModal = useCallback(() => {
    setSelectedDate(validatedDate ?? new Date());
    setModalVisible(true);
  }, [validatedDate]);

  const onCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.centeredView}>
      <CustomButton
        rounded={false}
        action={onShowModal}
        title={buttonLabel}
        icon={
          <Icomoon
            name={IcomoonIcons.calendrier}
            size={Sizes.xl}
            color={color ?? Colors.primaryBlue}
          />
        }
        titleStyle={[styles.pickerButtonStyle, { color }]}
        accessibilityLabel={`${Labels.accessibility.updateDate} : ${buttonLabel}`}
        buttonStyle={{
          paddingVertical: Paddings.smallest,
        }}
      />
      {modalVisible ? (
        PLATFORM_IS_ANDROID ? (
          dateTimePicker
        ) : (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onCloseModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalContainer}>{dateTimePicker}</View>
                <View
                  style={[styles.buttonsContainer, styles.justifyContentCenter]}
                >
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      title={Labels.buttons.cancel}
                      rounded={false}
                      disabled={false}
                      action={onCloseModal}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      title={Labels.buttons.validate}
                      rounded={false}
                      disabled={false}
                      action={validate(selectedDate)}
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
    alignItems: MAJOR_VERSION_IOS < 14 ? "stretch" : "center",
    justifyContent: "center",
    marginTop: Margins.default,
  },
  dateTimePicker: {
    width: MAJOR_VERSION_IOS < 14 ? "100%" : 130,
  },
  footer: {
    flex: 1,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    paddingVertical: Paddings.smaller,
  },
  modalView: {
    alignItems: MAJOR_VERSION_IOS < 14 ? "stretch" : "center",
    backgroundColor: "white",
    borderRadius: Sizes.mmd,
    elevation: 5,
    margin: Margins.larger,
    padding: Paddings.larger,
    shadowColor: "black",
    shadowOffset: {
      height: Shadow.offsetHeight,
      width: Shadow.offsetWidth,
    },
    shadowOpacity: Shadow.opacity,
    shadowRadius: Shadow.radius,
  },
  pickerButtonStyle: {
    fontSize: Sizes.sm,
    textDecorationLine: "underline",
  },
});

export default Datepicker;
