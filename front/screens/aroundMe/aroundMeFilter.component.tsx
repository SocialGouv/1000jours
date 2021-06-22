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
} from "../../constants";
import type { PoiType } from "../../type";
import type { CartoFilter } from "../../type/aroundMe.types";

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const AroundMeFilter: React.FC<Props> = ({ visible, hideModal }) => {
  const [poiTypesAndCategories, setPoiTypesAndCategories] =
    useState<PoiType[]>();

  const [structureFilters, setStructureFilters] = useState<CartoFilter[]>([]);
  const [professionnelsFilters, setProfessionnelsFilters] = useState<
    CartoFilter[]
  >([]);

  const extractPoiTypeAndCategorieFilters = (poiTypesToFilter: PoiType[]) => {
    setStructureFilters(
      filterToPoiCategorie(
        poiTypesToFilter,
        AroundMeConstants.PoiCategorieEnum.structure
      ).map((poiType) => convertToCartoFilter(poiType))
    );

    setProfessionnelsFilters(
      filterToPoiCategorie(
        poiTypesToFilter,
        AroundMeConstants.PoiCategorieEnum.professionnel
      ).map((poiType) => convertToCartoFilter(poiType))
    );
  };

  const filterToPoiCategorie = (
    poiTypesToFilter: PoiType[],
    categorie: AroundMeConstants.PoiCategorieEnum
  ): PoiType[] => {
    return poiTypesToFilter.filter(
      (poiType) => poiType.categorie === categorie
    );
  };
  const convertToCartoFilter = (type: PoiType): CartoFilter => {
    const typeFilter: CartoFilter = {
      active: false,
      name: type.nom,
    };
    return typeFilter;
  };

  useEffect(() => {
    if (poiTypesAndCategories && poiTypesAndCategories.length > 0)
      extractPoiTypeAndCategorieFilters(poiTypesAndCategories);
  }, [poiTypesAndCategories]);
  return (
    <>
      <FetchFilterData setPoiTypes={setPoiTypesAndCategories} />
      <Modal transparent={true} visible={visible}>
        <View style={styles.mainContainer}>
          <TitleH1 title={Labels.aroundMe.filter.title} animated={false} />
          <TouchableOpacity
            style={styles.closeModalView}
            onPress={() => {
              hideModal();
            }}
          >
            <Icomoon
              name={IcomoonIcons.fermer}
              size={Sizes.xs}
              color={Colors.primaryBlue}
            />
          </TouchableOpacity>
          <CommonText style={styles.partsTitle}>
            {Labels.aroundMe.filter.pointsOfInterest}
          </CommonText>
          <View style={styles.filterContainer}>
            {structureFilters.map((filter, index) => (
              <Chip
                id={index}
                key={index}
                title={filter.name}
                selected={filter.active}
                action={() => {
                  console.log("LOOL");
                }}
              />
            ))}
          </View>
          <CommonText style={styles.partsTitle}>
            {Labels.aroundMe.filter.healthProfessional}
          </CommonText>
          <View style={styles.filterContainer}>
            {professionnelsFilters.map((filter, index) => (
              <Chip
                id={index}
                key={index}
                title={filter.name}
                selected={filter.active}
                action={() => {
                  console.log("LOOL");
                }}
              />
            ))}
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
                  hideModal();
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
                  hideModal();
                }}
              />
            </View>
          </View>
        </View>
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
