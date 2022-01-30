import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import BulbIcon from "../../assets/images/carto/bulb.svg";
import { Labels } from "../../constants";
import { PLATFORM_IS_ANDROID } from "../../constants/platform.constants";
import { Colors, Margins, Sizes } from "../../styles";
import { CustomButton, Icomoon, IcomoonIcons, View } from "../baseComponents";
import AroundMeFilter from "./aroundMeFilter.component";
import SubmitNewFilter from "./submitNewFilter.component";

interface Props {
  headerStyle: StyleProp<ViewStyle>;
  displayMap: boolean;
  setDisplayMap: (displayMap: boolean) => void;
  relaunchSearch: () => void;
  showRelaunchResearchButton: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const AroundMeMapHeader: FC<Props> = ({
  headerStyle,
  displayMap,
  setDisplayMap,
  relaunchSearch,
  showRelaunchResearchButton,
  setIsLoading,
}) => {
  // Filter and "submit new filter" modals
  const [showFilter, setShowFilter] = useState(false);
  const [showSubmitNewFilterModal, setShowSubmitNewFilterModal] =
    useState(false);

  return (
    <>
      <View style={headerStyle}>
        <CustomButton
          buttonStyle={styles.headerButton}
          title={Labels.listArticles.filters}
          titleStyle={styles.headerButtonTitle}
          rounded={true}
          icon={
            <Icomoon
              name={IcomoonIcons.filtrer}
              size={Sizes.sm}
              color={Colors.primaryBlue}
            />
          }
          action={() => {
            setShowFilter(true);
          }}
        />
        <CustomButton
          buttonStyle={styles.submitNewFilterButton}
          title=""
          rounded={true}
          icon={<BulbIcon />}
          action={() => {
            setShowSubmitNewFilterModal(true);
          }}
        />
        <View style={styles.headerButtonsRightPartView}>
          <CustomButton
            buttonStyle={styles.headerButton}
            title={
              displayMap
                ? Labels.aroundMe.displayListButton
                : Labels.aroundMe.displayMapButton
            }
            titleStyle={styles.headerButtonTitle}
            rounded={true}
            action={() => {
              setDisplayMap(!displayMap);
            }}
          />
          {showRelaunchResearchButton && (
            <CustomButton
              buttonStyle={[styles.headerButton, styles.buttonMarginTop]}
              title={Labels.aroundMe.relaunchSearch}
              titleStyle={styles.headerButtonTitle}
              rounded={true}
              action={() => {
                relaunchSearch();
              }}
            />
          )}
        </View>
      </View>
      <AroundMeFilter
        visible={showFilter}
        hideModal={(filterWasSaved: boolean) => {
          setShowFilter(false);
          if (filterWasSaved) {
            if (PLATFORM_IS_ANDROID) setIsLoading(true);
            relaunchSearch();
          }
        }}
      />
      <SubmitNewFilter
        visible={showSubmitNewFilterModal}
        hideModal={() => {
          setShowSubmitNewFilterModal(false);
        }}
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
  },
  headerButtonTitle: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
  },
  headerButtonsRightPartView: {
    alignItems: "flex-end",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
  },
  headerButtonsView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    height: "15%",
    left: 0,
    margin: Margins.smaller,
    position: "absolute",
    right: 0,
    top: 0,
  },
  submitNewFilterButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
  },
});

export default AroundMeMapHeader;
