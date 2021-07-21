import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Button,
  CommonText,
  Icomoon,
  IcomoonIcons,
  TitleH1,
} from "../../components";
import FetchFilterData from "../../components/aroundMe/fetchFilterData.component";
import Chip from "../../components/base/chip.component";
import {
  AroundMeConstants,
  Colors,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import type {
  CartoFilter,
  CartoFilterStorage,
  FetchedFilterFromDb,
  PoiTypeFromDB,
  StepFromDB,
} from "../../type";
import { StorageUtils, StringUtils, TrackerUtils } from "../../utils";

interface Props {
  visible: boolean;
  hideModal: (filterWasSaved: boolean) => void;
}

const AroundMeFilter: React.FC<Props> = ({ visible, hideModal }) => {
  const { trackScreenView } = useMatomo();
  const [filterDataFromDb, setFilterDataFromDb] = useState<unknown>();

  const [fetchedFiltersFromDB, setFetchedFiltersFromDB] =
    useState<FetchedFilterFromDb>();
  const [displayedCartoFilters, setDisplayedCartoFilters] = useState<
    { title: string; filters: CartoFilter[] }[]
  >([]);
  const [cartoFilterStorage, setCartoFilterStorage] =
    useState<CartoFilterStorage>({ etapes: [], types: [] });
  const [showModalContent, setShowModalContent] = useState(false);

  useEffect(() => {
    if (!filterDataFromDb) return;
    const extractFilterDataAndCheckSavedFilters = () => {
      const { cartographieTypes, etapes } = filterDataFromDb as {
        cartographieTypes: PoiTypeFromDB[];
        etapes: StepFromDB[];
      };
      extractFilterData(cartographieTypes, etapes);
    };
    extractFilterDataAndCheckSavedFilters();
  }, [filterDataFromDb]);

  useEffect(() => {
    if (!visible) return;

    setShowModalContent(false);
    const getSavedFilter = async () => {
      const savedFilters: CartoFilterStorage =
        await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);

      if (fetchedFiltersFromDB) {
        fetchedFiltersFromDB.professionnels.forEach(
          (filter) => (filter.active = false)
        );
        fetchedFiltersFromDB.structures.forEach(
          (filter) => (filter.active = false)
        );
        fetchedFiltersFromDB.etapes.forEach(
          (filter) => (filter.active = false)
        );
        if (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          savedFilters &&
          !StringUtils.stringArrayIsNullOrEmpty(savedFilters.types)
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

        if (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          savedFilters &&
          !StringUtils.stringArrayIsNullOrEmpty(savedFilters.etapes)
        ) {
          fetchedFiltersFromDB.etapes = checkSavedFiltersInFetchedFilters(
            savedFilters.etapes,
            fetchedFiltersFromDB.etapes
          );
        }

        setFetchedFiltersFromDB(fetchedFiltersFromDB);
        convertFetchedFiltersToDisplayedFilters();
      }
      setShowModalContent(true);
    };

    void getSavedFilter();
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
        {
          filters: fetchedFiltersFromDB.etapes,
          title: Labels.aroundMe.filter.steps,
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
      else cartoFilterStorage.etapes.push(cartoFilter.name);

      setCartoFilterStorage(cartoFilterStorage);
    });

    return cartoFilters;
  };

  const extractFilterData = (
    poiTypesToFilter: PoiTypeFromDB[],
    stepToFilter: StepFromDB[]
  ) => {
    setFetchedFiltersFromDB({
      etapes: stepToFilter.map((step) =>
        convertToCartoFilter(step, AroundMeConstants.CartoFilterEnum.etape)
      ),
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
    poiTypesToFilter: PoiTypeFromDB[],
    categorie: AroundMeConstants.PoiCategorieEnum
  ): PoiTypeFromDB[] => {
    return poiTypesToFilter.filter(
      (poiType) => poiType.categorie === categorie
    );
  };

  const convertToCartoFilter = (
    filter: PoiTypeFromDB | StepFromDB,
    filterType: AroundMeConstants.CartoFilterEnum
  ): CartoFilter => {
    return {
      active: false,
      filterType: filterType,
      name: filter.nom,
    };
  };

  const updateQueryFilter = (filter: CartoFilter) => {
    let tempQueryFilter =
      filter.filterType === AroundMeConstants.CartoFilterEnum.type
        ? cartoFilterStorage.types
        : cartoFilterStorage.etapes;
    if (!tempQueryFilter.includes(filter.name))
      tempQueryFilter.push(filter.name);
    else {
      tempQueryFilter = tempQueryFilter.filter(
        (element) => element !== filter.name
      );
    }

    if (filter.filterType === AroundMeConstants.CartoFilterEnum.type)
      cartoFilterStorage.types = tempQueryFilter;
    else cartoFilterStorage.etapes = tempQueryFilter;
    setCartoFilterStorage(cartoFilterStorage);
  };

  const renderSection = (section: {
    title: string;
    filters: CartoFilter[];
  }) => {
    return (
      <View style={styles.filterView}>
        <CommonText style={styles.partsTitle}>{section.title}</CommonText>
        <View style={styles.behindOfModal}></View>
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
        action={() => {
          updateQueryFilter(filter);
        }}
      />
    ));
  };

  const sendFiltersTracker = (filters: string[]) => {
    if (!StringUtils.stringArrayIsNullOrEmpty(filters)) {
      filters.forEach((filter) => {
        trackScreenView(
          `${TrackerUtils.TrackingEvent.FILTER_CARTO} - ${filter}`
        );
      });
    }
  };

  return (
    <>
      <FetchFilterData setFilterData={setFilterDataFromDb} />
      <Modal transparent={true} visible={visible} animationType="fade">
        {showModalContent && (
          <View style={styles.behindOfModal}>
            <View style={styles.mainContainer}>
              <TitleH1 title={Labels.aroundMe.filter.title} animated={false} />
              <TouchableOpacity
                style={styles.closeModalView}
                onPress={() => {
                  setCartoFilterStorage({ etapes: [], types: [] });
                  hideModal(false);
                }}
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
                  <Button
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
                    action={() => {
                      setCartoFilterStorage({ etapes: [], types: [] });
                      hideModal(false);
                    }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={Labels.buttons.validate}
                    titleStyle={styles.buttonTitleStyle}
                    rounded={true}
                    disabled={false}
                    action={() => {
                      void StorageUtils.storeObjectValue(
                        StorageKeysConstants.cartoFilterKey,
                        cartoFilterStorage
                      );
                      sendFiltersTracker(cartoFilterStorage.etapes);
                      sendFiltersTracker(cartoFilterStorage.types);
                      setCartoFilterStorage({ etapes: [], types: [] });
                      hideModal(true);
                    }}
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
  behindOfModal: {
    backgroundColor: Colors.transparentGrey,
    flex: 1,
  },
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
    margin: Margins.default,
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
