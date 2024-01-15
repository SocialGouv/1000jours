import type { StackNavigationProp } from "@react-navigation/stack";
// eslint-disable-next-line import/named
import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  StoreCurrentStepArticleIds,
  UpdateChildBirthdayModal,
} from "../../components";
import { TitleH1 } from "../../components/baseComponents";
import Timeline from "../../components/timeline/timeline.component";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  FetchPoliciesConstants,
  HomeDbQueries,
  StorageKeysConstants,
} from "../../constants";
import Labels from "../../constants/Labels";
import { GraphQLLazyQuery } from "../../services";
import { Paddings } from "../../styles";
import type { Step, TabHomeParamList, UserSituation } from "../../types";
import {
  NotificationUtils,
  StepUtils,
  StorageUtils,
  StringUtils,
  TrackerUtils,
} from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const TabHomeScreen: FC<Props> = ({ navigation }) => {
  const [previousCurrentStepId, setPreviousCurrentStepId] = useState<
    string | null | undefined
  >(null);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);
  const [triggerGetSteps, setTriggerGetStep] = useState(false);
  const [storeCurrentStepArticleIds, setStoreCurrentStepArticleIds] =
    useState(false);
  const [_etapes, setEtapes] = useState<Step[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const init = useCallback(async () => {
    const previousStepId = await StorageUtils.getStringValue(
      StorageKeysConstants.currentStepId
    );
    setPreviousCurrentStepId(previousStepId);

    const userSituations = (await StorageUtils.getObjectValue(
      StorageKeysConstants.userSituationsKey
    )) as UserSituation[] | null;

    const date = await StorageUtils.getStringValue(
      StorageKeysConstants.userChildBirthdayKey
    );

    const stepId = StepUtils.getCurrentStepIdOrNull(
      StepUtils.getCheckedUserSituationOrUndefined(userSituations),
      date
    );
    if (stepId) {
      void StorageUtils.storeStringValue(
        StorageKeysConstants.currentStepId,
        stepId.toString()
      );
      setCurrentStepId(stepId);
    }
    setTriggerGetStep(!triggerGetSteps);
    setShowUpdateProfile(await displayUpdateProfileModal(new Date()));
  }, [triggerGetSteps]);

  useEffect(() => {
    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentStep) {
      setStoreCurrentStepArticleIds(true);
    }
  }, [currentStep]);

  const scheduleArticlesNotificationIfNeeded = useCallback(async () => {
    const articlesNotification =
      await NotificationUtils.getAllNotificationsByType(
        NotificationType.articles
      );

    if (currentStep) {
      // Programme la notification des articles non lus si :
      // - cette notification n'a jamais été programmée
      // - cette notification est déjà programmée mais qu'il n'y a pas de 'redirectParams'
      // - il y a un changement d'étape
      if (
        articlesNotification.length === 0 ||
        (articlesNotification.length > 0 &&
          !articlesNotification[0].content.data.redirectParams) ||
        (StringUtils.isNotNullNorEmpty(previousCurrentStepId) &&
          previousCurrentStepId !== currentStep.id.toString())
      ) {
        await NotificationUtils.scheduleArticlesNotification();
      }
    } else {
      // Annule la notification si l'étape courante n'est pas définie
      if (articlesNotification.length > 0) {
        await NotificationUtils.cancelAllNotificationsByType(
          NotificationType.articles
        );
      }
    }
  }, [currentStep, previousCurrentStepId]);

  const checkIfCurrentStepHasChanged = useCallback(
    async (etapes: Step[], _currentStep: Step) => {
      // Force le déclenchement de la notification suite au changement d'étape
      if (
        StringUtils.isNotNullNorEmpty(previousCurrentStepId) &&
        previousCurrentStepId !== _currentStep.id.toString()
      ) {
        await NotificationUtils.cancelScheduleNextStepNotification();
        await NotificationUtils.scheduleNextStepNotification(
          _currentStep,
          true
        );
        setPreviousCurrentStepId(_currentStep.id.toString());
      }
      // Planifie la notification du prochain changement d'étape
      else {
        const nextStep = _.find(etapes, { ordre: _currentStep.ordre + 1 });
        if (nextStep)
          await NotificationUtils.scheduleNextStepNotification(nextStep);
      }
    },
    [previousCurrentStepId]
  );

  const handleResults = useCallback(
    async (data: unknown) => {
      if (data) {
        const result = data as { etapes: Step[] };
        let _currentStep = undefined;

        // Set CurrentStep
        if (result.etapes.length && currentStepId) {
          _currentStep = _.find(result.etapes, (o) => {
            return o.id == currentStepId;
          });
          if (_currentStep?.nom) {
            setCurrentStep(_currentStep);
            await StorageUtils.storeObjectValue(
              StorageKeysConstants.currentStep,
              _currentStep
            );
          }
        }

        // Format and Set the Steps
        const etapes = result.etapes.map((etape) => ({
          ...etape,
          // '+' permet de convertir l'id (string) en number
          active: currentStepId === +etape.id,
          id: +etape.id,
        }));
        setEtapes(etapes);

        if (_currentStep)
          await checkIfCurrentStepHasChanged(etapes, _currentStep);
      }
    },
    [checkIfCurrentStepHasChanged, currentStepId]
  );

  const scrollTo = useCallback((positionY: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionY,
    });
  }, []);

  return (
    <>
      {storeCurrentStepArticleIds && (
        <StoreCurrentStepArticleIds
          callback={scheduleArticlesNotificationIfNeeded}
        />
      )}
      <ScrollView style={[styles.mainContainer]} ref={scrollViewRef}>
        <TrackerHandler screenName={TrackerUtils.TrackingEvent.HOME} />
        <TitleH1
          title={Labels.timeline.title}
          description={Labels.timeline.description}
          animated={false}
        />
        <GraphQLLazyQuery
          query={HomeDbQueries.HOME_GET_ALL_STEPS}
          fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
          getFetchedData={handleResults}
          triggerLaunchQuery={triggerGetSteps}
          noLoaderBackdrop
        />
        {_etapes.length > 0 && (
          <Timeline
            steps={_etapes}
            scrollTo={scrollTo}
            navigation={navigation}
          />
        )}
        {showUpdateProfile && (
          <UpdateChildBirthdayModal
            step={_etapes.find((step) => step.active == true)}
          />
        )}
      </ScrollView>
    </>
  );
};

export const displayUpdateProfileModal = async (
  today: Date
): Promise<boolean> => {
  const lastDateStr: string =
    (await StorageUtils.getStringValue(
      StorageKeysConstants.lastProfileUpdate
    )) ?? "";
  const lastDate: Date = new Date(lastDateStr);

  const childBirthdayStr: string =
    (await StorageUtils.getStringValue(
      StorageKeysConstants.userChildBirthdayKey
    )) ?? "";
  const childBirthdayDate: Date = new Date(childBirthdayStr);

  // If it's 1 to 8 month,reminder every months, and after, it's every week
  const isMonthReminder = getDifferenceInDays(today, childBirthdayDate) >= 30;
  const daysToLasteUpdate = getDifferenceInDays(lastDate, today);

  if (
    getDifferenceInDays(today, childBirthdayDate) < 0 ||
    !isValidDate(childBirthdayDate)
  )
    return false;

  if (
    (isMonthReminder && daysToLasteUpdate >= 30) ||
    (!isMonthReminder && daysToLasteUpdate >= 7)
  )
    return true;

  if (
    (isMonthReminder && daysToLasteUpdate < 30) ||
    (!isMonthReminder && daysToLasteUpdate < 7)
  )
    return false;

  return true;
};

const getDifferenceInDays = (date1: Date, date2: Date) => {
  const diffInMs = date2.getTime() - date1.getTime();
  return diffInMs / (1000 * 60 * 60 * 24);
};

const isValidDate = (d: Date): boolean => !isNaN(d.getTime());

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.default,
    paddingTop: Paddings.default,
  },
});

export default TabHomeScreen;
