import { format } from "date-fns";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import { ButtonGroup } from "react-native-elements";

import { Formats, Labels } from "../../constants";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import { MOODBOARD_ITEMS, saveMood } from "../../utils/moodboard.util";
import {
  CloseButton,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  TitleH1,
} from "../baseComponents";

interface Props {
  visible: boolean;
  hideModal: () => void;
  dateISO?: string;
}

const EditMoodDay: React.FC<Props> = ({ visible, hideModal, dateISO }) => {
  const [dateFR, setDateFR] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (dateISO) {
      const today = format(new Date(dateISO), Formats.dateFR);
      setDateFR(today);
    }
  }, [dateISO]);

  const closeModal = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const validateMood = useCallback(() => {
    void saveMood(MOODBOARD_ITEMS[selectedIndex].title, dateISO).then(() => {
      hideModal();
    });
  }, [dateISO, hideModal, selectedIndex]);

  const updateSelectedIndex = useCallback((value: number) => {
    setSelectedIndex(value);
  }, []);

  const moodItems = () => {
    const buttons: [] = MOODBOARD_ITEMS.map((item, index) => {
      return (
        <View style={styles.itemStyle} key={index}>
          <Image style={styles.itemImageStyle} source={item.icon} />
          <SecondaryText style={{ color: item.color }}>
            {item.title}
          </SecondaryText>
        </View>
      );
    });

    return (
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        containerStyle={styles.buttonGroupContainer}
        innerBorderStyle={{ width: 0 }}
        selectedButtonStyle={styles.selectedButtonStyle}
        onPress={updateSelectedIndex}
      />
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeButton}>
            <CloseButton onPress={hideModal} clear={true} />
          </View>
          <View style={styles.content}>
            <Icomoon
              name={IcomoonIcons.calendrier}
              color={Colors.primaryBlue}
              size={30}
            />
            <TitleH1
              title={Labels.moodboard.title}
              animated={false}
              style={styles.titleStyle}
            />
            <SecondaryText style={styles.textStyle}>
              {Labels.moodboard.moodToDate} {dateFR} ?
            </SecondaryText>
            {moodItems()}

            <View style={styles.buttonsContainer}>
              <CustomButton
                title={Labels.buttons.cancel}
                rounded={false}
                action={closeModal}
              />
              <CustomButton
                title={Labels.buttons.validate}
                rounded={true}
                action={validateMood}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonGroupContainer: {
    borderWidth: 0,
    height: 100,
    marginHorizontal: 0,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: Margins.default,
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: Colors.backdrop,
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    paddingEnd: Paddings.smaller,
    paddingTop: Paddings.smaller,
  },
  content: {
    alignItems: "center",
    marginTop: -15,
    paddingHorizontal: 35,
  },
  itemImageStyle: {
    height: 40,
    width: 40,
  },
  itemStyle: {
    alignItems: "center",
    minWidth: Sizes.accessibilityMinButton,
  },
  itemsBloc: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Margins.default,
    width: "100%",
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  selectedButtonStyle: {
    backgroundColor: "transparent",
    borderColor: Colors.primaryBlue,
    borderWidth: 3,
  },
  textStyle: {
    textAlign: "center",
  },
  titleStyle: {
    marginTop: Margins.default,
  },
});

export default EditMoodDay;
