import type { FC } from "react";
import * as React from "react";
import { Linking, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import type { ArticleLink } from "../../types";
import { CommonText } from "../StyledText";
import { View } from "../Themed";

interface Props {
  linksArray: ArticleLink[];
}

const Links: FC<Props> = ({ linksArray }) => {
  const goToUrl = (url: string) => {
    void Linking.openURL(url);
  };

  return (
    <View style={styles.linksContainer}>
      {linksArray.map((item, index) => (
        <CommonText
          key={index}
          style={[styles.link]}
          onPress={() => {
            goToUrl(item.url);
          }}
        >
          {item.label}
        </CommonText>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Colors.commonText,
    flexDirection: "column",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textDecorationLine: "underline",
  },
  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

export default Links;
