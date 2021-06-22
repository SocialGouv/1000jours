/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { range } from "lodash";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, List } from "react-native-paper";

import { Icomoon } from "../../../components";
import { View } from "../../../components/Themed";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
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
  const [expandedAccordions, setExpandedAccordions] = useState<boolean[]>(
    range(informationList.length).map(() => false)
  );

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

  const onAccordionPressed = (accIndex: number) => {
    const tempExpandedAccordions = range(informationList.length).map(
      () => false
    );
    tempExpandedAccordions[accIndex] = !expandedAccordions[accIndex];
    setExpandedAccordions(tempExpandedAccordions);
  };

  return (
    <List.Section>
      {informationList.map((professional: any, professionalIndex: number) => (
        <View key={professionalIndex}>
          <Card style={[styles.card, borderColorStyle]}>
            <List.Accordion
              style={styles.accordion}
              left={() => (
                <Icomoon
                  name={professional.sectionIcon}
                  size={Sizes.xxl}
                  color={Colors.primaryBlue}
                />
              )}
              expanded={expandedAccordions[professionalIndex]}
              onPress={() => {
                onAccordionPressed(professionalIndex);
              }}
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
          </Card>
        </View>
      ))}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: Colors.cardWhite,
  },
  card: {
    borderColor: Colors.cardGrey,
    borderStartWidth: Margins.smaller,
    borderWidth: Margins.smallest,
    marginVertical: Margins.smaller,
  },
  sectionDescription: {
    color: Colors.commonText,
    paddingVertical: Paddings.smaller,
  },
  sectionTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.sm,
  },
});

export default EpdsResultInformation;
