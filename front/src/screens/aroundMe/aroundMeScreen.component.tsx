/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";

import {
  AroundMeMap,
  SearchUserLocationOrPostalCodeRegion,
  SlidingUpPanelAddressesList,
} from "../../components";
import {
  CustomSnackbar,
  Loader,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  AroundMeConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { Colors, Paddings, Sizes } from "../../styles";
import { StorageUtils, TrackerUtils } from "../../utils";

const AroundMeScreen: FC = () => {
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
  );
  const [poisArray, setPoisArray] = useState<Poi[]>([]);
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(-1);
  const [showAddressesList, setShowAddressesList] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserLocation, setCurrentUserLocation] = useState<
    LatLng | undefined
  >();

  const [trackerAction, setTrackerAction] = useState("");
  const [triggerMoveMapRegion, setTriggerMoveMapRegion] = useState(false);
  const [triggerMoveMapUserLocation, setTriggerMoveMapUserLocation] =
    useState(false);

  const SNACKBAR_MARGIN_TOP_VALUE = "2%";

  useEffect(() => {
    const checkIfSavedRegion = async () => {
      const savedRegion: Region | undefined = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoSavedRegion
      );
      if (!savedRegion) return;
      setRegion(savedRegion);
      setTriggerMoveMapRegion(!triggerMoveMapRegion);
    };
    void checkIfSavedRegion();
  }, []);

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onSnackBarDismiss = () => {
    setShowSnackBar(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flex0}>
        <TrackerHandler
          screenName={TrackerUtils.TrackingEvent.CARTO}
          actionName={trackerAction}
        />
        <View style={styles.topContainer}>
          <TitleH1
            title={Labels.aroundMe.title}
            description={Labels.aroundMe.instruction}
            animated={false}
          />
        </View>
        <SearchUserLocationOrPostalCodeRegion
          postalCodeInput={postalCodeInput}
          setPostalCodeInput={setPostalCodeInput}
          postalCodeInvalid={postalCodeInvalid}
          setPostalCodeInvalid={setPostalCodeInvalid}
          hideSnackBar={() => {
            setShowSnackBar(false);
          }}
          setAndGoToNewRegion={(newRegion: Region) => {
            setShowAddressesList(false);
            setRegion(newRegion);
            setTriggerMoveMapRegion(!triggerMoveMapRegion);
            setSelectedPoiIndex(-1);
          }}
          showSnackBarWithMessage={showSnackBarWithMessage}
          setIsLoading={setIsLoading}
          updateUserLocation={(newRegion: Region | undefined) => {
            if (newRegion) {
              setSelectedPoiIndex(-1);
              setCurrentUserLocation({
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              });
              setRegion(newRegion);
              setTriggerMoveMapRegion(!triggerMoveMapRegion);
              setShowAddressesList(false);
            }
            setTriggerMoveMapUserLocation(!triggerMoveMapUserLocation);
          }}
        />
      </View>
      <View style={styles.mainContainer}>
        <AroundMeMap
          region={region}
          poiArray={poisArray}
          selectedPoiIndex={selectedPoiIndex}
          userLocation={currentUserLocation}
          updateRegion={setRegion}
          updatePoiArray={setPoisArray}
          updateSelectedPoiIndex={setSelectedPoiIndex}
          triggerMoveMapRegion={triggerMoveMapRegion}
          triggerMoveMapUserLocation={triggerMoveMapUserLocation}
          showBottomPanel={setShowAddressesList}
          isFromSimpleCarto
        />
        <CustomSnackbar
          duration={AroundMeConstants.SNACKBAR_DURATION}
          visible={showSnackBar}
          isOnTop
          marginTopValue={SNACKBAR_MARGIN_TOP_VALUE}
          backgroundColor={Colors.aroundMeSnackbar.background}
          onDismiss={onSnackBarDismiss}
          textColor={Colors.aroundMeSnackbar.text}
          text={snackBarMessage}
        />
        {showAddressesList &&
          poisArray.length > 1 && ( // Si la liste des POI n'a qu'un élément, aucune utilité d'afficher le panel puisqu'il y a la cartouche avec les détails
            <SlidingUpPanelAddressesList
              poisArray={poisArray}
              centerOnMarker={(poiIndex: number) => {
                setSelectedPoiIndex(poiIndex);
              }}
            />
          )}
        {isLoading && <Loader />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnView: {
    flexDirection: "column",
  },
  flex0: {
    flex: 0,
  },
  fontButton: {
    fontSize: Sizes.xxs,
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    lineHeight: Sizes.mmd,
    paddingHorizontal: Paddings.smallest,
  },
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
  },
});

export default AroundMeScreen;
