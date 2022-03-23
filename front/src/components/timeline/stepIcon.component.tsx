import type { FC } from "react";
import * as React from "react";

import { Colors, Sizes } from "../../styles";
import Icomoon from "../baseComponents/icomoon.component";

interface Props {
  name: string;
  active: boolean;
  isParentheque?: boolean;
}

const StepIcon: FC<Props> = ({ name, active, isParentheque }) => (
  <Icomoon
    name={name}
    color={
      isParentheque
        ? Colors.primaryBlue
        : active
        ? Colors.white
        : Colors.primaryYellow
    }
    size={isParentheque ? Sizes.xxxxl : Sizes.xxxxxl}
  />
);

export default StepIcon;
