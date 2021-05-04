import type { StackNavigationProp } from "@react-navigation/stack";
import { filter, find } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import ProfileImage from "../assets/images/Humaaans_Space_1.svg";
import Button from "../components/form/Button";
import Checkbox from "../components/form/Checkbox";
import InputDate from "../components/form/InputDate";
import HeaderApp from "../components/HeaderApp";
import Icomoon, { IcomoonIcons } from "../components/Icomoon";
import { CommonText } from "../components/StyledText";
import { View } from "../components/Themed";
import { Colors, FontWeight, Labels, userProfileKey } from "../constants";
import type { RootStackParamList, UserContext, UserSituation } from "../types";
import { StorageUtils } from "../utils";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "profile">;
}

const Profile: FC<Props> = ({ navigation }) => {
  const image = <ProfileImage />;

  const defaultUserContext: UserContext = {
    childBirthday: null,
    situations: [
      { id: 1, isChecked: false, label: Labels.profile.situations.project },
      { id: 2, isChecked: false, label: Labels.profile.situations.search },
      { id: 3, isChecked: false, label: Labels.profile.situations.pregnant },
      { id: 4, isChecked: false, label: Labels.profile.situations.oneChild },
      {
        id: 5,
        isChecked: false,
        label: Labels.profile.situations.severalChildren,
      },
    ],
  };
  const userSituationsIdsWhereChildBirthdayIsNeeded = [3, 4, 5];
  const hasCheckedSituation = () => {
    return filter(userSituations, ["isChecked", true]).length > 0;
  };

  const canValidateForm = () => {
    if (!hasCheckedSituation()) return false;
    if (!childBirthdayIsNeeded()) return true;
    // vérifie que jour, mois et année sont remplis
    return day.length > 0 && month.length > 0 && year.length === 4;
  };
  const [canValidate, setCanValidate] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [userSituations, setUserSituations] = useState<UserSituation[]>(
    defaultUserContext.situations
  );

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

  const validateForm = () => {
    if (!childBirthdayIsNeeded() || isValidDate(+day, +month, +year)) {
      navigation.navigate("root");
    } else {
      Alert.alert(Labels.invalidDate);
    }
  };

  const isValidDate = (_day: number, _month: number, _year: number) => {
    const dateStr =
      _year.toString() + "/" + _month.toString() + "/" + _day.toString();
    const date = new Date(dateStr);
    return (
      date.getFullYear() === _year &&
      date.getMonth() === _month - 1 &&
      date.getDate() === _day
    );
  };

  const navigateToRoot = () => {
    void StorageUtils.storeObjectValue(userProfileKey, userSituations);
    navigation.navigate("root");
  };

  useEffect(() => {
    setCanValidate(canValidateForm());
  }, [day, month, year, userSituations]);

  return (
    <View style={[styles.mainContainer, styles.flexColumn]}>
      <HeaderApp />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.mainView}>
          <ScrollView style={styles.mainMargins}>
            <View style={[styles.justifyContentCenter]}>{image}</View>
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
            <View
              style={[
                styles.birthdayConatiner,
                childBirthdayIsNeeded() ? null : styles.hide,
              ]}
            >
              <Text style={[styles.colorPrimaryDark, styles.textAlignCenter]}>
                {getChildBirthdayLabel()}
              </Text>
              <InputDate
                day={day}
                month={month}
                year={year}
                onDayChange={(text) => {
                  setDay(text);
                }}
                onMonthChange={(text) => {
                  setMonth(text);
                }}
                onYearChange={(text) => {
                  setYear(text);
                }}
              />
            </View>
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
  appName: {
    color: Colors.primaryBlueDark,
    fontSize: 25,
    fontWeight: "bold",
  },
  birthdayConatiner: {
    paddingTop: 30,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  checkbox: {
    height: 40,
  },
  choices: {
    alignSelf: "center",
  },
  colorPrimaryDark: {
    color: Colors.primaryBlueDark,
  },
  datepickerContainer: {
    padding: 20,
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
  footer: {
    flex: 1,
    paddingVertical: 10,
  },
  header: {
    height: 44,
    margin: 15,
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
    paddingTop: 30,
  },
  mainMargins: {
    marginHorizontal: 15,
  },
  mainView: {
    flex: 8,
  },
  subTitle: {
    color: Colors.primaryBlue,
    fontSize: 16,
    fontWeight: FontWeight.normal,
    paddingBottom: 30,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 15,
  },
  w100: {
    width: "100%",
  },
});

export default Profile;
