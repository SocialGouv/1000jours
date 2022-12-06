import { StringUtils } from "..";

export const fixMediaContent = (content: string): string => {
  // La balise <oembed> n'est pas supportée par la lib react-native-render-html
  // On la remplace par une iframe qui elle sera rendu dans une WebView
  content = StringUtils.replaceAllText(
    content,
    `<figure class="media"><oembed url=`,
    `<iframe src=`
  );
  content = content.replace("</oembed></figure>", "</iframe>");
  return content;
};

export const fixYoutubeLinkContent = (content: string): string => {
  const youtubeBaseUrl = "https://youtube.com/embed/";
  content = StringUtils.replaceAllText(
    content,
    "https://youtube.com/watch?v=",
    youtubeBaseUrl
  );
  content = StringUtils.replaceAllText(
    content,
    "https://youtu.be/",
    youtubeBaseUrl
  );
  return content;
};

export const fixListContent = (
  content: string,
  screenWidth: number
): string => {
  // Permet de corriger la largeur du contenu trop élevée avec des puces
  content = StringUtils.replaceAllText(
    content,
    `<ul>`,
    `<ul style="max-width:${screenWidth}px;">`
  );
  return content;
};
