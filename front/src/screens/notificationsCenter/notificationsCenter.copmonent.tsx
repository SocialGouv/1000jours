import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BackButton, TitleH1, Toggle } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels } from "../../constants";
import { Colors, FontStyle, FontWeight, Margins, Paddings } from "../../styles";
import type { RootStackParamList } from "../../types";
import { TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const NotificationsCenter: FC<Props> = ({ navigation }) => {
  const [trackerAction, setTrackerAction] = useState<string>("");
  const [isToggleOn, setToggleOn] = useState(false);

  const goBack = useCallback(() => {
    setTrackerAction(Labels.buttons.cancel);
    navigation.goBack();
  }, [navigation]);

  const onToucheToggle = useCallback(() => {
    setToggleOn(!isToggleOn);
  }, [isToggleOn]);

  const item = (title: string, description: string) => {
    return (
      <View style={styles.itemContent}>
        <View style={styles.itemTextBloc}>
          <Text style={styles.itemTextTitle}>{title}</Text>
          <Text style={styles.itemTextDescr}>{description}</Text>
        </View>
        <View style={styles.itemToggleBloc}>
          <Text
            style={[
              styles.itemToggleText,
              isToggleOn ? null : { fontWeight: FontWeight.bold },
            ]}
          >
            {Labels.buttons.no}
          </Text>
          <View style={styles.itemToggle}>
            <Toggle isToggleOn={isToggleOn} toggleSwitch={onToucheToggle} />
          </View>
          <Text
            style={[
              styles.itemToggleText,
              isToggleOn ? { fontWeight: FontWeight.bold } : null,
            ]}
          >
            {Labels.buttons.yes}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.NOTIFICATIONS_CENTER}
        actionName={trackerAction}
      />
      <View style={styles.header}>
        <View style={styles.flexStart}>
          <BackButton action={goBack} />
        </View>
        <TitleH1
          animated={false}
          title={Labels.notificationsCenter.title}
          description={Labels.notificationsCenter.description}
        />
        {item(
          Labels.notificationsCenter.article.title,
          Labels.notificationsCenter.article.decription
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
  },
  header: {
    padding: Paddings.default,
    paddingTop: Paddings.default,
  },
  itemContent: {
    flexDirection: "row",
    marginVertical: Margins.default,
  },
  itemTextBloc: {
    flex: 2,
  },
  itemTextDescr: {
    color: Colors.grey,
    fontStyle: FontStyle.italic,
    marginTop: Margins.smaller,
  },
  itemTextTitle: {
    fontWeight: FontWeight.bold,
  },
  itemToggle: {
    marginHorizontal: Margins.smaller,
  },
  itemToggleBloc: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  itemToggleText: {
    color: Colors.secondaryGreenDark,
  },
  mainContainer: {
    backgroundColor: Colors.white,
  },
});

export default NotificationsCenter;
