import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import type { Region } from "react-native-maps";
import { HelperText } from "react-native-paper";

import { Button } from "../../components";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import { AroundMeUtils, KeyboardUtils } from "../../utils";

interface Props {
  postalCodeInput: string;
  setPostalCodeInput: (value: string) => void;
  postalCodeInvalid: boolean;
  setPostalCodeInvalid: (value: boolean) => void;
  hideSnackBar: () => void;
  setAndGoToNewRegion: (region: Region) => void;
  showSnackBarWithMessage: (message: string) => void;
  setIsLoading: (value: boolean) => void;
}

const SearchByPostalCode: React.FC<Props> = ({
  postalCodeInput,
  setPostalCodeInput,
  postalCodeInvalid,
  setPostalCodeInvalid,
  hideSnackBar,
  setAndGoToNewRegion,
  showSnackBarWithMessage,
  setIsLoading,
}) => {
  const onPostalCodeChanged = (newPostalCode: string) => {
    setPostalCodeInput(newPostalCode);
    setPostalCodeInvalid(false);
  };

  const onSearchByPostalCodeButtonClick = async () => {
    setIsLoading(true);
    KeyboardUtils.dismissKeyboard();
    hideSnackBar();
    await searchByPostalCodeAndGoToNewRegion();
  };

  const searchByPostalCodeAndGoToNewRegion = async () => {
    if (postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH) {
      setPostalCodeInvalid(true);
      return;
    }
    const newRegion = await AroundMeUtils.searchRegionByPostalCode(
      postalCodeInput
    );

    if (newRegion) {
      setAndGoToNewRegion(newRegion);
    } else {
      showSnackBarWithMessage(Labels.aroundMe.postalCodeNotFound);
    }
    setIsLoading(false);
  };

  return (
    <View>
      <View style={styles.postalCodeRow}>
        <TextInput
          style={[
            styles.postalCodeInput,
            PLATFORM_IS_IOS && styles.widthForIos,
          ]}
          onChangeText={onPostalCodeChanged}
          value={postalCodeInput}
          placeholder={Labels.aroundMe.postalCodeInputPlaceholder}
          keyboardType="number-pad"
          maxLength={AroundMeConstants.POSTAL_CODE_MAX_LENGTH}
        />
        <Button
          buttonStyle={styles.searchByPostalCodeButton}
          title={Labels.aroundMe.searchButton}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={postalCodeInvalid}
          action={onSearchByPostalCodeButtonClick}
        />
      </View>
      {postalCodeInvalid && (
        <HelperText type="error">
          {Labels.aroundMe.postalCodeInvalid}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fontButton: {
    fontSize: Sizes.xxs,
  },
  postalCodeInput: {
    backgroundColor: Colors.cardGrey,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    paddingHorizontal: Paddings.smaller,
  },
  postalCodeRow: {
    flexDirection: "row",
    paddingLeft: Margins.default,
    paddingVertical: Paddings.smaller,
  },
  searchByPostalCodeButton: {
    marginHorizontal: Margins.smaller,
  },
  widthForIos: {
    width: SCREEN_WIDTH / 2.2,
  },
});

export default SearchByPostalCode;
