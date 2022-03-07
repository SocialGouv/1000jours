import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import type { IconNode } from "react-native-elements/dist/icons/Icon";

import { Colors, Paddings, Sizes } from "../../styles";
import { SecondaryText } from "./StyledText";

interface Props {
  expandedText: string;
  icon: IconNode;
  buttonColor: string;
}

const ExpandableButton: React.FC<Props> = ({
  expandedText,
  icon,
  buttonColor,
}) => {
  const [expandButton, setExpandButton] = useState(false);
  const backgroundColor = { backgroundColor: buttonColor };

  const expandButtonPressed = useCallback(() => {
    setExpandButton(!expandButton);
  }, [expandButton]);

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          accessibilityLabel={expandedText}
          style={[styles.buttonStyle, backgroundColor]}
          onPress={expandButtonPressed}
        >
          {icon}
        </TouchableOpacity>
      </View>
      {expandButton && (
        <Animatable.View
          animation="fadeInLeft"
          duration={1000}
          delay={0}
          style={[styles.moreInfoContainer, backgroundColor]}
        >
          <SecondaryText style={styles.moreInfo}>{expandedText}</SecondaryText>
        </Animatable.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    left: Paddings.light,
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
  buttonStyle: {
    alignItems: "center",
    borderRadius: Sizes.xxxl,
    elevation: 10,
    height: Sizes.xxxl,
    justifyContent: "center",
    shadowColor: Colors.backdrop,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    width: Sizes.xxxl,
  },
  moreInfo: {
    color: Colors.white,
    fontSize: Sizes.md,
    paddingLeft: Paddings.larger,
  },
  moreInfoContainer: {
    alignItems: "center",
    borderRadius: Sizes.xxxl,
    height: Sizes.xxxl,
    justifyContent: "center",
    left: Paddings.light,
    paddingHorizontal: Paddings.larger,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
});

export default ExpandableButton;
