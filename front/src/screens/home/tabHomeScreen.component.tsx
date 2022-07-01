import type { StackNavigationProp } from "@react-navigation/stack";
// eslint-disable-next-line import/named
import _, { range } from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ParenthequeItem, TimelineStep } from "../../components";
import { TitleH1, View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  FetchPoliciesConstants,
  HomeDbQueries,
  StorageKeysConstants,
} from "../../constants";
import Labels from "../../constants/Labels";
import { GraphQLLazyQuery } from "../../services";
import { Colors, Paddings, Sizes } from "../../styles";
import type { Step, TabHomeParamList, UserSituation } from "../../types";
import {
  NotificationUtils,
  StepUtils,
  StorageUtils,
  StringUtils,
  TrackerUtils,
} from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const TabHomeScreen: FC<Props> = ({ navigation }) => {
  const [previousCurrentStepId, setPreviousCurrentStepId] = useState<
    string | null
  >(null);
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);
  const [
    numberOfStepsWithoutTheFirstAndLast,
    setNumberOfStepsWithoutTheFirstAndLast,
  ] = useState(-1);
  const [triggerGetSteps, setTriggerGetStep] = useState(false);
  const [_etapes, setEtapes] = useState<Step[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Permet de forcer le refresh de la page lorsque l'on arrive dessus
    const unsubscribe = navigation.addListener("focus", () => {
      void init();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const stepId = StepUtils.getCurrentStepId(userSituations, date);
    if (stepId) {
      void StorageUtils.storeStringValue(
        StorageKeysConstants.currentStepId,
        stepId.toString()
      );
      setCurrentStepId(stepId);
    }
    setTriggerGetStep(!triggerGetSteps);
  };

  const scheduleArticlesNotificationIfNeeded = useCallback(
    async (currentStep: Step) => {
      const triggerForArticlesNotification = await StorageUtils.getObjectValue(
        StorageKeysConstants.triggerForArticlesNotification
      );
      // Programme la notification des articles non lus si cette notification n'a jamais été programmée ou si il y a un changement d'étape
      if (
        !triggerForArticlesNotification ||
        (StringUtils.stringIsNotNullNorEmpty(previousCurrentStepId) &&
          previousCurrentStepId !== currentStep.id.toString())
      ) {
        await NotificationUtils.scheduleArticlesNotification();
      }
    },
    [previousCurrentStepId]
  );

  const handleResults = useCallback(
    async (data: unknown) => {
      const checkIfCurrentStepHasChanged = async (
        currentStep: Step,
        etapes: Step[]
      ) => {
        // Force le déclenchement de la notification suite au changement d'étape
        if (
          StringUtils.stringIsNotNullNorEmpty(previousCurrentStepId) &&
          previousCurrentStepId !== currentStep.id.toString()
        ) {
          await NotificationUtils.cancelScheduleNextStepNotification();
          await NotificationUtils.scheduleNextStepNotification(
            currentStep,
            true
          );
          setPreviousCurrentStepId(currentStep.id.toString());
        }
        // Planifie la notification du prochain changement d'étape
        else {
          const nextStep = _.find(etapes, { ordre: currentStep.ordre + 1 });
          if (nextStep)
            void NotificationUtils.scheduleNextStepNotification(nextStep);
        }

        // Programme la notification des articles non lus pour la nouvelle étape
        await scheduleArticlesNotificationIfNeeded(currentStep);
      };

      const result = data as { etapes: Step[] };
      const etapes = result.etapes.map((etape) => ({
        ...etape,
        // '+' permet de convertir l'id (string) en number
        active: currentStepId === +etape.id,
        id: +etape.id,
      }));
      setEtapes(etapes);

      setNumberOfStepsWithoutTheFirstAndLast(etapes.length - 1 - 2);

      if (currentStepId) {
        const currentStep = _.find(etapes, { id: currentStepId });
        if (currentStep?.nom)
          await StorageUtils.storeObjectValue(
            StorageKeysConstants.currentStep,
            currentStep
          );
        if (currentStep)
          await checkIfCurrentStepHasChanged(currentStep, etapes);
      }
    },
    [currentStepId, previousCurrentStepId, scheduleArticlesNotificationIfNeeded]
  );

  const scrollTo = (positionY: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionY,
    });
  };

  const onTimelineStepPress = useCallback(
    (step: Step) => () => {
      navigation.navigate("articleList", { step });
    },
    [navigation]
  );

  const onTimelineStepLayout = useCallback(
    (event: LayoutChangeEvent, step: Step) => {
      if (step.active) {
        const { layout } = event.nativeEvent;
        scrollTo(layout.y);
      }
    },
    []
  );
  return (
    <ScrollView style={[styles.mainContainer]} ref={scrollViewRef}>
      <TrackerHandler screenName={TrackerUtils.TrackingEvent.HOME} />
      <GraphQLLazyQuery
        query={HomeDbQueries.HOME_GET_ALL_STEPS}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        getFetchedData={handleResults}
        triggerLaunchQuery={triggerGetSteps}
        noLoaderBackdrop
      />
      {_etapes.length > 0 && (
        <>
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
            {_etapes.map((step, index) => (
              <TimelineStep
                order={step.ordre}
                name={step.nom}
                index={index}
                isTheLast={index === _etapes.length - 1}
                key={index}
                active={step.active}
                onPress={onTimelineStepPress(step)}
                // eslint-disable-next-line react/jsx-no-bind
                onLayout={(event: LayoutChangeEvent) => {
                  onTimelineStepLayout(event, step);
                }}
              />
            ))}
          </View>
        </>
      )}
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
