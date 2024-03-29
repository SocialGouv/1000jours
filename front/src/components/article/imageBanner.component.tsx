import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";

import { Sizes } from "../../styles";
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
      height={200}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  articleImage: {
    borderTopLeftRadius: Sizes.xxxxs,
    borderTopRightRadius: Sizes.xxxxs,
    height: 200,
    width: "100%",
  },
});

export default ImageBanner;
