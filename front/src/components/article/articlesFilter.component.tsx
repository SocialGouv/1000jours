import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { Modal, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { Labels } from "../../constants";
import { PLATFORM_IS_ANDROID } from "../../constants/platform.constants";
import { useFavoriteArticlesIds } from "../../hooks";
import { Colors, Margins, Paddings, Sizes, Styles } from "../../styles";
import type { Article, ArticleFilter } from "../../types";
import { ArticleFilterUtils } from "../../utils";
import { BaseAssets } from "../assets";
import {
  CancelButton,
  CloseButton,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  TitleH1,
  View,
} from "../baseComponents";
import CustomDivider from "../baseComponents/customDivider.component";
import ArticlesFilterFavoritesRow from "./articlesFilterFavoritesRow.component";

interface Props {
  articles: Article[];
  applyFilters: (filters: ArticleFilter[]) => void;
  filterByFavorites: () => void;
}

const ArticlesFilter: FC<Props> = ({
  articles,
  applyFilters,
  filterByFavorites,
}) => {
  const favoriteArticlesIds = useFavoriteArticlesIds();
  const [filters, setFilters] = useState<ArticleFilter[]>([]);
  const [lastAppliedFilters, setLastAppliedFilters] = useState<ArticleFilter[]>(
    []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showFavoriteToggle, setShowFavoriteToggle] = useState(false);

  const [lastToggleOnFavoritesValue, setLastToggleOnFavoritesValue] =
    useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);

  useEffect(() => {
    if (filters.length === 0) {
      const fetchedFilters = ArticleFilterUtils.getFilters(articles);
      setFilters(fetchedFilters);
      setLastAppliedFilters(fetchedFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles]);

  useEffect(() => {
    setShowFavoriteToggle(
      ArticleFilterUtils.shouldShowFavoriteToggle(articles, favoriteArticlesIds)
    );
  }, [articles, favoriteArticlesIds]);

  useEffect(() => {
    if (showFavoriteToggle && !isToggleOn) {
      const areArticlesAllFavorites =
        !ArticleFilterUtils.areArticlesNotAllFavorites(
          articles,
          favoriteArticlesIds
        );

      setLastToggleOnFavoritesValue(areArticlesAllFavorites);
      setIsToggleOn(areArticlesAllFavorites);
    }
  }, [articles, favoriteArticlesIds, isToggleOn, showFavoriteToggle]);

  const onShowModal = useCallback(() => {
    if (lastAppliedFilters.length > 0) {
      setFilters(lastAppliedFilters);
    }
    setIsToggleOn(lastToggleOnFavoritesValue);
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible, lastAppliedFilters, lastToggleOnFavoritesValue]);

  const resetFilters = useCallback(() => {
    setFilters(ArticleFilterUtils.getFilters(articles));
    setIsToggleOn(false);
  }, [articles]);

  const cancelFiltersModal = useCallback(() => {
    setFilters(lastAppliedFilters);
    setIsToggleOn(lastToggleOnFavoritesValue);
    setIsModalVisible(false);
  }, [lastAppliedFilters, lastToggleOnFavoritesValue]);

  const onCheckboxPressed = useCallback(
    (selectedFilter: ArticleFilter) => () => {
      if (isToggleOn) setIsToggleOn(false);
      setFilters(ArticleFilterUtils.updateFilters(filters, selectedFilter));
    },
    [filters, isToggleOn]
  );

  const onToggleFavorite = useCallback(() => {
    setIsToggleOn(!isToggleOn);
    setFilters(ArticleFilterUtils.getFilters(articles));
  }, [isToggleOn, articles]);

  const onValidateFilter = useCallback(() => {
    setLastToggleOnFavoritesValue(isToggleOn);
    setLastAppliedFilters(filters);

    if (isToggleOn) filterByFavorites();
    else applyFilters(filters);

    setIsModalVisible(false);
  }, [applyFilters, filters, isToggleOn, filterByFavorites]);

  const renderFavoriteToggleRow = () => {
    return showFavoriteToggle ? (
      <>
        <CustomDivider />
        <ArticlesFilterFavoritesRow
          onToggleFavorite={onToggleFavorite}
          isToggleOn={isToggleOn}
        />
      </>
    ) : null;
  };

  return (
    <View style={styles.paddingsDefault}>
      <CustomButton
        buttonStyle={styles.filterButton}
        titleStyle={styles.filterButtonTitle}
        title={ArticleFilterUtils.filterButtonLabel(lastAppliedFilters)}
        rounded={true}
        disabled={false}
        accessibilityLabel={ArticleFilterUtils.filterButtonAccessibilityLabel(
          lastAppliedFilters
        )}
        icon={
          <Icomoon
            name={IcomoonIcons.filtrer}
            size={Sizes.sm}
            color={Colors.primaryBlue}
          />
        }
        action={onShowModal}
      />
      <Modal transparent={true} visible={isModalVisible} animationType="fade">
        {isModalVisible && (
          <View style={Styles.modale.behindOfModal}>
            <View style={styles.mainContainer}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TitleH1
                  title={Labels.articleList.filters}
                  animated={false}
                  style={{ paddingTop: Paddings.larger }}
                />
                <CloseButton onPress={cancelFiltersModal} clear={true} />
              </View>
              <CustomButton
                buttonStyle={[styles.filterButton]}
                titleStyle={styles.filterButtonTitle}
                title={Labels.articleList.resetFilters}
                rounded={true}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.actualiser}
                    size={Sizes.xxs}
                    color={Colors.primaryBlue}
                  />
                }
                action={resetFilters}
              />

              <ScrollView>
                {filters.map((filter, index) => (
                  <CheckBox
                    containerStyle={styles.checkboxItem}
                    textStyle={{
                      color: Colors.primaryBlueDark,
                      flex: 1,
                      fontWeight: filter.active ? "bold" : "normal",
                    }}
                    key={index}
                    iconRight
                    uncheckedIcon={
                      <BaseAssets.CheckboxUncheckedIcon
                        width={Sizes.sm}
                        height={Sizes.sm}
                      />
                    }
                    checkedIcon={
                      <BaseAssets.CheckboxCheckedIcon
                        width={Sizes.sm}
                        height={Sizes.sm}
                      />
                    }
                    uncheckedColor={Colors.primaryBlueDark}
                    checkedColor={Colors.primaryBlueDark}
                    title={`${filter.thematique.nom} (${filter.nbArticles})`}
                    accessibilityLabel={ArticleFilterUtils.checkboxAccessibilityLabel(
                      filter
                    )}
                    checked={filter.active}
                    onPress={onCheckboxPressed(filter)}
                  />
                ))}
                {renderFavoriteToggleRow()}
              </ScrollView>

              <View style={styles.buttonsContainer}>
                <CancelButton action={cancelFiltersModal} />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={Labels.buttons.validate}
                    titleStyle={styles.buttonTitleStyle}
                    rounded={true}
                    disabled={false}
                    action={onValidateFilter}
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
  checkboxItem: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    minHeight: Sizes.accessibilityMinButton,
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
  paddingsDefault: {
    paddingVertical: Paddings.smallest,
  },
});

export default ArticlesFilter;
