import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import type { Thematique } from "../../types";
import { SecondaryText } from "../StyledText";
import { View } from "../Themed";

interface Props {
  items: Thematique[];
}

const Thematics: FC<Props> = ({ items }) => {
  return (
    <View style={[styles.flexStart]}>
      {items.map((thematique, index) => {
        return (
          <View style={[styles.thematiqueContainer]} key={index}>
            <SecondaryText style={[styles.thematique]}>
              {thematique.nom}
            </SecondaryText>
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
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
  },
  thematiqueContainer: {
    backgroundColor: Colors.primaryBlueLight,
    borderRadius: Sizes.xxxxxs,
    marginBottom: Margins.smallest,
    marginRight: Margins.smaller,
    padding: Margins.smaller,
  },
});

export default Thematics;
