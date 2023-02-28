import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import {
  FetchPoliciesConstants,
  Labels,
  TndDbQueries,
} from "../../../constants";
import { GraphQLQuery } from "../../../services";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../../styles";
import type { TndQuestionnaire } from "../../../type/tndSurvey.types";
import { TrackingEvent } from "../../../utils/tracking/tracker.util";
import {
  CommonText,
  CustomButton,
  GreenRadioButton,
  TitleH1,
  View,
} from "../../baseComponents";
import TrackerHandler from "../../tracker/trackerHandler.component";

interface TndTestSelectionProps {
  goToSurvey: (tndTest: TndQuestionnaire) => void;
}

const TndTestSelection: FC<TndTestSelectionProps> = ({ goToSurvey }) => {
  const [tndTests, setTndTests] = useState<TndQuestionnaire[]>([]);
  const [selectedTndTest, setSelectedTndTest] = useState<
    TndQuestionnaire | undefined
  >();
  const [testIsSelected, setTestIsSelected] = useState(false);
  const [trackerAction, setTrackerAction] = useState("");

  const handleResults = useCallback((data: unknown) => {
    const result = data as { questionnaireTnds: TndQuestionnaire[] };
    setTndTests(result.questionnaireTnds);
  }, []);

  const updateTndTests = useCallback(
    (tndTest: TndQuestionnaire) => () => {
      setTndTests(() => {
        return tndTests.map((item) => {
          if (item.id === tndTest.id) {
            item.isChecked = true;
            setSelectedTndTest(tndTest);
            setTestIsSelected(true);
          } else {
            item.isChecked = false;
          }
          return item;
        });
      });
    },
    [tndTests]
  );

  const validate = useCallback(
    (tndTest: TndQuestionnaire | undefined) => () => {
      if (tndTest) {
        setTrackerAction(`${TrackingEvent.TND} - Test : ${tndTest.nom}`);
        goToSurvey(tndTest);
      }
    },
    [goToSurvey]
  );

  return (
    <>
      <TrackerHandler actionName={trackerAction} />
      <GraphQLQuery
        query={TndDbQueries.GET_ALL_TND_TESTS}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        getFetchedData={handleResults}
      />
      <View style={styles.mainContainer}>
        <TitleH1
          title={Labels.tndSurvey.testSelection.title}
          description={Labels.tndSurvey.testSelection.instruction}
          animated={false}
        />
        <View>
          <CommonText style={styles.instruction}>
            {Labels.tndSurvey.testSelection.question}
          </CommonText>
          <View style={styles.answers}>
            {tndTests.map((tndTest, index) => (
              <View key={index}>
                <GreenRadioButton
                  title={tndTest.nom}
                  isChecked={tndTest.isChecked ?? false}
                  labelSize={Sizes.xs}
                  onPress={updateTndTests(tndTest)}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.validateButton}>
          <CustomButton
            title={Labels.buttons.validate}
            rounded={true}
            disabled={!testIsSelected}
            action={validate(selectedTndTest)}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  answers: {
    paddingHorizontal: Paddings.default,
  },
  instruction: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    paddingVertical: Paddings.default,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    margin: Margins.default,
  },
  validateButton: {
    alignItems: "center",
    marginTop: Margins.larger,
  },
});

export default TndTestSelection;
