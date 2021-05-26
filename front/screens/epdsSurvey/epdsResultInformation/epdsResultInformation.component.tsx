/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { View } from "../../../components/Themed";
import {
  Colors,
  FontWeight,
  Margins,
  Paddings,
  Sizes,
} from "../../../constants";
import type { EpdsResultInformationType } from "../../../type";
import EpdsResultContactParagraph from "./epdsResultContactParagraph.component";
import EpdsResultSimpleParagraph from "./epdsResultSimpleParagraph.component";
import EpdsResultUrlParagraph from "./epdsResultUrlParagraph.component";

interface EpdsResultInformationProps {
  leftBorderColor: string;
  informationList: EpdsResultInformationType[];
}

const EpdsResultInformation: React.FC<EpdsResultInformationProps> = ({
  leftBorderColor,
  informationList,
}) => {
  const borderColorStyle = { borderStartColor: leftBorderColor };

  const renderParagraphs = (paragraphs: EpdsResultInformationType[]) => {
    return paragraphs.map(
      (paragraph: EpdsResultInformationType, index: number) => (
        <View key={index}>{renderParagraph(paragraph)}</View>
      )
    );
  };

  const renderParagraph = (paragraph: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return paragraph.contacts ? (
      <EpdsResultContactParagraph
        paragraphTitle={paragraph.title}
        contacts={paragraph.contacts}
        titleColor={leftBorderColor}
      />
    ) : paragraph.urls ? (
      <EpdsResultUrlParagraph
        paragraphTitle={paragraph.title}
        urls={paragraph.urls}
      />
    ) : (
      <EpdsResultSimpleParagraph paragraph={paragraph} />
    );
  };

  return (
    <List.Section style={[styles.professionalBanner, borderColorStyle]}>
      {informationList.map((professional: any, professionalIndex: number) => (
        <View key={professionalIndex}>
          <List.Accordion
            title={professional.sectionTitle}
            titleStyle={styles.sectionTitle}
            titleNumberOfLines={0}
            description={professional.sectionDescription}
            descriptionStyle={styles.sectionDescription}
            descriptionNumberOfLines={0}
          >
            {professional.paragraphs &&
              renderParagraphs(professional.paragraphs)}
          </List.Accordion>
        </View>
      ))}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  professionalBanner: {
    borderStartWidth: Margins.smaller,
    margin: Margins.default,
    padding: Paddings.default,
  },
  sectionDescription: {
    color: Colors.commonText,
    paddingVertical: Paddings.smaller,
  },
  sectionTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
  },
});

export default EpdsResultInformation;
