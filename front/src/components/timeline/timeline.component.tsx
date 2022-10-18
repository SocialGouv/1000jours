import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

import type { Step, TabHomeParamList } from "../../types";
import { ScaleNormalize } from "../../utils";
import BasicTimeline from "./basicTimeline.component";
import ComplexTimeline from "./complexTimeline.component";

interface TimelineProps {
  steps: Step[];
  navigation: StackNavigationProp<TabHomeParamList, keyof TabHomeParamList>;
  scrollTo: (positionY: number) => void;
}

const Timeline: FC<TimelineProps> = ({ steps, navigation, scrollTo }) => {
  const [fontScale, setFontScale] = useState<number | null>(null);

  const checkFontScale = () => {
    setFontScale(ScaleNormalize.getFontScale());
  };

  useEffect(() => {
    checkFontScale();
    // Permet de détecter lorsque l'app change d'état ('active' | 'background' | 'inactive' | 'unknown' | 'extension')
    AppState.addEventListener("change", checkFontScale);
    return () => {
      AppState.removeEventListener("change", checkFontScale);
    };
  }, []);

  return fontScale && fontScale > ScaleNormalize.MAX_FONT_SCALE ? (
    <BasicTimeline steps={steps} scrollTo={scrollTo} navigation={navigation} />
  ) : (
    <ComplexTimeline
      steps={steps}
      scrollTo={scrollTo}
      navigation={navigation}
    />
  );
};

export default Timeline;
