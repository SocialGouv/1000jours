import { filter } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { Alert, Linking, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import type { ArticleLink } from "../../types";
import { CommonText } from "../StyledText";
import { View } from "../Themed";

interface Props {
  linksArray: ArticleLink[];
}

const Links: FC<Props> = ({ linksArray }) => {
  const goToUrl = (url: string) => {
    if (url && url.length > 0) {
      void Linking.canOpenURL(url).then((supported: boolean) => {
        if (supported) void Linking.openURL(url);
        else Alert.alert(Labels.invalidLink);
      });
    } else Alert.alert(Labels.invalidLink);
  };

  return (
    <View style={styles.linksContainer}>
      {filter(linksArray, "label").map((item, index) => (
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
    fontSize: 10,
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
