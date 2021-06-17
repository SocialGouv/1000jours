import table, { IGNORED_TAGS } from "@native-html/table-plugin";
import type { Asset } from "expo-asset";
import * as React from "react";
import { useEffect } from "react";
import { Modal as RNModal, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import { WebView } from "react-native-webview";

import { FontWeight, Paddings } from "../../constants";
import { AssestUtils } from "../../utils";
import { View } from "../Themed";
import Button from "./button.component";

interface Props {
  content?: React.ReactNode;
  htmlFile?: string;
  setIsVisible: (showMenu: boolean) => void;
}

const Modal: React.FC<Props> = ({ content, setIsVisible, htmlFile }) => {
  const hideModal = () => {
    setIsVisible(false);
  };
  const [html, setHtml] = React.useState<Asset | null>(null);

  useEffect(() => {
    if (htmlFile) {
      void AssestUtils.getAssetsAsync(htmlFile).then((asset: Asset) => {
        setHtml(asset);
      });
    }
  }, []);

  const buildContent = (data: Asset) => {
    const htmlProps = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      WebView,
      ignoredTags: IGNORED_TAGS,
      renderers: {
        table,
      },
    };
    return (
      <HTML source={data} tagsStyles={{ b: styles.bold }} {...htmlProps} />
    );
  };

  return (
    <RNModal
      animationType="slide"
      visible={true}
      presentationStyle="overFullScreen"
      onRequestClose={hideModal}
    >
      <SafeAreaView>
        <ScrollView style={styles.mainContainer}>
          <View style={styles.closeButton}>
            <Button title="X" rounded={true} action={hideModal} />
          </View>
          {content && <View>{content}</View>}
          {html && <View>{buildContent(html)}</View>}
        </ScrollView>
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: FontWeight.bold,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  mainContainer: {
    padding: Paddings.default,
  },
});

export default Modal;
