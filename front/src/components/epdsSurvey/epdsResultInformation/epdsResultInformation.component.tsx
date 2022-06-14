/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import type { ScrollView } from "react-native";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

import { SCREEN_HEIGHT } from "../../../constants/platform.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../../styles";
import type { EpdsResultInformationType } from "../../../type";
import { AccessibilityUtils } from "../../../utils";
import { EpdsAssets } from "../../assets";
import { Icomoon, View } from "../../baseComponents";
import EpdsResultContactParagraph from "./epdsResultContactParagraph.component";
import EpdsResultSimpleParagraph from "./epdsResultSimpleParagraph.component";
import EpdsResultUrlParagraph from "./epdsResultUrlParagraph.component";

interface EpdsResultInformationProps {
  leftBorderColor: string;
  informationList: EpdsResultInformationType[];
  scrollRef: React.RefObject<ScrollView>;
}

const EpdsResultInformation: React.FC<EpdsResultInformationProps> = ({
  leftBorderColor,
  informationList,
  scrollRef,
}) => {
  const [isAccessibilityMode, setAccessibilityMode] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<boolean[]>(
    _.range(informationList.length).map(() => false)
  );

  const borderColorStyle = { borderStartColor: leftBorderColor };

  useEffect(() => {
    const checkAccessibilityMode = async () => {
      setAccessibilityMode(await AccessibilityUtils.screenReaderIsEnabled());
    };

    void checkAccessibilityMode();
  }, []);

  const renderParagraphs = (paragraphs: EpdsResultInformationType[]) => {
    return paragraphs.map(
      (paragraph: EpdsResultInformationType, index: number) => (
        <View key={index} style={styles.accordionItem}>
          {renderParagraph(paragraph, index == 0)}
        </View>
      )
    );
  };

  const renderParagraph = (paragraph: any, isFocusOnFirstElement: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return paragraph.contacts ? (
      <EpdsResultContactParagraph
        paragraphTitle={paragraph.title}
        contacts={paragraph.contacts}
        isFocusOnFirstElement={isFocusOnFirstElement}
      />
    ) : paragraph.urls ? (
      <EpdsResultUrlParagraph
        paragraphTitle={paragraph.title}
        urls={paragraph.urls}
        isFocusOnFirstElement={isFocusOnFirstElement}
      />
    ) : (
      <EpdsResultSimpleParagraph
        paragraph={paragraph}
        isFocusOnFirstElement={isFocusOnFirstElement}
      />
    );
  };

  const onAccordionPressed = useCallback(
    (accIndex: number) => () => {
      const tempExpandedAccordions = _.range(informationList.length).map(
        () => false
      );
      tempExpandedAccordions[accIndex] = !expandedAccordions[accIndex];
      setExpandedAccordions(tempExpandedAccordions);

      if (isAccessibilityMode) {
        scrollRef.current?.scrollTo({
          animated: true,
          x: 0,
          y: SCREEN_HEIGHT * 0.1,
        });
      }
    },
    [expandedAccordions, informationList.length]
  );

  return (
    <>
      {informationList.map((professional: any, professionalIndex: number) => (
        <View key={professionalIndex}>
          <Card
            style={[styles.card, borderColorStyle]}
            accessible={false}
            importantForAccessibility="no"
          >
            <TouchableOpacity
              style={styles.accordionView}
              onPress={onAccordionPressed(professionalIndex)}
              accessibilityState={{
                expanded: expandedAccordions[professionalIndex],
              }}
              accessibilityLabel={professional.sectionTitle}
              accessibilityRole="button"
            >
              <View style={styles.accordionHeader}>
                <View style={styles.accordionIcon}>
                  <Icomoon
                    name={professional.sectionIcon}
                    size={Sizes.xxl}
                    color={Colors.primaryBlue}
                  />
                </View>
                <Text style={styles.accordionTitle} accessibilityRole="header">
                  {professional.sectionTitle}
                </Text>
                <View style={styles.accordionIcon}>
                  {expandedAccordions[professionalIndex] ? (
                    <EpdsAssets.ChevronUpIcon
                      width={Sizes.xs}
                      height={Sizes.xs}
                    />
                  ) : (
                    <EpdsAssets.ChevronDownIcon
                      width={Sizes.xs}
                      height={Sizes.xs}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {expandedAccordions[professionalIndex]
              ? professional.paragraphs &&
                renderParagraphs(professional.paragraphs)
              : null}
          </Card>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  accordionHeader: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  accordionIcon: {
    backgroundColor: "transparent",
    marginHorizontal: Margins.default,
    marginVertical: Margins.default,
  },
  accordionItem: {
    paddingLeft: Paddings.light,
    paddingRight: Paddings.smaller,
  },
  accordionTitle: {
    color: Colors.primaryBlueDark,
    flex: 1,
    flexGrow: 2,
    flexWrap: "wrap",
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.sm,
  },
  accordionView: {
    backgroundColor: Colors.cardWhite,
  },
  card: {
    borderColor: Colors.cardGrey,
    borderStartWidth: Margins.smaller,
    borderWidth: Margins.smallest,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
  },
  sectionDescription: {
    color: Colors.commonText,
    paddingVertical: Paddings.smaller,
  },
});

export default EpdsResultInformation;