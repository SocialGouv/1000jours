import _ from "lodash";
import type { FC } from "react";
import { useCallback, useRef } from "react";
import * as React from "react";
import { Alert, FlatList, Linking, StyleSheet } from "react-native";

import { Labels } from "../../constants";
import SpecialChars from "../../constants/specialChars";
import { Colors, Paddings, Sizes } from "../../styles";
import type { ArticleLink } from "../../types";
import { SecondaryText, View } from "../baseComponents";
import SubTitle from "./subTitle.component";

interface Props {
  linksArray: ArticleLink[];
}

const Links: FC<Props> = ({ linksArray }) => {
  const flatListRef = useRef<FlatList>();

  const setFlatListRef = useCallback((ref: FlatList) => {
    flatListRef.current = ref;
  }, []);

  const goToUrl = useCallback(
    (url: string) => () => {
      if (url && url.length > 0) {
        void Linking.canOpenURL(url).then((supported: boolean) => {
          if (supported) void Linking.openURL(url);
          else Alert.alert(Labels.invalidLink);
        });
      } else Alert.alert(Labels.invalidLink);
    },
    []
  );

  const links = _.filter(linksArray, "label");
  const keyExtractor = useCallback((item: ArticleLink) => item.label, []);

  const renderArticleLink = useCallback(
    ({ item }: { item: ArticleLink }) => {
      return (
        <View style={[styles.linkContainer]}>
          <SecondaryText
            style={[styles.dot]}
            importantForAccessibility="no"
            accessibilityElementsHidden={true}
            accessible={false}
          >
            {SpecialChars.blackLargeCircle}
          </SecondaryText>
          <SecondaryText
            accessibilityRole="link"
            style={[styles.link]}
            onPress={goToUrl(item.url)}
          >
            {item.label}
          </SecondaryText>
        </View>
      );
    },
    [goToUrl]
  );

  return _.filter(linksArray, "label").length > 0 ? (
    <View>
      <SubTitle title={Labels.article.learnMoreAboutIt} />
      <View style={styles.linksContainer}>
        <FlatList
          ref={setFlatListRef}
          data={links}
          keyExtractor={keyExtractor}
          renderItem={renderArticleLink}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  dot: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxxxxs,
    lineHeight: Sizes.lg,
    textAlignVertical: "top",
  },
  link: {
    color: Colors.commonText,
    flexDirection: "column",
    fontSize: Sizes.sm,
    lineHeight: Sizes.lg,
    paddingHorizontal: Paddings.light,
    textDecorationLine: "underline",
  },
  linkContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    paddingVertical: Paddings.smaller,
  },
  linksContainer: {
    paddingVertical: Paddings.light,
  },
});

export default Links;
