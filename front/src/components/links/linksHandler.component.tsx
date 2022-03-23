import * as Linking from "expo-linking";
import type { FC } from "react";
import { useEffect } from "react";

import { Links, StorageKeysConstants } from "../../constants";
import { RootNavigation, StorageUtils } from "../../utils";

const enum DeepLinksPages {
  article = "article",
  event = "event",
}

const LinksHandler: FC = () => {
  const redirectDeepLink = async (url: string) => {
    const { path, queryParams } = Linking.parse(url);
    if (path === Linking.parse(Links.deepLinkUrl).path) {
      // TODO: à améliorer
      // Sauvegarde du scrollToEventId car les params ne sont pas pris en compte lors de cette redirection
      // Il est possible de les prendre en compte mais il y un soucis pour reset les params de la route.
      // Lorsque l'on clique sur le tabCalendar c'est le bottomTab qui gère la navigation et conserve les params de la route...
      if (queryParams.page === DeepLinksPages.event && queryParams?.id) {
        await StorageUtils.storeStringValue(
          StorageKeysConstants.scrollToEventId,
          queryParams.id as string
        );
      }
      void RootNavigation.navigate(queryParams.page as string, {
        id: queryParams.id,
      });
    }
  };

  const handleOpenURL = ({ url }: { url: string }) => {
    if (url) void redirectDeepLink(url);
  };

  useEffect(() => {
    // Permet de récupérer l'url qui a déclenché l'ouverture de l'app lorsque celle-ci est déjà ouverte.
    Linking.addEventListener("url", handleOpenURL);

    // Permet de récupérer l'url qui a déclenché l'ouverture de l'app lorsque celle-ci n'est pas déjà ouverte
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          // TODO: à améliorer
          // Ce setTimeout permet de laisser le 1er écran à se charger avant de faire la redirection.
          // Sans : Celà peut causer un crash ou un blocage sur la redirection.
          setTimeout(() => {
            void redirectDeepLink(url);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("An error occurred", err);
      });

    return () => {
      Linking.removeEventListener("url", handleOpenURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LinksHandler;
