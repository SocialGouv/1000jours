/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { BaseAssets } from "../../components/assets";
import {
  CommonText,
  CustomButton,
  Datepicker,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  Formats,
  Labels,
  PlatformConstants,
  StorageKeysConstants,
} from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type {
  ProfileGender,
  RootStackParamList,
  UserContext,
  UserSituation,
} from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";
import { cancelScheduleNextStepNotification } from "../../utils/notification.util";
import { checkErrorOnProfile } from "../../utils/step.util";
import { TrackerEvent } from "../../type";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Profile: FC<Props> = ({ navigation }) => {
  const imageProfile = require("../../assets/images/profile.png");
  const defaultUserContext: UserContext = {
    childBirthday: null,
    situations: [
      {
        childBirthdayLabel: "",
        childBirthdayRequired: false,
        id: "projet",
        isChecked: false,
        label: Labels.profile.situations.project,
      },
      {
        childBirthdayLabel: "",
        childBirthdayRequired: false,
        id: "conception",
        isChecked: false,
        label: Labels.profile.situations.search,
      },
      {
        childBirthdayLabel: Labels.profile.childBirthday.planned,
        childBirthdayRequired: true,
        id: "grossesse",
        isChecked: false,
        label: Labels.profile.situations.pregnant,
      },
      {
        childBirthdayLabel: Labels.profile.childBirthday.firstChild,
        childBirthdayRequired: true,
        id: "enfant",
        isChecked: false,
        label: Labels.profile.situations.oneChild,
      },
      {
        childBirthdayLabel: Labels.profile.childBirthday.lastChild,
        childBirthdayRequired: true,
        id: "enfants",
        isChecked: false,
        label: Labels.profile.situations.severalChildren,
      },
    ],
  };

  const genderEmpty = {
    id: "empty",
    label: Labels.profile.gender.empty,
  };

  const genders: ProfileGender[] = [
    {
      id: "man",
      label: Labels.profile.gender.man,
    },
    {
      id: "woman",
      label: Labels.profile.gender.woman,
    },
    {
      id: "other",
      label: Labels.profile.gender.other,
    },
    genderEmpty,
  ];
  const defaultGender = _.find(genders, ["id", "empty"]);

  const hasCheckedSituation = () => {
    return _.filter(userSituations, ["isChecked", true]).length > 0;
  };

  const canValidateForm = () => {
    if (!hasCheckedSituation()) return false;
    if (!childBirthdayIsNeeded()) return true;
    // vérifie que la date est bien remplie;
    return childBirthday.length > 0;
  };
  const [canValidate, setCanValidate] = useState(false);
  const [childBirthday, setChildBirthday] = useState("");
  const [userSituations, setUserSituations] = useState<UserSituation[]>(
    defaultUserContext.situations
  );
  const [datePickerIsReady, setDatePickerIsReady] = useState(false);
  const [positionOfScroll, setPositionOfScroll] = useState(0);
  const [trackerAction, setTrackerAction] = useState<string>("");
  const [gender, setGender] = useState<ProfileGender>(genderEmpty);

  const initGender = async () => {
    const genderStored = await StorageUtils.getObjectValue(StorageKeysConstants.userGenderKey);
    setGender(genderStored ?? genderEmpty);
  };

  useEffect(() => {
    const initDataWithStorageValue = async () => {
      const userSituationsStored = (await StorageUtils.getObjectValue(
        StorageKeysConstants.userSituationsKey
      )) as UserSituation[] | null;
      if (userSituationsStored) setUserSituations(userSituationsStored);

      const childBirthdayStr =
        (await StorageUtils.getStringValue(
          StorageKeysConstants.userChildBirthdayKey
        )) ?? "";
      setChildBirthday(childBirthdayStr);
      setDatePickerIsReady(true);
    };
    void initDataWithStorageValue();
    void initGender();
  }, []);

  useEffect(() => {
    setCanValidate(canValidateForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childBirthday, userSituations]);

  const updateUserSituations = useCallback(
    (userSituation: UserSituation) => {
      setUserSituations(() => {
        return defaultUserContext.situations.map((item) => {
          if (item.id === userSituation.id) {
            return { ...item, isChecked: !userSituation.isChecked };
          } else {
            return item;
          }
        });
      });
    },
    [defaultUserContext.situations]
  );

  const getCheckedUserSituationsWhereChildBirthdayIsNeeded = () => {
    return _.filter(userSituations, (userSituation) => {
      return userSituation.isChecked && userSituation.childBirthdayRequired;
    });
  };
  const childBirthdayIsNeeded = () => {
    const results = getCheckedUserSituationsWhereChildBirthdayIsNeeded();
    return results.length > 0;
  };

  const navigateToRoot = useCallback(() => {
    navigation.navigate("root");
  }, [navigation]);

  const validateForm = useCallback(async () => {
    const error = checkErrorOnProfile(userSituations, childBirthday);
    if (error) {
      Alert.alert(Labels.warning, error, [{ text: "OK" }]);
      return;
    }

    await StorageUtils.storeObjectValue(
      StorageKeysConstants.userSituationsKey,
      userSituations
    );

    if(gender) {
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.userGenderKey,
        gender
      );
    }

    const situationChecked = _.find(userSituations, { isChecked: true });
    if (situationChecked?.childBirthdayRequired) {
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        childBirthday
      );
    } else {
      await StorageUtils.removeKey(StorageKeysConstants.userChildBirthdayKey);
    }

    // Envoi de la situation sélectionnée sur Matomo
    if (situationChecked) {
      setTrackerAction(situationChecked.label);
    }

    // Envoi de la date sélectionnée sur Matomo
    if (situationChecked?.childBirthdayRequired && childBirthday) {
      setTrackerAction(`${Labels.birthdate} : ${childBirthday}`);
    }

    // Envoi du genre sélectionné sur Matomo
    if (gender) {
      setTrackerAction(`${Labels.profile.gender} : ${gender.label}`);
    }

    void cancelScheduleNextStepNotification();
    navigateToRoot();
  }, [childBirthday, navigateToRoot, userSituations, gender]);

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollTo = useCallback(() => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionOfScroll,
    });
  }, [positionOfScroll]);

  const onViewLayout = useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setPositionOfScroll(layout.y + layout.height);
  }, []);
  const onCheckboxPressed = useCallback(
    (situation: UserSituation) => () => {
      updateUserSituations(situation);
      scrollTo();
    },
    [scrollTo, updateUserSituations]
  );

  const onUpdatedDate = useCallback((date: Date) => {
    setChildBirthday(format(date, Formats.dateISO));
  }, []);

  const onCloseButtonPressed = useCallback(() => {
    setTrackerAction(Labels.buttons.pass);
    navigateToRoot();
  }, [navigateToRoot]);

  const onGenderPressed = useCallback((item: ProfileGender) => () => {
    setGender(item);
  }, []);

  const isSelectedGender = (profileGender: ProfileGender) => {
    return profileGender.id === gender?.id;
  }

  return (
    <View style={[styles.mainContainer]}>
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.PROFILE}
        actionName={trackerAction}
      />
      <KeyboardAvoidingView
        behavior={PlatformConstants.PLATFORM_IS_IOS ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.mainView}>
          <ScrollView style={styles.mainMargins} ref={scrollViewRef}>
            <View style={styles.appLogo}>
              <BaseAssets.AppLogo
                height={Sizes.logo}
                accessible
                accessibilityRole="image"
                accessibilityLabel={`${Labels.accessibility.logoApp} ${Labels.appName}`}
              />
            </View>
            <View style={styles.justifyContentCenter}>
              <Image
                source={imageProfile}
                style={styles.imageProfile}
                accessible
                accessibilityRole="image"
                accessibilityLabel={Labels.accessibility.illustrationProfile}
              />
            </View>
            <CommonText style={[styles.title, styles.textAlignCenter]}>
              {Labels.profile.title}
            </CommonText>
            <CommonText style={[styles.subTitle, styles.textAlignCenter]}>
              {Labels.profile.subTitle}
            </CommonText>
            <View onLayout={onViewLayout}>
              {userSituations.map((situation, index) => (
                <View
                  key={index}
                  style={[
                    styles.item,
                    situation.isChecked ? styles.itemSelected : null,
                  ]}
                >
                  <TouchableOpacity
                    onPress={onCheckboxPressed(situation)}
                    disabled={situation.isChecked}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: situation.isChecked }}
                    style={styles.itemTouchable}
                  >
                    <SecondaryText
                      style={
                        situation.isChecked
                          ? styles.itemTextSelected
                          : styles.itemText
                      }
                    >
                      {situation.label}
                    </SecondaryText>
                  </TouchableOpacity>
                  <View style={[styles.mainMargins, styles.bgTransparent]}>
                    {situation.isChecked &&
                      situation.childBirthdayRequired &&
                      datePickerIsReady && (
                        <View
                          style={[
                            styles.bgTransparent,
                            styles.birthdayConatiner,
                          ]}
                        >
                          <SecondaryText style={{ color: Colors.white }}>
                            {situation.childBirthdayLabel}
                          </SecondaryText>
                          <View
                            style={[styles.bgTransparent, styles.flexStart]}
                          >
                            <Datepicker
                              date={
                                childBirthday.length > 0
                                  ? new Date(childBirthday)
                                  : undefined
                              }
                              onChange={onUpdatedDate}
                              color={Colors.primaryYellow}
                            />
                          </View>
                        </View>
                      )}
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.genderContainer}>
              <CommonText style={styles.textSelectGender}>
                {`${Labels.profile.gender.select} :`}
              </CommonText>
              <View style={styles.genderItemsContainer}>
                {genders.map((item, index) => (
                  <View key={index} style={styles.genderItemContainer}>
                    <TouchableOpacity
                      style={[
                        styles.item,
                        styles.genderItem,
                        isSelectedGender(item) ? styles.itemSelected : null,
                      ]}
                      onPress={onGenderPressed(item)}
                      disabled={isSelectedGender(item)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: isSelectedGender(item) }}
                    >
                      <CommonText
                        style={
                          isSelectedGender(item) ? styles.itemTextSelected : null
                        }
                      >
                        {item.label}
                      </CommonText>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={[styles.footer]}>
            <View style={styles.buttonContainer}>
              <CustomButton
                buttonStyle={{ alignItems: "center" }}
                title={Labels.buttons.pass}
                rounded={false}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.fermer}
                    size={14}
                    color={Colors.primaryBlue}
                  />
                }
                action={onCloseButtonPressed}
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                buttonStyle={styles.flexStart}
                title={Labels.buttons.validate}
                rounded={true}
                disabled={!canValidate}
                action={validateForm}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  appLogo: {
    alignItems: "center",
    display: "flex",
    paddingBottom: Paddings.light,
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },
  birthdayConatiner: {
    paddingTop: Paddings.larger,
  },
  buttonContainer: {
    alignContent: "space-between",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  colorPrimaryDark: {
    color: Colors.primaryBlueDark,
  },
  datepickerContainer: {
    backgroundColor: "transparent",
    padding: Paddings.default,
  },
  flexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  flexStart: {
    alignSelf: "flex-start",
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: Paddings.light,
  },
  genderContainer: {
    paddingTop: Paddings.default,
    marginBottom: Margins.default,
  },
  genderItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  genderItemContainer: {
    width: '50%',
  },
  genderItem: {
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Paddings.default,
    paddingHorizontal: Paddings.smallest,
  },
  hide: {
    display: "none",
  },
  imageProfile: {
    height: Sizes.big,
    resizeMode: "contain",
    width: Sizes.big,
  },
  item: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderGrey,
    borderRadius: Sizes.xxxxxs,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: Margins.smaller,
    marginVertical: Margins.light,
    shadowColor: Colors.navigation,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  itemSelected: {
    backgroundColor: Colors.primaryBlueDark,
    borderColor: Colors.primaryBlueDark,
    borderWidth: 1,
    shadowColor: Colors.primaryBlueDark,
  },
  itemText: {
    color: Colors.primaryBlueDark,
  },
  itemTextSelected: {
    color: Colors.white,
    fontWeight: FontWeight.bold,
  },
  itemTouchable: {
    minHeight: Sizes.accessibilityMinButton,
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.default,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    paddingTop: Paddings.larger,
  },
  mainMargins: {
    marginHorizontal: Margins.larger,
  },
  mainView: {
    flex: 1,
    marginTop: Paddings.larger,
  },
  subTitle: {
    color: Colors.primaryBlue,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.normal,
    marginBottom: Paddings.larger,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  textSelectGender: {
    marginHorizontal: Margins.smaller,
    paddingVertical: Paddings.light,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: "bold",
    paddingVertical: Paddings.light,
  },
});

export default Profile;
function trackScreenView(arg0: string) {
  throw new Error("Function not implemented.");
}
