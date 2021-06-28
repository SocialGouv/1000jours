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
  CartoFilters,
  PoiTypeFromDB,
  StepFromDB,
} from "../../type";
import { StorageUtils } from "../../utils";

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
    useState<CartoFilters>();
  const [fetchedStepFiltersFromDB, setFetchedStepFiltersFromDB] =
    useState<CartoFilter[]>();
  const [poiTypeArray, setPoiTypeArray] = useState<string[]>([]);
  const [poiStepArray, setPoiStepArray] = useState<string[]>([]);
  const [showModalContent, setShowModalContent] = useState(false);

  useEffect(() => {
    const checkIfSavedFilters = async () => {
      const savedFilters: string[] = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoFilterTypeKey
      );
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!savedFilters || savedFilters.length === 0) showModal();
    };
    void checkIfSavedFilters();
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
      const savedTypeFilters: string[] = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoFilterTypeKey
      );
      if (fetchedTypeFiltersFromDB) {
        fetchedTypeFiltersFromDB.professionnels.forEach(
          (filter) => (filter.active = false)
        );
        fetchedTypeFiltersFromDB.structures.forEach(
          (filter) => (filter.active = false)
        );

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (savedTypeFilters?.length > 0) {
          setFetchedTypeFiltersFromDB({
            professionnels: checkSavedFiltersInFetchedFilters(
              savedTypeFilters,
              fetchedTypeFiltersFromDB.professionnels
            ),
            structures: checkSavedFiltersInFetchedFilters(
              savedTypeFilters,
              fetchedTypeFiltersFromDB.structures
            ),
          });
        }
      }

      const savedStepFilters: string[] = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoFilterStepKey
      );
      if (fetchedStepFiltersFromDB) {
        fetchedStepFiltersFromDB.forEach((filter) => (filter.active = false));

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (savedStepFilters && savedStepFilters.length > 0) {
          setFetchedStepFiltersFromDB(
            checkSavedFiltersInFetchedFilters(
              savedStepFilters,
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
      poiTypeArray.push(cartoFilter.name);
      setPoiTypeArray(poiTypeArray);
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
      ).map((poiType) => convertToCartoFilter(poiType)),
      structures: filterToPoiCategorie(
        poiTypesToFilter,
        AroundMeConstants.PoiCategorieEnum.structure
      ).map((poiType) => convertToCartoFilter(poiType)),
    });
  };

  const extractStepFilters = (stepsFilter: StepFromDB[]) => {
    setFetchedStepFiltersFromDB(
      stepsFilter.map((step) => convertToCartoFilter(step))
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
    type: PoiTypeFromDB | StepFromDB
  ): CartoFilter => {
    return {
      active: false,
      name: type.nom,
    };
  };

  const updateQueryFilter = (
    filterName: string,
    filterType: AroundMeConstants.CartoFilterEnum
  ) => {
    let tempQueryFilter =
      filterType === AroundMeConstants.CartoFilterEnum.type
        ? poiTypeArray
        : poiStepArray;
    if (!tempQueryFilter.includes(filterName)) tempQueryFilter.push(filterName);
    else {
      tempQueryFilter = tempQueryFilter.filter(
        (element) => element !== filterName
      );
    }
    if (filterType === AroundMeConstants.CartoFilterEnum.type)
      setPoiTypeArray(tempQueryFilter);
    else setPoiStepArray(tempQueryFilter);
  };

  const renderChips = (
    cartoFilters: CartoFilter[] | undefined,
    filterType: AroundMeConstants.CartoFilterEnum
  ) => {
    return cartoFilters?.map((filter, index) => (
      <Chip
        id={index}
        key={index}
        title={filter.name}
        selected={filter.active}
        action={() => {
          updateQueryFilter(filter.name, filterType);
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
                setPoiTypeArray([]);
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
              {renderChips(
                fetchedTypeFiltersFromDB?.structures,
                AroundMeConstants.CartoFilterEnum.type
              )}
            </View>
            <CommonText style={styles.partsTitle}>
              {Labels.aroundMe.filter.healthProfessional}
            </CommonText>
            <View style={styles.filterContainer}>
              {renderChips(
                fetchedTypeFiltersFromDB?.professionnels,
                AroundMeConstants.CartoFilterEnum.type
              )}
            </View>
            <CommonText style={styles.partsTitle}>
              {Labels.aroundMe.filter.steps}
            </CommonText>
            <View style={styles.filterContainer}>
              {renderChips(
                fetchedStepFiltersFromDB,
                AroundMeConstants.CartoFilterEnum.etape
              )}
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
                    setPoiTypeArray([]);
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
                      StorageKeysConstants.cartoFilterTypeKey,
                      poiTypeArray
                    );
                    setPoiTypeArray([]);
                    void StorageUtils.storeObjectValue(
                      StorageKeysConstants.cartoFilterStepKey,
                      poiStepArray
                    );
                    setPoiTypeArray([]);
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
