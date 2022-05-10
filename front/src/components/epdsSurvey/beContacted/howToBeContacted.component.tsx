import { format } from "date-fns";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
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

import {
  CloseButton,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  TitleH1,
} from "../../../components/baseComponents";
import { EpdsDbQueries, Formats, Labels } from "../../../constants";
import { GraphQLMutation } from "../../../services";
import { Colors, Margins, Paddings, Sizes, Styles } from "../../../styles";
import type { BeContactedData } from "../../../type";
import { StringUtils } from "../../../utils";
import { BeContactedAssets } from "../../assets";
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
  const [queryVariables, setQueryVariables] = useState<unknown>();
  const [triggerSendContactInformation, setTriggerSendContactInformation] =
    useState(false);

  const defaultContactTypes: ContactType[] = useMemo(() => {
    return [
      {
        icon: <BeContactedAssets.Sms />,
        iconSelected: <BeContactedAssets.SmsSelected />,
        id: "sms",
        isChecked: false,
        text: Labels.epdsSurvey.beContacted.bySms,
      },
      {
        icon: <BeContactedAssets.EmailContact />,
        iconSelected: <BeContactedAssets.EmailContactSelected />,
        id: "email",
        isChecked: false,
        text: Labels.epdsSurvey.beContacted.byEmail,
      },
    ];
  }, []);

  const [contactType, setContactType] =
    useState<ContactType[]>(defaultContactTypes);

  const defaultContactHours: ContactType[] = [
    {
      hours: Labels.epdsSurvey.beContacted.hours.morningDetails,
      icon: <BeContactedAssets.SoleilMatin />,
      iconSelected: <BeContactedAssets.SoleilMatinSelected />,
      id: "matin",
      isChecked: false,
      text: Labels.epdsSurvey.beContacted.hours.morning,
    },
    {
      hours: Labels.epdsSurvey.beContacted.hours.noonDetails,
      icon: <BeContactedAssets.SoleilMidi />,
      iconSelected: <BeContactedAssets.SoleilMidiSelected />,
      id: "midi",
      isChecked: false,
      text: Labels.epdsSurvey.beContacted.hours.noon,
    },
    {
      hours: Labels.epdsSurvey.beContacted.hours.eveningDetails,
      icon: <BeContactedAssets.SoleilSoir />,
      iconSelected: <BeContactedAssets.SoleilSoirSelected />,
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

  const updateItem = useCallback(
    (itemSelected: ContactType) => () => {
      if (isHours(itemSelected)) {
        setContactHours(() => {
          return updateItemSelected(contactHours, itemSelected);
        });
      } else {
        setContactType(() => {
          return updateItemSelected(defaultContactTypes, itemSelected);
        });
      }
    },
    [contactHours, defaultContactTypes]
  );

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
        onPress={updateItem(item)}
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
        {isSmsSelected() ? (
          <BeContactedAssets.SmsSent />
        ) : (
          <BeContactedAssets.EmailSent />
        )}
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

  const onValidate = useCallback(() => {
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

      setQueryVariables({
        email: dataForm.email,
        horaires: horaires,
        moyen: contactType.find((item) => item.isChecked)?.id,
        naissanceDernierEnfant: dateAsString,
        nombreEnfants: dataForm.numberOfChildren,
        prenom: dataForm.firstName,
        telephone: dataForm.phoneNumber,
      });
      setTriggerSendContactInformation(!triggerSendContactInformation);
    }
  }, [contactHours, contactType, dataForm, triggerSendContactInformation]);

  const onValidateButtonPressed = useCallback(() => {
    onValidate();
    setSwiperCurrentIndex(swiperCurrentIndex + 1);
    setShowLoader(true);
  }, [onValidate, swiperCurrentIndex]);

  const onCloseButtonPressed = useCallback(() => {
    hideModal(true);
    setSwiperCurrentIndex(0);
  }, [hideModal]);

  const onNextButtonPressed = useCallback(() => {
    setSwiperCurrentIndex(swiperCurrentIndex + 1);
  }, [swiperCurrentIndex]);

  const nextOrValidationButton = () => {
    if (isFormView) {
      return (
        <CustomButton
          title={Labels.buttons.validate}
          titleStyle={[styles.buttonTitleStyle, { textTransform: "uppercase" }]}
          rounded={true}
          disabled={!enableNextButton()}
          action={onValidateButtonPressed}
        />
      );
    } else if (isConfirmationView) {
      return (
        <CustomButton
          title={Labels.buttons.close}
          titleStyle={[styles.buttonTitleStyle, { textTransform: "uppercase" }]}
          buttonStyle={{ alignSelf: "center" }}
          rounded={true}
          action={onCloseButtonPressed}
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
          action={onNextButtonPressed}
        />
      );
    }
  };

  const onSendInformationCompleted = useCallback(() => {
    setShowLoader(false);
  }, []);

  const onCloseModalButtonPressed = useCallback(() => {
    hideModal(false);
  }, [hideModal]);

  const onValidFormUpdate = useCallback((isValid: boolean) => {
    setValidForm(isValid);
  }, []);

  const onDataFormUpdate = useCallback((data: BeContactedData) => {
    setDataForm(data);
  }, []);

  const onPreviousButtonPressed = useCallback(() => {
    setValidForm(false);
    setSwiperCurrentIndex(swiperCurrentIndex - 1);
  }, [swiperCurrentIndex]);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <GraphQLMutation
        query={EpdsDbQueries.EPDS_CONTACT_INFORMATION}
        variables={queryVariables}
        triggerLaunchMutation={triggerSendContactInformation}
        onCompleted={onSendInformationCompleted}
      />
      <View style={Styles.modale.behindOfModal}>
        <View style={styles.mainContainer}>
          <View style={styles.modalHeader}>
            <TitleH1
              title={Labels.epdsSurvey.beContacted.title}
              animated={false}
              style={{ paddingTop: Paddings.default }}
            />
            <CloseButton onPress={onCloseModalButtonPressed} clear={true} />
          </View>
          <ScrollView style={{ paddingEnd: PADDINGS_CONTAINER }}>
            {swiperCurrentIndex == 0 ? stepTypes() : null}
            {swiperCurrentIndex == 1 ? (
              <View style={{ width: width }}>
                <BeContactedForm
                  byEmail={isEmailSelected()}
                  bySms={isSmsSelected()}
                  validForm={onValidFormUpdate}
                  setData={onDataFormUpdate}
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
                  action={onPreviousButtonPressed}
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
