import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import CheckBox from "react-native-check-box";

import profileImage from "../assets/images/Humaaans-Space1.png";
import Button from "../components/form/Button";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import type { RootStackParamList, UserContext, UserSituation } from "../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "profile">;
}

export const Profile: FC<Props> = ({ navigation }) => {
  const appName = "1000 JOURS APP'";
  const image: ImageSourcePropType = profileImage;
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

  const hasCheckedSituation = () => {
    for (const userSituation of userSituations) {
      if (userSituation.isChecked) {
        return true;
      }
    }
    return false;
  };

  const [userSituations, setUserSituations] = React.useState<UserSituation[]>(
    defaultUserContext.situations
  );
  const [childBirthday, setChildBirthday] = React.useState<Date | null>(
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

  React.useEffect(() => {
    setHasCheckedSituation(hasCheckedSituation());
    console.log(hasCheckedSituation());
  }, [userSituations]);

  return (
    <View style={[styles.mainContainer]}>
      <View style={[styles.header, styles.justifyContentCenter]}>
        <Text style={[styles.appName]}>{appName}</Text>
      </View>
      <ScrollView style={[styles.body]}>
        <View style={[styles.justifyContentCenter]}>
          <Image source={image} />
        </View>
        <Text style={[styles.title, styles.textAlignCenter]}>{title}</Text>
        <View style={[styles.choices]}>
          {userSituations.map((situation, index) => {
            return (
              <CheckBox
                key={index}
                style={[styles.checkbox]}
                onClick={() => {
                  updateUserSituations(situation);
                }}
                isChecked={situation.isChecked}
                rightText={situation.label}
                checkBoxColor={Colors.primaryColor}
              />
            );
          })}
        </View>
        <View style={[styles.footer, styles.justifyContentCenter]}>
          <View style={[styles.buttonContainer]}>
            <Button
              title="Passer"
              rounded={false}
              disabled={false}
              action={() => {
                navigation.navigate("root");
              }}
            />
          </View>
          <View style={[styles.buttonContainer]}>
            <Button
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
});
