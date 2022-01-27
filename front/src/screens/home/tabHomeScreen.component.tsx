import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _, { range } from "lodash";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { TimelineStep, TrackerHandler } from "../../components";
import {
  ErrorMessage,
  Loader,
  TitleH1,
  View,
} from "../../components/baseComponents";
import ParenthequeItem from "../../components/home/parenthequeItem.component";
import { FetchPoliciesConstants, StorageKeysConstants } from "../../constants";
import Labels from "../../constants/Labels";
import { Colors, Paddings, Sizes } from "../../styles";
import type { Step, TabHomeParamList, UserSituation } from "../../types";
import { AroundMeUtils, StorageUtils, TrackerUtils } from "../../utils";
import {
  cancelScheduleNextStepNotification,
  scheduleNextStepNotification,
} from "../../utils/notification.util";
import { getCurrentStepId } from "../../utils/step.util";
import { stringIsNotNullNorEmpty } from "../../utils/strings.util";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const TabHomeScreen: FC<Props> = ({ navigation }) => {

  const ALL_STEPS = gql`
    query GetAllSteps {
      etapes(sort: "id") {
        id
        nom
        ordre
        description
        debut
        fin
      }
    }
  `;

  const [previousCurrentStepId, setPreviousCurrentStepId] = useState<
    string | null
  >(null);
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);
  const [loadSteps, { called, loading, error, data }] = useLazyQuery(
    ALL_STEPS,
    { fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK }
  );

  const init = async () => {
    const previousStepId = await StorageUtils.getStringValue(
      StorageKeysConstants.currentStepId
    );
    if (previousStepId) setPreviousCurrentStepId(previousStepId);

    const userSituations = (await StorageUtils.getObjectValue(
      StorageKeysConstants.userSituationsKey
    )) as UserSituation[] | null;

    const date = await StorageUtils.getStringValue(
      StorageKeysConstants.userChildBirthdayKey
    );
    const stepId = getCurrentStepId(userSituations, date);
    if (stepId) {
      void StorageUtils.storeStringValue(
        StorageKeysConstants.currentStepId,
        stepId.toString()
      );
      setCurrentStepId(stepId);
    }
    void loadSteps();
  };

  const checkIfCurrentStepHasChanged = (currentStep: Step) => {
    // Force le déclenchement de la notification suite au changement d'étape
    if (
      stringIsNotNullNorEmpty(previousCurrentStepId) &&
      previousCurrentStepId !== currentStep.id.toString()
    ) {
      void cancelScheduleNextStepNotification().then(() => {
        void scheduleNextStepNotification(currentStep, true);
        setPreviousCurrentStepId(currentStep.id.toString());
      });
    }
    // Planifie la notification du prochain changement d'étape
    else {
      const nextStep = _.find(etapes, { ordre: currentStep.ordre + 1 });
      if (nextStep) void scheduleNextStepNotification(nextStep);
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollTo = (positionY: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionY,
    });
  };

  useEffect(() => {
    // Permet de forcer le refresh de la page lorsque l'on arrive dessus
    const unsubscribe = navigation.addListener("focus", () => {
      void init();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  if (!called || loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  const result = data as { etapes: Step[] };
  const etapes = result.etapes.map((etape) => ({
    ...etape,
    // '+' permet de convertir l'id (string) en number
    active: currentStepId === +etape.id,
    id: +etape.id,
  }));

  const numberOfStepsWithoutTheFirstAndLast = etapes.length - 1 - 2;

  if (currentStepId) {
    const currentStep = _.find(etapes, { id: currentStepId });
    if (currentStep) {
      checkIfCurrentStepHasChanged(currentStep);
      void AroundMeUtils.saveCurrentEtapeForCartoFilter(currentStep);
    }
  }

  return (
    <ScrollView style={[styles.mainContainer]} ref={scrollViewRef}>
      {/* <TrackerHandler screenName={TrackerUtils.TrackingEvent.HOME} /> */}
      <TitleH1
        title={Labels.timeline.title}
        description={Labels.timeline.description}
        animated={false}
      />
      <ParenthequeItem navigation={navigation} />
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
  timelineLibraryBlock: {
    borderBottomWidth: 0,
    borderColor: Colors.primaryBlue,
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  timelineStepContainer: {
    marginBottom: Sizes.step,
    marginLeft: "5%",
    marginRight: "5%",
  },
  timelineStepLibraryContainer: {
    marginBottom: 0,
    marginTop: Sizes.step,
  },
});

export default TabHomeScreen;
