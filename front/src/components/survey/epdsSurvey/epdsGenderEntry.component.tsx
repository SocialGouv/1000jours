import _ from "lodash";
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import {
  CommonText,
  CustomButton,
  GreenRadioButton,
  TitleH1,
  View,
} from "../../../components/baseComponents";
import { Labels, StorageKeysConstants } from "../../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../../styles";
import type { EpdsGenderType } from "../../../type";
import { EpdsGenders } from "../../../type";
import { StorageUtils } from "../../../utils";

interface EpdsGenderEntryProps {
  goToEpdsSurvey: () => void;
}

const EpdsGenderEntry: FC<EpdsGenderEntryProps> = ({ goToEpdsSurvey }) => {
  const gendersArray: EpdsGenderType[] = _.range(
    Object.keys(EpdsGenders).length
  ).map((index) => {
    return {
      element: {
        label: EpdsGenders[index].label,
        value: EpdsGenders[index].value,
      },
      id: index,
      isChecked: false,
    };
  });

  const [epdsGenders, setEpdsGenders] =
    useState<EpdsGenderType[]>(gendersArray);
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [genderIsSelected, setGenderIsSelected] = useState(false);

  const updateGendersArray = useCallback(
    (epdsGender: EpdsGenderType) => () => {
      setEpdsGenders(() => {
        return gendersArray.map((item) => {
          if (item.id === epdsGender.id) {
            setSelectedGender(epdsGender.element.value);
            setGenderIsSelected(true);
            return { ...item, isChecked: !epdsGender.isChecked };
          } else {
            return item;
          }
        });
      });
    },
    [gendersArray]
  );

  const onGenderSaved = useCallback(async () => {
    if (selectedGender) {
      await StorageUtils.storeStringValue(
        StorageKeysConstants.epdsGenderKey,
        selectedGender
      );
      goToEpdsSurvey();
    }
  }, [goToEpdsSurvey, selectedGender]);

  return (
    <View style={styles.mainContainer}>
      <TitleH1
        title={`${Labels.epdsSurvey.genderEntry.titleInformation} : ${Labels.epdsSurvey.title}`}
        animated={false}
      />
      <View>
        <CommonText style={styles.instruction}>
          {Labels.epdsSurvey.genderEntry.instruction}
        </CommonText>
        <View style={styles.answers}>
          {epdsGenders.map((genderElement, index) => (
            <View key={index}>
              <GreenRadioButton
                title={genderElement.element.label}
                isChecked={genderElement.isChecked}
                labelSize={Sizes.xs}
                onPress={updateGendersArray(genderElement)}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.validateButton}>
        <CustomButton
          title={Labels.buttons.validate}
          rounded={true}
          disabled={!genderIsSelected}
          action={onGenderSaved}
        />
      </View>
    </View>
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

export default EpdsGenderEntry;
