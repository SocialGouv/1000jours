import { Share } from "react-native";

import {
  PLATFORM_IS_ANDROID,
  TIMEOUT_ON_SHARE_MODAL,
} from "../../constants/platform.constants";

export const share = async (
  title: string,
  message: string,
  url?: string,
  callback?: () => void
): Promise<void> => {
  // Permet d'attendre la fin des annimations (fermeture du menu ou modal)
  // Sinon le popup native `share` ne s'affiche pas.
  await new Promise((resolve) => setTimeout(resolve, TIMEOUT_ON_SHARE_MODAL));

  // Le paramètre url (Share) ne fonctionne que sur iOS
  // Nous le rajoutons directement dans le message sous format texte.
  if (url && PLATFORM_IS_ANDROID) {
    message += url;
  }

  try {
    const result = await Share.share(
      { message, title, url },
      { subject: title }
    );
    if (result.action === Share.sharedAction && callback) {
      callback();
    }
  } catch (error: unknown) {
    console.error(error);
  }
};
