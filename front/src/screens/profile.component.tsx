/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import _, { filter } from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AppLogo from "../assets/images/logo.svg";
import {
  CommonText,
  CustomButton,
  Datepicker,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
} from "../components";
import { View } from "../components/Themed";
import {
  Colors,
  FontWeight,
  Formats,
  Labels,
  Margins,
  Paddings,
  PlatformConstants,
  Sizes,
  StorageKeysConstants,
} from "../constants";
import type { RootStackParamList, UserContext, UserSituation } from "../types";
import { StorageUtils, TrackerUtils } from "../utils";
import { cancelScheduleNextStepNotification } from "../utils/notification.util";
import { checkErrorOnProfile } from "../utils/step.util";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Profile: FC<Props> = ({ navigation }) => {
  const imageProfile = require("../assets/images/profile.png");
  const { trackScreenView } = useMatomo();
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

  const hasCheckedSituation = () => {
    return filter(userSituations, ["isChecked", true]).length > 0;
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

  useEffect(() => {
    trackScreenView(TrackerUtils.TrackingEvent.PROFILE);
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
  }, []);

  useEffect(() => {
    setCanValidate(canValidateForm());
  }, [childBirthday, userSituations]);

  const updateUserSituations = (userSituation: UserSituation) => {
    setUserSituations(() => {
      return defaultUserContext.situations.map((item) => {
        if (item.id === userSituation.id) {
          return { ...item, isChecked: !userSituation.isChecked };
        } else {
          return item;
        }
      });
    });
  };

  const getCheckedUserSituationsWhereChildBirthdayIsNeeded = () => {
    return filter(userSituations, (userSituation) => {
      return userSituation.isChecked && userSituation.childBirthdayRequired;
    });
  };
  const childBirthdayIsNeeded = () => {
    const results = getCheckedUserSituationsWhereChildBirthdayIsNeeded();
    return results.length > 0;
  };

  const navigateToRoot = () => {
    navigation.navigate("root");
  };

  const validateForm = async () => {
    const error = checkErrorOnProfile(userSituations, childBirthday);
    if (error) {
      Alert.alert(Labels.warning, error, [{ text: "OK" }]);
      return;
    }

    await StorageUtils.storeObjectValue(
      StorageKeysConstants.userSituationsKey,
      userSituations
    );

    const situationChecked = _.find(userSituations, { isChecked: true });
    if (situationChecked?.childBirthdayRequired) {
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        childBirthday
      );
    } else {
      await StorageUtils.removeKey(StorageKeysConstants.userChildBirthdayKey);
    }

    // Envoie la situation choisie sur Matomo
    if (situationChecked) {
      trackScreenView(
        `${TrackerUtils.TrackingEvent.PROFILE} - ${situationChecked.label}`
      );
    }

    void cancelScheduleNextStepNotification();
    navigateToRoot();
  };

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollTo = () => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionOfScroll,
    });
  };

  return (
    <View style={[styles.mainContainer]}>
      <KeyboardAvoidingView
        behavior={PlatformConstants.PLATFORM_IS_IOS ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.mainView}>
          <ScrollView style={styles.mainMargins} ref={scrollViewRef}>
            <View style={styles.appLogo}>
              <AppLogo
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
            <View
              onLayout={(event: LayoutChangeEvent) => {
                const { layout } = event.nativeEvent;
                setPositionOfScroll(layout.y + layout.height);
              }}
            >
              {userSituations.map((situation, index) => (
                <View
                  key={index}
                  style={[
                    styles.item,
                    situation.isChecked ? styles.itemSelected : null,
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      updateUserSituations(situation);
                      scrollTo();
                    }}
                    disabled={situation.isChecked}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: situation.isChecked }}
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
                              onChange={(date) => {
                                setChildBirthday(format(date, Formats.dateISO));
                              }}
                              color={Colors.primaryYellow}
                            />
                          </View>
                        </View>
                      )}
                  </View>
                </View>
              ))}
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
                action={() => {
                  trackScreenView(
                    `${TrackerUtils.TrackingEvent.PROFILE} - ${Labels.buttons.pass}`
                  );
                  navigateToRoot();
                }}
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
  },
  genderItem: {
    alignContent: "space-between",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.default,
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
