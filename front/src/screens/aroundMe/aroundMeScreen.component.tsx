/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { LatLng } from "react-native-maps";

import {
  AroundMeMap,
  AroundMeScreenHeader,
  SlidingUpPanelAddressesList,
} from "../../components";
import {
  CustomSnackbar,
  MapLoader,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  AroundMeConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { Colors, Paddings, Sizes } from "../../styles";
import { AroundMeUtils, StorageUtils, TrackerUtils } from "../../utils";

const AroundMeScreen: FC = () => {
  const [coordinates, setCoordinates] = useState<LatLng | undefined>(
    AroundMeConstants.INITIAL_COORDINATES
  );
  const [poisArray, setPoisArray] = useState<Poi[]>([]);
  const [zoomOrAltitude, setZoomOrAltitude] = useState(
    PLATFORM_IS_IOS
      ? AroundMeConstants.ALTITUDE_DEFAULT
      : AroundMeConstants.ZOOM_DEFAULT
  );
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(-1);
  const [showAddressesList, setShowAddressesList] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserLocation, setCurrentUserLocation] = useState<
    LatLng | undefined
  >();

  const [showMap, setShowMap] = useState(false);
  const [trackerAction, setTrackerAction] = useState("");
  const [triggerMoveMapCoordinates, setTriggerMoveMapCoordinates] =
    useState(false);

  const SNACKBAR_MARGIN_TOP_VALUE = "2%";

  useEffect(() => {
    const checkIfSavedCoordinates = async () => {
      setIsLoading(true);
      const savedCoordinates: LatLng | undefined =
        await StorageUtils.getObjectValue(
          StorageKeysConstants.cartoSavedCoordinates
        );
      if (savedCoordinates) setCoordinates(savedCoordinates);
      setIsLoading(false);
      setShowMap(true);

      AroundMeUtils.triggerFunctionAfterTimeout(() => {
        setTriggerMoveMapCoordinates(!triggerMoveMapCoordinates);
      });
    };
    void checkIfSavedCoordinates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSnackBarWithMessage = useCallback((message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  }, []);

  const onSnackBarDismiss = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  const onSetCoordinatesAndUserLocation = useCallback(
    async (newCoordinates: LatLng, displayUL: boolean) => {
      const _zoomOrAltitude =
        await AroundMeUtils.adaptZoomAccordingToCoordinates(
          newCoordinates.latitude,
          newCoordinates.longitude
        );
      setZoomOrAltitude(_zoomOrAltitude);
      setCurrentUserLocation(displayUL ? newCoordinates : undefined);
      setShowAddressesList(false);
      setSelectedPoiIndex(-1);
      AroundMeUtils.triggerFunctionAfterTimeout(() => {
        setCoordinates(newCoordinates);
      });
    },
    []
  );

  const onHideSnackBar = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  const onMarkerPressed = useCallback((poiIndex: number) => {
    setSelectedPoiIndex(poiIndex);
  }, []);

  return showMap ? (
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
        <AroundMeScreenHeader
          setCoordinatesAndUserLocation={onSetCoordinatesAndUserLocation}
          hideSnackBar={onHideSnackBar}
          showSnackBarWithMessage={showSnackBarWithMessage}
          setIsLoading={setIsLoading}
        />
      </View>
      <View style={styles.mainContainer}>
        <AroundMeMap
          coordinates={coordinates}
          poiArray={poisArray}
          zoomOrAltitude={zoomOrAltitude}
          selectedPoiIndex={selectedPoiIndex}
          userLocation={currentUserLocation}
          updatePoiArray={setPoisArray}
          updateSelectedPoiIndex={setSelectedPoiIndex}
          triggerMoveMapCoordinates={triggerMoveMapCoordinates}
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
              centerOnMarker={onMarkerPressed}
            />
          )}
        {isLoading && <MapLoader onTouchEnd={onHideSnackBar} />}
      </View>
    </View>
  ) : null;
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
