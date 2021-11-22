import * as React from "react";
import { Modal, StyleSheet, View } from "react-native";

import { Colors, Labels, Margins, Paddings, Sizes } from "../../constants";
import { Button, Icomoon, IcomoonIcons, SecondaryText, TitleH1 } from "..";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const ModalContactReminder: React.FC<Props> = ({ setIsVisible }) => {
  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal>
      <View style={styles.behindOfModal}>
        <View style={styles.mainContainer}>
          <View style={{ alignItems: "center" }}>
            <Icomoon
              name={IcomoonIcons.email}
              size={40}
              color={Colors.primaryBlue}
            />
            <TitleH1
              title={Labels.epdsSurvey.beContacted.button}
              animated={false}
              style={styles.title}
            />
            <SecondaryText style={styles.description}>
              {Labels.epdsSurvey.beContacted.reminderBeContacted}
            </SecondaryText>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title={Labels.buttons.close}
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
                title={Labels.epdsSurvey.beContacted.button}
                titleStyle={[
                  styles.buttonTitleStyle,
                  { textTransform: "uppercase" },
                ]}
                rounded={true}
                disabled={false}
                action={() => {
                  hideModal();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  behindOfModal: {
    alignItems: "center",
    backgroundColor: Colors.transparentGrey,
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonTitleStyle: {
    fontSize: Sizes.sm,
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: Margins.larger,
  },
  description: {
    textAlign: "center",
  },
  mainContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Sizes.xs,
    margin: Margins.default,
    padding: Paddings.larger,
  },
  title: {
    marginVertical: Margins.default,
  },
});

export default ModalContactReminder;
