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

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "profile">;
}

const Profile: FC<Props> = ({ navigation }) => {
  const appName = "1000 JOURS APP'";
  const image = <ProfileImage />;
  const title = "Votre profil";

  const defaultUserContext: UserContext = {
    childBirthday: null,
    situations: [
      { id: 1, isChecked: false, label: "J'ai en projet d'avoir un enfant" },
      { id: 2, isChecked: false, label: "Je cherche à concevoir un enfant" },
      { id: 3, isChecked: false, label: "J'attends un enfant" },
      { id: 4, isChecked: false, label: "J'ai un enfant" },
      { id: 5, isChecked: false, label: "J'ai plusieurs enfants" },
      { id: 6, isChecked: false, label: "Je suis un professionnel de santé" },
    ],
  };
  const userSituationsIdsWhereChildBirthdayIsNeeded = [3, 4, 5];
  const hasCheckedSituation = () => {
    return filter(userSituations, ["isChecked", true]).length > 0;
  };

  const canValidateForm = () => {
    if (hasCheckedSituation()) {
      if (childBirthdayIsNeeded()) {
        return day.length > 0 && month.length > 0 && year.length === 4;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const [canValidate, setCanValidate] = React.useState<boolean>(false);
  const [day, setDay] = React.useState<string>("");
  const [month, setMonth] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");
  const [userSituations, setUserSituations] = React.useState<UserSituation[]>(
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
      return "Naissance prévue de votre enfant";
    } else if (find(results, ["id", 4])) {
      return "Date de naissance de votre enfant";
    } else if (find(results, ["id", 5])) {
      return "Date de naissance de votre enfant le plus jeune";
    }
    return "Date de naissance de votre enfant";
  };

  const validateForm = () => {
    if (isValidDate(+day, +month, +year)) {
      navigation.navigate("root");
    } else {
      console.log("Invalid Date");
      Alert.alert(Labels.invalidDate);
    }
  };

  const isValidDate = (_day: number, _month: number, _year: number) => {
    const dateStr =
      _year.toString() + "/" + _month.toString() + "/" + _day.toString();
    const d = new Date(dateStr);
    if (
      d.getFullYear() === _year &&
      d.getMonth() === _month - 1 &&
      d.getDate() === _day
    ) {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    setCanValidate(canValidateForm());
  });

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
          ></InputDate>
        </View>
        <View style={[styles.footer, styles.justifyContentCenter]}>
          <View>
            <Button
              title="Passer"
              rounded={false}
              disabled={false}
              action={() => {
                navigation.navigate("root");
              }}
            />
          </View>
          <View>
            <Button
              title="Valider"
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
