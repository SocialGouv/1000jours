import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import Constants from "expo-constants";
import * as React from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import EmailSent from "../../../assets/images/epds/email_sent.svg";
import EmailContact from "../../../assets/images/epds/email-contact.svg";
import EmailContactSelected from "../../../assets/images/epds/email-contact-selected.svg";
import Sms from "../../../assets/images/epds/sms.svg";
import SmsSent from "../../../assets/images/epds/sms_sent.svg";
import SmsSelected from "../../../assets/images/epds/sms-selected.svg";
import SoleilMatin from "../../../assets/images/epds/soleil-matin.svg";
import SoleilMatinSelected from "../../../assets/images/epds/soleil-matin-selected.svg";
import SoleilMidi from "../../../assets/images/epds/soleil-midi.svg";
import SoleilMidiSelected from "../../../assets/images/epds/soleil-midi-selected.svg";
import SoleilSoir from "../../../assets/images/epds/soleil-soir.svg";
import SoleilSoirSelected from "../../../assets/images/epds/soleil-soir-selected.svg";
import {
  CustomButton,
  CloseButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  TitleH1,
} from "../../../components";
import {
  Colors,
  DatabaseQueries,
  Formats,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../../constants";
import type { BeContactedData } from "../../../type";
import { StringUtils } from "../../../utils";
import BeContactedForm from "./beContactedForm.component";

interface Props {
  visible: boolean;
  hideModal: (showSnackBar: boolean) => void;
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
  PADDINGS_CONTAINER * 2 -
  2;

const HowToBeContacted: React.FC<Props> = ({ visible, hideModal }) => {
  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const [isValidForm, setValidForm] = useState(false);
  const [dataForm, setDataForm] = useState<BeContactedData>();
  const [showLoader, setShowLoader] = useState(false);

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

  const showPreviousButton: boolean = swiperCurrentIndex > 0;
  const isHours = (item: ContactType) => item.hours != undefined;
  const isFormView: boolean = swiperCurrentIndex == 1;
  const isConfirmationView: boolean = swiperCurrentIndex == 2;
  const isSmsSelected = (): boolean => {
    if (contactType.find((item) => item.id == "sms")?.isChecked) return true;
    else return false;
  };
  const isEmailSelected = (): boolean => {
    if (contactType.find((item) => item.id == "email")?.isChecked) return true;
    else return false;
  };

  const [sendContactInformation] = useMutation(
    DatabaseQueries.EPDS_CONTACT_INFORMATION,
    {
      onCompleted: () => {
        setShowLoader(false);
      },
      onError: (err) => {
        console.log(err);
      },
    }
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
        return updateItemSelected(defaultContactTypes, itemSelected);
      });
    }
  };

  const enableNextButton = (): boolean => {
    switch (swiperCurrentIndex) {
      case 0:
        if (isSmsSelected()) {
          return contactHours.find((item) => item.isChecked) != undefined;
        } else {
          return contactType.find((item) => item.isChecked) != undefined;
        }
      case 1:
        return isValidForm;
      default:
        return false;
    }
  };

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
        <SecondaryText style={item.isChecked ? styles.textSelected : null}>
          {item.text}
        </SecondaryText>
        {isHours(item) ? (
          <SecondaryText
            style={[
              item.isChecked ? styles.textSelected : null,
              { fontStyle: "italic" },
            ]}
          >
            {item.hours}
          </SecondaryText>
        ) : null}
      </TouchableOpacity>
    );
  };

  const stepTypes = () => {
    return (
      <View>
        <SecondaryText style={styles.section}>
          {Labels.epdsSurvey.beContacted.introduction}
        </SecondaryText>
        <SecondaryText style={styles.section}>
          {Labels.epdsSurvey.beContacted.wayToBeContacted}
        </SecondaryText>
        <SecondaryText style={styles.section}>
          {Labels.epdsSurvey.beContacted.myAvailabilities}
        </SecondaryText>
        <View style={styles.typeList}>
          {contactType.map((type) => buildCard(type))}
        </View>

        {isSmsSelected() ? stepHours() : null}
      </View>
    );
  };

  const stepHours = () => {
    return (
      <View style={{ marginTop: Margins.default }}>
        <SecondaryText style={styles.section}>
          {Labels.epdsSurvey.beContacted.myAvailabilitiesHours}
        </SecondaryText>
        <View style={styles.typeList}>
          {contactHours.map((type) => buildCard(type))}
        </View>
      </View>
    );
  };

  const stepSendValidated = () => {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: Margins.default,
          width: width,
        }}
      >
        {isSmsSelected() ? <SmsSent /> : <EmailSent />}
        {showLoader ? (
          <ActivityIndicator
            size="large"
            color={Colors.primaryBlueDark}
            style={{ marginTop: Margins.default }}
            accessibilityLabel={
              Labels.accessibility.beContacted.sendingInProgress
            }
          />
        ) : (
          <>
            <SecondaryText style={{ color: Colors.primaryBlue }}>
              {Labels.epdsSurvey.beContacted.requestSent}
            </SecondaryText>
            <SecondaryText style={{ marginTop: Margins.larger }}>
              <Text style={{ fontWeight: "bold" }}>
                {Labels.epdsSurvey.beContacted.formSend}
              </Text>
              {isSmsSelected()
                ? Labels.epdsSurvey.beContacted.formForSmsSend
                : Labels.epdsSurvey.beContacted.formForEmailSend}
            </SecondaryText>
          </>
        )}
      </View>
    );
  };

  const onValidate = async () => {
    if (dataForm) {
      let dateAsString = "";
      if (
        dataForm.lastChildBirthDate &&
        StringUtils.stringIsNotNullNorEmpty(dataForm.lastChildBirthDate)
      ) {
        const date = new Date(dataForm.lastChildBirthDate);
        dateAsString = format(date, Formats.dateFR).replace(/\//g, "-");
      }

      let horaires = "";
      contactHours.forEach((item) => {
        if (item.isChecked) horaires = `${horaires} ${item.id}`;
      });

      await sendContactInformation({
        variables: {
          email: dataForm.email,
          horaires: horaires,
          moyen: contactType.find((item) => item.isChecked)?.id,
          naissanceDernierEnfant: dateAsString,
          nombreEnfants: dataForm.numberOfChildren,
          prenom: dataForm.firstName,
          telephone: dataForm.phoneNumber,
        },
      });
    }
  };

  const nextOrValidationButton = (): JSX.Element => {
    if (isFormView) {
      return (
        <CustomButton
          title={Labels.buttons.validate}
          titleStyle={[styles.buttonTitleStyle, { textTransform: "uppercase" }]}
          rounded={true}
          disabled={!enableNextButton()}
          action={() => {
            void onValidate();
            setSwiperCurrentIndex(swiperCurrentIndex + 1);
            setShowLoader(true);
          }}
        />
      );
    } else if (isConfirmationView) {
      return (
        <CustomButton
          title={Labels.buttons.close}
          titleStyle={[styles.buttonTitleStyle, { textTransform: "uppercase" }]}
          buttonStyle={{ alignSelf: "center" }}
          rounded={true}
          action={() => {
            hideModal(true);
            setSwiperCurrentIndex(0);
          }}
        />
      );
    } else {
      return (
        <CustomButton
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
            setSwiperCurrentIndex(swiperCurrentIndex + 1);
          }}
        />
      );
    }
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
            {swiperCurrentIndex == 0 ? stepTypes() : null}
            {swiperCurrentIndex == 1 ? (
              <View style={{ width: width }}>
                <BeContactedForm
                  byEmail={isEmailSelected()}
                  bySms={isSmsSelected()}
                  validForm={(isValid: boolean) => {
                    setValidForm(isValid);
                  }}
                  setData={(data: BeContactedData) => {
                    setDataForm(data);
                  }}
                />
              </View>
            ) : null}
            {swiperCurrentIndex == 2 ? stepSendValidated() : null}
          </ScrollView>

          <View style={styles.buttonsContainer}>
            <View
              style={[
                styles.buttonContainer,
                isConfirmationView ? styles.hide : null,
              ]}
            >
              {showPreviousButton ? (
                <CustomButton
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
                    setValidForm(false);
                    setSwiperCurrentIndex(swiperCurrentIndex - 1);
                  }}
                />
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              {nextOrValidationButton()}
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
    paddingTop: Constants.statusBarHeight,
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
  disabledButton: {
    backgroundColor: Colors.white,
  },
  hide: {
    display: "none",
  },
  itemSelected: {
    backgroundColor: Colors.primaryBlueDark,
    borderColor: Colors.primaryBlueDark,
    borderWidth: 1,
    shadowColor: Colors.primaryBlueDark,
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
    fontSize: Sizes.sm,
    lineHeight: Sizes.mmd,
    marginBottom: Margins.default,
    maxWidth: width,
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
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default HowToBeContacted;
