import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Sizes,
} from "../../styles";
import { HtmlUtils } from "../../utils";

interface Props {
  html: string;
  /**
   * Permet de dimensionner correctement les balises <iframe>
   * Sinon elle aura la même largeur que l'écran "SCREEN_WIDTH"
   */
  screenWidth: number;
}

const TextHtml: FC<Props> = ({ html, screenWidth }) => {
  const [htmlContent, setHtmlContent] = React.useState("");
  const [isReady, setIsReady] = React.useState(false);

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const fixContent = (content: string) => {
    let fixedContent = content;
    fixedContent = HtmlUtils.fixMediaContent(fixedContent);
    fixedContent = HtmlUtils.fixYoutubeLinkContent(fixedContent);
    fixedContent = HtmlUtils.fixListContent(fixedContent, screenWidth);
    setHtmlContent(fixedContent);
    setIsReady(true);
  };

  React.useEffect(() => {
    if (html) fixContent(html);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlContent]);

  return isReady ? (
    <HTML
      WebView={WebView}
      contentWidth={screenWidth}
      renderers={renderers}
      customHTMLElementModels={customHTMLElementModels}
      baseStyle={styles.baseStyle}
      source={{ html: htmlContent }}
      tagsStyles={{ b: styles.bold, strong: styles.bold }}
      ignoredStyles={["color", "textAlign"]}
      renderersProps={{
        iframe: {
          scalesPageToFit: true,
          webViewProps: {},
        },
      }}
    />
  ) : null;
};

const styles = StyleSheet.create({
  baseStyle: {
    color: Colors.commonText,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
    fontSize: Sizes.sm,
    lineHeight: Sizes.lg,
    margin: 0,
    padding: 0,
    textAlign: "justify",
  },
  bold: {
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.bold),
  },
  webview: {
    borderColor: Colors.primaryBlueDark,
    borderWidth: 2,
    width: "100%",
  },
});

export default TextHtml;
