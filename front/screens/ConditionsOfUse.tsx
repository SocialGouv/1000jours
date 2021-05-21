import table, { IGNORED_TAGS } from "@native-html/table-plugin";
import type { Asset } from "expo-asset";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";
import { WebView } from "react-native-webview";

import htmlFile from "../assets/html/cgu.html";
import Modal from "../components/Modal";
import { FontWeight } from "../constants";
import { getAssetsAsync } from "../utils/asset.util";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const ConditionsOfUse: FC<Props> = ({ setIsVisible }) => {
  const [html, setHtml] = React.useState<Asset | null>(null);

  useEffect(() => {
    void getAssetsAsync(htmlFile as string).then((asset: Asset) => {
      setHtml(asset);
    });
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

  return html ? (
    <Modal setIsVisible={setIsVisible} content={buildContent(html)} />
  ) : null;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: FontWeight.bold,
  },
});

export default ConditionsOfUse;
