import Constants from "expo-constants";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { Modal, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import CheckedIcon from "../../assets/images/checkbox_checked.svg";
import UncheckedIcon from "../../assets/images/checkbox_unchecked.svg";
import { Labels } from "../../constants";
import {
  MAJOR_VERSION_IOS,
  PLATFORM_IS_ANDROID,
} from "../../constants/platform.constants";
import { Colors, Margins, Paddings, Shadow, Sizes } from "../../styles";
import type { Article, ArticleFilter } from "../../types";
import {
  CloseButton,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  TitleH1,
  View,
} from "../baseComponents";

interface Props {
  articles: Article[];
  applyFilters: (filters: ArticleFilter[]) => void;
}

const Filters: FC<Props> = ({ articles, applyFilters }) => {
  const getFilters = (articlesToFilter: Article[]) => {
    return _.chain(articlesToFilter)
      .flatMap(({ thematiques }) => {
        return thematiques;
      })
      .groupBy("id")
      .map((thematiques) => {
        return {
          active: false,
          nbArticles: thematiques.length,
          thematique: thematiques[0],
        };
      })
      .value();
  };

  const [filters, setFilters] = React.useState<ArticleFilter[]>([]);
  const [initalFilters, setInitalFilters] = React.useState<ArticleFilter[]>([]);
  const [triggerUpdateFilters, setTriggerUpdateFilters] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (filters.length === 0) setFilters(getFilters(articles));
  }, [articles]);

  useEffect(() => {
    if (modalVisible) setInitalFilters(_.cloneDeep(filters));
  }, [modalVisible]);

  const numberActiveFilters = () => {
    const number = filters.filter((item) => item.active).length;
    return number ? `(${number} actif(s))` : "";
  };

  const numberActiveAccessibilityFilters = () => {
    const number = filters.filter((item) => item.active).length;
    return `${Labels.listArticles.filters}. (${number} ${Labels.accessibility.articlesFilters.activeFilter})`;
  };

  const checkboxAccessibilityLabel = (filter: ArticleFilter) =>
    `${filter.thematique.nom}. (${filter.nbArticles} ${Labels.accessibility.articlesFilters.availableArticles})`;

  const resetFilters = () => {
    setFilters(initalFilters);
  };

  const cancelFiltersModal = () => {
    setModalVisible(false);
    resetFilters();
  };

  return (
    <View style={styles.paddingsDefault}>
      <CustomButton
        buttonStyle={styles.filterButton}
        titleStyle={styles.filterButtonTitle}
        title={`${Labels.listArticles.filters} ${numberActiveFilters()}`}
        rounded={true}
        disabled={false}
        accessibilityLabel={numberActiveAccessibilityFilters()}
        icon={
          <Icomoon
            name={IcomoonIcons.filtrer}
            size={Sizes.sm}
            color={Colors.primaryBlue}
          />
        }
        action={() => {
          setModalVisible(!modalVisible);
        }}
      />

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        {modalVisible && (
          <View style={styles.behindOfModal}>
            <View style={styles.mainContainer}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TitleH1
                  title={Labels.listArticles.filters}
                  animated={false}
                  style={{ paddingTop: Paddings.larger }}
                />

                <CloseButton
                  onPress={() => {
                    cancelFiltersModal();
                  }}
                  clear={true}
                />
              </View>
              <CustomButton
                buttonStyle={[styles.filterButton]}
                titleStyle={styles.filterButtonTitle}
                title={Labels.listArticles.resetFilters}
                rounded={true}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.actualiser}
                    size={Sizes.xxs}
                    color={Colors.primaryBlue}
                  />
                }
                action={() => {
                  resetFilters();
                }}
              />

              <ScrollView>
                {filters.map((filter, index) => (
                  <CheckBox
                    containerStyle={styles.checkboxItem}
                    textStyle={{
                      flex: 1,
                      fontWeight: filter.active ? "bold" : "normal",
                    }}
                    key={index}
                    iconRight
                    uncheckedIcon={
                      <UncheckedIcon width={Sizes.lg} height={Sizes.lg} />
                    }
                    checkedIcon={
                      <CheckedIcon width={Sizes.lg} height={Sizes.lg} />
                    }
                    uncheckedColor={Colors.primaryBlueDark}
                    checkedColor={Colors.primaryBlueDark}
                    title={`${filter.thematique.nom} (${filter.nbArticles})`}
                    accessibilityLabel={checkboxAccessibilityLabel(filter)}
                    checked={filter.active}
                    onPress={() => {
                      filter.active = !filter.active;
                      setTriggerUpdateFilters(!triggerUpdateFilters);
                    }}
                  />
                ))}
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
                    action={() => {
                      cancelFiltersModal();
                    }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={Labels.buttons.validate}
                    titleStyle={styles.buttonTitleStyle}
                    rounded={true}
                    disabled={false}
                    action={() => {
                      applyFilters(filters);
                      setModalVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  behindOfModal: {
    backgroundColor: Colors.transparentGrey,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
  centeredView: {
    alignItems: MAJOR_VERSION_IOS < 14 ? "stretch" : "center",
    justifyContent: "center",
    marginTop: Margins.default,
  },
  checkboxItem: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  filterButton: {
    alignSelf: "flex-start",
    backgroundColor: Colors.cardWhite,
    borderColor: PLATFORM_IS_ANDROID ? Colors.primaryBlue : Colors.cardGrey,
    borderWidth: 1,
    marginBottom: Margins.evenMoreSmallest,
    marginLeft: Margins.evenMoreSmallest,
    shadowColor: Colors.navigation,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  filterButtonTitle: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
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
    margin: Margins.default,
    padding: Paddings.default,
    paddingTop: 0,
  },
  modalView: {
    alignItems: MAJOR_VERSION_IOS < 14 ? "stretch" : "center",
    backgroundColor: Colors.white,
    borderRadius: Sizes.mmd,
    elevation: 5,
    margin: Margins.larger,
    padding: Paddings.larger,
    shadowColor: "black",
    shadowOffset: {
      height: Shadow.offsetHeight,
      width: Shadow.offsetWidth,
    },
    shadowOpacity: Shadow.opacity,
    shadowRadius: Shadow.radius,
  },
  paddingsDefault: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
});

export default Filters;
