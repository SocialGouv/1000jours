import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { Colors, Labels, Paddings, Sizes } from "../../constants";
import type { Article, ArticleFilter } from "../../types";
import { Button, Icomoon } from "..";
import Chip from "../Chip";
import { IcomoonIcons } from "../icomoon.component";
import { View } from "../Themed";

interface Props {
  articles: Article[];
  applyFilter: (id: number, active: boolean) => void;
}

const Filters: FC<Props> = ({ articles, applyFilter }) => {
  const getFilters = (articlesToFilter: Article[]) => {
    return _.chain(articlesToFilter)
      .flatMap(({ thematiques }) => {
        return thematiques;
      })
      .groupBy("id")
      .map((thematiques) => {
        return {
          active: true,
          nbArticles: thematiques.length,
          thematique: thematiques[0],
        };
      })
      .value();
  };
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<ArticleFilter[]>([]);

  useEffect(() => {
    setFilters(getFilters(articles));
  }, [articles]);

  return (
    <View style={styles.paddingsDefault}>
      <Button
        buttonStyle={styles.filterButton}
        title={Labels.listArticles.filters}
        rounded={false}
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
              selected={true}
              action={applyFilter}
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
