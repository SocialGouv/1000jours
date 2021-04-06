import type { StackNavigationProp } from "@react-navigation/stack";
import { filter, find } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";

import ProfileImage from "../assets/images/Humaaans_Space_1.svg";
import Button from "../components/form/Button";
import Checkbox from "../components/form/Checkbox";
import InputDate from "../components/form/InputDate";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type { RootStackParamList, UserContext, UserSituation } from "../types";
import { useEffect, useState } from "react";
import { storeObjectValue } from "../storage/storage-utils";
import { userProfileKey } from "../storage/storage-keys";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "profile">;
}

const Profile: FC<Props> = ({ navigation }) => {
  const appName = Labels.appName;
  const image = <ProfileImage />;
  const title = Labels.profile.title;

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
      { id: 6, isChecked: false, label: Labels.profile.situations.pro },
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
    if (isValidDate(+day, +month, +year)) {
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
    void storeObjectValue(userProfileKey, userSituations);
    navigation.navigate("root");
  };

  useEffect(() => {
    setCanValidate(canValidateForm());
  }, [day, month, year, userSituations]);

  return (
    <View style={[styles.mainContainer]}>
      <View style={[styles.header, styles.justifyContentCenter]}>
        <Text style={[styles.appName]}>{appName}</Text>
      </View>
      <ScrollView style={[styles.body]}>
        <View style={[styles.justifyContentCenter]}>{image}</View>
        <Text style={[styles.title, styles.textAlignCenter]}>{title}</Text>
        <View style={[styles.choices]}>
          {userSituations.map((situation, index) => {
            return (
              <View key={index}>
                <Checkbox
                  title={situation.label}
                  checked={situation.isChecked}
                  onPress={() => {
                    updateUserSituations(situation);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={[childBirthdayIsNeeded() ? null : styles.hide]}>
          <Text style={[styles.colorPrimary, styles.textAlignCenter]}>
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
        <View style={[styles.footer, styles.justifyContentCenter]}>
          <View>
            <Button
              title={Labels.buttons.pass}
              rounded={false}
              disabled={false}
              action={navigateToRoot}
            />
          </View>
          <View>
            <Button
              title={Labels.buttons.validate}
              rounded={true}
              disabled={!canValidate}
              action={validateForm}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appName: {
    color: Colors.primaryBlue,
    fontSize: 25,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
  },
  checkbox: {
    height: 40,
  },
  choices: {
    flex: 1,
    padding: 15,
  },
  colorPrimary: {
    color: Colors.primaryBlue,
  },
  datepickerContainer: {
    padding: 20,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 15,
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
  },
  w100: {
    width: "100%",
  },
});

export default Profile;
