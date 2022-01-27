import * as Linking from "expo-linking";
import type { FC } from "react";
import { useEffect } from "react";

import { Links } from "../../constants";
import { RootNavigation } from "../../utils";

const LinksHandler: FC = () => {
  const redirectDeepLink = (url: string) => {
    const { path, queryParams } = Linking.parse(url);
    if (path === Linking.parse(Links.deepLinkUrl).path) {
      RootNavigation.navigate(queryParams.page as string, {
        id: queryParams.id,
      });
    }
  };

  const handleOpenURL = ({ url }: { url: string }) => {
    if (url) redirectDeepLink(url);
  };

  useEffect(() => {
    // Permet de récupérer l'url qui a déclenché l'ouverture de l'app lorsque celle-ci n'est pas déjà ouverte
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          setTimeout(() => {
            redirectDeepLink(url);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("An error occurred", err);
      });

    return () => {
      Linking.removeEventListener("url", handleOpenURL);
    };
  }, []);

  return null;
};

export default LinksHandler;
