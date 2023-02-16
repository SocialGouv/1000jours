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
import {
  CommonText,
  CustomButton,
  GreenRadioButton,
  TitleH1,
  View,
} from "../../baseComponents";

interface TndTestSelectionProps {
  goToSurvey: (tndQuestionnaire: TndQuestionnaire) => void;
}

const TndTestSelection: FC<TndTestSelectionProps> = ({ goToSurvey }) => {
  const [tndTests, setTndTests] = useState<TndQuestionnaire[]>([]);
  const [selectedTndTest, setSelectedTndTest] = useState<
    TndQuestionnaire | undefined
  >();
  const [testIsSelected, setTestIsSelected] = useState(false);

  const handleResults = useCallback((data: unknown) => {
    const result = data as { questionnaireTnds: TndQuestionnaire[] };
    setTndTests(result.questionnaireTnds);
  }, []);

  const updateTndTests = useCallback(
    (tndQuestionnaire: TndQuestionnaire) => () => {
      setTndTests(() => {
        return tndTests.map((item) => {
          if (item.id === tndQuestionnaire.id) {
            item.isChecked = true;
            setSelectedTndTest(tndQuestionnaire);
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
    (tndQuestionnaire: TndQuestionnaire | undefined) => () => {
      if (tndQuestionnaire) goToSurvey(tndQuestionnaire);
    },
    [goToSurvey]
  );

  return (
    <>
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
    paddingHorizontal: Paddings.largest,
  },
  instruction: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    paddingHorizontal: Paddings.largest,
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
