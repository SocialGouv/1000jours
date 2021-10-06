import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _, { range } from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  ErrorMessage,
  Loader,
  TimelineStep,
  TitleH1,
  View,
} from "../components";
import TimelineStepLibrary from "../components/timeline/timelineStepLibrary.component";
import {
  FetchPoliciesConstants,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../constants";
import Colors from "../constants/Colors";
import { PARENTS_DOCUMENTS } from "../constants/databaseQueries.constants";
import Labels from "../constants/Labels";
import type { Step, TabHomeParamList, UserSituation } from "../types";
import { AroundMeUtils, StorageUtils, TrackerUtils } from "../utils";
import {
  cancelScheduleNextStepNotification,
  scheduleNextStepNotification,
} from "../utils/notification.util";
import { getCurrentStepId } from "../utils/step.util";
import { stringIsNotNullNorEmpty } from "../utils/strings.util";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const TabHomeScreen: FC<Props> = ({ navigation }) => {
  const { trackScreenView } = useMatomo();

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

  const [counterDocument, setCounterDocument] = useState(0);
  const [loadParentheque, { loading: l, error: e, data: d }] = useLazyQuery(
    PARENTS_DOCUMENTS,
    {
      fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
    }
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
    loadSteps();
    loadParentheque();
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

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollTo = (positionY: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionY,
    });
  };

  useEffect(() => {
    trackScreenView(TrackerUtils.TrackingEvent.HOME);
    // Permet de forcer le refresh de la page lorsque l'on arrive dessus
    const unsubscribe = navigation.addListener("focus", () => {
      void init();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!l && d) {
      const results = (d as { parenthequeDocuments: Document[] })
        .parenthequeDocuments;
      setCounterDocument(results.length);
    }
  }, [l, d, e]);

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

  const ViewItemParentheque = () => {
    const stepParentheque: Step = {
      active: null,
      debut: null,
      description: Labels.timeline.library.description,
      fin: null,
      id: "0",
      nom: Labels.timeline.library.nom,
      ordre: 0,
    };

    if (counterDocument > 0)
      return (
        <View
          style={[
            styles.timelineStepContainer,
            styles.timelineStepLibraryContainer,
          ]}
        >
          <View style={[styles.timelineContainer]}>
            <View
              style={[
                styles.timelineBlock,
                styles.timelineLibraryBlock,
                styles.timelineBlockLeft,
              ]}
            />
          </View>
          {[stepParentheque].map((step, index) => (
            <TimelineStepLibrary
              order={step.ordre}
              name={step.nom}
              key={index}
              onPress={() => {
                navigation.navigate("listParentsDocuments", { step });
              }}
            />
          ))}
        </View>
      );
    else
      return (
        <View
          style={[
            styles.timelineStepContainer,
            styles.timelineStepLibraryContainer,
          ]}
        />
      );
  };

  return (
    <ScrollView style={[styles.mainContainer]} ref={scrollViewRef}>
      <TitleH1
        title={Labels.timeline.title}
        description={Labels.timeline.description}
        animated={false}
      />

      <ViewItemParentheque />

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
