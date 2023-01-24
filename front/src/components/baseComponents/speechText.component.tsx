import * as Speech from "expo-speech";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Labels, StorageKeysConstants } from "../../constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
  Styles,
} from "../../styles";
import { StorageUtils } from "../../utils";
import CloseButton from "./closeButton.component";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";
import { SecondaryText } from "./StyledText";
import { View } from "./Themed";
import TitleH1 from "./titleH1.component";

interface Props {
  textToRead: string;
  buttonTitle?: string;
}

const SpeechText: FC<Props> = ({ buttonTitle, textToRead }) => {
  const [isReadingText, setIsReadingText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [storedVoiceId, setStoredVoiceId] = useState<string | null | undefined>(
    undefined
  );
  const localeFr = "fr-FR";

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const readText = useCallback(() => {
    Speech.stop();
    Speech.speak(textToRead, {
      onDone: () => {
        setIsReadingText(false);
      },
      onError: (error) => {
        console.error(error);
        setIsReadingText(false);
      },
      voice: storedVoiceId ?? undefined,
    });
    setIsReadingText(true);
  }, [storedVoiceId, textToRead]);

  const stopReadingText = useCallback(() => {
    Speech.stop();
    setIsReadingText(false);
  }, []);

  const selectVoice = useCallback(async () => {
    const storedSpeechVoiceId = await StorageUtils.getStringValue(
      StorageKeysConstants.speechVoiceId
    );
    setStoredVoiceId(storedSpeechVoiceId);
    const availableVoices = await Speech.getAvailableVoicesAsync();
    const voicesFr = _.filter(availableVoices, function (voice) {
      return voice.language === localeFr;
    });
    setVoices(voicesFr);
    setModalVisible(true);
  }, []);

  const onVoicePress = useCallback(
    (voice: Speech.Voice) => async () => {
      const voiceId = voice.identifier as string;
      setStoredVoiceId(voiceId);
      await StorageUtils.storeStringValue(
        StorageKeysConstants.speechVoiceId,
        voiceId
      );
      setModalVisible(false);
    },
    []
  );

  useEffect(() => {
    // Stop l'écoute lorsque le composant va être "unmount"
    return void Speech.stop();
  }, []);

  return (
    <>
      {isReadingText ? (
        <CustomButton
          title={buttonTitle ?? Labels.accessibility.stop}
          icon={
            <Icomoon
              name={IcomoonIcons.muet}
              size={Sizes.md}
              color={Colors.primaryBlue}
            />
          }
          rounded
          disabled={false}
          action={stopReadingText}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={[styles.defaultButtonStyle]}
        />
      ) : (
        <CustomButton
          title={buttonTitle ?? Labels.accessibility.listen}
          icon={
            <Icomoon
              name={IcomoonIcons.ecouter}
              size={Sizes.md}
              color={Colors.primaryBlue}
            />
          }
          rounded
          disabled={false}
          action={readText}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={[styles.defaultButtonStyle]}
          hasOptions={true}
          optionsAction={selectVoice}
        />
      )}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={Styles.modale.behindOfModal}>
          <View style={styles.mainContainer}>
            <View style={styles.modalHeader}>
              <TitleH1
                title={Labels.article.selectVoice}
                animated={false}
                style={{ paddingTop: Paddings.larger }}
              />
              <CloseButton onPress={closeModal} clear={true} />
            </View>
            <ScrollView>
              {voices.map((voice, index) => (
                <View
                  key={index}
                  style={[
                    styles.item,
                    voice.identifier === storedVoiceId
                      ? styles.itemSelected
                      : null,
                  ]}
                >
                  <TouchableOpacity
                    onPress={onVoicePress(voice)}
                    accessibilityRole="button"
                    style={styles.itemTouchable}
                  >
                    <SecondaryText
                      style={
                        voice.identifier === storedVoiceId
                          ? styles.itemTextSelected
                          : styles.itemText
                      }
                    >
                      {`${voice.name} (${voice.language})`}
                    </SecondaryText>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    color: Colors.commonText,
    paddingBottom: Paddings.default,
    textAlign: "center",
  },
  buttonTitle: {
    fontSize: Sizes.sm,
    textTransform: "capitalize",
  },
  buttonTitleStyle: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xs,
    textAlign: "left",
  },
  defaultButtonStyle: {
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginBottom: Margins.default,
    paddingBottom: Paddings.smaller,
  },
  item: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderGrey,
    borderRadius: Sizes.xxxxxs,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: Margins.smaller,
    marginVertical: Margins.light,
    shadowColor: Colors.navigation,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  itemSelected: {
    backgroundColor: Colors.primaryBlueDark,
    borderColor: Colors.primaryBlueDark,
    borderWidth: 1,
    shadowColor: Colors.primaryBlueDark,
  },
  itemText: {
    color: Colors.primaryBlueDark,
  },
  itemTextSelected: {
    color: Colors.white,
    fontWeight: FontWeight.bold,
  },
  itemTouchable: {
    minHeight: Sizes.accessibilityMinButton,
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.default,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    borderWidth: 1,
    justifyContent: "center",
    margin: Margins.default,
    padding: Paddings.default,
    paddingTop: 0,
  },
  modalHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SpeechText;
