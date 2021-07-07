import type { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import { filter, find } from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import ProfileImage from "../assets/images/Humaaans_Space_1.svg";
import { Button, Checkbox, CommonText, Datepicker } from "../components";
import HeaderApp from "../components/base/headerApp.component";
import Icomoon, { IcomoonIcons } from "../components/base/icomoon.component";
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
  navigation: StackNavigationProp<RootStackParamList, "profile">;
}

const Profile: FC<Props> = ({ navigation }) => {
  const { trackScreenView } = useMatomo();
  trackScreenView(TrackerUtils.TrackingEvent.PROFILE);
  const image = <ProfileImage />;
  const defaultUserContext: UserContext = {
    childBirthday: null,
    situations: [
      {
        id: "projet",
        isChecked: false,
        label: Labels.profile.situations.project,
      },
      {
        id: "conception",
        isChecked: false,
        label: Labels.profile.situations.search,
      },
      {
        id: "grossesse",
        isChecked: false,
        label: Labels.profile.situations.pregnant,
      },
      {
        id: "enfant",
        isChecked: false,
        label: Labels.profile.situations.oneChild,
      },
      {
        id: "enfants",
        isChecked: false,
        label: Labels.profile.situations.severalChildren,
      },
    ],
  };
  const userSituationsIdsWhereChildBirthdayIsNeeded = [
    "grossesse",
    "enfant",
    "enfants",
  ];
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
      return (
        userSituation.isChecked &&
        userSituationsIdsWhereChildBirthdayIsNeeded.includes(userSituation.id)
      );
    });
  };
  const childBirthdayIsNeeded = () => {
    const results = getCheckedUserSituationsWhereChildBirthdayIsNeeded();
    return results.length > 0;
  };
  const getChildBirthdayLabel = () => {
    const results = getCheckedUserSituationsWhereChildBirthdayIsNeeded();
    if (find(results, ["id", 3])) {
      return Labels.profile.childBirthday.planned;
    } else if (find(results, ["id", 4])) {
      return Labels.profile.childBirthday.firstChild;
    } else if (find(results, ["id", 5])) {
      return Labels.profile.childBirthday.lastChild;
    }
    return Labels.profile.childBirthday.firstChild;
  };

  const navigateToRoot = () => {
    navigation.navigate("root");
  };

  const validateForm = async () => {
    const error = checkErrorOnProfile(userSituations, childBirthday);
    if (error) {
      Alert.alert(Labels.warning, error, [{ text: "OK" }]);
    } else {
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.userSituationsKey,
        userSituations
      );
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        childBirthday
      );
      void cancelScheduleNextStepNotification();
      navigateToRoot();
    }
  };

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollTo = (positionY: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionY,
    });
  };

  return (
    <View style={[styles.mainContainer, styles.flexColumn]}>
      <HeaderApp />
      <KeyboardAvoidingView
        behavior={PlatformConstants.PLATFORM_IS_IOS ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.mainView}>
          <ScrollView style={styles.mainMargins} ref={scrollViewRef}>
            <View style={[styles.profileImage, styles.justifyContentCenter]}>
              {image}
            </View>
            <CommonText style={[styles.title, styles.textAlignCenter]}>
              {Labels.profile.title}
            </CommonText>
            <CommonText style={[styles.subTitle, styles.textAlignCenter]}>
              {Labels.profile.subTitle}
            </CommonText>
            <View style={[styles.choices]}>
              {userSituations.map((situation, index) => (
                <View key={index}>
                  <Checkbox
                    title={situation.label}
                    checked={situation.isChecked}
                    onPress={() => {
                      updateUserSituations(situation);
                    }}
                  />
                </View>
              ))}
            </View>
            {datePickerIsReady && (
              <View
                style={[
                  styles.birthdayConatiner,
                  childBirthdayIsNeeded() ? null : styles.hide,
                ]}
                onLayout={(event: LayoutChangeEvent) => {
                  const { layout } = event.nativeEvent;
                  scrollTo(layout.y + layout.height);
                }}
              >
                <Text style={[styles.colorPrimaryDark, styles.textAlignCenter]}>
                  {getChildBirthdayLabel()}
                </Text>
                <View>
                  <Datepicker
                    date={
                      childBirthday.length > 0
                        ? new Date(childBirthday)
                        : undefined
                    }
                    onChange={(date) => {
                      setChildBirthday(format(date, Formats.dateISO));
                    }}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </View>

        <View
          style={[
            styles.footer,
            styles.justifyContentCenter,
            styles.mainMargins,
          ]}
        >
          <View style={[styles.buttonsContainer, styles.justifyContentCenter]}>
            <View style={[styles.buttonContainer]}>
              <Button
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
                action={navigateToRoot}
              />
            </View>
            <View style={[styles.buttonContainer]}>
              <Button
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
  birthdayConatiner: {
    paddingTop: Paddings.larger,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  choices: {
    alignSelf: "center",
  },
  colorPrimaryDark: {
    color: Colors.primaryBlueDark,
  },
  datepickerContainer: {
    padding: Paddings.default,
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
  footer: {
    flex: 1,
    paddingVertical: Paddings.light,
  },
  hide: {
    display: "none",
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Paddings.larger,
  },
  mainMargins: {
    marginHorizontal: Margins.default,
  },
  mainView: {
    flex: 8,
  },
  profileImage: {
    padding: Paddings.default,
  },
  subTitle: {
    color: Colors.primaryBlue,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.normal,
    paddingBottom: Paddings.larger,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: "bold",
    paddingVertical: Paddings.light,
  },
  w100: {
    width: "100%",
  },
});

export default Profile;
