import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";

import { View } from "../components/Themed";
import Colors from "../constants/Colors";

const Article: FC = () => {
  const screenTitle = "Nom de l'étape";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const article = {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg",
    name: "Lorem ipsum dolor sit",
  };

  return (
    <View style={[styles.mainContainer]}>
      <View>
        <Text style={[styles.title]}>{screenTitle}</Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>
      <View>
        <Image
          source={{ uri: article.imageUrl }}
          style={[styles.articleImage]}
        />
        <Text style={[styles.title]}>{article.name}</Text>
        <Text>{article.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleImage: {
    height: 150,
    marginBottom: 15,
    marginTop: 15,
    width: "100%",
  },
  description: {
    color: Colors.textColor,
  },
  mainContainer: {
    padding: 15,
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Article;
