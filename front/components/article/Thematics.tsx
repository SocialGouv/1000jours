import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import type { ThematiqueContainer } from "../../types";
import { CommonText } from "../StyledText";
import { View } from "../Themed";

interface Props {
  items: ThematiqueContainer[];
}

const Thematics: FC<Props> = ({ items }) => {
  return (
    <View style={[styles.flexStart]}>
      {items.map((thematiqueContainer, index) => {
        return (
          <View style={[styles.thematiqueContainer]} key={index}>
            <CommonText style={[styles.thematique]}>
              {thematiqueContainer.thematique.nom}
            </CommonText>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  thematique: {
    color: Colors.primaryBlue,
  },
  thematiqueContainer: {
    backgroundColor: Colors.primaryBlueLight,
    borderRadius: 8,
    marginRight: 8,
    padding: 6,
  },
});

export default Thematics;
