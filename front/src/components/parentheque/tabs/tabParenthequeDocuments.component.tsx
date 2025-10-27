import type { ReactElement } from "react";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

import { Paddings } from "../../../styles";
import type { Document } from "../../../types";
import DocumentCard from "../../document/documentCard.component";

const TabParenthequeDocuments = (documents: Document[]): ReactElement => {
  return (
    <ScrollView>
      {documents.length > 0 && (
        <View style={styles.listContainer}>
          {documents.map((document, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={1000}
              delay={0}
            >
              <DocumentCard document={document} key={index} />
            </Animatable.View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
});

export default TabParenthequeDocuments;
