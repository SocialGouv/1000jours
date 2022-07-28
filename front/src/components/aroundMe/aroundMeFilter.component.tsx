import type { PoiType, Step } from "@socialgouv/nos1000jours-lib";
import { AROUNDME_FILTER_DATA } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  CommonText,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  TitleH1,
} from "../../components/baseComponents";
import Chip from "../../components/baseComponents/chip.component";
import {
  AroundMeConstants,
  FetchPoliciesConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, Margins, Paddings, Sizes, Styles } from "../../styles";
import type {
  CartoFilter,
  CartoFilterStorage,
  FetchedFilterFromDb,
} from "../../type";
import { StorageUtils, StringUtils, TrackerUtils } from "../../utils";
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
    useState<CartoFilterStorage>({ thematiques: [], types: [] });
  const [showModalContent, setShowModalContent] = useState(false);
  const [savedCartoFilterStorage, setSavedCartoFilterStorage] =
    useState<CartoFilterStorage>({ thematiques: [], types: [] });
  const [trackerAction, setTrackerAction] = useState("");

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
    const getSavedFilter = async () => {
      const savedFilters: CartoFilterStorage | null =
        await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);

      if (savedFilters) setSavedCartoFilterStorage(savedFilters);

      if (fetchedFiltersFromDB) {
        fetchedFiltersFromDB.professionnels.forEach(
          (filter) => (filter.active = false)
        );
        fetchedFiltersFromDB.structures.forEach(
          (filter) => (filter.active = false)
        );
        if (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          savedFilters &&
          !StringUtils.isStringArrayNullOrEmpty(savedFilters.types)
        ) {
          fetchedFiltersFromDB.professionnels =
            checkSavedFiltersInFetchedFilters(
              savedFilters.types,
              fetchedFiltersFromDB.professionnels
            );
          fetchedFiltersFromDB.structures = checkSavedFiltersInFetchedFilters(
            savedFilters.types,
            fetchedFiltersFromDB.structures
          );
        }

        setFetchedFiltersFromDB(fetchedFiltersFromDB);
        convertFetchedFiltersToDisplayedFilters();
      }
      setShowModalContent(true);
    };

    void getSavedFilter();
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
    cartoFilters: CartoFilter[]
  ) => {
    cartoFilters.forEach((cartoFilter) => {
      if (!savedFilters.includes(cartoFilter.name)) return;
      cartoFilter.active = true;

      if (cartoFilter.filterType === AroundMeConstants.CartoFilterEnum.type)
        cartoFilterStorage.types.push(cartoFilter.name);

      setCartoFilterStorage(cartoFilterStorage);
    });

    return cartoFilters;
  };

  const extractFilterData = (poiTypesToFilter: PoiType[]) => {
    setFetchedFiltersFromDB({
      professionnels: filterToPoiCategorie(
        poiTypesToFilter,
        AroundMeConstants.PoiCategorieEnum.professionnel
      ).map((poiType) =>
        convertToCartoFilter(poiType, AroundMeConstants.CartoFilterEnum.type)
      ),
      structures: filterToPoiCategorie(
        poiTypesToFilter,
        AroundMeConstants.PoiCategorieEnum.structure
      ).map((poiType) =>
        convertToCartoFilter(poiType, AroundMeConstants.CartoFilterEnum.type)
      ),
    });
    convertFetchedFiltersToDisplayedFilters();
  };

  const filterToPoiCategorie = (
    poiTypesToFilter: PoiType[],
    categorie: AroundMeConstants.PoiCategorieEnum
  ): PoiType[] => {
    return poiTypesToFilter.filter(
      (poiType) => poiType.categorie === categorie
    );
  };

  const convertToCartoFilter = (
    filter: PoiType | Step,
    filterType: AroundMeConstants.CartoFilterEnum
  ): CartoFilter => {
    return {
      active: false,
      filterType: filterType,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      name: filter.nom,
    };
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
    },
    [cartoFilterStorage]
  );

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

  const sendFiltersTracker = (filters: string[]) => {
    if (!StringUtils.isStringArrayNullOrEmpty(filters)) {
      filters.forEach((filter) => {
        setTrackerAction(
          `${TrackerUtils.TrackingEvent.FILTER_CARTO} - ${filter}`
        );
      });
    }
  };

  const onCloseModalButtonPressed = useCallback(() => {
    setCartoFilterStorage({
      thematiques: [],
      types: [],
    });
    hideModal(false);
  }, [hideModal]);

  const onValidateButtonPressed = useCallback(() => {
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoFilterKey,
      cartoFilterStorage
    );
    sendFiltersTracker(cartoFilterStorage.types);
    sendFiltersTracker(cartoFilterStorage.thematiques);

    const noSavedFilterButNewFilter =
      savedCartoFilterStorage.types.length === 0 &&
      cartoFilterStorage.types.length > 0;

    const areSavedFiltersAndNewFiltersDifferent =
      !StringUtils.areArraysTheSameInContentAndLength(
        savedCartoFilterStorage.types,
        cartoFilterStorage.types
      );

    const differenceBetweenSavedAndNew =
      noSavedFilterButNewFilter || areSavedFiltersAndNewFiltersDifferent;

    setCartoFilterStorage({
      thematiques: [],
      types: [],
    });

    hideModal(differenceBetweenSavedAndNew);
  }, [cartoFilterStorage, hideModal, savedCartoFilterStorage.types]);
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
              <TitleH1 title={Labels.aroundMe.filter.title} animated={false} />
              <TouchableOpacity
                style={styles.closeModalView}
                onPress={onCloseModalButtonPressed}
              >
                <Icomoon
                  name={IcomoonIcons.fermer}
                  size={Sizes.xs}
                  color={Colors.primaryBlue}
                />
              </TouchableOpacity>
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
                <View style={styles.buttonContainer}>
                  <CustomButton
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
                    action={onCloseModalButtonPressed}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={Labels.buttons.validate}
                    titleStyle={styles.buttonTitleStyle}
                    rounded={true}
                    disabled={false}
                    action={onValidateButtonPressed}
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
  partsTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: "bold",
  },
});

export default AroundMeFilter;
