import type { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { BackButton, TitleH1 } from "../components";
import { Labels, Paddings } from "../constants";
import type { TabSearchParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<TabSearchParamList>;
}

const TabSearchScreen: FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={[styles.mainContainer]}>
      <TitleH1
        title={Labels.search.title}
        description={Labels.search.findAdaptedResponses}
        animated={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.default,
    paddingTop: Paddings.default,
  },
});

export default TabSearchScreen;
