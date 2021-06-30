import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { Colors, Labels, Margins, Paddings, Sizes } from "../../constants";
import { PLATFORM_IS_ANDROID } from "../../constants/platform.constants";
import type { Article, ArticleFilter } from "../../types";
import Button from "../base/button.component";
import Chip from "../base/chip.component";
import Icomoon, { IcomoonIcons } from "../base/icomoon.component";
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
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<ArticleFilter[]>([]);

  useEffect(() => {
    if (filters.length === 0) setFilters(getFilters(articles));
  }, [articles]);

  return (
    <View style={styles.paddingsDefault}>
      <Button
        buttonStyle={styles.filterButton}
        titleStyle={styles.filterButtonTitle}
        title={Labels.listArticles.filters}
        rounded={true}
        disabled={false}
        icon={
          <Icomoon
            name={IcomoonIcons.filtrer}
            size={Sizes.sm}
            color={Colors.primaryBlue}
          />
        }
        action={() => {
          setShowFilters(!showFilters);
        }}
      />
      {showFilters && (
        <View style={styles.filterContainer}>
          {filters.map((filter, index) => (
            <Chip
              id={filter.thematique.id}
              key={index}
              title={`${filter.thematique.nom} (${filter.nbArticles})`}
              selected={filter.active}
              action={() => {
                filter.active = !filter.active;
                applyFilters(filters);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: Sizes.sm,
  },
  filterContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  paddingsDefault: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
});

export default Filters;
