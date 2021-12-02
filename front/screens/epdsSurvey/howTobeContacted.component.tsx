import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import EmailContact from "../../assets/images/epds/email-contact.svg";
import EmailContactSelected from "../../assets/images/epds/email-contact-selected.svg";
import Sms from "../../assets/images/epds/sms.svg";
import SmsSelected from "../../assets/images/epds/sms-selected.svg";
import SoleilMatin from "../../assets/images/epds/soleil-matin.svg";
import SoleilMatinSelected from "../../assets/images/epds/soleil-matin-selected.svg";
import SoleilMidi from "../../assets/images/epds/soleil-midi.svg";
import SoleilMidiSelected from "../../assets/images/epds/soleil-midi-selected.svg";
import SoleilSoir from "../../assets/images/epds/soleil-soir.svg";
import SoleilSoirSelected from "../../assets/images/epds/soleil-soir-selected.svg";
import {
  Button,
  CloseButton,
  CommonText,
  Icomoon,
  IcomoonIcons,
  TitleH1,
} from "../../components";
import { Colors, Labels, Margins, Paddings, Sizes } from "../../constants";

interface Props {
  visible: boolean;
  hideModal: (showSnackBar: boolean) => void;
}

interface SlideView {
  title: string;
  content: JSX.Element;
}

interface ContactType {
  id: string;
  isChecked: boolean;
  text: string;
  icon: React.ReactNode;
  iconSelected: React.ReactNode;
  hours?: string;
}

const MARGINS_CONTAINER = Margins.default;
const PADDINGS_CONTAINER = Margins.default;
const width =
  Dimensions.get("window").width -
  MARGINS_CONTAINER * 2 -
  PADDINGS_CONTAINER * 2;

const HowToBeContacted: React.FC<Props> = ({ visible, hideModal }) => {
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const defaultContactTypes: ContactType[] = [
    {
      icon: <Sms />,
      iconSelected: <SmsSelected />,
      id: "sms",
      isChecked: false,
      text: Labels.epdsSurvey.beContacted.bySms,
    },
    {
      icon: <EmailContact />,
      iconSelected: <EmailContactSelected />,
      id: "email",
      isChecked: false,
      text: Labels.epdsSurvey.beContacted.byEmail,
    },
  ];
  const [contactType, setContactType] =
    useState<ContactType[]>(defaultContactTypes);

  const defaultContactHours: ContactType[] = [
    {
      hours: Labels.epdsSurvey.beContacted.hours.morningDetails,
      icon: <SoleilMatin />,
      iconSelected: <SoleilMatinSelected />,
      id: "matin",
      isChecked: false,
      text: Labels.epdsSurvey.beContacted.hours.morning,
    },
    {
      hours: Labels.epdsSurvey.beContacted.hours.noonDetails,
      icon: <SoleilMidi />,
      iconSelected: <SoleilMidiSelected />,
      id: "midi",
      isChecked: false,
      text: Labels.epdsSurvey.beContacted.hours.noon,
    },
    {
      hours: Labels.epdsSurvey.beContacted.hours.eveningDetails,
      icon: <SoleilSoir />,
      iconSelected: <SoleilSoirSelected />,
      id: "soir",
      isChecked: false,
      text: Labels.epdsSurvey.beContacted.hours.evening,
    },
  ];
  const [contactHours, setContactHours] =
    useState<ContactType[]>(defaultContactHours);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      setSwiperCurrentIndex(Math.round(index));
    },
    []
  );

  const updateItemSelected = (
    list: ContactType[],
    itemSelected: ContactType
  ): ContactType[] => {
    return list.map((item) => {
      if (item.id === itemSelected.id) {
        return { ...item, isChecked: !itemSelected.isChecked };
      } else {
        return item;
      }
    });
  };

  const updateItem = (itemSelected: ContactType) => {
    if (isHours(itemSelected)) {
      setContactHours(() => {
        return updateItemSelected(contactHours, itemSelected);
      });
    } else {
      setContactType(() => {
        return updateItemSelected(contactType, itemSelected);
      });
    }
  };

  const enableNextButton = (): boolean => {
    switch (swiperCurrentIndex) {
      case 0:
        return contactType.find((item) => item.isChecked) != undefined;
      case 1:
        return contactHours.find((item) => item.isChecked) != undefined;
      default:
        return false;
    }
  };

  const showPreviousButton = (): boolean => swiperCurrentIndex > 0;
  const isHours = (item: ContactType) => item.hours != undefined;

  const buildCard = (item: ContactType) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.typeItem, item.isChecked ? styles.itemSelected : null]}
        onPress={() => {
          updateItem(item);
        }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.isChecked }}
      >
        <View style={{ alignSelf: "center" }}>
          {item.isChecked ? item.iconSelected : item.icon}
        </View>
        <CommonText style={item.isChecked ? styles.textSelected : null}>
          {item.text}
        </CommonText>
        {isHours(item) ? (
          <CommonText
            style={[
              item.isChecked ? styles.textSelected : null,
              { fontStyle: "italic" },
            ]}
          >
            {item.hours}
          </CommonText>
        ) : null}
      </TouchableOpacity>
    );
  };

  const step1types = () => {
    return (
      <View>
        <CommonText style={styles.section}>
          {Labels.epdsSurvey.beContacted.introduction}
        </CommonText>
        <CommonText style={styles.section}>
          {Labels.epdsSurvey.beContacted.wayToBeContacted}
        </CommonText>
        <CommonText style={styles.section}>
          {Labels.epdsSurvey.beContacted.myAvailabilities}
        </CommonText>
        <View style={styles.typeList}>
          {contactType.map((type, index) => buildCard(type))}
        </View>
      </View>
    );
  };
  const step2hours = () => {
    return (
      <View>
        <CommonText style={styles.section}>
          {Labels.epdsSurvey.beContacted.introduction}
        </CommonText>
        <CommonText style={styles.section}>
          {Labels.epdsSurvey.beContacted.myAvailabilitiesHours}
        </CommonText>
        <View style={styles.typeList}>
          {contactHours.map((type, index) => buildCard(type))}
        </View>
      </View>
    );
  };

  const step1: SlideView[] = [
    {
      content: step1types(),
      title: "type",
    },
    {
      content: step2hours(),
      title: "horaire",
    },
  ];

  const renderItem = ({ item, index }: { item: SlideView; index: number }) => {
    return item.content;
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.behindOfModal}>
        <View style={styles.mainContainer}>
          <View style={styles.modalHeader}>
            <TitleH1
              title={Labels.epdsSurvey.beContacted.title}
              animated={false}
              style={{ paddingTop: Paddings.default }}
            />
            <CloseButton
              onPress={() => {
                hideModal(false);
              }}
              clear={true}
            />
          </View>

          <ScrollView style={{ paddingEnd: PADDINGS_CONTAINER }}>
            <FlatList
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={step1}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
              horizontal={true}
              ref={flatListRef}
              onScroll={onScroll}
            />
          </ScrollView>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              {showPreviousButton() ? (
                <Button
                  title={Labels.buttons.previous}
                  titleStyle={styles.buttonTitleStyle}
                  rounded={false}
                  disabled={false}
                  icon={
                    <Icomoon
                      name={IcomoonIcons.precedent}
                      size={14}
                      color={Colors.primaryBlue}
                    />
                  }
                  action={() => {
                    flatListRef.current?.scrollToIndex({
                      index: swiperCurrentIndex - 1,
                    });
                  }}
                />
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={Labels.buttons.next}
                titleStyle={styles.buttonTitleStyle}
                disabledStyle={styles.disabledButton}
                rounded={false}
                disabled={!enableNextButton()}
                icon={
                  <Icomoon
                    name={IcomoonIcons.suivant}
                    size={14}
                    color={Colors.primaryBlue}
                  />
                }
                action={() => {
                  flatListRef.current?.scrollToIndex({
                    index: swiperCurrentIndex + 1,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  behindOfModal: {
    backgroundColor: Colors.transparentGrey,
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonTitleStyle: {
    fontSize: Sizes.sm,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginEnd: Margins.default,
    marginTop: Margins.default,
  },
  closeModalButton: {
    padding: Paddings.default,
    position: "absolute",
    right: 0,
    top: 0,
  },
  disabledButton: {
    backgroundColor: Colors.white,
  },
  imageItem: {
    height: 40,
  },
  itemSelected: {
    backgroundColor: Colors.primaryBlueDark,
    borderColor: Colors.primaryBlueDark,
    borderWidth: 1,
    shadowColor: Colors.primaryBlueDark,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    borderWidth: 1,
    display: "flex",
    flex: 1,
    margin: MARGINS_CONTAINER,
    paddingBottom: Paddings.default,
    paddingStart: PADDINGS_CONTAINER,
  },
  modalHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    fontSize: Sizes.xs,
    lineHeight: Sizes.mmd,
    marginBottom: Margins.default,
    maxWidth: width,
  },
  swipeView: {
    marginBottom: "10%",
    width,
  },
  textSelected: {
    color: Colors.white,
    fontWeight: "bold",
  },
  typeItem: {
    alignItems: "center",
    borderColor: Colors.borderGrey,
    borderRadius: Sizes.xxxxxs,
    borderWidth: 1,
    flexGrow: 1,
    margin: Margins.light,
    padding: Paddings.light,
    shadowColor: Colors.navigation,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  typeList: {
    flexDirection: "row",
  },
});

export default HowToBeContacted;
