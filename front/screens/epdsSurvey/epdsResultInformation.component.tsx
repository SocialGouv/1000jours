/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../constants";

interface SimpleInformation {
  title: string;
  description: string;
}

interface ContactInformation {
  contactName: string;
  openingTime: string;
  phoneNumber: string;
  thematic: string;
}

interface EpdsResultInformationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftBorderColor: any;
  informationList: ContactInformation[] | SimpleInformation[];
}

const EpdsResultInformation: React.FC<EpdsResultInformationProps> = ({
  leftBorderColor,
  informationList,
}) => {
  const textColorStyle = { color: leftBorderColor };
  const borderColorStyle = { borderStartColor: leftBorderColor };
  const renderParagraphs = (
    paragraphs: { title: string; description: string }[]
  ) => {
    return paragraphs.map((paragraph, index) => (
      <View key={index}>{renderParagraph(paragraph)}</View>
    ));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderParagraph = (paragraph: any) => {
    return paragraph.title
      ? renderSimpleParagraph(paragraph)
      : renderContactParagraph(paragraph);
  };

  const renderSimpleParagraph = (paragraph: SimpleInformation) => {
    return (
      <View style={styles.itemBorder}>
        <CommonText style={styles.paragraphTitle}>{paragraph.title}</CommonText>
        <CommonText style={styles.paragraphDescription}>
          {paragraph.description}
        </CommonText>
      </View>
    );
  };

  const renderContactParagraph = (paragraph: ContactInformation) => {
    return (
      <View style={styles.itemBorder}>
        <CommonText style={[styles.paragraphTitle, textColorStyle]}>
          {paragraph.contactName}
        </CommonText>
        <CommonText style={styles.paragraphDescription}>
          {paragraph.thematic}
        </CommonText>
        <CommonText style={[styles.paragraphDescription, styles.fontBold]}>
          {paragraph.openingTime}
        </CommonText>
        <CommonText style={[styles.paragraphDescription, styles.fontBold]}>
          {paragraph.phoneNumber}
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
  fontBold: {
    fontWeight: FontWeight.bold,
  },
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    paddingBottom: Margins.smaller,
    paddingTop: Margins.smallest,
  },
  paragraphDescription: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    lineHeight: Sizes.mmd,
  },
  paragraphTitle: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
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
