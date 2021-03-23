import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Image, ListItem } from "react-native-elements";

import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import type { TabHomeParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList, "listArticles">;
}

const ListArticles: FC<Props> = ({ navigation }) => {
  const screenTitle = "Nom de l'étape";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const articles = [
    {
      imageUrl:
        "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg",
      name: "Lorem ipsum dolor sit",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg",
      name: "Lorem ipsum dolor sit amet",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg",
      name: "Lorem ipsum dolor sit",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <View style={[styles.mainContainer]}>
      <View>
        <Text style={[styles.title]}>{screenTitle}</Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>
      <View>
        {articles.map((article, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => {
              navigation.navigate("article");
            }}
          >
            <Image
              source={{ uri: article.imageUrl }}
              style={{ height: 100, width: 100 }}
            />
            <ListItem.Content>
              <ListItem.Title style={[styles.articleTitle]}>
                {article.name}
              </ListItem.Title>
              <ListItem.Subtitle style={[styles.articleDescription]}>
                {article.subtitle}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleDescription: {
    color: Colors.textColor,
  },
  articleTitle: {
    color: Colors.primaryColor,
    fontSize: 15,
  },
  description: {
    color: Colors.textColor,
  },
  mainContainer: {
    padding: 15,
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ListArticles;
