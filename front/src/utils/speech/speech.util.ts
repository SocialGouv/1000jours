import { decode } from "html-entities";

import type { Article } from "../../types";
import * as StringUtils from "../strings/strings.util";

export const buildArticleTextToRead = (article: Article): string => {
  let text = "";

  text += `${StringUtils.addEndDotIfNeeded(article.titre)} `;

  if (article.texteTitre1) {
    text += `${StringUtils.addEndDotIfNeeded(article.texteTitre1)} `;
  }
  if (article.texte1) {
    const stringToBeDecoded = article.texte1.replace(/<[^>]*>?/gm, "");
    text += `${decode(stringToBeDecoded)} `;
  }
  if (article.texteTitre2) {
    text += `${StringUtils.addEndDotIfNeeded(article.texteTitre2)} `;
  }
  if (article.texte2) {
    const stringToBeDecoded = article.texte2.replace(/<[^>]*>?/gm, "");
    text += `${decode(stringToBeDecoded)} `;
  }

  return StringUtils.addSpaceBetweenDotAndUppercase(text);
};
