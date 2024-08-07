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
  GraphQLLoader,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  CalendarDbQueries,
  FetchPoliciesConstants,
  Formats,
  Labels,
  PlatformConstants,
  StorageKeysConstants,
} from "../../constants";
import { USER_SITUATIONS } from "../../constants/profile.constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type {
  Event,
  ProfileGender,
  RootStackParamList,
  UserContext,
  UserSituation,
} from "../../types";
import {
  NotificationUtils,
  StepUtils,
  StorageUtils,
  TndNotificationUtils,
  TrackerUtils,
} from "../../utils";
import { NotificationType, cancelScheduleEventsNotification, getAllNotificationsByType, scheduleEventsNotification } from "../../utils/notifications/notification.util";
import { checkErrorOnProfile } from "../../utils/step/step.util";
import { useEvents } from "../../hooks";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { formattedEvents } from "../../utils/events/event.util";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Profile: FC<Props> = ({ navigation }) => {
  const imageProfile = require("../../assets/images/profile.png");
  const defaultUserContext: UserContext = {
    childBirthday: null,
    situations: USER_SITUATIONS,
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
    const genderStored: ProfileGender | null =
      await StorageUtils.getObjectValue(StorageKeysConstants.userGenderKey);
    setGender(genderStored ?? genderEmpty);
  };

  const [fetchEvents, { loading, error, data, called, refetch }] = useLazyQuery(
    gql(CalendarDbQueries.ALL_EVENTS),
    {
      fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
      onCompleted: async (data) => {
        const evenements = (data as { evenements: Event[] }).evenements;
        const events = formattedEvents(evenements, childBirthday);
        await cancelScheduleEventsNotification();
        await scheduleEventsNotification(events);
        navigateToRoot();
      },
      onError: (e: any) => {
        console.warn(e);
      },
    }
  );

  useEffect(() => {
    const initDataWithStorageValue = async () => {
      const userSituationsStored = (await StorageUtils.getObjectValue(
        StorageKeysConstants.userSituationsKey
      )) as UserSituation[] | null;

      if (
        userSituationsStored &&
        userSituationsStored.length == defaultUserContext.situations.length
      )
        setUserSituations(userSituationsStored);
      else {
        setUserSituations(() => {
          return defaultUserContext.situations.map((item) => {
            const situation = userSituationsStored?.find(
              (s) => s.id === item.id
            );
            if (item.id === situation?.id) {
              return { ...item, isChecked: situation.isChecked };
            } else {
              return item;
            }
          });
        });
      }

      const childBirthdayStr =
        (await StorageUtils.getStringValue(
          StorageKeysConstants.userChildBirthdayKey
        )) ?? "";
      setChildBirthday(childBirthdayStr);
      setDatePickerIsReady(true);
    };
    void initDataWithStorageValue();
    void initGender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const resetNextStep = async () => {
    await NotificationUtils.cancelScheduleNextStepNotification();
    await StorageUtils.multiRemove([
      StorageKeysConstants.currentStep,
      StorageKeysConstants.currentStepId,
    ]);
  };

  const validateForm = useCallback(async () => {
    const checkedUserSituation =
      StepUtils.getCheckedUserSituationOrUndefined(userSituations);
    const errorOnProfile = checkErrorOnProfile(checkedUserSituation, childBirthday);
    
    if (errorOnProfile) {
      Alert.alert(Labels.warning, errorOnProfile, [{ text: "OK" }]);
      return;
    }

    await StorageUtils.storeObjectValue(
      StorageKeysConstants.userSituationsKey,
      userSituations
    );

    await StorageUtils.storeObjectValue(
      StorageKeysConstants.userGenderKey,
      gender
    );

    await StorageUtils.storeStringValue(
      StorageKeysConstants.lastProfileUpdate,
      format(new Date(), Formats.dateISO)
    );

    if (checkedUserSituation?.childBirthdayRequired) {
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        childBirthday
      );
    } else {
      await StorageUtils.removeKey(StorageKeysConstants.userChildBirthdayKey);
    }

    // Envoi de la situation sélectionnée sur Matomo
    if (checkedUserSituation) {
      setTrackerAction(checkedUserSituation.label);
    }

    if (checkedUserSituation?.childBirthdayRequired && childBirthday) {
      // Envoi de la date sélectionnée sur Matomo
      setTrackerAction(`${Labels.birthdate} : ${childBirthday}`);

      // Programme les notifications pour passer le repérage TND
      const notifs = await NotificationUtils.getAllNotificationsByType(
        NotificationType.tnd
      );
      const isFirstTime = notifs.length === 0;
      void TndNotificationUtils.scheduleTndNotifications(
        childBirthday,
        isFirstTime
      );
    }

    // Envoi du genre sélectionné sur Matomo
    setTrackerAction(`${Labels.profile.gender.label} : ${gender.label}`);

    // Annule la notification 'NextStep' et supprime les données concernant l'étape courante
    await resetNextStep();

    if(checkedUserSituation?.childBirthdayRequired && childBirthday) {
      await fetchEvents();
    } else {
      await cancelScheduleEventsNotification();
      navigateToRoot();
    }
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

  const onGenderPressed = useCallback(
    (item: ProfileGender) => () => {
      setGender(item);
    },
    []
  );

  const isSelectedGender = (profileGender: ProfileGender) => {
    return profileGender.id === gender.id;
  };

  return (
    <>
      {loading ? 
        <GraphQLLoader noLoader={false} noLoaderBackdrop={false} /> : null
      }
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
                            isSelectedGender(item)
                              ? styles.itemTextSelected
                              : null
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
    </>
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
    marginBottom: Margins.default,
    paddingTop: Paddings.default,
  },
  genderItem: {
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Paddings.smallest,
    paddingVertical: Paddings.default,
  },
  genderItemContainer: {
    width: "50%",
  },
  genderItemsContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
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
