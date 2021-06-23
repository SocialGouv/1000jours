import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _, { range } from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ErrorMessage, TimelineStep, TitleH2, View } from "../components";
import { Paddings, Sizes, StorageKeysConstants } from "../constants";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type {
  Step,
  TabHomeParamList,
  UserInfos,
  UserSituation,
} from "../types";
import { StorageUtils, TrackerUtils } from "../utils";
import { scheduleNextStepNotification } from "../utils/notification.util";

export enum UserInfo {
  projet = "projet",
  conception = "conception",
  grossesse = "grossesse",
  enfant = "enfant",
  enfants = "enfants",
}

interface Props {
  navigation: StackNavigationProp<TabHomeParamList, "listArticles">;
}

const TabHomeScreen: FC<Props> = ({ navigation }) => {
  const { trackScreenView } = useMatomo();
  trackScreenView(TrackerUtils.TrackingEvent.HOME);
  const ALL_STEPS_AND_CURRENT = gql`
    query GetAllSteps($infos: Informations!) {
      etapes(sort: "id") {
        id
        nom
        ordre
        description
        debut
        fin
      }
      getCurrentEtape(infos: $infos) {
        id
        nom
        ordre
      }
    }
  `;

  const defaultUserInfos: UserInfos = {
    conception: false,
    date: null,
    enfant: false,
    enfants: false,
    grossesse: false,
    projet: false,
  };

  const getUserSituations = async () => {
    const userSituations = (await StorageUtils.getObjectValue(
      StorageKeysConstants.userSituationsKey
    )) as UserSituation[] | null;
    const date = await StorageUtils.getStringValue(
      StorageKeysConstants.userChildBirthdayKey
    );
    const infos: UserInfos = defaultUserInfos;

    userSituations?.map((userSituation) => {
      const id = userSituation.id as keyof typeof UserInfo;
      infos[id] = userSituation.isChecked;
    });
    if (date && date.length > 0) infos.date = date;

    loadSteps({ variables: { infos: infos } });
  };

  const [loadStepsAlreadyInError, setLoadStepsAlreadyInError] = useState(false);
  const [loadSteps, { called, loading, error, data }] = useLazyQuery(
    ALL_STEPS_AND_CURRENT,
    {
      variables: {
        infos: defaultUserInfos,
      },
    }
  );

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollTo = (positionY: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionY,
    });
  };

  useEffect(() => {
    void getUserSituations();
  }, []);

  const prepareNextStepNotification = (activeStep: Step | null) => {
    if (activeStep) {
      const nextStep = _.filter(etapes, { ordre: activeStep.ordre + 1 });
      if (nextStep.length > 0) void scheduleNextStepNotification(nextStep[0]);
    }
  };

  if (!called || loading) return <ActivityIndicator size="large" />;
  if (error) {
    // En cas d'erreur on essaye de charger les étapes avec 'defaultUserInfos'
    if (!loadStepsAlreadyInError) {
      setLoadStepsAlreadyInError(true);
      loadSteps({ variables: { infos: defaultUserInfos } });
    }
    return <ErrorMessage error={error} />;
  }

  const result = data as { etapes: Step[]; getCurrentEtape: Step | null };
  const etapes = result.etapes.map((etape) => ({
    ...etape,
    active: result.getCurrentEtape && result.getCurrentEtape.id === etape.id,
  }));
  const numberOfStepsWithoutTheFirstAndLast = etapes.length - 1 - 2;

  if (result.getCurrentEtape)
    prepareNextStepNotification(result.getCurrentEtape);

  return (
    <ScrollView style={[styles.mainContainer]} ref={scrollViewRef}>
      <TitleH2
        title={Labels.timeline.title}
        description={Labels.timeline.description}
        animated={false}
      />
      <View style={[styles.timelineStepContainer]}>
        <View style={[styles.timelineContainer]}>
          <View
            style={[
              styles.timelineBlock,
              styles.timelineBlockRight,
              styles.timelineBlockFirst,
            ]}
          />
          {range(numberOfStepsWithoutTheFirstAndLast).map((index) => (
            <View
              style={[
                styles.timelineBlock,
                index % 2 === 0
                  ? styles.timelineBlockLeft
                  : styles.timelineBlockRight,
              ]}
              key={index}
            />
          ))}
        </View>
        {etapes.map((step, index) => (
          <TimelineStep
            order={step.ordre}
            name={step.nom}
            index={index}
            isTheLast={index === etapes.length - 1}
            key={index}
            active={step.active}
            onPress={() => {
              navigation.navigate("listArticles", { step });
            }}
            onLayout={(event: LayoutChangeEvent) => {
              if (step.active) {
                const { layout } = event.nativeEvent;
                scrollTo(layout.y);
              }
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.default,
    paddingTop: Paddings.default,
  },
  timelineBlock: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: Colors.primaryYellow,
    borderStyle: "solid",
    borderTopWidth: 1,
    height: Sizes.timelineBlock,
    marginTop: -1,
  },
  timelineBlockFirst: {
    marginTop: 0,
  },
  timelineBlockLeft: {
    borderBottomLeftRadius: Sizes.timelineBlock / 2,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: Sizes.timelineBlock / 2,
    marginLeft: Sizes.step / 4,
    marginRight: Sizes.step,
  },
  timelineBlockRight: {
    borderBottomRightRadius: Sizes.timelineBlock / 2,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopRightRadius: Sizes.timelineBlock / 2,
    marginLeft: Sizes.step,
    marginRight: Sizes.step / 4,
  },
  timelineContainer: {
    flex: 1,
    flexDirection: "column",
  },
  timelineStepContainer: {
    marginBottom: Sizes.step,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: Sizes.step,
  },
});

export default TabHomeScreen;
