import type { StackNavigationProp } from "@react-navigation/stack";
import { filter } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import ProfileImage from "../assets/images/Humaaans_Space_1.svg";
import _Button from "../components/form/_Button";
import _Checkbox from "../components/form/_Checkbox";
import _Datepicker from "../components/form/_DatePicker";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import type { RootStackParamList, UserContext, UserSituation } from "../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "profile">;
}

export const Profile: FC<Props> = ({ navigation }) => {
  const appName = "1000 JOURS APP'";
  const image: React.ReactElement = <ProfileImage />;
  const title = "Votre profil";
  const childBirthdayLabel = "Date de naissance de votre enfant";

  const defaultUserContext: UserContext = {
    childBirthday: undefined,
    situations: [
      { id: 1, isChecked: false, label: "J'ai en projet d'avoir un enfant" },
      { id: 2, isChecked: false, label: "Je cherche à concevoir un enfant" },
      { id: 3, isChecked: false, label: "J'attends un enfant" },
      { id: 4, isChecked: false, label: "J'ai un enfant" },
      { id: 5, isChecked: false, label: "J'ai plusieurs enfants" },
      { id: 6, isChecked: false, label: "Je suis un professionnel de santé" },
    ],
  };

  const hasCheckedSituation = () => {
    return filter(userSituations, ["isChecked", true]).length > 0
      ? true
      : false;
  };

  const [userSituations, setUserSituations] = React.useState<UserSituation[]>(
    defaultUserContext.situations
  );
  const [childBirthday, setChildBirthday] = React.useState<Date | undefined>(
    defaultUserContext.childBirthday
  );
  const [
    hasCheckedUserSituation,
    setHasCheckedSituation,
  ] = React.useState<boolean>(hasCheckedSituation());

  const updateUserSituations = (userSituation: UserSituation) => {
    setUserSituations((previousUserSituations) => {
      return previousUserSituations.map((item) => {
        if (item.id === userSituation.id) {
          return { ...item, isChecked: !userSituation.isChecked };
        } else {
          return item;
        }
      });
    });
  };

  const updateChildBirthday = (date: Date | undefined) => {
    setChildBirthday(() => {
      return date;
    });
  };

  React.useEffect(() => {
    setHasCheckedSituation(hasCheckedSituation());
  }, [userSituations]);

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
                <_Checkbox
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
        <View>
          <Text style={[styles.colorPrimary, styles.textAlignCenter]}>
            {childBirthdayLabel}
          </Text>
          <View style={[styles.datepickerContainer]}>
            <_Datepicker
              date={childBirthday ? childBirthday : new Date()}
              onChange={(event, date) => {
                updateChildBirthday(date);
              }}
            />
          </View>
        </View>
        <View style={[styles.footer, styles.justifyContentCenter]}>
          <View style={[styles.buttonContainer]}>
            <_Button
              title="Passer"
              rounded={false}
              disabled={false}
              action={() => {
                navigation.navigate("root");
              }}
            />
          </View>
          <View style={[styles.buttonContainer]}>
            <_Button
              title="Valider"
              rounded={true}
              disabled={!hasCheckedUserSituation}
              action={() => {
                navigation.navigate("root");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appName: {
    color: Colors.primaryColor,
    fontSize: 25,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  checkbox: {
    height: 40,
  },
  choices: {
    flex: 1,
    padding: 15,
  },
  colorPrimary: {
    color: Colors.primaryColor,
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
    color: Colors.primaryColor,
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
  },
  w100: {
    width: "100%",
  },
});
