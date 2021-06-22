import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import SlidingUpPanel from "rn-sliding-up-panel";

import { CommonText } from "../../components";
import { View } from "../../components/Themed";
import { Colors, FontWeight, Labels, Margins, Sizes } from "../../constants";
import type { CartographiePoisFromDB } from "../../type";
import AddressDetails from "./addressDetails.component";

interface Props {
  poisArray: CartographiePoisFromDB[];
}

const SlidingUpPanelAddressesList: React.FC<Props> = ({ poisArray }) => {
  const height = Dimensions.get("window").height;
  return (
    <SlidingUpPanel draggableRange={{ bottom: height / 8, top: height - 120 }}>
      <View style={styles.slidingUpPanelView}>
        <View style={styles.swipeIndicator} />
        <CommonText style={styles.addressesListLabel}>
          {Labels.aroundMe.addressesListLabelStart} {poisArray.length}{" "}
          {Labels.aroundMe.addressesListLabelEnd}
        </CommonText>
        <ScrollView>
          {poisArray.map((poi, poiIndex) => (
            <View key={poiIndex}>
              <Card style={styles.card}>
                <AddressDetails details={poi} />
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  addressesListLabel: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
  },
  card: {
    borderBottomColor: Colors.cardGrey,
    borderBottomWidth: 1,
    margin: Margins.smaller,
  },
  slidingUpPanelScrollView: {
    marginHorizontal: Margins.default,
  },
  slidingUpPanelView: {
    borderTopEndRadius: Sizes.xxxl,
    borderTopStartRadius: Sizes.xxxl,
    height: "100%",
  },
  swipeIndicator: {
    alignSelf: "center",
    backgroundColor: Colors.navigation,
    borderRadius: Sizes.xs,
    height: Sizes.xxxxxxs,
    marginBottom: Margins.smaller,
    marginTop: Margins.larger,
    width: Sizes.xxxl,
  },
});

export default SlidingUpPanelAddressesList;
