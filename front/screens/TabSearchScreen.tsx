import { useLazyQuery } from "@apollo/client";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

import { Button, CommonText, ErrorMessage, TitleH1 } from "../components";
import ArticleCard from "../components/article/articleCard.component";
import { Colors, Labels, Margins, Paddings } from "../constants";
import { SEARCH_ARTICLES_BY_KEYWORDS } from "../constants/databaseQueries.constants";
import type { Article, TabSearchParamList } from "../types";
import { KeyboardUtils } from "../utils";

interface Props {
  navigation: StackNavigationProp<TabSearchParamList>;
}

const TabSearchScreen: React.FC<Props> = ({ navigation }) => {
  const [keywords, setKeywords] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);

  const [getSearchArticlesByKeywords, { loading, error, data }] = useLazyQuery(
    SEARCH_ARTICLES_BY_KEYWORDS(keywords)
  );

  const onSearchByKeywords = () => {
    KeyboardUtils.dismissKeyboard();
    getSearchArticlesByKeywords();
  };

  useEffect(() => {
    if (!loading && data) {
      const results = (data as { articles: Article[] }).articles;
      setArticles(results);
    }
  }, [loading, data]);

  if (error) return <ErrorMessage error={error} />;

  return (
    <ScrollView style={[styles.mainContainer]}>
      <TitleH1
        title={Labels.search.title}
        description={Labels.search.findAdaptedResponses}
        animated={false}
      />

      <View style={styles.searchBloc}>
        <CommonText>{Labels.search.yourSearch}</CommonText>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => {
            setKeywords(text);
          }}
          placeholder={Labels.search.writeKeywordPlaceholder}
          value={keywords}
        />

        <View style={styles.center}>
          <Button
            title={Labels.search.validButton}
            rounded={true}
            action={onSearchByKeywords}
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        {articles.map((article, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={1000}
            delay={0}
          >
            <ArticleCard article={article} />
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: Margins.default,
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
  mainContainer: {
    backgroundColor: "white",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.default,
    paddingTop: Paddings.default,
  },
  searchBloc: {
    paddingTop: Paddings.default,
  },
  searchInput: {
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginVertical: Margins.smaller,
    paddingHorizontal: Paddings.light,
    paddingVertical: Paddings.smallest,
  },
});

export default TabSearchScreen;
