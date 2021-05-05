/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../constants";

interface EpdsResultInformationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftBorderColor: any;
  informationList: { title: string; description: string }[];
}

const EpdsResultInformation: React.FC<EpdsResultInformationProps> = ({
  leftBorderColor,
  informationList,
}) => {
  const borderColorStyle = { borderStartColor: leftBorderColor };
  const renderParagraphs = (
    paragraphs: { title: string; description: string }[]
  ) => {
    return paragraphs.map((paragraph, index) => (
      <View key={index}>{renderParagraph(paragraph)}</View>
    ));
  };

  const renderParagraph = (paragraph: {
    title: string;
    description: string;
  }) => {
    return (
      <View style={styles.itemBorder}>
        <CommonText style={styles.paragraphTitle}>{paragraph.title}</CommonText>
        <CommonText style={styles.paragraphDescription}>
          {paragraph.description}
        </CommonText>
      </View>
    );
  };
  return (
    <List.Section style={[styles.professionalBanner, borderColorStyle]}>
      {informationList.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (professional: any, professionalIndex: number) => (
          <View key={professionalIndex}>
            <List.Accordion
              title={professional.sectionTitle}
              titleStyle={styles.sectionTitle}
              titleNumberOfLines={0}
            >
              {professional.paragraphs &&
                renderParagraphs(professional.paragraphs)}
            </List.Accordion>
          </View>
        )
      )}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    paddingBottom: Margins.smaller,
    paddingTop: Margins.smallest,
  },
  paragraphDescription: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    lineHeight: Sizes.mmd,
  },
  paragraphTitle: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  professionalBanner: {
    borderStartWidth: Margins.smaller,
    margin: Margins.default,
    padding: Paddings.default,
  },
  sectionDescription: {
    color: Colors.commonText,
  },
  sectionTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
  },
});

export default EpdsResultInformation;
