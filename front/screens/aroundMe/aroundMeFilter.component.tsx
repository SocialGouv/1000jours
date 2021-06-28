import * as React from "react";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

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
  CartoFiltersStructuresEtPros,
  CartoFilterStorage,
  PoiTypeFromDB,
  StepFromDB,
} from "../../type";
import { StorageUtils, StringUtils } from "../../utils";

interface Props {
  visible: boolean;
  showModal: () => void;
  hideModal: (filterWasSaved: boolean) => void;
}

const AroundMeFilter: React.FC<Props> = ({ visible, showModal, hideModal }) => {
  const [poiTypesAndCategories, setPoiTypesAndCategories] =
    useState<PoiTypeFromDB[]>();
  const [steps, setSteps] = useState<StepFromDB[]>([]);

  const [fetchedTypeFiltersFromDB, setFetchedTypeFiltersFromDB] =
    useState<CartoFiltersStructuresEtPros>();
  const [fetchedStepFiltersFromDB, setFetchedStepFiltersFromDB] =
    useState<CartoFilter[]>();
  const [cartoFilterStorage, setCartoFilterStorage] =
    useState<CartoFilterStorage>({ etapes: [], types: [] });
  const [showModalContent, setShowModalContent] = useState(false);

  useEffect(() => {
    const checkSavedFilters = async () => {
      const savedFilters: CartoFilterStorage =
        await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);
      if (
        StringUtils.stringArrayIsNullOrEmpty(savedFilters.types) &&
        StringUtils.stringArrayIsNullOrEmpty(savedFilters.etapes)
      )
        showModal();
    };
    void checkSavedFilters();
  }, []);

  useEffect(() => {
    if (poiTypesAndCategories && poiTypesAndCategories.length > 0)
      extractPoiTypeAndCategorieFilters(poiTypesAndCategories);
  }, [poiTypesAndCategories]);

  useEffect(() => {
    if (steps.length > 0) extractStepFilters(steps);
  }, [steps]);

  useEffect(() => {
    if (!visible) return;

    setShowModalContent(false);
    const getSavedFilter = async () => {
      const savedFilters: CartoFilterStorage =
        await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);

      if (fetchedTypeFiltersFromDB) {
        fetchedTypeFiltersFromDB.professionnels.forEach(
          (filter) => (filter.active = false)
        );
        fetchedTypeFiltersFromDB.structures.forEach(
          (filter) => (filter.active = false)
        );

        if (!StringUtils.stringArrayIsNullOrEmpty(savedFilters.types)) {
          setFetchedTypeFiltersFromDB({
            professionnels: checkSavedFiltersInFetchedFilters(
              savedFilters.types,
              fetchedTypeFiltersFromDB.professionnels
            ),
            structures: checkSavedFiltersInFetchedFilters(
              savedFilters.types,
              fetchedTypeFiltersFromDB.structures
            ),
          });
        }
      }

      if (fetchedStepFiltersFromDB) {
        fetchedStepFiltersFromDB.forEach((filter) => (filter.active = false));

        if (!StringUtils.stringArrayIsNullOrEmpty(savedFilters.etapes)) {
          setFetchedStepFiltersFromDB(
            checkSavedFiltersInFetchedFilters(
              savedFilters.etapes,
              fetchedStepFiltersFromDB
            )
          );
        }
      }
      setShowModalContent(true);
    };

    void getSavedFilter();
  }, [visible]);

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

  const extractPoiTypeAndCategorieFilters = (
    poiTypesToFilter: PoiTypeFromDB[]
  ) => {
    setFetchedTypeFiltersFromDB({
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
  };

  const extractStepFilters = (stepsFilter: StepFromDB[]) => {
    setFetchedStepFiltersFromDB(
      stepsFilter.map((step) =>
        convertToCartoFilter(step, AroundMeConstants.CartoFilterEnum.etape)
      )
    );
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
        changeSizeForIos={true}
      />
    ));
  };

  return (
    <>
      <FetchFilterData
        setPoiTypes={setPoiTypesAndCategories}
        setSteps={setSteps}
      />
      <Modal transparent={true} visible={visible}>
        {showModalContent && (
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
            <CommonText style={styles.partsTitle}>
              {Labels.aroundMe.filter.structures}
            </CommonText>
            <View style={styles.filterContainer}>
              {renderChips(fetchedTypeFiltersFromDB?.structures)}
            </View>
            <CommonText style={styles.partsTitle}>
              {Labels.aroundMe.filter.healthProfessional}
            </CommonText>
            <View style={styles.filterContainer}>
              {renderChips(fetchedTypeFiltersFromDB?.professionnels)}
            </View>
            <CommonText style={styles.partsTitle}>
              {Labels.aroundMe.filter.steps}
            </CommonText>
            <View style={styles.filterContainer}>
              {renderChips(fetchedStepFiltersFromDB)}
            </View>
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
                    setCartoFilterStorage({ etapes: [], types: [] });
                    hideModal(true);
                  }}
                />
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
  },
  closeModalView: {
    margin: Margins.default,
    position: "absolute",
    right: 0,
    top: 0,
  },
  filterContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    borderWidth: 1,
    flex: 1,
    justifyContent: "flex-start",
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
