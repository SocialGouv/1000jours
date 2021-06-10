import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Margins, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import type { Thematique } from "../../types";
import { CommonText } from "../StyledText";
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
            <CommonText style={[styles.thematique]}>
              {thematique.nom}
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
    borderRadius: Sizes.xxxxxs,
    marginBottom: Margins.smallest,
    marginRight: Margins.smaller,
    padding: Margins.smaller,
  },
});

export default Thematics;
