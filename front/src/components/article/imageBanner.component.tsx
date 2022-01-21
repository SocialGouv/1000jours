import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";

import type { Visuel } from "../../types";
import { getVisuelFormat, VisuelFormat } from "../../utils/visuel.util";

interface Props {
  visuel: Visuel | undefined;
}

const ImageBanner: FC<Props> = ({ visuel }) => {
  return (
    <Image
      source={{
        uri: getVisuelFormat(visuel, VisuelFormat.medium),
      }}
      containerStyle={[styles.articleImage]}
    />
  );
};

const styles = StyleSheet.create({
  articleImage: {
    height: 150,
    marginBottom: 15,
    marginTop: 15,
    width: "100%",
  },
});

export default ImageBanner;
