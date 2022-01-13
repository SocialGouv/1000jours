/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { PoiType } from "@socialgouv/nos1000jours-lib";
import * as Location from "expo-location";
import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { Region } from "react-native-maps";
import { HelperText } from "react-native-paper";

import { Button, CustomSnackbar, SecondaryText } from "../../components";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import type { CartoFilterStorage } from "../../type";
import type { Article } from "../../types";
import { AroundMeUtils } from "../../utils";
import SharedCartoData from "../../utils/sharedCartoData.class";
import { storeObjectValue } from "../../utils/storage.util";
import PoiList from "./poiList.component";

interface Props {
  articles: Article[];
}

const TabAroundMeInstruction: FC<Props> = ({ articles }) => {
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [region, setRegion] = useState<Region | undefined>(); // AroundMeConstants.INITIAL_REGION
  const [poiTypes, setPoiTypes] = useState<PoiType[]>([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const geolocationIcon = require("../../assets/images/carto/geolocation.png");

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onPostalCodeChanged = (newPostalCode: string) => {
    setPostalCodeInput(newPostalCode);
    setPostalCodeInvalid(false);
  };

  const extractPoiTypesFromArticles = () => {
    const finalCartographieTypes: PoiType[] = [];
    articles
      .map((article) => article.cartographie_pois_types)
      .map((types) =>
        types?.map((type) => {
          if (
            !finalCartographieTypes
              .map((finalType) => finalType.nom)
              .includes(type.nom)
          )
            finalCartographieTypes.push(type);
        })
      );
    if (finalCartographieTypes.length > 0) {
      setPoiTypes(finalCartographieTypes);
      const cartoFilterStorage: CartoFilterStorage = {
        etapes: [],
        thematiques: [],
        types: finalCartographieTypes.map((type) => type.nom),
      };
      void storeObjectValue(
        StorageKeysConstants.cartoFilterKey,
        cartoFilterStorage
      );
    }
  };

  const checkLocation = async () => {
    extractPoiTypesFromArticles();
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      showSnackBarWithMessage(Labels.aroundMe.pleaseAllowGeolocation);
      // setIsLoading(false);
      // setSearchIsReady(true); // Si on refuse la géoloc, on peut toujours lancer une recherche (manuelle ou via CP)
      return;
    }

    // setLocationPermissionIsGranted(true);
    // setIsLoading(true);
    try {
      let currentLocation = undefined;
      let locationSuccess = false;
      let getPositionAttempts = 0;
      // Il y a un temps de latence entre le moment où on autorise la géolocalisation
      // et le moment où le getCurrentPositionAsync() retourne une localication
      // donc tant qu'il ne retourne rien, on le rappelle
      while (!locationSuccess) {
        try {
          currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
          });
          locationSuccess = true;
          // eslint-disable-next-line no-empty
        } catch (ex: unknown) {
          getPositionAttempts = getPositionAttempts + 1;
          if (
            // Si l'exception remontée n'est pas une erreur de service non-disponible
            // Ou si le nombre de tentatives a été dépassé, on arrête les rappels
            !JSON.stringify(ex).includes(
              AroundMeConstants.ERROR_LOCATION_PROVIDER_UNAVAILABLE_MESSAGE
            ) ||
            getPositionAttempts > AroundMeConstants.GET_POSITION_MAX_ATTEMPTS
          ) {
            locationSuccess = true;
          }
        }
      }
      if (currentLocation) {
        SharedCartoData.userLocation = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };

        setRegion({
          latitude: currentLocation.coords.latitude,
          latitudeDelta: AroundMeConstants.DEFAULT_DELTA,
          longitude: currentLocation.coords.longitude,
          longitudeDelta: AroundMeConstants.DEFAULT_DELTA,
        });
      } else setRegion(undefined);
    } catch {
      setRegion(undefined);
    }

    // setIsLoading(false);
  };

  const searchByPostalCode = async () => {
    extractPoiTypesFromArticles();
    if (postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH) {
      setPostalCodeInvalid(true);
      return;
    }
    const newRegion = await AroundMeUtils.searchRegionByPostalCode(
      postalCodeInput
    );

    if (newRegion) setRegion(newRegion);
    else showSnackBarWithMessage(Labels.aroundMe.postalCodeNotFound);
    // setIsLoading(false);
  };

  return region ? (
    <PoiList region={region} poiTypes={poiTypes} />
  ) : (
    <ScrollView style={styles.mainContainer}>
      <SecondaryText style={styles.description}>
        {Labels.aroundMe.searchGeolocInstruction}
      </SecondaryText>
      <View style={styles.geolocationRow}>
        <TouchableOpacity
          onPress={() => {
            void checkLocation();
          }}
        >
          <Image source={geolocationIcon} style={styles.geolicationIconStyle} />
        </TouchableOpacity>
        <Button
          buttonStyle={styles.geolicationButtonStyle}
          title={Labels.aroundMe.useMyGeolocation}
          titleStyle={styles.fontButton}
          rounded={true}
          action={() => {
            void checkLocation();
          }}
        />
      </View>
      <SecondaryText style={styles.description}>
        {Labels.aroundMe.searchPostalCodeInstruction}
      </SecondaryText>
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
          action={searchByPostalCode}
        />
      </View>
      <HelperText type="error" visible={postalCodeInvalid}>
        {Labels.aroundMe.postalCodeInvalid}
      </HelperText>
      <CustomSnackbar
        duration={AroundMeConstants.SNACKBAR_DURATION}
        visible={showSnackBar}
        isOnTop
        backgroundColor={Colors.aroundMeSnackbar.background}
        onDismiss={() => {
          setShowSnackBar(false);
        }}
        textColor={Colors.aroundMeSnackbar.text}
        text={snackBarMessage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.md,
  },
  fontButton: {
    fontSize: Sizes.xs,
  },
  geolicationButtonStyle: {
    marginHorizontal: Margins.default,
  },
  geolicationIconStyle: {
    height: Margins.largest,
    marginLeft: Margins.default,
    width: Margins.largest,
  },
  geolocationRow: {
    flexDirection: "row",
    margin: Margins.default,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
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

export default TabAroundMeInstruction;
