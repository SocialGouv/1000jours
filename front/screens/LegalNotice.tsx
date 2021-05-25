import type { Asset } from "expo-asset";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";

import htmlFile from "../assets/html/mentions_legales.html";
import Modal from "../components/Modal";
import { FontWeight } from "../constants";
import { AssestUtils } from "../utils";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const LegalNotice: FC<Props> = ({ setIsVisible }) => {
  const [html, setHtml] = React.useState<Asset | null>(null);

  useEffect(() => {
    void AssestUtils.getAssetsAsync(htmlFile as string).then((asset: Asset) => {
      setHtml(asset);
    });
  }, []);

  const buildContent = (data: Asset) => (
    <HTML source={data} tagsStyles={{ b: styles.bold }} />
  );

  return html ? (
    <Modal setIsVisible={setIsVisible} content={buildContent(html)} />
  ) : null;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: FontWeight.bold,
  },
});

export default LegalNotice;
