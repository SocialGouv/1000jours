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
import type { CartoFilter, CartoFilters, PoiTypeFromDB } from "../../type";
import { StorageUtils } from "../../utils";

interface Props {
  visible: boolean;
  hideModal: (filterWasSaved: boolean) => void;
}

const AroundMeFilter: React.FC<Props> = ({ visible, hideModal }) => {
  const [poiTypesAndCategories, setPoiTypesAndCategories] =
    useState<PoiTypeFromDB[]>();

  const [fetchedFiltersFromDB, setFetchedFiltersFromDB] =
    useState<CartoFilters>();
  const [poiTypeArray, setPoiTypeArray] = useState<string[]>([]);
  const [showModalContent, setShowModalContent] = useState(false);

  useEffect(() => {
    if (poiTypesAndCategories && poiTypesAndCategories.length > 0)
      extractPoiTypeAndCategorieFilters(poiTypesAndCategories);
  }, [poiTypesAndCategories]);

  useEffect(() => {
    if (!visible) return;

    setShowModalContent(false);
    const getSavedFilter = async () => {
      const savedFilters: string[] = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoFilterKey
      );
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (savedFilters?.length > 0 && fetchedFiltersFromDB) {
        fetchedFiltersFromDB.structures.forEach(
          (filter) => (filter.active = false)
        );

        setFetchedFiltersFromDB({
          professionnels: checkSavedFiltersInFetchedFilters(
            savedFilters,
            fetchedFiltersFromDB.professionnels
          ),
          structures: checkSavedFiltersInFetchedFilters(
            savedFilters,
            fetchedFiltersFromDB.structures
          ),
        });
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
    setFetchedFiltersFromDB({
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

  const filterToPoiCategorie = (
    poiTypesToFilter: PoiTypeFromDB[],
    categorie: AroundMeConstants.PoiCategorieEnum
  ): PoiTypeFromDB[] => {
    return poiTypesToFilter.filter(
      (poiType) => poiType.categorie === categorie
    );
  };

  const convertToCartoFilter = (type: PoiTypeFromDB): CartoFilter => {
    return {
      active: false,
      name: type.nom,
    };
  };

  const updateQueryFilter = (filterName: string) => {
    let tempQueryFilter = poiTypeArray;
    if (!tempQueryFilter.includes(filterName)) tempQueryFilter.push(filterName);
    else {
      tempQueryFilter = tempQueryFilter.filter(
        (element) => element !== filterName
      );
    }
    setPoiTypeArray(tempQueryFilter);
  };

  const renderChips = (cartoFilters: CartoFilter[] | undefined) => {
    return cartoFilters?.map((filter, index) => (
      <Chip
        id={index}
        key={index}
        title={filter.name}
        selected={filter.active}
        action={() => {
          updateQueryFilter(filter.name);
        }}
        changeSizeForIos={true}
      />
    ));
  };

  return (
    <>
      <FetchFilterData setPoiTypes={setPoiTypesAndCategories} />
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
              {renderChips(fetchedFiltersFromDB?.structures)}
            </View>
            <CommonText style={styles.partsTitle}>
              {Labels.aroundMe.filter.healthProfessional}
            </CommonText>
            <View style={styles.filterContainer}>
              {renderChips(fetchedFiltersFromDB?.professionnels)}
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
                      StorageKeysConstants.cartoFilterKey,
                      poiTypeArray
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
    justifyContent: "space-between",
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
