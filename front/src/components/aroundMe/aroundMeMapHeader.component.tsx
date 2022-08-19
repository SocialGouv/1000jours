import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { PLATFORM_IS_ANDROID } from "../../constants/platform.constants";
import { useAccessibilityReader } from "../../hooks";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import { AroundMeAssets } from "../assets";
import { CustomButton, Icomoon, IcomoonIcons, View } from "../baseComponents";
import AroundMeFilter from "./aroundMeFilter.component";
import SubmitNewFilter from "./submitNewFilter.component";

interface Props {
  headerStyle: StyleProp<ViewStyle>;
  displayMap: boolean;
  setDisplayMap: (displayMap: boolean) => void;
  relaunchSearch: () => void;
  showDisplayListButton?: boolean;
  showRelaunchResearchButton: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hideDisplayListButton?: boolean;
}

const AroundMeMapHeader: FC<Props> = ({
  headerStyle,
  displayMap,
  setDisplayMap,
  relaunchSearch,
  showDisplayListButton,
  showRelaunchResearchButton,
  setIsLoading,
  hideDisplayListButton = false,
}) => {
  // Filter and "submit new filter" modals
  const [showFilter, setShowFilter] = useState(false);
  const [showSubmitNewFilterModal, setShowSubmitNewFilterModal] =
    useState(false);
  const isScreenReaderEnabled = useAccessibilityReader();

  const onSubmitNewFilterButtonPressed = useCallback(() => {
    setShowSubmitNewFilterModal(true);
  }, []);

  const onDisplayMapOrListButtonPressed = useCallback(() => {
    setDisplayMap(!displayMap);
  }, [displayMap, setDisplayMap]);

  const onRelaunchSearchButtonPressed = useCallback(() => {
    relaunchSearch();
  }, [relaunchSearch]);

  const onShowFilterButtonPressed = useCallback(() => {
    setShowFilter(true);
  }, []);

  const onHideFilterButtonPressed = useCallback(
    (filterWasSaved: boolean) => {
      setShowFilter(false);
      if (filterWasSaved) {
        if (PLATFORM_IS_ANDROID) setIsLoading(true);
        relaunchSearch();
      }
    },
    [relaunchSearch, setIsLoading]
  );

  const onShowSubmitNewFilterModal = useCallback(
    (showModal: boolean) => () => {
      setShowSubmitNewFilterModal(showModal);
    },
    []
  );

  return (
    <>
      <View style={headerStyle}>
        <CustomButton
          buttonStyle={styles.headerButton}
          title={Labels.articleList.filters}
          titleStyle={styles.headerButtonTitle}
          rounded={true}
          icon={
            <Icomoon
              name={IcomoonIcons.filtrer}
              size={Sizes.sm}
              color={Colors.primaryBlue}
            />
          }
          action={onShowFilterButtonPressed}
        />
        <CustomButton
          buttonStyle={styles.headerButton}
          title=""
          accessibilityLabel={Labels.aroundMe.submitNewFilter.title}
          rounded={true}
          icon={<AroundMeAssets.BulbIcon />}
          action={onSubmitNewFilterButtonPressed}
        />
        <View style={styles.headerButtonsRightPartView}>
          {!hideDisplayListButton &&
            !isScreenReaderEnabled && ( //Si le lecteur d'écran est activé, on cache le bouton de retour à la carte
              <CustomButton
                buttonStyle={styles.headerButton}
                title={
                  displayMap
                    ? Labels.aroundMe.displayListButton
                    : Labels.aroundMe.displayMapButton
                }
                titleStyle={styles.headerButtonTitle}
                rounded={true}
                disabled={displayMap ? !showDisplayListButton : false}
                icon={
                  <Icomoon
                    name={
                      displayMap
                        ? IcomoonIcons.afficherListe
                        : IcomoonIcons.autourDeMoi
                    }
                    size={Sizes.sm}
                    color={Colors.primaryBlue}
                  />
                }
                action={onDisplayMapOrListButtonPressed}
              />
            )}
          {showRelaunchResearchButton && (
            <CustomButton
              buttonStyle={[
                styles.headerButton,
                !hideDisplayListButton && styles.buttonMarginTop,
              ]}
              title={Labels.aroundMe.relaunchSearch}
              titleStyle={styles.headerButtonTitle}
              rounded={true}
              icon={
                <Icomoon
                  name={IcomoonIcons.relancerRecherche}
                  size={Sizes.sm}
                  color={Colors.primaryBlue}
                />
              }
              action={onRelaunchSearchButtonPressed}
            />
          )}
        </View>
      </View>
      <AroundMeFilter
        visible={showFilter}
        hideModal={onHideFilterButtonPressed}
      />
      <SubmitNewFilter
        visible={showSubmitNewFilterModal}
        hideModal={onShowSubmitNewFilterModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonMarginTop: {
    marginTop: Margins.smaller,
  },
  headerButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginHorizontal: Margins.smallest,
    paddingHorizontal: Paddings.default,
  },
  headerButtonTitle: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
  },
  headerButtonsRightPartView: {
    alignItems: "flex-end",
    backgroundColor: "transparent",
    flexGrow: 1,
  },
});

export default AroundMeMapHeader;
