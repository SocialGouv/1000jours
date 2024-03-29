import { format } from "date-fns";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Formats, Labels } from "../../constants";
import { Colors, Margins, Sizes, Styles } from "../../styles";
import { MoodboardUtils } from "../../utils";
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
  const [selectedIndex, setSelectedIndex] = useState(1);

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
    void MoodboardUtils.saveMood(
      MoodboardUtils.MOODBOARD_ITEMS[selectedIndex].title,
      dateISO
    ).then(() => {
      hideModal();
    });
  }, [dateISO, hideModal, selectedIndex]);

  const updateSelectedIndex = useCallback(
    (index: number) => () => {
      setSelectedIndex(index);
    },
    []
  );

  const moodItems = () => {
    const buttons = MoodboardUtils.MOODBOARD_ITEMS.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          accessibilityRole="radio"
          accessibilityState={{ selected: index == selectedIndex }}
          onPress={updateSelectedIndex(index)}
          style={[
            index == selectedIndex && styles.selectedButtonStyle,
            styles.itemStyle,
          ]}
        >
          <Image style={styles.itemImageStyle} source={item.icon} />
          <SecondaryText style={{ color: item.color }}>
            {item.title}
          </SecondaryText>
        </TouchableOpacity>
      );
    });

    return (
      <View style={[styles.buttonsContainer, styles.itemsMoodButtons]}>
        {buttons}
      </View>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={Styles.modale.behindOfModal}>
        <View style={Styles.modale.modalView}>
          <View style={Styles.modale.closeButton}>
            <CloseButton onPress={hideModal} clear />
          </View>
          <ScrollView>
            <View style={styles.content}>
              <View
                accessibilityElementsHidden={true}
                importantForAccessibility="no-hide-descendants"
                accessible={false}
              >
                <Icomoon
                  name={IcomoonIcons.calendrier}
                  color={Colors.primaryBlue}
                  size={Sizes.xxl}
                />
              </View>
              <TitleH1
                title={Labels.moodboard.title}
                animated={false}
                style={styles.titleStyle}
              />

              <SecondaryText style={styles.textStyle}>
                {Labels.moodboard.moodToDate} {dateFR} ?
              </SecondaryText>
              {moodItems()}

              <View style={[styles.buttonsContainer, styles.validationButtons]}>
                <CustomButton
                  title={Labels.buttons.cancel}
                  rounded={false}
                  action={closeModal}
                />
                <CustomButton
                  title={Labels.buttons.validate}
                  rounded
                  action={validateMood}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Margins.default,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 35,
  },
  itemImageStyle: {
    height: 40,
    width: 40,
  },
  itemStyle: {
    alignItems: "center",
    flexGrow: 1,
    minWidth: Sizes.accessibilityMinButton,
  },
  itemsBloc: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Margins.default,
    width: "100%",
  },
  itemsMoodButtons: {
    flexWrap: "wrap",
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
  validationButtons: {
    flexWrap: "wrap-reverse",
  },
});

export default EditMoodDay;
