import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ColorValue,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
  color: ColorValue;
}

interface ContactType {
  id: string;
  isChecked: boolean;
  text: string;
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
    { id: "sms", isChecked: false, text: "Par SMS" },
    { id: "email", isChecked: false, text: "Par email" },
  ];
  const [contactType, setContactType] =
    useState<ContactType[]>(defaultContactTypes);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      setSwiperCurrentIndex(Math.round(index));
    },
    []
  );

  const updateItemSelected = (itemSelected: ContactType) => {
    setContactType(() => {
      return contactType.map((item) => {
        if (item.id === itemSelected.id) {
          return { ...item, isChecked: !itemSelected.isChecked };
        } else {
          return item;
        }
      });
    });
  };

  const buildCard = (item: ContactType) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.typeItem, item.isChecked ? styles.itemSelected : null]}
        onPress={() => {
          updateItemSelected(item);
        }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.isChecked }}
      >
        <View style={{ alignSelf: "center" }}>
          <Icomoon
            name={IcomoonIcons.parents}
            size={40}
            color={item.isChecked ? Colors.white : Colors.primaryBlueDark}
          />
        </View>
        <CommonText style={item.isChecked ? styles.textSelected : null}>
          {item.text}
        </CommonText>
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
          {Labels.epdsSurvey.beContacted.wayToBeContacted}
        </CommonText>
        <CommonText style={styles.section}>
          {Labels.epdsSurvey.beContacted.myAvailabilitiesHours}
        </CommonText>
        <View style={styles.typeList}>
          {/* {contactType.map((type, index) => buildCard(type))} */}
        </View>
      </View>
    );
  };

  const step1: SlideView[] = [
    {
      color: "red",
      content: step1types(),
      title: "type",
    },
    {
      color: "green",
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
              <Button
                title={Labels.buttons.cancel}
                titleStyle={styles.buttonTitleStyle}
                rounded={false}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.fermer}
                    size={14}
                    color={Colors.primaryBlue}
                  />
                }
                action={() => {
                  hideModal(false);
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={Labels.buttons.validate}
                titleStyle={styles.buttonTitleStyle}
                rounded={true}
                disabled={false}
                //action={onValidate}
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
