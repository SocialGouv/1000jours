import type { FC } from "react";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import WebView from "react-native-webview";

import { BackButton, TitleH1, View } from "../../components/baseComponents";
import { Paddings } from "../../styles";
import { RootNavigation } from "../../utils";

const RecosanteWidget: FC = () => {
  const onBackButtonPressed = React.useCallback(() => {
    void RootNavigation.navigate("root");
  }, []);

  return (
    <ScrollView
      style={[styles.mainContainer]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={[styles.flexStart]}>
        <BackButton action={onBackButtonPressed} />
      </View>
      <TitleH1
        title="Lorem ipsum dolor sit amet"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        animated={false}
      />
      <WebView
        source={{
          html: /*html*/ `
            <html lang="fr">
              <head>
                <meta charset="utf-8">
                <title>Recosanté - Connaître son environnement. Agir pour sa santé </title>
              </head>
              <body>
                <script id="widget-recosante" src="https://recosante.beta.gouv.fr/iframe.js" data-search="?theme=default"></script>
              </body>
            </html>
          `,
        }}
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: Paddings.larger,
    paddingTop: Paddings.largest,
  },
});

export default RecosanteWidget;
