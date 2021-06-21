import * as React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import {
  Button,
  CommonText,
  Icomoon,
  IcomoonIcons,
  TitleH1,
} from "../../components";
import { Colors, Labels, Margins, Paddings, Sizes } from "../../constants";

interface ListModalMenuProps {
  visible: boolean;
  hideModal: () => void;
}

const AroundMeFilter: React.FC<ListModalMenuProps> = ({
  visible,
  hideModal,
}) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.mainContainer}>
        <TitleH1 title={Labels.aroundMe.filter.title} animated={false} />
        <TouchableOpacity
          style={styles.closeModalView}
          onPress={() => {
            hideModal();
          }}
        >
          <Icomoon
            name={IcomoonIcons.fermer}
            size={14}
            color={Colors.primaryBlue}
          />
        </TouchableOpacity>
        <CommonText style={styles.partsTitle}>
          {Labels.aroundMe.filter.pointsOfInterest}
        </CommonText>
        <CommonText style={styles.partsTitle}>
          {Labels.aroundMe.filter.thematics}
        </CommonText>
        <CommonText style={styles.partsTitle}>
          {Labels.aroundMe.filter.steps}
        </CommonText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title={Labels.buttons.cancel}
              titleStyle={styles.buttonTitleStyle}
              rounded={false}
              disabled={false}
              icon={
                <Icomoon
                  name={IcomoonIcons.fermer}
                  size={14}
                  color={Colors.primaryBlue}
                />
              }
                action={() => {
                  hideModal();
                }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={Labels.buttons.validate}
              titleStyle={styles.buttonTitleStyle}
              rounded={true}
              disabled={false}
              action={() => {
                hideModal();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  buttonTitleStyle: {
    fontSize: Sizes.sm,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  closeModalView: {
    margin: Margins.default,
    position: "absolute",
    right: 0,
    top: 0,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    borderWidth: 1,
    flex: 1,
    justifyContent: "space-between",
    margin: Margins.default,
    padding: Paddings.default,
  },
  partsTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: "bold",
  },
});

export default AroundMeFilter;
