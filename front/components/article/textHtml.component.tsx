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
} from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";

interface Props {
  html: string;
  /**
   * Permet de dimensionner correctement les balises <iframe>
   * Sinon elle aura la même largeur que l'écran "SCREEN_WIDTH"
   */
  offsetTotal?: number;
}

const TextHtml: FC<Props> = ({ html, offsetTotal }) => {
  const [htmlContent, setHtmlContent] = React.useState("");
  const [isReady, setIsReady] = React.useState(false);

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const fixVideoContent = (content: string) => {
    const width = offsetTotal ? SCREEN_WIDTH - offsetTotal * 2 : SCREEN_WIDTH;
    // La balise <oembed> n'est pas supportée par la lib react-native-render-html
    // On la remplace par une iframe qui elle sera rendu dans une WebView
    content = content.replace(
      '<figure class="media"><oembed url=',
      `<iframe width="${width}" src=`
    );
    content = content.replace("</oembed></figure>", "</iframe>");
    // Permet de corriger les liens des vidéos youtube
    content = content.replace("youtube.com/watch?v=", "youtube.com/embed/");
    setHtmlContent(content);
    setIsReady(true);
  };

  React.useEffect(() => {
    if (html) fixVideoContent(html);
  }, [htmlContent]);

  return isReady ? (
    <HTML
      WebView={WebView}
      contentWidth={SCREEN_WIDTH}
      renderers={renderers}
      customHTMLElementModels={customHTMLElementModels}
      baseStyle={styles.baseStyle}
      source={{ html: htmlContent }}
      tagsStyles={{ b: styles.bold, strong: styles.bold }}
      ignoredStyles={["color"]}
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
  },
  bold: {
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.bold),
  },
});

export default TextHtml;
