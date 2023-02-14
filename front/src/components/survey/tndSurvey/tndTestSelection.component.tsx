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
import type { TndTest } from "../../../type/tndSurvey.types";
import {
  CommonText,
  CustomButton,
  GreenRadioButton,
  TitleH1,
  View,
} from "../../baseComponents";

interface TndTestSelectionProps {
  goToSurvey: (tndTest: TndTest) => void;
}

const TndTestSelection: FC<TndTestSelectionProps> = ({ goToSurvey }) => {
  const [tndTests, setTndTests] = useState<TndTest[]>([]);
  const [selectedTndTest, setSelectedTndTest] = useState<TndTest | undefined>();
  const [testIsSelected, setTestIsSelected] = useState(false);

  const handleResults = useCallback((data: unknown) => {
    const result = data as { questionnaireTnds: TndTest[] };
    setTndTests(result.questionnaireTnds);
  }, []);

  const updateTndTests = useCallback(
    (tndTest: TndTest) => () => {
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
    (tndTest: TndTest | undefined) => () => {
      if (tndTest) goToSurvey(tndTest);
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
