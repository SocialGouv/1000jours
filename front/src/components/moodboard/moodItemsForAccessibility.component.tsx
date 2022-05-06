import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Colors, Margins, Paddings } from "../../styles";
import { MOODBOARD_ITEMS } from "../../utils/moodboard.util";

interface Props {
  setActiveIndex: any;
  firstItemIndexToShow: number;
}

const MoodItemsForAccessibility: React.FC<Props> = ({
  setActiveIndex,
  firstItemIndexToShow,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(firstItemIndexToShow);

  const onItemPressed = useCallback(
    (index: number) => () => {
      setSelectedIndex(index);
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const items = MOODBOARD_ITEMS.map((item, index) => (
    <TouchableOpacity
      key={index}
      accessibilityRole="radio"
      accessibilityState={{ selected: index == selectedIndex }}
      onPress={onItemPressed(index)}
      style={[
        styles.itemContainer,
        index == selectedIndex ? { backgroundColor: item.color } : null,
      ]}
    >
      <Text
        style={[
          styles.itemLabel,
          index == selectedIndex ? styles.itemitemLabelWhite : null,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  ));

  return <View>{items}</View>;
};

const styles = StyleSheet.create({
  containerGroup: {
    marginTop: Margins.default,
  },
  itemContainer: {
    alignItems: "center",
    borderColor: Colors.black,
    borderWidth: 1,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smallest,
  },
  itemLabel: {
    padding: Paddings.default,
  },
  itemitemLabelWhite: {
    color: Colors.white,
  },
});

export default MoodItemsForAccessibility;
