import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import CheckedIcon from "../../assets/images/checkbox_checked.svg";
import {
  Colors,
  Labels,
  Margins,
  Paddings,
  Shadow,
  Sizes,
} from "../../constants";
import {
  MAJOR_VERSION_IOS,
  PLATFORM_IS_ANDROID,
} from "../../constants/platform.constants";
import type { Article, ArticleFilter } from "../../types";
import Button from "../base/button.component";
import Icomoon, { IcomoonIcons } from "../base/icomoon.component";
import TitleH1 from "../base/titleH1.component";
import { View } from "../Themed";

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
      <Button
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
              <TouchableOpacity
                style={styles.closeModalView}
                onPress={() => {
                  cancelFiltersModal();
                }}
                accessibilityLabel={Labels.accessibility.close}
                accessibilityRole="button"
              >
                <Icomoon
                  name={IcomoonIcons.fermer}
                  size={Sizes.xs}
                  color={Colors.primaryBlue}
                />
              </TouchableOpacity>

              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <TitleH1 title={Labels.listArticles.filters} animated={false} />
                <Button
                  buttonStyle={[styles.filterButton]}
                  titleStyle={styles.filterButtonTitle}
                  title={Labels.listArticles.resetFilters}
                  rounded={true}
                  disabled={false}
                  icon={
                    <Icomoon
                      name={IcomoonIcons.filtrer}
                      size={Sizes.xxs}
                      color={Colors.primaryBlue}
                    />
                  }
                  action={() => {
                    resetFilters();
                  }}
                />
              </View>

              <ScrollView>
                {filters.map((filter, index) => (
                  <CheckBox
                    containerStyle={styles.checkboxItem}
                    textStyle={{ flex: 1 }}
                    key={index}
                    iconRight
                    uncheckedIcon="circle-o"
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
                      cancelFiltersModal();
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
  closeModalView: {
    alignSelf: "flex-end",
    padding: Paddings.default,
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
