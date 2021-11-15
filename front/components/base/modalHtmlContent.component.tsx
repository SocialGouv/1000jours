import TableRenderer, { tableModel } from "@native-html/table-plugin";
import type { Asset } from "expo-asset";
import * as React from "react";
import { useEffect } from "react";
import { Modal as RNModal, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";

import { Colors, FontWeight, Paddings } from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { AssestUtils } from "../../utils";
import { CloseButton } from "..";
import { View } from "../Themed";

interface Props {
  content?: React.ReactNode;
  htmlFile?: string;
  setIsVisible: (showMenu: boolean) => void;
}

const ModalHtmlContent: React.FC<Props> = ({
  content,
  setIsVisible,
  htmlFile,
}) => {
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
      customHTMLElementModels: {
        table: tableModel,
      },
      renderers: {
        table: TableRenderer,
      },
    };
    return (
      <HTML
        source={data}
        contentWidth={SCREEN_WIDTH}
        tagsStyles={{ b: styles.bold }}
        {...htmlProps}
      />
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
        <ScrollView>
          <View>
            <View style={styles.headContainer}>
              <View style={styles.closeButtonContainer}>
                <CloseButton onPress={hideModal} clear={false} />
              </View>
            </View>
            <View style={styles.mainContainer}>
              {content && <>{content}</>}
              {html && <>{buildContent(html)}</>}
            </View>
          </View>
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
    paddingVertical: Paddings.default,
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
  },
  headContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smaller,
  },
  mainContainer: {
    paddingHorizontal: Paddings.default,
  },
});

export default ModalHtmlContent;
