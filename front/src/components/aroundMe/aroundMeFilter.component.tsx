import type { PoiType } from "@socialgouv/nos1000jours-lib";
import { AROUNDME_FILTER_DATA } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";

import {
  CancelButton,
  CloseButton,
  CommonText,
  CustomButton,
  TitleH1,
} from "../../components/baseComponents";
import Chip from "../../components/baseComponents/chip.component";
import {
  AroundMeConstants,
  FetchPoliciesConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { useSavedCartographyFilters } from "../../hooks";
import { GraphQLQuery } from "../../services";
import { Colors, Margins, Paddings, Sizes, Styles } from "../../styles";
import type {
  CartoFilter,
  CartoFilterStorage,
  FetchedFilterFromDb,
} from "../../type";
import {
  AroundMeFilterUtils,
  StorageUtils,
  StringUtils,
  TrackerUtils,
} from "../../utils";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  visible: boolean;
  hideModal: (filterWasSaved: boolean) => void;
}

const AroundMeFilter: React.FC<Props> = ({ visible, hideModal }) => {
  const [filterDataFromDb, setFilterDataFromDb] = useState<unknown>();

  const [fetchedFiltersFromDB, setFetchedFiltersFromDB] =
    useState<FetchedFilterFromDb>();
  const [displayedCartoFilters, setDisplayedCartoFilters] = useState<
    { title: string; filters: CartoFilter[] }[]
  >([]);
  const [cartoFilterStorage, setCartoFilterStorage] =
    useState<CartoFilterStorage>({ types: [] });
  const [showModalContent, setShowModalContent] = useState(false);
  const [trackerAction, setTrackerAction] = useState("");
  const [isValidateButtonDisabled, setIsValidateButtonDisabled] =
    useState(false);
  const savedCartographyFilters = useSavedCartographyFilters();

  useEffect(() => {
    if (!filterDataFromDb) return;
    const { cartographieTypes } = filterDataFromDb as {
      cartographieTypes: PoiType[];
    };
    extractFilterData(cartographieTypes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDataFromDb]);

  useEffect(() => {
    if (!visible) return;

    setShowModalContent(false);
    const getSavedFilter = () => {
      if (fetchedFiltersFromDB) {
        AroundMeFilterUtils.deactivateFetchedFilterFromDb(fetchedFiltersFromDB);

        if (
          !StringUtils.isStringArrayNullOrEmpty(savedCartographyFilters.types)
        ) {
          fetchedFiltersFromDB.professionnels =
            checkSavedFiltersInFetchedFilters(
              savedCartographyFilters.types,
              fetchedFiltersFromDB.professionnels
            );
          fetchedFiltersFromDB.structures = checkSavedFiltersInFetchedFilters(
            savedCartographyFilters.types,
            fetchedFiltersFromDB.structures
          );
        }

        setFetchedFiltersFromDB(fetchedFiltersFromDB);
        convertFetchedFiltersToDisplayedFilters();
      }
      setShowModalContent(true);
    };

    getSavedFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const convertFetchedFiltersToDisplayedFilters = () => {
    if (fetchedFiltersFromDB) {
      setDisplayedCartoFilters([
        {
          filters: fetchedFiltersFromDB.structures,
          title: Labels.aroundMe.filter.structures,
        },
        {
          filters: fetchedFiltersFromDB.professionnels,
          title: Labels.aroundMe.filter.healthProfessional,
        },
      ]);
    }
  };

  const checkSavedFiltersInFetchedFilters = (
    savedFilters: string[],
    cartographyFilters: CartoFilter[]
  ) => {
    cartographyFilters.forEach((cartoFilter) => {
      if (!savedFilters.includes(cartoFilter.name)) return;
      cartoFilter.active = true;

      if (cartoFilter.filterType === AroundMeConstants.CartoFilterEnum.type)
        cartoFilterStorage.types.push(cartoFilter.name);

      setCartoFilterStorage(cartoFilterStorage);
    });

    return cartographyFilters;
  };

  const extractFilterData = (poiTypes: PoiType[]) => {
    setFetchedFiltersFromDB(
      AroundMeFilterUtils.getFetchedFilterFromDb(poiTypes)
    );
    convertFetchedFiltersToDisplayedFilters();
  };

  const updateQueryFilter = useCallback(
    (filter: CartoFilter) => () => {
      let tempQueryFilter = cartoFilterStorage.types;
      if (!tempQueryFilter.includes(filter.name))
        tempQueryFilter.push(filter.name);
      else {
        tempQueryFilter = tempQueryFilter.filter(
          (element) => element !== filter.name
        );
      }

      cartoFilterStorage.types = tempQueryFilter;
      setCartoFilterStorage(cartoFilterStorage);
      setIsValidateButtonDisabled(
        AroundMeFilterUtils.isValidateButtonDisabled(cartoFilterStorage.types)
      );
    },
    [cartoFilterStorage]
  );

  const sendFiltersTracker = (filters: string[]) => {
    filters.forEach((filter) => {
      setTrackerAction(
        `${TrackerUtils.TrackingEvent.FILTER_CARTO} - ${filter}`
      );
    });
  };

  const onCloseModalButtonPressed = useCallback(() => {
    setCartoFilterStorage({ types: [] });
    hideModal(false);
  }, [hideModal]);

  const onValidateButtonPressed = useCallback(() => {
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoFilterKey,
      cartoFilterStorage
    );
    sendFiltersTracker(cartoFilterStorage.types);

    const areSavedFiltersAndNewFiltersDifferent =
      !StringUtils.areArraysTheSameInContentAndLength(
        savedCartographyFilters.types,
        cartoFilterStorage.types
      );

    setCartoFilterStorage({ types: [] });

    hideModal(areSavedFiltersAndNewFiltersDifferent);
  }, [cartoFilterStorage, hideModal, savedCartographyFilters.types]);

  const renderSection = (section: {
    title: string;
    filters: CartoFilter[];
  }) => {
    return (
      <View style={styles.filterView}>
        <CommonText style={styles.partsTitle} accessibilityRole="header">
          {section.title}
        </CommonText>
        <View style={styles.filterContainer}>
          {renderChips(section.filters)}
        </View>
      </View>
    );
  };

  const renderChips = (cartoFilters: CartoFilter[] | undefined) => {
    return cartoFilters?.map((filter, index) => (
      <Chip
        id={index}
        key={index}
        title={filter.name}
        selected={filter.active}
        action={updateQueryFilter(filter)}
      />
    ));
  };

  return (
    <>
      <TrackerHandler actionName={trackerAction} />
      <GraphQLQuery
        query={AROUNDME_FILTER_DATA}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        getFetchedData={setFilterDataFromDb}
      />
      <Modal transparent={true} visible={visible} animationType="fade">
        {showModalContent && (
          <View style={Styles.modale.behindOfModal}>
            <View style={styles.mainContainer}>
              <View style={styles.modalHeader}>
                <TitleH1
                  title={Labels.aroundMe.filter.title}
                  animated={false}
                />
                <CloseButton onPress={onCloseModalButtonPressed} clear={true} />
              </View>
              <ScrollView>
                {displayedCartoFilters.map(
                  (
                    filterFromDb: { title: string; filters: CartoFilter[] },
                    index: number
                  ) => (
                    <View key={index}>{renderSection(filterFromDb)}</View>
                  )
                )}
              </ScrollView>
              <View style={styles.buttonsContainer}>
                <CancelButton action={onCloseModalButtonPressed} />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={Labels.buttons.validate}
                    titleStyle={styles.buttonTitleStyle}
                    rounded={true}
                    disabled={isValidateButtonDisabled}
                    action={onValidateButtonPressed}
                    accessibilityLabel={Labels.buttons.validate}
                    accessibilityState={{ disabled: isValidateButtonDisabled }}
                    accessibilityHint={
                      Labels.accessibility.cartographyFilters.validateButtonHint
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </>
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
    marginTop: Margins.default,
  },
  closeModalView: {
    padding: Paddings.default,
    position: "absolute",
    right: 0,
    top: 0,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterView: {
    marginBottom: Margins.default,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    borderWidth: 1,
    flex: 1,
    margin: Margins.default,
    padding: Paddings.default,
  },
  modalHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  partsTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: "bold",
  },
});

export default AroundMeFilter;
